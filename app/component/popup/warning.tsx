import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import React, { forwardRef, useRef, useState } from 'react'
import RBSheet from '@nonam4/react-native-bottom-sheet';
import { statusBarHeight, Белый50, Фон } from "../../GLOBAL";
import { styles } from "../../styles";
import { ModalCloseIcon } from "../svg/svg";
import { Input } from "../ui/input";
import { ButtonMy } from "../ui/ButtonMy";

/**
 * Модалка для отправки сообщения
 * @param ref для взаимодействия с модальным окном
 */
export const ModalWarning = forwardRef((props:{},ref)=>{
    const code = useRef<RBSheet>()
    const [text, setText] = useState('')
    return (
        <>
            <RBSheet
                ref={ref}
                height={300}
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
                        behavior={Platform.OS === "ios" ? "padding" : undefined}
                        keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                        style={{ flex: 1 }}
                    >
                        <View style={{alignItems:"center", marginBottom:10}}><ModalCloseIcon/></View>
                        <View style={{gap:13}}>
                            <Text style={[styles.h4,{color:'white', textAlign:'center'}]}>Хотите пожаловаться?</Text>
                            {/* <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Email' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/> */}
                            <View style={{gap:4}}>
                                <Text style={[styles.smallText,{color:'#FFFFFF90', marginRight:10, textAlign:'right'}]}>{text.length}/300</Text>
                                <Input mode='outlined' value={text} onChangeText={setText} backgroundColor='#FFFFFF00' maxLength={300} placeholderTextColor={'#FFFFFF99'} title='Опишите причину' style={{borderWidth:1, borderColor:'#FFFFFF99', height:140}} multiline/>
                            </View>
                            <ButtonMy text='Отправить' onPress={()=>{}} backgroundColor='#88FFF9' colorText='#171717'/>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </RBSheet>
        </>
    )
})