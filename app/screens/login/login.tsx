import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ButtonMy, Input, MainLayout } from '../../component';
import { height, statusBarHeight, width } from '../../GLOBAL';
import { BlurView } from 'expo-blur';
import { styles } from '../../styles';
import { ModalRecovery } from '../../component/popup/recoveryPass';
import { useRef, useState } from 'react';
import RBSheet from '@nonam4/react-native-bottom-sheet';
import { navigate } from '../../functions/navigate';
 
export function LoginScreen() {
    const recovery = useRef<RBSheet>()
    const [register, setRegister] = useState(false)
    return ( 
        <ImageBackground style={{width:width, height:height}} source={require('../../../assets/image/back.png')}>
            <MainLayout isStatusBar>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1, marginHorizontal:16, marginVertical:10}}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : 'height'}
                        keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                        style={{ flex: 1 }}
                    >
                        <View style={{gap:10,flex:1}}>
                            <Text style={{fontSize:60, fontWeight:'500', color:'#83FDF4', fontFamily:'OswaldMedium', textAlign:'center', marginTop:17}}>MUITO</Text>
                        </View>
                        <View style={{gap:24}}>
                            {!register ? 
                                <BlurView experimentalBlurMethod='dimezisBlurView' intensity={30} tint='systemChromeMaterialDark' style={styles.blurContainer}>
                                    <Text style={{color:'white', fontWeight:'700', fontSize:18, textAlign:'center', fontFamily:'PoppinsBold'}}>Вход</Text>
                                    <View style={{gap:8}}>
                                        <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Логин' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                                        <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Пароль' securePass style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                                        <TouchableOpacity activeOpacity={0.7} onPress={()=>recovery.current?.open()}>
                                            <Text style={{fontSize:12, color:'#88FFF966', textAlign:"right"}}>Забыли пароль?</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <ButtonMy text='Войти Организатор' onPress={()=>navigate('Main')} backgroundColor='#88FFF9' colorText='#171717'/>
                                    <ButtonMy text='Войти Гость' onPress={()=>navigate('MainGuest')} backgroundColor='#88FFF9' colorText='#171717'/>
                                </BlurView>
                                :
                                <BlurView experimentalBlurMethod='dimezisBlurView' intensity={30} tint='systemChromeMaterialDark' style={styles.blurContainer}>
                                    <Text style={{color:'white', fontWeight:'700', fontSize:18, textAlign:'center', fontFamily:'PoppinsBold'}}>Регистрация</Text>
                                    <Text style={{color:'white', opacity:0.6, fontWeight:'500', fontSize:14, textAlign:'center', fontFamily:'PoppinsMedium'}}>Выберите как хотите пользоваться приложением</Text>
                                    <ButtonMy text='Участница' onPress={()=>navigate('RegisterWelcome',{type:'guest'})} backgroundColor='#88FFF900' colorText='#FFFFFF' borderWidth={1} borderColor='#FFFFFF80'/>
                                    <ButtonMy text='Организатор' onPress={()=>navigate('RegisterWelcome',{type:'org'})} backgroundColor='#88FFF900' colorText='#FFFFFF' borderWidth={1} borderColor='#FFFFFF80'/>
                                </BlurView>
                            }
                            <View style={{gap:10, alignItems:"center"}}>
                                <Text style={{color:'white', fontWeight:'500', opacity:0.6}}>{!register?'Нет аккаута':'Уже есть аккаунт?'}</Text>
                                <TouchableOpacity activeOpacity={0.7} onPress={()=>setRegister(!register)}>
                                    <Text style={{color:'white', fontWeight:'700', fontFamily:'PoppinsBold', fontSize:16}}>{!register?'Регистрация':'Вход'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </MainLayout>
            <ModalRecovery ref={recovery}/>
        </ImageBackground>
    )
}
