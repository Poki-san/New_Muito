import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import React, { forwardRef } from 'react'
import RBSheet from '@poki_san/react-native-bottom-sheet';
import { statusBarHeight, Белый50, Фон } from "../../GLOBAL";
import { styles } from "../../styles";
import { ModalCloseIcon, WarningIcon } from "../svg/svg";
import { ButtonMy } from "../ui/ButtonMy";
import { navigate } from "../../functions/navigate";

/**
 * Модалка ошибка скана
 * @param ref для взаимодействия с модальным окном
 */
export const ModalErrScan = forwardRef((props:{onPress?:()=>void},ref)=>{
    return (
        <>
            <RBSheet
                ref={ref}
                height={Platform.OS=='ios'?230: 219}
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
                        <View style={{gap:25}}>
                            <View style={{gap:9}}>
                                <View style={{alignItems:"center"}}><WarningIcon/></View>
                                <Text style={[styles.h4,{color:'white', textAlign:'center',marginHorizontal:40}]}>Пользователь не найден</Text>
                                <Text style={[styles.bodyText,{color:'white', textAlign:'center',marginHorizontal:40}]}>Попробуйте другой QR-код или повторите попытку</Text>
                            </View>
                            <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                                <ButtonMy text='Повторить' onPress={props.onPress} backgroundColor='#88FFF9' width={'48%'} colorText='#171717'/>
                                <ButtonMy text='Отмена' onPress={()=>{
                                    ref?.current?.close()
                                }} borderColor='#88FFF9' onPressColor='#393939' backgroundColor='#171717' width={'48%'} colorText='#FFF'/>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </RBSheet>
        </>
    )
})