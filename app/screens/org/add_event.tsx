import { Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ButtonMy, MainLayout } from '../../component';
import { height, statusBarHeight, width, Бирюзовый } from '../../GLOBAL';
import { styles } from '../../styles';
import { BlurView } from 'expo-blur';
import { EditIcon, PlusIcon, TrashIcon } from '../../component/svg/svg';
import { useState } from 'react';
import { navigate } from '../../functions/navigate';
 
export function AddEventScreen() {
    const [tag, setTag] = useState(0)
    return ( 
        <ImageBackground style={{width:width, height:height}} source={require('../../../assets/image/back.png')}>
            <MainLayout isStatusBar>
                <TouchableOpacity activeOpacity={0.7} style={{position:"absolute", alignItems:"center", justifyContent:"center", width:55, height:55, borderRadius:180, backgroundColor:Бирюзовый, bottom:75, zIndex:999, right:16}}>
                    <PlusIcon/>
                </TouchableOpacity>
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
                                paddingHorizontal:24,
                                paddingVertical:10,
                                alignItems:"center",
                                justifyContent:'center',
                                width:'50%',
                                backgroundColor:tag==0 ? '#374A4E' : '#374A4E00',
                                borderRadius:16
                            }}>
                                <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Опубликованные <Text style={{color:'#FFFFFF80'}}>5</Text></Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>setTag(1)} style={{
                                paddingHorizontal:24,
                                paddingVertical:10,
                                alignItems:"center",
                                justifyContent:'center',
                                width:'50%',
                                backgroundColor:tag==1 ? '#374A4E' : '#374A4E00',
                                borderRadius:16
                            }}>
                                <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Черновики <Text style={{color:'#FFFFFF80'}}>2</Text></Text>
                            </TouchableOpacity>
                        </BlurView>
                        <View style={{marginHorizontal:16, flex:1, gap:8, marginBottom:80}}>
                            {[1,2,3,4,5].map((el,i)=><BlurView key={i} intensity={75} tint='systemChromeMaterialDark' style={{borderRadius:16, overflow:"hidden", borderWidth:1, borderColor:'#FFFFFF99', padding:8, flexDirection:"row",gap:10}}>
                                <View>
                                    <Image source={require('../../../assets/image/event.jpg')} style={{width:72, height:72, borderRadius:16}}/>
                                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginTop:8}}>
                                        <View style={{width:33, height:33, borderRadius:180, backgroundColor:'#4D000190', alignItems:"center", justifyContent:"center"}}>
                                            <TrashIcon/>
                                        </View>
                                        <View style={{width:33, height:33, borderRadius:180, backgroundColor:'#374A4E90', alignItems:"center", justifyContent:"center"}}>
                                            <EditIcon/>
                                        </View>
                                    </View>
                                </View>
                                <View style={{flex:1, justifyContent:"space-between",gap:6}}>
                                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                                        <Text style={[styles.smallText,{color:'white'}]}>18:00</Text>
                                        <Text style={[styles.smallText,{color:'white'}]}>10 <Text style={{fontSize:10}}>авг.</Text></Text>
                                    </View>
                                   
                                    <Text style={[styles.h4,{color:'white', flex:1}]}>Название вечеринки Paty Dens Nou</Text>
                                    {tag == 0 && <ButtonMy text='25 заявок' disabled={false} onPress={()=>navigate('EventPeople')} backgroundColor='#88FFF900' colorText='#FFF' borderColor='#88FFF9'/>}
                                    {tag == 1 && <ButtonMy text='Опубликовать' disabled={false} onPress={()=>{}} backgroundColor='#88FFF900' colorText='#FFF' borderColor='#88FFF9'/>}
                                </View>
                            </BlurView>)}
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </MainLayout>
        </ImageBackground>
    )
}