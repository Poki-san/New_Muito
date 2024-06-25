import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { forwardRef, useRef } from 'react'
import RBSheet from '@nonam4/react-native-bottom-sheet';
import { statusBarHeight, Белый50, Фон } from "../../GLOBAL";
import { styles } from "../../styles";
import { CameraMiniIcon, ImgIcon, ModalCloseIcon } from "../svg/svg";
import { addImage } from "../../functions/addImage";

/**
 * Модалка для вызова вариантов изображения
 * @param ref для взаимодействия с модальным окном
 */
export const ModalImg = forwardRef((props:{allowsMultipleSelection?: boolean, selectionLimit?: number,onPath?:(path?:any[])=>void},ref)=>{
    const code = useRef<RBSheet>()
    return (
        <>
            <RBSheet
                ref={ref}
                height={Platform.OS=='ios'?160 :150}
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
                            <Text style={[styles.h4,{color:'white', textAlign:'center'}]}>Добавить фото</Text>
                            <TouchableOpacity activeOpacity={0.7} onPress={async()=>{
                                const path = await addImage('Lib',false,props.allowsMultipleSelection??false,props.selectionLimit??3)
                                props.onPath(path)
                            }} style={{flexDirection:'row', alignItems:'center', gap:8}}>
                                <ImgIcon/>
                                <Text style={[styles.bodyText,{color:'white'}]}>Галерея</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} onPress={async()=>{
                                const path = await addImage('Camera',false,props.allowsMultipleSelection??false,props.selectionLimit??3)
                                props.onPath(path)
                            }} style={{flexDirection:'row', alignItems:'center', gap:8}}>
                                <CameraMiniIcon/>
                                <Text style={[styles.bodyText,{color:'white'}]}>Камера</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </RBSheet>
        </>
    )
})