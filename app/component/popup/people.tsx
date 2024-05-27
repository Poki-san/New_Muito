import { Animated, Image, ImageBackground, KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { height, statusBarHeight, width, Белый, Бирюзовый, Бирюзовый50 } from '../../GLOBAL';
import { BlurView } from 'expo-blur';
import { CloseIcon, HeartMenuIcon, ModalCloseIcon, RegInstaIcon, TGIcon } from '../svg/svg';
import { styles } from '../../styles';
import GestureRecognizer from 'react-native-swipe-gestures';
import Carousel from 'react-native-reanimated-carousel';
import { useState } from 'react';
import { TagBlock } from '../ui/tag_block';
import { MainLayout } from '../layouts/MainLayout';
 
export function PeopleModal(props:{visible?: boolean, onRequestClose?: () => void, onBarcodeScanned?: (code?:string) => void}) {
    const [index, setIndex] = useState(0) 
    const [more, setMore] =useState(false)
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
                            <Animated.View style={{height:'100%', backgroundColor:'#17171A'}}>
                                <View style={styles.containerWomanBlock}>
                                    <View>
                                        <View style={{marginTop:statusBarHeight+10, flexDirection:"row"}}>
                                            <View style={{flexDirection:'row', width:"100%", justifyContent:"space-between", alignItems:'center'}}>
                                                <View style={{flexDirection:"row", alignItems:"center", gap:8, marginLeft:16}}>
                                                    <BlurView intensity={75} style={{flexDirection:"row", padding:10, overflow:"hidden", borderRadius:16, alignItems:'center', gap:4}} tint='systemChromeMaterialDark'>
                                                        <HeartMenuIcon color={Бирюзовый}/>
                                                        <Text style={[styles.h4,{color:Белый}]}>5.0</Text>
                                                    </BlurView>
                                                </View>
                                                <TouchableOpacity activeOpacity={0.7} onPress={props.onRequestClose}>
                                                    <BlurView intensity={75} style={{padding:8, overflow:"hidden", borderRadius:16, alignItems:'center', gap:4, marginRight:16}} tint='systemChromeMaterialDark'>
                                                        <CloseIcon color={Бирюзовый}/>
                                                    </BlurView>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{margin:16}}>
                                            <View style={{width:'100%', flexDirection:"row", gap:4,height:2}}>
                                                {[0,1,2].map((el,i)=><View key={i} style={{backgroundColor:index == i ? '#FFFFFF' : '#FFFFFF66', flex:1, height:2}}/>)}
                                            </View>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={{
                                            backgroundColor: Бирюзовый50,
                                            paddingVertical: 10,
                                            paddingHorizontal: 12,
                                            zIndex: 999,
                                            borderRadius: 16,
                                            alignSelf: 'center',
                                            marginBottom:8
                                            }}>
                                            <Text style={[styles.bodyText, {color: 'black', textAlign:"center"}]}>Участница приглашена на мероприятие</Text>
                                        </View>
                                        <Animated.View style={{maxHeight:more ? HeightAnimTwo : HeightAnim, width:'100%', borderBottomRightRadius:16, borderBottomLeftRadius:16}}>
                                            <GestureRecognizer onSwipeDown={()=>{
                                                if (more) {
                                                    AnimatedStepOne()
                                                }
                                            }} onSwipeUp={()=>{                                            
                                                if (!more) {
                                                    AnimatedStepOne()
                                                }
                                            }}>
                                                <BlurView style={styles.blurLikeContainer} tint='systemChromeMaterialDark' intensity={50}>
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
                                </View>
                                <Carousel
                                    data={[0,1,2]}
                                    width={width}
                                    loop={[0,1,2]?.length > 1 ? true : false }
                                    height={height-statusBarHeight}
                                    defaultIndex={index}
                                    onSnapToItem={setIndex}
                                    style={{zIndex:9999, borderBottomLeftRadius:20, pointerEvents:'box-only', borderBottomRightRadius:20, position:"relative"}}
                                    renderItem={({item})=>(
                                        <Image style={{width:width, borderBottomLeftRadius:20, borderBottomRightRadius:20, height:'100%'}} resizeMode='cover' source={require('../../../assets/image/people.jpg')}/>
                                    )}
                                />
                            </Animated.View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </Modal>
            </MainLayout>
        </ImageBackground>
    )
}