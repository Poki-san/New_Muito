import { Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { EventItem, MainLayout } from '../../component';
import { height, statusBarHeight, width, Бирюзовый } from '../../GLOBAL';
import { styles } from '../../styles';
import { BlurView } from 'expo-blur';
import { PlusIcon } from '../../component/svg/svg';
import { useState } from 'react';
import { navigate } from '../../functions/navigate';
 
export function AddEventCatalogScreen() {
    const [tag, setTag] = useState(0)
    const [events, setEvents] = useState([1,2,3,4,5])
    return ( 
        <ImageBackground style={{width:width, height:height}} source={require('../../../assets/image/back.png')}>
            <MainLayout isStatusBar>
                {events.length != 0 && <TouchableOpacity activeOpacity={0.7} onPress={()=>navigate('AddEvent')} style={styles.addEventContainer}>
                    <PlusIcon/>
                </TouchableOpacity>}
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1}}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : 'height'}
                        keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                        style={{ flex: 1 }}
                    >
                        <View style={{marginTop:statusBarHeight+16, marginBottom:16}}>
                            <View style={{marginHorizontal:16, marginBottom:16}}>
                                <Text style={[styles.h4, {color:'white'}]}>Мои эвенты</Text>
                            </View>
                            <Image source={require('../../../assets/image/line.png')} style={{height:1}}/>
                        </View>
                        {events.length == 0 ?
                        <BlurView experimentalBlurMethod='dimezisBlurView' intensity={75} tint='systemChromeMaterialDark'  style={{borderRadius:16, overflow:"hidden", borderWidth:1, borderColor:'#374A4E99', marginHorizontal:16, flex:1, marginBottom:80, justifyContent:"center", alignItems:"center", gap:15}}>
                            <Text style={[styles.h3,{fontSize:20, color:"white"}]}>У вас нет мероприятий</Text>
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>navigate('AddEvent')} style={{width:60, height:60, borderRadius:90, backgroundColor:Бирюзовый, justifyContent:"center", alignItems:"center"}}>
                                <PlusIcon/>
                            </TouchableOpacity>
                        </BlurView> 
                        : 
                        <><BlurView experimentalBlurMethod='dimezisBlurView' intensity={75} tint='systemChromeMaterialDark'  style={{borderRadius:16, overflow:"hidden", borderWidth:1, borderColor:'#374A4E99', flexDirection:"row", justifyContent:'space-between', alignItems:"center", marginHorizontal:16, marginBottom:16}}>
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
                            {events.map((el,i)=><EventItem key={i} tag={tag}/>)}
                        </View></>}
                    </KeyboardAvoidingView>
                </ScrollView>
            </MainLayout>
        </ImageBackground>
    )
}