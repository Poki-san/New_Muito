import { FlatList, Image, ImageBackground, KeyboardAvoidingView, Platform, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MainLayout, PeopleItem } from '../../component';
import { height, statusBarHeight, width, Бирюзовый } from '../../GLOBAL';
import { styles } from '../../styles';
import { BlurView } from 'expo-blur';
import { useEffect, useState } from 'react';
import { BackArrowIcon } from '../../component/svg/svg';
import { goBack } from '../../functions/navigate';
import apiFetch from '../../functions/api';
 
export function EventPeopleScreen({ route }) {
    const [tag, setTag] = useState(1)
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [meta, setMeta] = useState({})
    const [refresh, setRefresh] = useState(false)
    
    useEffect(()=>{
        (async()=>{
            const value = await apiFetch(`/event/users/${route.params?.id}?page=${page}&status=1`,'GET',true)            
            if (value?.status==200) {
                setMeta(value?.meta)
                setData(value?.data)
            }
        })();
    },[])
    const onRefresh= async(loader?:boolean, status?:number) => {
        setMeta({})
        setData([])
        setPage(1)
        if (!loader) {
            setTag(1)
            setRefresh(true)
            setTimeout(async() => {
                const value = await apiFetch(`/event/users/${route.params?.id}?page=1&status=${status}`,'GET',true)            
                if (value?.status==200) {
                    setMeta(value?.meta)
                    setData(value?.data)
                }
                setRefresh(false)
            }, 1000);
        } else{
            const value = await apiFetch(`/event/users/${route.params?.id}?page=1&status=${status}`,'GET',true)            
            if (value?.status==200) {
                setMeta(value?.meta)
                setData(value?.data)
            }
        }
        
    }
    return ( 
        <ImageBackground style={{width:width, height:height}} source={require('../../../assets/image/back.png')}>
            <MainLayout isStatusBar>
               
                <View style={{flexGrow:1}}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : 'height'}
                        keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                        style={{ flex: 1 }}
                    >
                        <View style={{marginTop:statusBarHeight+16, marginBottom:16}}>
                            <View style={{marginHorizontal:16, marginBottom:9, justifyContent:'space-between', flexDirection:"row", alignItems:"center"}}>
                                <TouchableOpacity activeOpacity={0.7} onPress={goBack} style={{width:42, height:42, alignItems:"center", justifyContent:"center", backgroundColor:'#221E1E80', borderRadius:16}}>
                                    <BackArrowIcon/>
                                </TouchableOpacity>
                                <Text style={[styles.h4, {color:'white'}]}>Завки</Text>
                                <View  style={{width:42, height:42}}/>
                            </View>
                            <Image source={require('../../../assets/image/line.png')} style={{height:1}}/>
                        </View>
                        <BlurView  intensity={75} tint='systemChromeMaterialDark' style={styles.blurTagEventContainer}>
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                                setTag(1)
                                onRefresh(true, 1)
                            }} style={[styles.tagEventContainer, {
                                backgroundColor:tag==1 ? '#374A4E' : '#374A4E00'
                            }]}>
                                <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Новые <Text style={{color:'#FFFFFF80'}}></Text></Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                                setTag(3)
                                onRefresh(true,3)
                            }} style={[styles.tagEventContainer, {
                                backgroundColor:tag==3 ? '#374A4E' : '#374A4E00'
                            }]}>
                                <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Отклоненные <Text style={{color:'#FFFFFF80'}}></Text></Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                                setTag(2)
                                onRefresh(true,2)
                            }} style={[styles.tagEventContainer, {
                                backgroundColor:tag==2 ? '#374A4E' : '#374A4E00'
                            }]}>
                                <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Принятые <Text style={{color:'#FFFFFF80'}}></Text></Text>
                            </TouchableOpacity>
                        </BlurView>
                        {/* <View style={{alignItems:"center", marginBottom:Platform.OS == 'ios' ? 20:0}}>
                            <View style={styles.eventPeopleImgContainer}>
                                {[1,2,3,4,5].map((el,i)=><PeopleItem key={i}/>)}
                            </View>
                        </View> */}
                        <FlatList
                            data={data}
                            refreshControl={<RefreshControl
                                refreshing={refresh}
                                colors={[Бирюзовый]}
                                progressBackgroundColor={'#181818'}
                                onRefresh={onRefresh}
                            />}
                            onEndReachedThreshold={0.8}
                            onEndReached={async()=>{
                                if (meta?.last_page>page) {
                                    const value = await apiFetch(`/event/users/${route.params?.id}?page=${page+1}&status=${tag}`,'GET', true)
                                    setPage(page+1)
                                    setMeta(value.meta)
                                    setData(prevState => ([...prevState, ...value.data]))
                                }
                            }}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            keyExtractor={(el,i)=>i.toString()}
                            style={{flexGrow:1}}
                            columnWrapperStyle={{justifyContent:"space-between", width:width-32}}
                            contentContainerStyle={{
                                width:width, 
                                alignItems:"center",
                                gap:8, 
                                marginBottom:30, 
                                
                            }}
                            renderItem={({item})=><PeopleItem data={item}/>}
                        />
                    </KeyboardAvoidingView>
                </View>
            </MainLayout>
        </ImageBackground>
    )
}