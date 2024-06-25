import { Animated, Image, ImageBackground, KeyboardAvoidingView, Platform, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MainLayout, ModalWarning } from '../../component';
import { URL, height, statusBarHeight, width, Бирюзовый, Бирюзовый50 } from '../../GLOBAL';
import { BlurView } from 'expo-blur';
import { CloseIcon, LikeIcon } from '../../component/svg/svg';
import { styles } from '../../styles';
import { useEffect, useRef, useState } from 'react';
import RBSheet from '@nonam4/react-native-bottom-sheet';
import apiFetch from '../../functions/api';
import CardStack, { Card } from "react-native-card-stack-swiper";
import token from '../../model/token';
import { LikeItem } from '../../component/ui/likeItem';
 
export function LikeScreen() {
    const [bid, setBid] = useState([])
    const refSwiper = useRef()

    const warning = useRef<RBSheet>(null)
    const [noWoman, setNoWoman] =useState(false)
    const [refresh, setRefreshing] = useState(false)

    const onRefresh = () => {
        setRefreshing(true);
        setBid([])
        setNoWoman(false)
        setTimeout(async() => {
            const value = await apiFetch('/event/bid','GET',true)
            if (value.status === 200){
                if (value.data?.length == 0) {
                    setNoWoman(true)
                } else {
                    setBid(value.data)
                }
            }
            setRefreshing(false);
        }, 1000);
    };


    const handlerBid = async (index, type) => {
        const bidSwipe = bid[index]
        console.log(bid[index]);
        
        try {
            const value = await fetch(`${URL}/event/check/${bidSwipe.event.id}/${bidSwipe.user.id}/${!!type ? 'invite' : 0}`, {
                method: 'GET',
                headers: {
                    "Accept": "application/json",
                    'Authorization': `Bearer ${token?.token}`,
                }
            })
            console.log(value);
            
        } catch (e) {

        }
    }

    useEffect(()=>{
        (async()=>{
            const value = await apiFetch('/event/bid','GET',true)
            if (value.status === 200){
                if (value.data?.length == 0) {
                    setNoWoman(true)
                } else {
                    setBid(value.data)
                }
            }
        })();
    },[])
    // console.log(bid);
    
    return ( 
        <ImageBackground style={{width:width, height:height}} source={require('../../../assets/image/back.png')}>
            <MainLayout isStatusBar backgroundColor={bid?.length > 0&&'#181818'}>
                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    scrollEnabled={false} 
                    refreshControl={<RefreshControl
                        refreshing={refresh}
                        colors={[Бирюзовый]}
                        tintColor={Бирюзовый}
                        progressBackgroundColor={'#181818'}
                        onRefresh={onRefresh}
                    />}
                    keyboardShouldPersistTaps='always' 
                    contentContainerStyle={{flexGrow:1}}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : 'height'}
                        keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                        style={{ flex: 1 }}
                    >   
                        {!noWoman ? 
                        <>
                            <CardStack
                                secondCardZoom={1}
                                ref={refSwiper}
                                
                                style={{height:'79%'}}
                                disableTopSwipe={true}
                                disableBottomSwipe={true}
                                renderNoMoreCards={() => 
                                    <View style={{marginTop:statusBarHeight+16, height:"100%"}}>
                                        <BlurView intensity={75}  style={styles.blurNoWoman} tint='systemChromeMaterialDark'>
                                            <Text style={[styles.h4,{fontSize:20, color:'white', paddingTop:2}]}>Пока нет заявок</Text>
                                            <Text style={[styles.bodyText,{color:'white', paddingTop:13}]}>Перейдите в раздел «Мои эвенты»</Text>
                                        </BlurView>
                                    </View>
                                }
                                verticalSwipe={false}
                                onSwipedLeft={(index) => {
                                    if ((index+1)==bid.length) {
                                        console.log('End');
                                        setNoWoman(true)
                                    }
                                    handlerBid(index, 0)
                                }}
                                onSwipedRight={(index) => {
                                    if ((index+1)==bid.length) {
                                        console.log('End');
                                        setNoWoman(true)
                                    }
                                    handlerBid(index, 1)
                                }}
                            >
                                
                                {bid.map((el, i)=>
                                    <LikeItem key={i} data={el} onHidden={onRefresh}/>
                                )}
                            </CardStack>
                            <View style={{height:'21%', backgroundColor:'#181818'}}>
                                <View style={{marginHorizontal:16,  marginTop:13, flexDirection:"row", justifyContent:'space-evenly'}}>
                                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                                        refSwiper?.current?.swipeLeft()
                                    }} style={{flexDirection:'row', alignItems:"center", gap:10}}>
                                        <Text style={[styles.smallText,{color:'#FFFFFF99'}]}>Отклонить</Text>
                                        <View style={styles.noLikeContainer}><CloseIcon/></View>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                                        refSwiper?.current?.swipeRight()
                                        // showToastable({message:'Заявка участницы подтверждена'})
                                        // setTimeout(() => setNoWoman(true), 200);
                                    }} style={{flexDirection:'row', alignItems:"center", gap:10}}>
                                        <LikeIcon/>
                                        <Text style={[styles.smallText,{color:Бирюзовый50}]}>Пригласить</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                        
                        : <View style={{marginTop:statusBarHeight+16, flex:1}}>
                            <BlurView intensity={75}  style={styles.blurNoWoman} tint='systemChromeMaterialDark'>
                                <Text style={[styles.h4,{fontSize:20, color:'white', paddingTop:2}]}>Пока нет заявок</Text>
                                <Text style={[styles.bodyText,{color:'white', paddingTop:13}]}>Перейдите в раздел «Мои эвенты»</Text>
                            </BlurView>
                        </View>}
                    </KeyboardAvoidingView>
                </ScrollView>
                <ModalWarning ref={warning}/>
            </MainLayout>
        </ImageBackground>
    )
}