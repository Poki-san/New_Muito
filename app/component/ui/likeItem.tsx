import { Animated, Image, ImageBackground, KeyboardAvoidingView, Linking, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MainLayout, ModalWarning, TagBlock } from '../../component';
import { URL, height, statusBarHeight, width, Белый, Бирюзовый, Бирюзовый50 } from '../../GLOBAL';
import { BlurView } from 'expo-blur';
import { AlertIcon, CloseEyeIcon, HeartMenuIcon, ModalCloseIcon, RegInstaIcon, SettingIcon, TGIcon } from '../../component/svg/svg';
import { styles } from '../../styles';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useEffect, useRef, useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import RBSheet from '@poki_san/react-native-bottom-sheet';
import apiFetch from '../../functions/api';
import error from '../../model/error';
 
export function LikeItem(props?:{data?:{}, onHidden?:()=>void}) {
    const [index, setIndex] = useState(0)  
    const [more, setMore] =useState(false)
    const refSlider = useRef<ICarouselInstance>(null)

    const warning = useRef<RBSheet>(null)
    const [alert, setAlert] =useState(false)
    const animHeight = new Animated.Value(0)
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
        setTimeout(() => setMore(!more), 410)
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
    }
    console.log(props.data?.user);
    
    return ( 
        <View style={{zIndex:3, height:'100%', flex:1}}>
            <Animated.View style={{transform:[{translateX:0}], height:'100%',  backgroundColor:'#17171A'}}>
                
            <View style={styles.containerWomanBlock}>
                    {alert &&<View onTouchStart={()=>setAlert(false)} style={{position:"absolute", top:0, left:0, width:width*2, height:height*2, zIndex:Platform.OS=="ios"?0:1}} />}
                    <View>
                        <View style={{marginTop:statusBarHeight+10, flexDirection:"row"}}>
                            <View style={{flexDirection:'row', width:"100%", justifyContent:"space-between", alignItems:'center'}}>
                                <BlurView intensity={75}  style={{flexDirection:"row", padding:10,
                                overflow:"hidden", borderRadius:16, alignItems:'center', gap:4, marginLeft:16}} tint='systemChromeMaterialDark'>
                                    <HeartMenuIcon color={Бирюзовый}/>
                                    <Text style={[styles.h4,{color:Белый}]}>{props.data?.user?.rating}</Text>
                                </BlurView>
                                <TouchableOpacity activeOpacity={0.7} onPress={()=>setAlert(!alert)}>
                                    <BlurView intensity={75}  style={[styles.blurSettingContainer,{marginRight:16}]} tint='systemChromeMaterialDark'>
                                        <SettingIcon color={Бирюзовый}/>
                                    </BlurView>
                                </TouchableOpacity>
                                {alert && <View style={styles.alertContainer}>
                                    <TouchableOpacity onPress={()=>warning.current?.open()} activeOpacity={0.7} style={{flexDirection:"row", gap:7, alignItems:"center"}}>
                                        <AlertIcon/>
                                        <Text style={[styles.bodyText,{color:'#BC1115'}]}>Пожаловаться</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.7} onPress={async()=>{
                                        const result = await apiFetch(`/users/hidden/${props.data?.user?.id}`,'POST',true)
                                        switch (result?.status) {
                                            case 200:
                                            case 201:
                                            case 202:
                                                props.onHidden()
                                                break;
                                        
                                            default:
                                                setTimeout(() => error.Input(true, 'Что-то пошло не так!', 'Упс!...', Platform.OS=='ios'?175:145), 300);
                                                break;
                                        }
                                    }} style={{flexDirection:"row", gap:7, alignItems:"center"}}>
                                        <CloseEyeIcon/>
                                        <Text style={[styles.bodyText,{color:'white'}]}>Больше не показывать</Text>
                                    </TouchableOpacity>
                                </View>}
                            </View>
                        </View>
                        <View style={{margin:16}}>
                            <View style={{width:'100%', flexDirection:"row", gap:4,height:2}}>
                                {props.data?.user?.img.map((el,i)=><View key={i} style={{backgroundColor:index == i ? '#FFFFFF' : '#FFFFFF66', flex:1, height:2}}/>)}
                            </View>
                        </View>
                    </View>
                    <Animated.View style={{maxHeight:more ? HeightAnimTwo : HeightAnim, borderBottomRightRadius:16, borderBottomLeftRadius:16, overflow:'hidden'}}>
                        
                        <BlurView style={styles.blurLikeContainer} tint='systemChromeMaterialDark' intensity={Platform.OS=='android'? 100:40} >
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
                                <Text style={[styles.h1,{fontSize:34, color:'white', paddingTop:6}]}>{props.data?.user?.name} <Text style={{color:'#FFFFFF80'}}>{props.data?.user?.age}</Text></Text>
                                <View style={styles.womanInfoContainer}>
                                    <View style={{flexDirection:'row', alignItems:'flex-end', gap:14}}>
                                        {props.data?.user?.growth&&<Text style={[styles.bodyText,{fontSize:18, color:'white', paddingTop:4}]}>{props.data?.user?.growth} <Text style={[styles.smallText,{color:'#FFFFFF99'}]}>Рост</Text></Text>}
                                        {props.data?.user?.weight && <Text style={[styles.bodyText,{fontSize:18, color:'white', paddingTop:4}]}>{props.data?.user?.weight} <Text style={[styles.smallText,{color:'#FFFFFF99'}]}>Вес</Text></Text>}
                                    </View>
                                    <View style={{flexDirection:'row', height:39, alignItems:'flex-end', gap:11}}>
                                        {props.data?.user?.instagram && <TouchableOpacity 
                                            activeOpacity={0.7} 
                                            style={{alignItems:'center'}}
                                            onPress={()=>{
                                                Linking.openURL('https://www.instagram.com/'+props.data?.user?.instagram?.replace('@',''))
                                            }}
                                        >
                                            {props.data?.user?.count_instagram && <Text style={[styles.smallText,{fontFamily:'PoppinsSemiBold', color:Бирюзовый50}]}>{props.data?.user?.count_instagram}</Text>}
                                            <RegInstaIcon/>
                                        </TouchableOpacity>}
                                        {props.data?.user?.telegram && <TouchableOpacity 
                                            activeOpacity={0.7} 
                                            style={{alignItems:'center', pointerEvents:"box-only"}}
                                            onPress={()=>{
                                                Linking.openURL('https://t.me/'+props.data?.user?.telegram?.replace('@',''))
                                            }}
                                        >
                                            <TGIcon/>
                                        </TouchableOpacity>}
                                    </View>
                                </View>
                            </GestureRecognizer>

                            <ScrollView style={{maxHeight:341}} showsVerticalScrollIndicator={false}>
                                <View style={styles.tagContainerBlock}>
                                    {props.data?.user?.hashtags && props.data?.user?.hashtags?.map((el,i)=><TagBlock text={el?.label} key={i}/>)}
                                </View>
                                <Text style={[styles.bodyText,{color:"white"}]}>{props.data?.user?.description}</Text>
                            </ScrollView>
                        </BlurView>
                    </Animated.View>
                </View>

                <Carousel
                    data={props.data?.user?.img}
                    width={width}
                    loop={props.data?.user?.img?.length > 1 ? true : false }
                    height={height*0.79-1}
                    ref={refSlider}
                    defaultIndex={index}
                    onSnapToItem={setIndex}
                    enabled={false}
                    style={styles.imageContainer}
                    renderItem={({item})=>(
                        <View>
                            <View onTouchEnd={()=> refSlider?.current?.prev()} style={{width:65, pointerEvents:"box-only", height:'100%', zIndex:999, top:0, left:0, position:"absolute"}}/>
                            <Image style={{width:width, height:'100%'}} resizeMode='cover' source={{uri:item?.uri}}/>
                            <View onTouchEnd={()=> refSlider?.current?.next()} style={{width:65, pointerEvents:"box-only", height:'100%', zIndex:999, top:0, right:0, position:"absolute"}}/>
                        </View>
                    )}
                />
            </Animated.View>
        </View>
    )
}