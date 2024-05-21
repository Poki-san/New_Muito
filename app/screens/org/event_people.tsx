import { Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ButtonMy, MainLayout } from '../../component';
import { height, statusBarHeight, width, Бирюзовый50 } from '../../GLOBAL';
import { styles } from '../../styles';
import { BlurView } from 'expo-blur';
import { EditIcon, RegInstaIcon, TrashIcon } from '../../component/svg/svg';
import { useState } from 'react';
import { navigate } from '../../functions/navigate';
 
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
                            <View style={{marginHorizontal:16, marginBottom:16}}>
                                <Text style={[styles.additional, {color:'white'}]}>Мои эвенты</Text>
                            </View>
                            <Image source={require('../../../assets/image/line.png')} style={{height:1}}/>
                        </View>
                        <BlurView intensity={75} tint='systemChromeMaterialDark' style={{borderRadius:16, overflow:"hidden", borderWidth:1, borderColor:'#374A4E99', flexDirection:"row", justifyContent:'space-between', alignItems:"center", marginHorizontal:16, marginBottom:16}}>
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>setTag(0)} style={{
                                paddingHorizontal:8,
                                paddingVertical:10,
                                alignItems:"center",
                                justifyContent:'center',
                                width:'33.3%',
                                backgroundColor:tag==0 ? '#374A4E' : '#374A4E00',
                                borderRadius:16
                            }}>
                                <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Новые <Text style={{color:'#FFFFFF80'}}>5</Text></Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>setTag(1)} style={{
                                paddingHorizontal:8,
                                paddingVertical:10,
                                alignItems:"center",
                                justifyContent:'center',
                                width:'33.3%',
                                backgroundColor:tag==1 ? '#374A4E' : '#374A4E00',
                                borderRadius:16
                            }}>
                                <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Отклоненные <Text style={{color:'#FFFFFF80'}}>4</Text></Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>setTag(2)} style={{
                                paddingHorizontal:8,
                                paddingVertical:10,
                                alignItems:"center",
                                justifyContent:'center',
                                width:'33.3%',
                                backgroundColor:tag==2 ? '#374A4E' : '#374A4E00',
                                borderRadius:16
                            }}>
                                <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Принятые <Text style={{color:'#FFFFFF80'}}>2</Text></Text>
                            </TouchableOpacity>
                        </BlurView>
                        <View style={{alignItems:"center"}}>
                            <View style={{width:width-32, gap:8, marginBottom:30, flexDirection:"row", justifyContent:'space-between', flexWrap:"wrap"}}>
                                {[1,2,3,4,5].map((el,i)=><TouchableOpacity key={i} onPress={()=>navigate('People')} activeOpacity={0.7}>  
                                    <ImageBackground style={{
                                        width:((width-32)/2.1),
                                        height:(((width-32)/2)/(167/203)),
                                        borderRadius:16,
                                        overflow:'hidden'
                                    }} source={require('../../../assets/image/people.jpg')}>
                                        <View style={{position:'absolute', top:8, right:8, backgroundColor:"#00000070", paddingHorizontal:7, paddingVertical:3, borderRadius:16, flexDirection:'row', alignItems:"center",gap:4}}>
                                            <Text style={[styles.smallText,{color:Бирюзовый50, fontFamily:"PoppinsSemiBold"}]}>100К</Text>
                                            <RegInstaIcon/>
                                        </View>
                                        <View style={{position:'absolute', bottom:8, left:8, backgroundColor:"#00000070", paddingHorizontal:11, paddingVertical:4, borderRadius:16, flexDirection:'row', alignItems:"center",gap:4}}>
                                            <Text style={[styles.bodyText,{color:'white'}]}>Виктория <Text style={{color:'#FFFFFF90'}}>25</Text></Text>
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>)}
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </MainLayout>
        </ImageBackground>
    )
}