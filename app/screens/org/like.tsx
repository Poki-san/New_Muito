import { Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MainLayout } from '../../component';
import { height, statusBarHeight, width, Белый, Бирюзовый, Бирюзовый50 } from '../../GLOBAL';
import { BlurView } from 'expo-blur';
import { CloseIcon, HeartMenuIcon, LikeIcon, ModalCloseIcon, RegInstaIcon, SettingIcon, TGIcon } from '../../component/svg/svg';
import { styles } from '../../styles';
import Carousel from 'react-native-reanimated-carousel';
import { useState } from 'react';
 
export function LikeScreen() {
    const [index, setIndex] = useState(0)
    return ( 
        <ImageBackground style={{width:width, height:height}} source={require('../../../assets/image/back.png')}>
            <MainLayout isStatusBar>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1}}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : 'height'}
                        keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                        style={{ flex: 1 }}
                    >
                        <View style={{height:'78%',backgroundColor:'#17171A'}}>
                            <View style={{width:width, height:'100%', borderBottomLeftRadius:16, borderBottomRightRadius:16, position:"absolute", justifyContent:"space-between", top:0, zIndex:999, pointerEvents:'box-none'}}>
                                <View>
                                    <View style={{marginTop:statusBarHeight+10, flexDirection:"row"}}>
                                        <View style={{flexDirection:'row', width:"100%", justifyContent:"space-between", alignItems:'center'}}>
                                            <BlurView intensity={75} experimentalBlurMethod='dimezisBlurView' style={{flexDirection:"row", padding:10, overflow:"hidden", borderRadius:16, alignItems:'center', gap:4, marginLeft:16}} tint='systemChromeMaterialDark'>
                                                <HeartMenuIcon color={Бирюзовый}/>
                                                <Text style={[styles.h4,{color:Белый}]}>5.0</Text>
                                            </BlurView>
                                            <TouchableOpacity activeOpacity={0.7}>
                                                <BlurView intensity={75} experimentalBlurMethod='dimezisBlurView' style={{flexDirection:"row", padding:3, overflow:"hidden", borderRadius:16, alignItems:'center', gap:4, marginRight:16}} tint='systemChromeMaterialDark'>
                                                    <SettingIcon color={Бирюзовый}/>
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
                                <View style={{height:117}}>
                                    <BlurView style={{width:"100%", paddingHorizontal:16, borderRadius:16, overflow:'hidden'}} tint='systemChromeMaterialDark' intensity={40} experimentalBlurMethod='dimezisBlurView'>
                                        <View style={{width:"100%",alignItems:"center"}}>
                                            <View style={{transform:[{rotate:'180deg'}], alignItems:"flex-start"}}><ModalCloseIcon/></View>
                                        </View>
                                        <Text style={[styles.h1,{fontSize:34, color:'white', paddingTop:6}]}>Виктория <Text style={{color:'#FFFFFF80'}}>25</Text></Text>
                                        <View style={{flexDirection:'row', alignItems:'flex-end', paddingBottom:15, justifyContent:'space-between'}}>
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
                                    </BlurView>
                                </View>
                            </View>
                            <Carousel
                                data={[0,1,2]}
                                width={width}
                                loop={[0,1,2]?.length > 1 ? true : false }
                                height={height*0.78}
                                defaultIndex={index}
                                onSnapToItem={setIndex}
                                style={{zIndex:9999, borderBottomLeftRadius:20, borderBottomRightRadius:20, position:"relative"}}
                                renderItem={({item})=>(
                                    <Image style={{width:width, height:'100%'}} resizeMode='cover' source={require('../../../assets/image/people.jpg')}/>
                                )}
                            />
                        </View>
                        <View style={{height:'22%', backgroundColor:'#17171A'}}>
                            <View style={{marginHorizontal:16,  marginTop:13, flexDirection:"row", justifyContent:'space-evenly'}}>
                                <TouchableOpacity activeOpacity={0.7} style={{flexDirection:'row', alignItems:"center", gap:10}}>
                                    <Text style={[styles.smallText,{color:'#FFFFFF99'}]}>Отклонить</Text>
                                    <View style={{borderRadius:180, width:42, aspectRatio:1, backgroundColor:'#DFDFDF1A', alignItems:"center", justifyContent:"center"}}><CloseIcon/></View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.7} style={{flexDirection:'row', alignItems:"center", gap:10}}>
                                    <LikeIcon/>
                                    <Text style={[styles.smallText,{color:Бирюзовый50}]}>Пригласить</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </MainLayout>
        </ImageBackground>
    )
}