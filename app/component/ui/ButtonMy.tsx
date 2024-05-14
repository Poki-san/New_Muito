import { DimensionValue, Text, TouchableHighlight } from "react-native";
import React from "react";
import { Белый } from "../../GLOBAL";
// import { styles } from "../../style/style";

interface ButtonMyProps {
    text:string, 
    backgroundColor?:string, 
    colorText?:string, 
    borderColor?:string, 
    borderRadius?:number, 
    borderWidth?:number, 
    onPress?:()=>void, 
    disabled?:boolean, 
    width?:DimensionValue,
    height?:DimensionValue,
    inactive?:boolean,
    onPressColor?: string,
    activeOpacity?: number,
    paddingLeft?: number
}

export function ButtonMy(props:ButtonMyProps) {
    return (
        <TouchableHighlight 
            activeOpacity={props.activeOpacity??0.8} 
            underlayColor={props.onPressColor??'gray'} 
            onPress={!props.inactive?props.onPress:null}
            style={{
                backgroundColor: !props.inactive? (props.backgroundColor ?? 'black') : 'gray',
                borderWidth: props.borderWidth??1,
                borderColor: !props.inactive? (props.borderColor ?? (props.backgroundColor ?? 'black')) : 'gray',
                borderRadius: props.borderRadius?? 16,
                height: props.height ?? 42,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft:props.paddingLeft ?? 24,
                paddingRight:24,
                width:props.width ?? "100%",
        }}>
            <Text 
                style={[{color: props.colorText ?? 'white', opacity:!props.inactive?1:0.6, fontWeight:"600"}]}
            >
                    {props.text}
            </Text>
        </TouchableHighlight>
    )
}