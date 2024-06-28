import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { forwardRef, useRef, useState } from 'react'
import RBSheet from '@poki_san/react-native-bottom-sheet';
import { ButtonMy } from "../ui/ButtonMy";
import { Input } from "../ui/input";
import { statusBarHeight, width, Белый50, Фон } from "../../GLOBAL";
import { styles } from "../../styles";
import { ModalCloseIcon } from "../svg/svg";
import { showToastable } from "react-native-toastable";
import apiFetch, { apiFetchString } from "../../functions/api";
import error from "../../model/error";
import token from "../../model/token";
import { Formik } from "formik";
import * as yup from 'yup'
import NetInfo from "@react-native-community/netinfo"
import { CommonActions } from "@react-navigation/native";
import { navigationRef } from "../../navigate/navigateProps";

/**
 * Модалка для восстановления пароля
 * @param ref для взаимодействия с модальным окном
 */
export const ModalRecovery = forwardRef((props:{},ref)=>{
    const code = useRef<RBSheet>()
    const [email, setEmail] = useState('')
    const [emailCode, setEmailCode] = useState('')
    return (
        <>
            <RBSheet
                ref={ref}
                height={Platform.OS=='ios'? 225:210}
                closeOnDragDown={true}
                onClose={()=>setEmail('')}
                // dragFromTopOnly
                closeOnPressMask={true} 
                customStyles={{
                    draggableIcon:{
                        backgroundColor:Белый50,
                        margin:0,
                        padding:0,
                        height:0,
                        borderTopRightRadius:0,
                        borderTopLeftRadius:0,
                    },
                    container: {
                        borderTopLeftRadius:20,
                        borderTopRightRadius:20,
                        paddingHorizontal:16,
                        backgroundColor:Фон
                    }
                }}>
                <ScrollView scrollEnabled={false} style={{flexGrow:1}} keyboardShouldPersistTaps='always'>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : undefined}
                        keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                        style={{ flex: 1 }}
                    >
                        <View style={{alignItems:"center", marginBottom:10}}><ModalCloseIcon/></View>
                        <View style={{gap:16}}>
                            <View style={{marginHorizontal:16}}>
                                <Text style={[styles.h4,{color:'white', textAlign:'center', fontSize:18}]}>Укажите email для восстановления пароля</Text>
                            </View>
                            <Input value={email} onChangeText={setEmail} backgroundColor={Фон} keyboardType='email-address' style={{borderWidth:1}} title='Email'/>
                            <ButtonMy text='Отправить' onPress={async()=>{
                                const value = await apiFetch('/email/send-code',"POST",false,{email:email})
                                switch (value?.status) {
                                    case 200:
                                        ref.current?.close()
                                        setTimeout(() => code.current.open(), 500);
                                        setEmailCode(email)
                                        break;
                                    default:
                                        ref.current?.close()
                                        setTimeout(() => error.Input(true, 'Что-то пошло не так!', 'Упс!...', Platform.OS=='ios'?175:145), 500);
                                        break;
                                }
                            }} backgroundColor='#88FFF9' colorText='#171717'/>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </RBSheet>
            <ModalRecoveryCode ref={code} email={emailCode}/>
        </>
    )
})


/**
 * Модалка для восстановления пароля
 * @param ref для взаимодействия с модальным окном
 */
