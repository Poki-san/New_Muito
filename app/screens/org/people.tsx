import { Animated, Image, ImageBackground, KeyboardAvoidingView, Linking, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MainLayout,ModalWarning,TagBlock } from '../../component';
import { height, statusBarHeight, width, Белый, Бирюзовый, Бирюзовый50 } from '../../GLOBAL';
import { useEffect, useRef, useState } from 'react';
import { BlurView } from 'expo-blur';
import { AlertIcon, BackArrowIcon, CloseEyeIcon, CloseIcon, HeartMenuIcon, LikeIcon, ModalCloseIcon, RegInstaIcon, SettingIcon, TGIcon } from '../../component/svg/svg';
import { styles } from '../../styles';
import GestureRecognizer from 'react-native-swipe-gestures';
import Carousel from 'react-native-reanimated-carousel';
import { showToastable } from 'react-native-toastable';
import { goBack } from '../../functions/navigate';
import RBSheet from '@poki_san/react-native-bottom-sheet';
import apiFetch from '../../functions/api';
import error from '../../model/error';
 
export function PeopleScreen({ route }) {
    const [index, setIndex] = useState(0)  
    const [more, setMore] =useState(false)
    const [alert, setAlert] =useState(false)
    const animHeight = new Animated.Value(0)
    const warning = useRef<RBSheet>(null)
    const animRotate = new Animated.Value(0)
    const Rotate = animRotate.interpolate({
        inputRange:[0,1],
        outputRange:["0deg","180deg"]
    }) 
    const RotateTwo = animRotate.interpolate({
        inputRange:[0,1],
        outputRange:["180deg","360deg"]
    })

    const HeightAnim = animHeight.interpolate({
        inputRange:[0,1],
        outputRange:[117,500]
    }) 
    const HeightAnimTwo = animHeight.interpolate({
        inputRange:[0,1],
        outputRange:[500,117]
    })

    const AnimatedStepOne= async () => {
       
        Animated.parallel([
            Animated.timing(animHeight, {
                toValue:1,
                duration: 400,
                useNativeDriver:false
            }),
            Animated.timing(animRotate, {
                toValue:1,
                duration: 400,
                useNativeDriver:false
            })
        ]).start()
       
        setTimeout(() => setMore(!more), 410)
    }

    const [people, setPeople] = useState(null)

    useEffect(()=>{
        (async()=>{
            const value = await apiFetch(`/users/${route?.params?.id}`,'GET',true)
            
            if (value?.status == 200) {
                setPeople(value.data)
            }
        })();
    },[])

    return ( 
        <ImageBackground style={{width:width, height:height}} source={require('../../../assets/image/back.png')}>
            <MainLayout isStatusBar backgroundColor='#17171A'>
                <View style={{flexGrow:1}}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : 'height'}
                        keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                        style={{ flex: 1 }}
                    >
                        <Animated.View style={{height:Platform.OS=='ios'? height-statusBarHeight:height, backgroundColor:'#17171A', borderBottomLeftRadius:20, borderBottomRightRadius:20, overflow:"hidden"}}>
                            <View style={styles.containerWomanBlock}>
                            {alert &&<View onTouchStart={()=>setAlert(false)} style={{position:"absolute", top:0, left:0, width:width*2, height:height*2, zIndex:Platform.OS=='ios'? 0:1}} />}
                                <View>
                                    <View style={{marginTop:statusBarHeight+10, flexDirection:"row"}}>
                                        <View style={{flexDirection:'row', width:"100%", justifyContent:"space-between", alignItems:'center'}}>
                                            <View style={{flexDirection:"row", alignItems:"center", gap:8, marginLeft:16}}>
                                                <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
                                                    <BlurView intensity={50} tint='systemChromeMaterialDark'  style={styles.backArrowContainer}>
                                                        <BackArrowIcon/>
                                                    </BlurView>
                                                </TouchableOpacity>
                                                <BlurView intensity={75}  style={{flexDirection:"row", padding:10, overflow:"hidden", borderRadius:16, alignItems:'center', gap:4}} tint='systemChromeMaterialDark'>
                                                    <HeartMenuIcon color={Бирюзовый}/>
                                                    <Text style={[styles.h4,{color:Белый}]}>{people?.rating}</Text>
                                                </BlurView>
                                            </View>
                                            <TouchableOpacity activeOpacity={0.7} onPress={()=>setAlert(!alert)}>
                                                <BlurView intensity={75}  style={{padding:3, overflow:"hidden", borderRadius:16, alignItems:'center', gap:4, marginRight:16}} tint='systemChromeMaterialDark'>
                                                    <SettingIcon color={Бирюзовый}/>
                                                </BlurView>
                                            </TouchableOpacity>
                                            {alert && <View style={[styles.alertContainer]}>
                                                <TouchableOpacity onPress={()=>warning.current?.open()} activeOpacity={0.7} style={{flexDirection:"row", gap:7, alignItems:"center"}}>
                                                    <AlertIcon/>
                                                    <Text style={[styles.bodyText,{color:'#BC1115'}]}>Пожаловаться</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity activeOpacity={0.7} onPress={async()=>{
                                                    if (people?.hidden) {
                                                        const result = await apiFetch(`/users/unhidden/${people.id}`,'POST',true)
                                                        console.log(result);
                                                        
                                                        switch (result?.status) {
                                                            case 200:
                                                            case 201:
                                                            case 202:
                                                                showToastable({message:'Пользователь показан'})
                                                                goBack()
                                                                break;
                                                            default:
                                                                setTimeout(() => error.Input(true, 'Что-то пошло не так!', 'Упс!...', Platform.OS=='ios'?175:145), 500);
                                                                break;
                                                        }
                                                    } else {
                                                        const result = await apiFetch(`/users/hidden/${people.id}`,'POST',true)
                                                        switch (result?.status) {
                                                            case 200:
                                                            case 201:
                                                            case 202:
                                                                showToastable({message:'Пользователь скрыт'})
                                                                goBack()
                                                                break;
                                                            default:
                                                                setTimeout(() => error.Input(true, 'Что-то пошло не так!', 'Упс!...', Platform.OS=='ios'?175:145), 500);
                                                                break;
                                                        }
                                                    }
                                                }} style={{flexDirection:"row", gap:7, alignItems:"center"}}>
                                                    <CloseEyeIcon/>
                                                    <Text style={[styles.bodyText,{color:'white'}]}>{people?.hidden ? "Показать": "Больше не показывать"}</Text>
                                                </TouchableOpacity>
                                            </View>}
                                        </View>
                                    </View>
                                    <View style={{margin:16}}>
                                        <View style={{width:'100%', flexDirection:"row", gap:4,height:2}}>
                                            {people?.img?.map((el,i)=><View key={i} style={{backgroundColor:index == i ? '#FFFFFF' : '#FFFFFF66', flex:1, height:2}}/>)}
                                        </View>
                                    </View>
                                </View>
                                <Animated.View style={{maxHeight:more ? HeightAnimTwo : HeightAnim, borderBottomRightRadius:16, borderBottomLeftRadius:16, overflow:'hidden'}}>
                                    
                                    <BlurView style={styles.blurLikeContainer} tint='systemChromeMaterialDark' intensity={40} >
                                        <GestureRecognizer onSwipeDown={()=>{
                                            if (more) {
                                                AnimatedStepOne()
                                            }
                                        }} onSwipeUp={()=>{
                                            if (!more) {
                                                AnimatedStepOne()
                                            }
                                        }}>
                                            <TouchableOpacity activeOpacity={0.7} onPress={()=>AnimatedStepOne()} style={{width:"100%",alignItems:"center"}}>
                                                <Animated.View style={{transform:[{rotate:more ? Rotate : RotateTwo}], alignItems:"flex-start"}}><ModalCloseIcon/></Animated.View>
                                            </TouchableOpacity>
                                            <Text style={[styles.h1,{fontSize:34, color:'white', paddingTop:6}]}>{people?.name} <Text style={{color:'#FFFFFF80'}}>{people?.age}</Text></Text>
                                            <View style={styles.womanInfoContainer}>
                                                <View style={{flexDirection:'row', alignItems:'flex-end', gap:14}}>
                                                    {people?.growth &&
                                                        <Text style={[styles.bodyText,{fontSize:18, color:'white', paddingTop:4}]}>{people?.growth} <Text style={[styles.smallText,{color:'#FFFFFF99'}]}>Рост</Text></Text>
                                                    }
                                                    {people?.weight &&
                                                        <Text style={[styles.bodyText,{fontSize:18, color:'white', paddingTop:4}]}>{people?.weight} <Text style={[styles.smallText,{color:'#FFFFFF99'}]}>Вес</Text></Text>
                                                    }
                                                </View>
                                                <View style={{flexDirection:'row', height:39, alignItems:'flex-end', gap:11}}>
                                                    {people?.instagram && <TouchableOpacity 
                                                        activeOpacity={0.7} 
                                                        style={{alignItems:'center'}}
                                                        onPress={()=>{
                                                            Linking.openURL('https://www.instagram.com/'+people?.instagram?.replace('@',''))
                                                        }}
                                                    >
                                                        {people?.count_instagram && <Text style={[styles.smallText,{fontFamily:'PoppinsSemiBold', color:Бирюзовый50}]}>{people?.count_instagram}</Text>}
                                                        <RegInstaIcon/>
                                                    </TouchableOpacity>}
                                                    {people?.telegram && <TouchableOpacity 
                                                        activeOpacity={0.7} 
                                                        style={{alignItems:'center', pointerEvents:"box-only"}}
                                                        onPress={()=>{
                                                            Linking.openURL('https://t.me/'+people?.telegram?.replace('@',''))
                                                        }}
                                                    >
                                                        <TGIcon/>
                                                    </TouchableOpacity>}
                                                </View>
                                            </View>
                                        </GestureRecognizer>
                                            
                                        <ScrollView pinchGestureEnabled={true} style={{maxHeight:341}} showsVerticalScrollIndicator={false}>
                                            <View style={styles.tagContainerBlock}>
                                                {people?.hashtags && people?.hashtags?.map((el,i)=><TagBlock text={el?.label} key={i}/>)}
                                            </View>
                                            <Text style={[styles.bodyText,{color:"white"}]}>{people?.description}</Text>
                                        </ScrollView>
                                    </BlurView>
                                </Animated.View>
                            </View>
                            <Carousel
                                data={people?.img}
                                width={width}
                                loop={people?.img?.length > 1 ? true : false }
                                height={Platform.OS=='ios'? height-statusBarHeight:height}
                                defaultIndex={index}
                                onSnapToItem={setIndex}
                                style={{zIndex:9999, borderBottomLeftRadius:20, borderBottomRightRadius:20, overflow:"hidden", position:"relative"}}
                                renderItem={({item})=>(
                                    <Image style={{width:width, height:'100%', borderBottomLeftRadius:20, borderBottomRightRadius:20, overflow:"hidden"}} resizeMode='cover' source={{uri:item?.uri}}/>
                                )}
                            />
                        </Animated.View>
                        {/* <View style={{height:'15%', backgroundColor:'#17171A'}}>
                            {alert &&<View onTouchStart={()=>setAlert(false)} style={{position:"absolute", top:0, left:0, width:width*2, height:height*2, zIndex:1}} />}
                            <View style={{marginHorizontal:16,  marginTop:13, flexDirection:"row", justifyContent:'space-evenly'}}>
                                <TouchableOpacity activeOpacity={0.7} onPress={()=>{}} style={{flexDirection:'row', alignItems:"center", gap:10}}>
                                    <Text style={[styles.smallText,{color:'#FFFFFF99'}]}>Отклонить</Text>
                                    <View style={{borderRadius:180, width:42, aspectRatio:1, backgroundColor:'#DFDFDF1A', alignItems:"center", justifyContent:"center"}}><CloseIcon/></View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                                    showToastable({message:'Заявка участницы подтверждена'})
                                    setTimeout(() => {}, 200);
                                }} style={{flexDirection:'row', alignItems:"center", gap:10}}>
                                    <LikeIcon/>
                                    <Text style={[styles.smallText,{color:Бирюзовый50}]}>Пригласить</Text>
                                </TouchableOpacity>
                            </View>
                        </View> */}
                    </KeyboardAvoidingView>
                </View>
                <ModalWarning ref={warning}/>
            </MainLayout>
        </ImageBackground>
    )
}