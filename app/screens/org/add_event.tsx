import { Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { ButtonMy, MainLayout } from '../../component';
import { height, statusBarHeight, width } from '../../GLOBAL';
import { styles } from '../../styles';
import { BlurView } from 'expo-blur';
 
export function AddEventScreen() {
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
                        <View style={{marginHorizontal:16, flex:1, gap:8, marginBottom:80}}>
                            {[1,2,3,4,5].map((el,i)=><BlurView key={i} intensity={75} tint='systemChromeMaterialDark' style={{borderRadius:16, overflow:"hidden", borderWidth:1, borderColor:'#FFFFFF99', padding:8, flexDirection:"row",gap:10}}>
                                <View>
                                    <Image source={require('../../../assets/image/event.jpg')} style={{width:72, height:72, borderRadius:16}}/>
                                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginTop:8}}>
                                        <View style={{width:33, height:33, borderRadius:180, backgroundColor:'#4D000190'}}></View>
                                        <View style={{width:33, height:33, borderRadius:180, backgroundColor:'#374A4E90'}}></View>
                                    </View>
                                </View>
                                <View style={{flex:1, justifyContent:"space-between",gap:6}}>
                                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                                        <Text style={[styles.smallText,{color:'white'}]}>18:00</Text>
                                        <Text style={[styles.smallText,{color:'white'}]}>10 <Text style={{fontSize:10}}>авг.</Text></Text>
                                    </View>
                                   
                                    <Text style={[styles.h4,{color:'white', flex:1}]}>Название вечеринки Paty Dens Nou</Text>
                                    <ButtonMy text='25 заявок' disabled={false} onPress={()=>{}} backgroundColor='#88FFF900' colorText='#FFF' borderColor='#88FFF9'/>
                                </View>
                            </BlurView>)}
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </MainLayout>
        </ImageBackground>
    )
}