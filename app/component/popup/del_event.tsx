import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { forwardRef, useRef } from 'react'
import RBSheet from '@nonam4/react-native-bottom-sheet';
import { statusBarHeight, Белый50, Фон } from "../../GLOBAL";
import { styles } from "../../styles";
import { CameraMiniIcon, ImgIcon, ModalCloseIcon } from "../svg/svg";
import { addImage } from "../../functions/addImage";
import { ButtonMy } from "../ui/ButtonMy";
import { navigate } from "../../functions/navigate";
import apiFetch from "../../functions/api";

/**
 * Модалка для удаления профиля
 * @param ref для взаимодействия с модальным окном
 */
export const ModalDelEvent = forwardRef((props:{id?:number, onDelete?:()=>void},ref)=>{
    return (
        <>
            <RBSheet
                ref={ref}
                height={Platform.OS=='ios'?145:135}
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
                        <View style={{gap:18}}>
                            <Text style={[styles.h4,{color:'white', textAlign:'center',marginHorizontal:40}]}>Удалить мероприятие?</Text>
                            <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                                <ButtonMy text='Отмена' onPress={()=>ref?.current?.close()} backgroundColor='#88FFF9' width={'48%'} colorText='#171717'/>
                                <ButtonMy text='Удалить' onPress={async()=>{
                                    const value = await apiFetch(`/event/${props.id}`,'DELETE',true)
                                    if (value?.status == 200) {
                                        props.onDelete()
                                        ref?.current?.close()
                                    }
                                }} borderColor='#88FFF9' onPressColor='#393939' backgroundColor='#171717' width={'48%'} colorText='#FFF'/>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </RBSheet>
        </>
    )
})