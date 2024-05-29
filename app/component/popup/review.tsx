import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { forwardRef, useRef, useState } from 'react'
import RBSheet from '@nonam4/react-native-bottom-sheet';
import { statusBarHeight, Белый50, Бирюзовый, Фон } from "../../GLOBAL";
import { styles } from "../../styles";
import { HeartMenuIcon, ModalCloseIcon } from "../svg/svg";
import { ButtonMy } from "../ui/ButtonMy";

/**
 * Модалка для вызова вариантов изображения
 * @param ref для взаимодействия с модальным окном
 */
export const ModalReview = forwardRef((props:{noImg?:boolean, event?:boolean, title?:string},ref)=>{
    const [review, setReview] = useState([false,false,false,false,false])
    return (
        <>
            <RBSheet
                ref={ref}
                height={props.event ?213 :260}
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
                        <View style={{gap:13, alignItems:'center'}}>
                            <View style={{gap:4}}>
                                <Text style={[styles.h4,{color:'white', textAlign:'center'}]}>{props.title ?props.title :'Оцените участницу мероприятия'}</Text>
                                {props.event && <Text style={[styles.h4,{color:'white', textAlign:'center'}]}>Название вечеринки Paty Dens Nou</Text>}
                            </View>
                            {!props.event && <Image style={{aspectRatio:1, height:55, borderRadius:16, overflow:"hidden"}} source={require('../../../assets/image/people.jpg')}/>}
                            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", gap:13}}>
                                {review.map((el,i)=>
                                    <TouchableOpacity key={i} activeOpacity={0.7} onPress={()=>{
                                        let tmp = review
                                        for (let j = 0; j < tmp.length; j++) {
                                            tmp[j]=false
                                        }
                                        let j = 0
                                        while (j <= i){
                                            tmp[j] = true
                                            j=j+1
                                        }
                                        setReview([...tmp])
                                    }}>
                                        <HeartMenuIcon color={el ? Бирюзовый : "#FFFFFFBC"}/>
                                    </TouchableOpacity>
                                )}
                            </View>
                            <ButtonMy text='Оценить' onPress={()=>ref.current?.close()} backgroundColor='#88FFF9' colorText='#171717'/>
                            <TouchableOpacity onPress={()=>ref.current?.close()} activeOpacity={0.7}>
                                <Text style={[styles.smallText,{color:'#FFFFFF99', textAlign:'center', textDecorationLine:"underline"}]}>Отклонить</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </RBSheet>
        </>
    )
})