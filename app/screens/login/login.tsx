import { ImageBackground, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ButtonMy, Input, MainLayout } from '../../component';
import { height, statusBarHeight, width } from '../../GLOBAL';
import { BlurView } from 'expo-blur';
import { styles } from '../../styles';
import { ModalRecovery } from '../../component/popup/recoveryPass';
import { useRef, useState } from 'react';
import RBSheet from '@poki_san/react-native-bottom-sheet';
import { navigate } from '../../functions/navigate';
import { LogoIcon } from '../../component/svg/svg';
import { Formik } from 'formik';
import * as yup from 'yup'
import apiFetch from '../../functions/api';
import error from '../../model/error';
import { save } from '../../functions/storage';
import token from '../../model/token';
import { handlerDevicesSubscribe, registerForPushNotificationsAsync } from '../../functions/auth';
import { CommonActions } from '@react-navigation/native';
import { navigationRef } from '../../navigate/navigateProps';

const validationsSchemaLogin = yup.object().shape({
    email: yup.string().email('Не верный формат').required('Поле не может быть пустым'),
    password: yup.string().min(8, 'не менее 8').typeError('Введите верный пароль').required('Поле не может быть пустым')
})

export function LoginScreen() {
    const recovery = useRef<RBSheet>()
    const [register, setRegister] = useState(false)
    
    return ( 
        <ImageBackground style={{width:width, height:height, flex:1}} source={require('../../../assets/image/back.png')}>
            <MainLayout isStatusBar>
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : 'height'}
                    keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                    style={{ flex: 1, marginHorizontal:16, marginVertical:10 }}
                >
                    <ScrollView keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false} style={{flexGrow:1}} contentContainerStyle={{flexGrow:1, justifyContent:"space-between"}}>
                        <View style={{gap:10, marginBottom:15, marginTop:statusBarHeight+7, alignItems:"center"}}>
                            <LogoIcon/>
                        </View>
                        <View style={{gap:24, paddingBottom:19}}>

                            {/* Проверка (Вход или Регистрация) включина */}
                            {!register ? 
                                <Formik
                                    initialValues={{
                                        email: '',
                                        password: '',
                                    }}
                                    validateOnBlur
                                    onSubmit={async(values) => {
                                        Keyboard.dismiss()
                                        const value = await apiFetch('/login',"POST",false,values)

                                        //Проверка на статус ответа сервера
                                        switch (value?.status) {
                                            case 200:
                                            case 201:
                                            case 202:
                                                //Проверка на тип пользователя
                                                console.log(value?.user?.type);
                                                
                                                switch (value?.user?.type) {
                                                    case "organizer":
                                                        token.userInput(value?.user, value?.token)
                                                        save('@userData',value)
                                                        registerForPushNotificationsAsync().then(token => {
                                                            !!token && !!value?.token && handlerDevicesSubscribe(value?.token, token)
                                                        });
                                                        const bottomReset = CommonActions.reset({
                                                            index: 0,
                                                            routes: [{name: "Main"}],
                                                          });
                                                        navigationRef.current?.dispatch(bottomReset)
                                                        break;
                                                    case "guest":
                                                        token.userInput(value?.user, value?.token)
                                                        if (value?.user?.active == 1) {
                                                            save('@userData',value)
                                                            registerForPushNotificationsAsync().then(token => {
                                                                !!token && !!value?.token && handlerDevicesSubscribe(value?.token, token)
                                                            });
                                                            const bottomReset = CommonActions.reset({
                                                                index: 0,
                                                                routes: [{name: "MainGuest"}],
                                                              });
                                                            navigationRef.current?.dispatch(bottomReset)
                                                            // navigate("MainGuest")
                                                        } else {
                                                            navigate("Verf")
                                                        }
                                                        break;
                                                    default:
                                                        error.Input(true, 'Что-то пошло не так!', 'Упс!...', Platform.OS=='ios'?175:145)
                                                        break;
                                                }
                                                //Конец - Проверка на тип пользователя

                                                break;
                                            case 422:
                                                setTimeout(() => error.Input(true, 'Неверный логин или пароль', 'Что-то пошло не так!', Platform.OS=='ios'?175:145), 500);
                                                break;
                                            default:
                                                error.Input(true, 'Что-то пошло не так!', 'Упс!...', Platform.OS=='ios'?175:145)
                                                break;
                                        }
                                        //Конец - Проверка на статус ответа сервера

                                    }}
                                    validationSchema={validationsSchemaLogin}
                                >
                                    {({handleSubmit, values, handleBlur, handleChange, errors, touched})=>(
                                    <BlurView  intensity={30} tint='systemChromeMaterialDark' style={styles.blurContainer}>
                                        <Text style={{color:'white', fontWeight:'700', fontSize:18, textAlign:'center', fontFamily:'PoppinsBold'}}>Вход</Text>
                                        <View style={{gap:8}}>
                                            <Input 
                                                backgroundColor='#FFFFFF00' 
                                                errorText={errors.email} 
                                                touched={touched.email} 
                                                placeholderTextColor={'#FFFFFF99'} 
                                                keyboardType='email-address'
                                                onBlur={handleBlur('email')}
                                                title='Логин' 
                                                value={values.email}
                                                onChangeText={handleChange('email')}
                                                style={{borderWidth:1, borderColor:(!!errors.email && touched.email)?'#FF000086':'#FFFFFF99'}}
                                            />
                                            <Input 
                                                backgroundColor='#FFFFFF00' 
                                                placeholderTextColor={'#FFFFFF99'} 
                                                title='Пароль' 
                                                value={values.password}
                                                onBlur={handleBlur('password')}
                                                onChangeText={handleChange('password')}
                                                securePass 
                                                style={{borderWidth:1, borderColor:(!!errors.password && touched.password)?'#FF000086':'#FFFFFF99'}}
                                                errorText={errors.password} 
                                                touched={touched.password}
                                            />
                                            <TouchableOpacity activeOpacity={0.7} onPress={()=>recovery.current?.open()}>
                                                <Text style={{fontSize:12, color:'#88FFF966', textAlign:"right"}}>Забыли пароль?</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <ButtonMy text='Войти' onPress={handleSubmit} backgroundColor='#88FFF9' colorText='#171717'/>
                                    </BlurView>)}
                                </Formik>
                                :
                                <BlurView  intensity={30} tint='systemChromeMaterialDark' style={styles.blurContainer}>
                                    <Text style={{color:'white', fontWeight:'700', fontSize:18, textAlign:'center', fontFamily:'PoppinsBold'}}>Регистрация</Text>
                                    <Text style={{color:'white', opacity:0.6, fontWeight:'500', fontSize:14, textAlign:'center', fontFamily:'PoppinsMedium'}}>Выберите как хотите пользоваться приложением</Text>
                                    <ButtonMy text='Участница' onPress={()=>navigate('RegisterWelcome',{type:'guest'})} backgroundColor='#88FFF900' colorText='#FFFFFF' borderWidth={1} borderColor='#FFFFFF80'/>
                                    <ButtonMy text='Организатор' onPress={()=>navigate('RegisterWelcome',{type:'org'})} backgroundColor='#88FFF900' colorText='#FFFFFF' borderWidth={1} borderColor='#FFFFFF80'/>
                                </BlurView>
                            }
                            {/* Конец - Проверка (Вход или Регистрация) включина */}

                            <View style={{gap:10, alignItems:"center"}}>
                                <Text style={{color:'white', fontWeight:'500', opacity:0.6}}>{!register?'Нет аккаута':'Уже есть аккаунт?'}</Text>
                                <TouchableOpacity activeOpacity={0.7} onPress={()=>setRegister(!register)}>
                                    <Text style={{color:'white', fontWeight:'700', fontFamily:'PoppinsBold', fontSize:16}}>{!register?'Регистрация':'Вход'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </MainLayout>
            <ModalRecovery ref={recovery}/>
        </ImageBackground>
    )
}