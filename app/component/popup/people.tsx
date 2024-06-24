import { Animated, Image, ImageBackground, KeyboardAvoidingView, Linking, Modal, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { height, statusBarHeight, width, Белый, Бирюзовый, Бирюзовый50 } from '../../GLOBAL';
import { BlurView } from 'expo-blur';
import { CloseIcon, HeartMenuIcon, ModalCloseIcon, RegInstaIcon, TGIcon } from '../svg/svg';
import { styles } from '../../styles';
import GestureRecognizer from 'react-native-swipe-gestures';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useRef, useState } from 'react';
import { TagBlock } from '../ui/tag_block';
import { MainLayout } from '../layouts/MainLayout';
import { LikeItem } from '../ui/likeItem';
 
export function PeopleModal(props:{visible?: boolean, data?:{}, onRequestClose?: () => void, onBarcodeScanned?: (code?:string) => void}) {
    const [index, setIndex] = useState(0) 
    const [more, setMore] =useState(false)
    const animHeight = new Animated.Value(0)
    const animRotate = new Animated.Value(0)
    const refSlider = useRef<ICarouselInstance>(null)
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

    // console.log(props.data?.user);
    

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
    
    return ( 
        <ImageBackground style={{width:width, height:'100%'}} source={require('../../../assets/image/back.png')}>
            <MainLayout isStatusBar>
                <Modal visible={props.visible} onRequestClose={props.onRequestClose}>
                    <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1}}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : 'height'}
                            keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                            style={{ flex: 1 }}
                        >
                            <View style={{zIndex:3, height:'100%', flex:1}}>
                                <Animated.View style={{transform:[{translateX:0}], height:'100%',  backgroundColor:'#17171A'}}>
                                    
                                <View style={styles.containerWomanBlock}>
                                        <View>
                                            <View style={{marginTop:statusBarHeight+10, flexDirection:"row"}}>
                                                <View style={{flexDirection:'row', width:"100%", justifyContent:"space-between", alignItems:'center'}}>
                                                    <BlurView intensity={75}  style={{flexDirection:"row", padding:10,
                                                    overflow:"hidden", borderRadius:16, alignItems:'center', gap:4, marginLeft:16}} tint='systemChromeMaterialDark'>
                                                        <HeartMenuIcon color={Бирюзовый}/>
                                                        <Text style={[styles.h4,{color:Белый}]}>{props.data?.user?.rating}</Text>
                                                    </BlurView>
                                                    <TouchableOpacity activeOpacity={0.7} onPress={props.onRequestClose}>
                                                        <BlurView intensity={75} style={{padding:8, overflow:"hidden", borderRadius:16, alignItems:'center', gap:4, marginRight:16}} tint='systemChromeMaterialDark'>
                                                            <CloseIcon color={Бирюзовый}/>
                                                        </BlurView>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={{margin:16}}>
                                                <View style={{width:'100%', flexDirection:"row", gap:4,height:2}}>
                                                    {props.data?.user?.img.map((el,i)=><View key={i} style={{backgroundColor:index == i ? '#FFFFFF' : '#FFFFFF66', flex:1, height:2}}/>)}
                                                </View>
                                            </View>
                                        </View>
                                        <Animated.View style={{maxHeight:more ? HeightAnimTwo : HeightAnim, borderBottomRightRadius:16, borderBottomLeftRadius:16, overflow:'hidden'}}>
                                            <GestureRecognizer onSwipeDown={()=>{
                                                if (more) {
                                                    AnimatedStepOne()
                                                }
                                            }} onSwipeUp={()=>{
                                                if (!more) {
                                                    AnimatedStepOne()
                                                }
                                            }}>
                                                <BlurView style={styles.blurLikeContainer} tint='systemChromeMaterialDark' intensity={Platform.OS=='android'? 100:40} >
                                                    <TouchableOpacity activeOpacity={0.7} onPress={()=>AnimatedStepOne()} style={{width:"100%",alignItems:"center"}}>
                                                        <Animated.View style={{transform:[{rotate:more ? Rotate : RotateTwo}], alignItems:"flex-start"}}><ModalCloseIcon/></Animated.View>
                                                    </TouchableOpacity>
                                                    <Text style={[styles.h1,{fontSize:34, color:'white', paddingTop:6}]}>{props.data?.user?.name} <Text style={{color:'#FFFFFF80'}}>{props.data?.user?.age}</Text></Text>
                                                    <View style={styles.womanInfoContainer}>
                                                        <View style={{flexDirection:'row', alignItems:'flex-end', gap:14}}>
                                                            {props.data?.user?.growth && <View style={{flexDirection:'row', alignItems:'flex-end', gap:4}}>
                                                                <Text style={[styles.bodyText,{fontSize:18, color:'white', paddingTop:4}]}>{props.data?.user?.growth}</Text>
                                                                <Text style={[styles.smallText,{color:'#FFFFFF99'}]}>Рост</Text>
                                                            </View>}
                                                            {props.data?.user?.weight && <View style={{flexDirection:'row', alignItems:'flex-end', gap:4}}>
                                                                <Text style={[styles.bodyText,{fontSize:18, color:'white', paddingTop:4}]}>{props.data?.user?.weight}</Text>
                                                                <Text style={[styles.smallText,{color:'#FFFFFF99'}]}>Вес</Text>
                                                            </View>}
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
                                                    <ScrollView style={{maxHeight:341}} showsVerticalScrollIndicator={false}>
                                                        <View style={styles.tagContainerBlock}>
                                                            {props.data?.user?.hashtags && props.data?.user?.hashtags?.map((el,i)=><TagBlock text={el?.label} key={i}/>)}
                                                        </View>
                                                        <Text style={[styles.bodyText,{color:"white"}]}>{props.data?.user?.description}</Text>
                                                    </ScrollView>
                                                </BlurView>
                                            </GestureRecognizer>
                                        </Animated.View>
                                    </View>

                                    <Carousel
                                        data={props.data?.user?.img}
                                        width={width}
                                        loop={props.data?.user?.img?.length > 1 ? true : false }
                                        height={height-statusBarHeight}
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
                        </KeyboardAvoidingView>
                    </ScrollView>
                    {Platform.OS=='ios'&&<View style={{height:30, backgroundColor:"#181818"}}/>}
                </Modal>
            </MainLayout>
        </ImageBackground>
    )
}