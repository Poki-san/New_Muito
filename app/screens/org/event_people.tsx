import { Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MainLayout, PeopleItem } from '../../component';
import { height, statusBarHeight, width } from '../../GLOBAL';
import { styles } from '../../styles';
import { BlurView } from 'expo-blur';
import { useState } from 'react';
import { BackArrowIcon } from '../../component/svg/svg';
import { goBack } from '../../functions/navigate';
 
export function EventPeopleScreen() {
    const [tag, setTag] = useState(0)
    return ( 
        <ImageBackground style={{width:width, height:height}} source={require('../../../assets/image/back.png')}>
            <MainLayout isStatusBar>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1}}>
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
                        <BlurView experimentalBlurMethod='dimezisBlurView' intensity={75} tint='systemChromeMaterialDark' style={styles.blurTagEventContainer}>
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>setTag(0)} style={[styles.tagEventContainer, {
                                backgroundColor:tag==0 ? '#374A4E' : '#374A4E00'
                            }]}>
                                <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Новые <Text style={{color:'#FFFFFF80'}}>5</Text></Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>setTag(1)} style={[styles.tagEventContainer, {
                                backgroundColor:tag==1 ? '#374A4E' : '#374A4E00'
                            }]}>
                                <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Отклоненные <Text style={{color:'#FFFFFF80'}}>4</Text></Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>setTag(2)} style={[styles.tagEventContainer, {
                                backgroundColor:tag==2 ? '#374A4E' : '#374A4E00'
                            }]}>
                                <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Принятые <Text style={{color:'#FFFFFF80'}}>2</Text></Text>
                            </TouchableOpacity>
                        </BlurView>
                        <View style={{alignItems:"center", marginBottom:Platform.OS == 'ios' ? 20:0}}>
                            <View style={styles.eventPeopleImgContainer}>
                                {[1,2,3,4,5].map((el,i)=><PeopleItem key={i}/>)}
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </MainLayout>
        </ImageBackground>
    )
}