export const ModalRecoveryCode = forwardRef((props:{email:string, onPress?:()=>void},ref)=>{
    const newPass = useRef<RBSheet>()
    const [code, setCode] = useState(['','','',''])
    const [err, setErr] = useState('')
    const [token, setToken] = useState('')
    const refInput = {
        one:useRef<TextInput>(null),
        two:useRef<TextInput>(null),
        three:useRef<TextInput>(null),
        four:useRef<TextInput>(null)
    }
    
    return (
        <>
            <RBSheet
                ref={ref}
                height={Platform.OS=="ios" ?345:330}
                closeOnDragDown={true}
                dragFromTopOnly
                onClose={()=>{
                    setCode(['','','',''])
                }}
                closeOnPressMask={true} 
                customStyles={{
                    draggableIcon:{
                        backgroundColor:Белый50,
                        margin:0,
                        padding:0,
                        height:0,
                        borderTopRightRadius:0,
                        borderTopLeftRadius:0,
                    },
                    container: {
                        borderTopLeftRadius:20,
                        borderTopRightRadius:20,
                        paddingHorizontal:16,
                        backgroundColor:Фон
                    }
                }}>
                <ScrollView scrollEnabled={false} style={{flexGrow:1}} keyboardShouldPersistTaps='always'>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : undefined}
                        keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                        style={{ flex: 1 }}
                    >
                        <View style={{alignItems:"center", marginBottom:10}}><ModalCloseIcon/></View>
                        <View style={{gap:16}}>
                            <View style={{gap:8, marginHorizontal:10}}>
                                <Text style={[styles.h4,{color:'white', textAlign:'center', fontSize:18}]}>Код подтверждения</Text>
                                <Text style={[styles.bodyText,{color:Белый50, textAlign:'center'}]}>На указанную вами почту придет проверочный код</Text>
                            </View>
                           
                            {/* Поля для ввода кода */}
                            <View style={{gap:6}}>
                                <View style={{flexDirection:"row", justifyContent:"space-between", marginBottom:-6, marginHorizontal:16}}>
                                    <View style={{width:64}}>
                                        <Input backgroundColor={Фон} value={code[0]} ref={refInput.four} keyboardType='number-pad' onChangeText={(value)=>{
                                            let tmp = code
                                            tmp[0] = value
                                            setCode([...tmp])
                                            if (value.length > 0) {
                                                refInput.one.current.focus()
                                            }
                                        }} style={{borderWidth:1, textAlign:'center', paddingHorizontal:16, paddingVertical:12}} maxLength={1}/>
                                    </View>
                                    <View style={{width:64}}>
                                        <Input backgroundColor={Фон} value={code[1]} keyboardType='number-pad' onChangeText={(value)=>{
                                            let tmp = code
                                            tmp[1] = value
                                            setCode([...tmp])
                                            if (value.length > 0) {
                                                refInput.two.current.focus()
                                            }
                                            if (value.length == 0) {
                                                refInput.four.current.focus()
                                            }
                                        }} ref={refInput.one} style={{borderWidth:1, textAlign:'center', paddingHorizontal:16, paddingVertical:12}} maxLength={1}/>
                                    </View>
                                    <View style={{width:64}}>
                                        <Input backgroundColor={Фон} keyboardType='number-pad' onChangeText={(value)=>{
                                            let tmp = code
                                            tmp[2] = value
                                            setCode([...tmp])
                                            if (value.length > 0) {
                                                refInput.three.current.focus()
                                            }
                                            if (value.length == 0) {
                                                refInput.one.current.focus()
                                            }
                                        }} ref={refInput.two} style={{borderWidth:1, textAlign:'center', paddingHorizontal:16, paddingVertical:12}} maxLength={1}/>
                                    </View>
                                    <View style={{width:64}}>
                                        <Input backgroundColor={Фон} onChangeText={(value)=>{
                                            let tmp = code
                                            tmp[3] = value
                                            setCode([...tmp])
                                            if (value.length == 0) {
                                                refInput.two.current.focus()
                                            }
                                        }} keyboardType='number-pad' ref={refInput.three} style={{borderWidth:1, textAlign:'center', paddingHorizontal:16, paddingVertical:12}} maxLength={1}/>
                                    </View>
                                </View>
                                {(err.length != 0)&&<Text style={[styles.smallText,{color:'#FF000086', paddingLeft:14}]}>{err}</Text>}
                            </View>
                            {/* Конец - Поля для ввода кода */}

                            <Text style={[styles.bodyText,{color:Белый50, textAlign:'center', marginVertical:(err.length != 0)?-4:6}]}>Введите код из письма</Text>
                           
                            <ButtonMy text='Отправить' onPress={async()=>{
                                setErr('')
                                // Проверка введен код полностью
                                if (code[0].length != 0 && code[1].length != 0 && code[2].length != 0 && code[3].length != 0) {
                                    let tmp = code[0]+code[1]+code[2]+code[3]
                                    const value = await apiFetch('/email/check-code','POST',false,{email:props.email, code:tmp})
                                    switch (value?.status) {
                                        case 200:
                                        case 201:
                                        case 202:
                                            setToken(value?.token)
                                            ref.current?.close()
                                            setTimeout(() => newPass.current.open(), 500);
                                            break;
                                        default:
                                            setErr('Не верный код')
                                            break;
                                    }
                                } else {
                                    setErr('Введите код')
                                }
                                // Конец - Проверка введен код полностью

                            }} backgroundColor='#88FFF9' colorText='#171717'/>
                            <TouchableOpacity activeOpacity={0.7} onPress={async()=>{
                                const value = await apiFetch('/email/send-code',"POST",false,{email:props.email})
                                if (value?.status != 200) {
                                    ref?.current?.close()
                                }
                            }}>
                                <Text style={[styles.bodyText,{color:Белый50, textAlign:'center', marginBottom:8, textDecorationLine:'underline'}]}>Получить новый код</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </RBSheet>
            <ModalNewPass ref={newPass} email={props.email} token={token}/>
        </>
    )
})

