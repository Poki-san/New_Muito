import { Animated, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MainLayout,ModalWarning,TagBlock } from '../../component';
import { height, statusBarHeight, width, Белый, Бирюзовый, Бирюзовый50 } from '../../GLOBAL';
import { useRef, useState } from 'react';
import { BlurView } from 'expo-blur';
import { AlertIcon, BackArrowIcon, CloseEyeIcon, CloseIcon, HeartMenuIcon, LikeIcon, ModalCloseIcon, RegInstaIcon, SettingIcon, TGIcon } from '../../component/svg/svg';
import { styles } from '../../styles';
import GestureRecognizer from 'react-native-swipe-gestures';
import Carousel from 'react-native-reanimated-carousel';
import { showToastable } from 'react-native-toastable';
import { goBack } from '../../functions/navigate';
import RBSheet from '@nonam4/react-native-bottom-sheet';
 
export function PeopleScreen() {
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
    return ( 
        <ImageBackground style={{width:width, height:height}} source={require('../../../assets/image/back.png')}>
            <MainLayout isStatusBar>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1}}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : 'height'}
                        keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                        style={{ flex: 1 }}
                    >
                        <Animated.View style={{height:'87%', backgroundColor:'#17171A'}}>
                            <View style={styles.containerWomanBlock}>
                            {alert &&<View onTouchStart={()=>setAlert(false)} style={{position:"absolute", top:0, left:0, width:width*2, height:height*2, zIndex:1}} />}
                                <View>
                                    <View style={{marginTop:statusBarHeight+10, flexDirection:"row"}}>
                                        <View style={{flexDirection:'row', width:"100%", justifyContent:"space-between", alignItems:'center'}}>
                                            <View style={{flexDirection:"row", alignItems:"center", gap:8, marginLeft:16}}>
                                                <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
                                                    <BlurView intensity={50} tint='systemChromeMaterialDark' experimentalBlurMethod='dimezisBlurView' style={styles.backArrowContainer}>
                                                        <BackArrowIcon/>
                                                    </BlurView>
                                                </TouchableOpacity>
                                                <BlurView intensity={75} experimentalBlurMethod='dimezisBlurView' style={{flexDirection:"row", padding:10, overflow:"hidden", borderRadius:16, alignItems:'center', gap:4}} tint='systemChromeMaterialDark'>
                                                    <HeartMenuIcon color={Бирюзовый}/>
                                                    <Text style={[styles.h4,{color:Белый}]}>5.0</Text>
                                                </BlurView>
                                            </View>
                                            <TouchableOpacity activeOpacity={0.7} onPress={()=>setAlert(!alert)}>
                                                <BlurView intensity={75} experimentalBlurMethod='dimezisBlurView' style={{padding:3, overflow:"hidden", borderRadius:16, alignItems:'center', gap:4, marginRight:16}} tint='systemChromeMaterialDark'>
                                                    <SettingIcon color={Бирюзовый}/>
                                                </BlurView>
                                            </TouchableOpacity>
                                            {alert && <View style={styles.alertContainer}>
                                                <TouchableOpacity onPress={()=>warning.current?.open()} activeOpacity={0.7} style={{flexDirection:"row", gap:7, alignItems:"center"}}>
                                                    <AlertIcon/>
                                                    <Text style={[styles.bodyText,{color:'#BC1115'}]}>Пожаловаться</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity activeOpacity={0.7} style={{flexDirection:"row", gap:7, alignItems:"center"}}>
                                                    <CloseEyeIcon/>
                                                    <Text style={[styles.bodyText,{color:'white'}]}>Больше не показывать</Text>
                                                </TouchableOpacity>
                                            </View>}
                                        </View>
                                    </View>
                                    <View style={{margin:16}}>
                                        <View style={{width:'100%', flexDirection:"row", gap:4,height:2}}>
                                            {[0,1,2].map((el,i)=><View key={i} style={{backgroundColor:index == i ? '#FFFFFF' : '#FFFFFF66', flex:1, height:2}}/>)}
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
                                        <BlurView style={styles.blurLikeContainer} tint='systemChromeMaterialDark' intensity={40} experimentalBlurMethod='dimezisBlurView'>
                                            <TouchableOpacity activeOpacity={0.7} onPress={()=>AnimatedStepOne()} style={{width:"100%",alignItems:"center"}}>
                                                <Animated.View style={{transform:[{rotate:more ? Rotate : RotateTwo}], alignItems:"flex-start"}}><ModalCloseIcon/></Animated.View>
                                            </TouchableOpacity>
                                            <Text style={[styles.h1,{fontSize:34, color:'white', paddingTop:6}]}>Виктория <Text style={{color:'#FFFFFF80'}}>25</Text></Text>
                                            <View style={styles.womanInfoContainer}>
                                                <View style={{flexDirection:'row', alignItems:'flex-end', gap:14}}>
                                                    <View style={{flexDirection:'row', alignItems:'flex-end', gap:4}}>
                                                        <Text style={[styles.bodyText,{fontSize:18, color:'white', paddingTop:4}]}>172</Text>
                                                        <Text style={[styles.smallText,{color:'#FFFFFF99'}]}>Рост</Text>
                                                    </View>
                                                    <View style={{flexDirection:'row', alignItems:'flex-end', gap:4}}>
                                                        <Text style={[styles.bodyText,{fontSize:18, color:'white', paddingTop:4}]}>55</Text>
                                                        <Text style={[styles.smallText,{color:'#FFFFFF99'}]}>Вес</Text>
                                                    </View>
                                                </View>
                                                <View style={{flexDirection:'row', alignItems:'flex-end', gap:11}}>
                                                    <TouchableOpacity activeOpacity={0.7} style={{alignItems:'center'}}>
                                                        <Text style={[styles.smallText,{fontFamily:'PoppinsSemiBold', color:Бирюзовый50}]}>100К</Text>
                                                        <RegInstaIcon/>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity activeOpacity={0.7} style={{alignItems:'center', pointerEvents:"box-only"}}>
                                                        <TGIcon/>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={styles.tagContainerBlock}>
                                                <TagBlock text='Клубы'/>
                                                <TagBlock text='Фильмы'/>
                                                <TagBlock text='Фигурное катание'/>
                                                <TagBlock text='Фигурное катание'/>
                                                <TagBlock text='Экстрим'/>
                                            </View>
                                            <Text style={[styles.bodyText,{color:"white"}]}>Я обожаю моду, и всегда следую последним тенденциям. Моя внешность отличается смелостью и индивидуальностью, и я стремлюсь делать карьеру в мире моды. Я готова к новым вызовам и возможностям, и ищу возможность реализовать себя. Люблю шумные тусовки, громкую музыку и грандиозные шоу.</Text>
                                        </BlurView>
                                    </GestureRecognizer>
                                </Animated.View>
                            </View>
                            <Carousel
                                data={[0,1,2]}
                                width={width}
                                loop={[0,1,2]?.length > 1 ? true : false }
                                height={height*0.87}
                                defaultIndex={index}
                                onSnapToItem={setIndex}
                                style={{zIndex:9999, borderBottomLeftRadius:20, borderBottomRightRadius:20, position:"relative"}}
                                renderItem={({item})=>(
                                    <Image style={{width:width, height:'100%'}} resizeMode='cover' source={require('../../../assets/image/people.jpg')}/>
                                )}
                            />
                        </Animated.View>
                        <View style={{height:'13%', backgroundColor:'#17171A'}}>
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
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                <ModalWarning ref={warning}/>
            </MainLayout>
        </ImageBackground>
    )
}