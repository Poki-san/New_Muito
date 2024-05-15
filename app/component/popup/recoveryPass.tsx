import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { forwardRef, useRef } from 'react'
import RBSheet from '@nonam4/react-native-bottom-sheet';
import { ButtonMy } from "../ui/ButtonMy";
import { Input } from "../ui/input";
import { statusBarHeight, width, Белый50, Фон } from "../../GLOBAL";
import { styles } from "../../styles";
import { ModalCloseIcon } from "../svg/svg";
import { showToastable } from "react-native-toastable";

/**
 * Модалка для восстановления пароля
 * @param ref для взаимодействия с модальным окном
 */
export const ModalRecovery = forwardRef((props:{},ref)=>{
    const code = useRef<RBSheet>()
    return (
        <>
            <RBSheet
                ref={ref}
                height={210}
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
                            <Text style={[styles.h4,{color:'white', textAlign:'center', fontSize:18}]}>Укажите email для восстановления пароля</Text>
                            <Input backgroundColor={Фон} style={{borderWidth:1}} title='Email'/>
                            <ButtonMy text='Сохранить изменения' onPress={()=>{
                                ref.current?.close()
                                setTimeout(() => code.current.open(), 300);
                            }} backgroundColor='#88FFF9' colorText='#171717'/>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </RBSheet>
            <ModalRecoveryCode ref={code} />
        </>
    )
})


/**
 * Модалка для восстановления пароля
 * @param ref для взаимодействия с модальным окном
 */
export const ModalRecoveryCode = forwardRef((props:{onPress?:()=>void},ref)=>{
    const newPass = useRef<RBSheet>()
    return (
        <>
            <RBSheet
                ref={ref}
                height={330}
                closeOnDragDown={true}
                dragFromTopOnly
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
                            <View style={{gap:8, marginHorizontal:6, marginBottom:5}}>
                                <Text style={[styles.h4,{color:'white', textAlign:'center', fontSize:18}]}>Код подтверждения</Text>
                                <Text style={[styles.bodyText,{color:Белый50, textAlign:'center'}]}>На почту info21@mail.com придет проверочный код 4 цифры</Text>
                            </View>
                           
                            <View style={{flexDirection:"row", justifyContent:"space-between", marginBottom:-6, marginHorizontal:16}}>
                                <View style={{width:64}}>
                                    <Input backgroundColor={Фон} style={{borderWidth:1, textAlign:'center', paddingHorizontal:16, paddingVertical:12}} maxLength={1}/>
                                </View>
                                <View style={{width:64}}>
                                    <Input backgroundColor={Фон} style={{borderWidth:1, textAlign:'center', paddingHorizontal:16, paddingVertical:12}} maxLength={1}/>
                                </View>
                                <View style={{width:64}}>
                                    <Input backgroundColor={Фон} style={{borderWidth:1, textAlign:'center', paddingHorizontal:16, paddingVertical:12}} maxLength={1}/>
                                </View>
                                <View style={{width:64}}>
                                    <Input backgroundColor={Фон} style={{borderWidth:1, textAlign:'center', paddingHorizontal:16, paddingVertical:12}} maxLength={1}/>
                                </View>
                            </View>
                            <Text style={[styles.bodyText,{color:Белый50, textAlign:'center', marginBottom:8}]}>Введите код из письма</Text>
                           
                            <ButtonMy text='Сохранить изменения' onPress={()=>{
                                 ref.current?.close()
                                 setTimeout(() => newPass.current.open(), 300);
                            }} backgroundColor='#88FFF9' colorText='#171717'/>
                            <TouchableOpacity activeOpacity={0.7}>
                                <Text style={[styles.bodyText,{color:Белый50, textAlign:'center', marginBottom:8, textDecorationLine:'underline'}]}>Получить новый код</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </RBSheet>
            <ModalNewPass ref={newPass}/>
        </>
    )
})

/**
 * Модалка для восстановления пароля
 * @param ref для взаимодействия с модальным окном
 */
export const ModalNewPass = forwardRef((props:{},ref)=>{
    return (
        <RBSheet
            ref={ref}
            height={245}
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
                    <View style={{gap:16}}>
                        <Text style={[styles.h4,{color:'white', textAlign:'center', fontSize:18}]}>Установите новый пароль</Text>
                        <Input backgroundColor={Фон} style={{borderWidth:1}} title='Придумайте новый пароль'/>
                        <Input backgroundColor={Фон} style={{borderWidth:1}} title='Повторите новый пароль'/>
                        <ButtonMy text='Сохранить новый пароль' onPress={()=>{
                            ref.current?.close()
                            showToastable({'message':'Ваш пароль успешно изменен'})
                        }} backgroundColor='#88FFF9' colorText='#171717'/>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </RBSheet>
    )
})