const validations = yup.object().shape({
    password: yup.string().min(8, 'не менее 8 символов').typeError('Введите верный пароль').required('Обязательное поле'),
    password_confirmation: yup.string().oneOf([yup.ref('password')], 'Пароли не сопадают').required('Обязательное поле'),
})
/**
 * Модалка для восстановления пароля
 * @param ref для взаимодействия с модальным окном
 */
export const ModalNewPass = forwardRef((props:{email:string, token?:string},ref)=>{

    // console.log(props.token);
    
    return (
        <RBSheet
            ref={ref}
            height={Platform.OS=='ios'?278 :263}
            closeOnDragDown={true}
            // dragFromTopOnly
            closeOnPressMask={true} 
            customStyles={{
                draggableIcon:{
                    backgroundColor:Белый50,
                    margin:0,
                    padding:0,
                    height:0,
                    borderTopRightRadius:0,
                    borderTopLeftRadius:0,
                },
                container: {
                    borderTopLeftRadius:16,
                    borderTopRightRadius:16,
                    paddingHorizontal:16,
                    backgroundColor:Фон
                }
            }}>
            <ScrollView scrollEnabled={false} style={{flexGrow:1}} keyboardShouldPersistTaps='always'>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : 'height'}
                    keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                    style={{ flex: 1 }}
                >
                    <View style={{alignItems:"center", marginBottom:10}}><ModalCloseIcon/></View>
                    <Formik 
                        onSubmit={async(value)=>{
                            let connect:any;
                            const result = await apiFetchString('/email/new-password','POST',props.token,{password:value?.password}) 
                            console.log(result);                           
                            switch (result?.status) {
                                case 200:
                                case 201:
                                    ref.current?.close()
                                    showToastable({'message':'Ваш пароль успешно изменен'})
                                    break;
                                default:
                                    break;
                                }
                        }}
                        validationSchema={validations}
                        initialValues={{
                            password:'',
                            password_confirmation:''
                        }}
                    >
                        {({values, handleChange, handleBlur, errors, touched, handleSubmit})=>(
                        <View style={{gap:16}}>
                            <Text style={[styles.h4,{color:'white', textAlign:'center', fontSize:18}]}>Установите новый пароль</Text>
                            <Input 
                                backgroundColor={Фон} 
                                style={{borderWidth:1}} 
                                securePass 
                                title='Придумайте новый пароль'
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                errorText={errors.password}
                                touched={touched.password}
                            />
                            <Input 
                                backgroundColor={Фон} 
                                style={{borderWidth:1}} 
                                securePass 
                                title='Повторите новый пароль'
                                value={values.password_confirmation}
                                onChangeText={handleChange('password_confirmation')}
                                onBlur={handleBlur('password_confirmation')}
                                errorText={errors.password_confirmation}
                                touched={touched.password_confirmation}
                            />
                            <ButtonMy text='Сохранить новый пароль' onPress={handleSubmit} backgroundColor='#88FFF9' colorText='#171717'/>
                        </View>)}
                    </Formik>
                </KeyboardAvoidingView>
            </ScrollView>
        </RBSheet>
    )
})