import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import React, { forwardRef } from 'react'
import RBSheet from '@nonam4/react-native-bottom-sheet';
import { statusBarHeight, Белый50, Фон } from "../../GLOBAL";
import { styles } from "../../styles";
import { ModalCloseIcon, WarningIcon } from "../svg/svg";
import { ButtonMy } from "../ui/ButtonMy";
import { navigate } from "../../functions/navigate";
import error from "../../model/error";

/**
 * Модалка ошибка
 * @param ref для взаимодействия с модальным окном
 */
export const ModalErr = forwardRef((props:{text?:string, title?:string, height?:number},ref)=>{
    return (
        <>
            <RBSheet
                ref={ref}
                height={props.height ?? (Platform.OS=='ios'?185: 159)}
                closeOnDragDown={true}
                onClose={()=>error.Input(false)}
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
                        <View style={{gap:25}}>
                            <View style={{gap:9}}>
                                <View style={{alignItems:"center"}}><WarningIcon/></View>
                                <Text style={[styles.h4,{color:'white', textAlign:'center',marginHorizontal:40}]}>{props.title}</Text>
                                <Text style={[styles.bodyText,{color:'white', textAlign:'center',marginHorizontal:40}]}>{props.text}</Text>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </RBSheet>
        </>
    )
})