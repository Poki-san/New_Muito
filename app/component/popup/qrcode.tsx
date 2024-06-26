import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import React, { forwardRef, useRef, useState } from 'react'
import RBSheet from '@poki_san/react-native-bottom-sheet';
import { statusBarHeight, Белый50, Фон } from "../../GLOBAL";
import { styles } from "../../styles";
import { ModalCloseIcon } from "../svg/svg";
import { Input } from "../ui/input";
import { ButtonMy } from "../ui/ButtonMy";
import QRCode from "react-native-qrcode-svg";

/**
 * Модалка для отправки сообщения
 * @param ref для взаимодействия с модальным окном
 */
export const ModalQrCode = forwardRef((props:{value?:string},ref)=>{
    const code = useRef<RBSheet>()
    const [text, setText] = useState('')
    return (
        <>
            <RBSheet
                ref={ref}
                height={Platform.OS=="ios"?375:365}
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
                        <View style={{gap:15}}>
                            <Text style={[styles.h4,{color:'white', textAlign:'center'}]}>Покажите QR код организатору мероприятия</Text>
                            <View style={{alignItems:"center"}}>
                                <View style={{borderWidth:5,borderColor:'white'}}><QRCode size={220} ecl="M" value={props.value}/></View>
                            </View>
                            <Text style={[styles.smallText,{color:'#FFFFFF99', textAlign:'center'}]}>Действует для прохода одного человека</Text>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </RBSheet>
        </>
    )
})