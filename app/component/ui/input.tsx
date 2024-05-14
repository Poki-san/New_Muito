import { View, Text, StyleProp, TextStyle, ColorValue, KeyboardTypeOptions } from 'react-native';
import { forwardRef, useState} from 'react';
import { TextInput } from 'react-native-paper'
import { RenderProps } from 'react-native-paper/lib/typescript/components/TextInput/types';

interface InputProps {
    securePass?:boolean, 
    icon?:any, 
    placeholder?:string, 
    title?:string, 
    label?:string, 
    value?:string, 
    onChangeText?: (text: string) => void, 
    required?:boolean, 
    backgroundColor?:string, 
    height?:any, 
    borderRadius?:number, 
    isClear?:boolean, 
    style?: StyleProp<TextStyle>, 
    styleLabel?: StyleProp<TextStyle>, 
    autoFocus?: boolean,
    multiline?: boolean,
    onFocus?: () => void, 
    onBlur?: (e?:any) => void, 
    onClear?: () => void, 
    onPress?: () => void, 
    onSubmitEditing?: () => void, 
    errorText?:string,
    touched?:boolean,
    editable?: boolean,
    keyboardType?: KeyboardTypeOptions, 
    placeholderTextColor?: ColorValue,
    render?: (props: RenderProps) => React.ReactNode
}

export const Input = forwardRef((props:InputProps, ref)=>{
    const [secure, setSecure] = useState(true)
    return (
        <View style={{gap:4, width:"100%"}}>
            {(props.title && props.value?.length>0) && <Text style={[{color:'#FFFFFF66', fontSize:10, fontFamily:'Poppins', paddingLeft:14, marginBottom:-5}]}>{props.title}</Text>}
            <View style={{position:'relative', width:'100%', justifyContent: 'center'}}>
                {props.icon && 
                    <View style={{position:'absolute', zIndex:99999, left:14}}>
                        <>{props.icon}</>
                    </View>
                }

                <TextInput
                    ref={ref}
                    editable={props.editable}
                    onSubmitEditing={props.onSubmitEditing}
                    onBlur={props.onBlur}
                    render={props.render}
                    onPressIn={props.onPress}
                    keyboardType={props.keyboardType}
                    multiline={props.multiline}
                    onFocus={props.onFocus}
                    autoFocus={props.autoFocus}
                    label={props.label && <Placeholder required={props.required} placeholderColor={(!!props.errorText && props.touched)?'black' : 'gray'} style={props.styleLabel} placeholderText={props.label}/>}
                    placeholder={props.title}
                    placeholderTextColor={props.placeholderTextColor}
                    contentStyle={{fontFamily:'Poppins', fontSize:14}}
                    secureTextEntry={props.securePass ? secure:false} 
                    underlineStyle={{display:"none"}}
                    textColor='white'
                    style={[props.style, {paddingLeft:props.icon && 30, fontFamily:'Poppins', backgroundColor:props.backgroundColor ?? 'white', borderRadius:props.borderRadius??8, borderTopLeftRadius:props.borderRadius??8, borderTopRightRadius:props.borderRadius??8, height:40, color:'white'}]}
                    value={props.value}
                    onChangeText={props.onChangeText}
                />
                {(!!props.errorText && props.touched)&&<Text style={[{color:'red', paddingLeft:14}]}>{props.errorText}</Text>}
                {/* {props.value && props.isClear && 
                <>
                    {props.value?.length != 0 && 
                    <TouchableOpacity onPress={props.onClear} style={{position:'absolute', zIndex:99999, right:14, paddingVertical:8, paddingHorizontal:5}}>
                        <CloseIcon/>
                    </TouchableOpacity>}
                </>
                } */}

                {/* {props.securePass &&
                    <TouchableOpacity 
                        style={{position:'absolute', right:0,padding:10}} 
                        onPress={()=>setSecure(!secure)}>
                        {secure ? <EyeClose/> : <EyeOpen/>}
                    </TouchableOpacity>
                } */}
            </View>
        </View>
    );
})

const Placeholder = ({required, placeholderText, placeholderColor='gray', style}) => (
    <Text style={[style, {color: placeholderColor, fontFamily:'Poppins', fontSize:14}]}>{placeholderText} {required && <Text style={{color: 'red'}}>*</Text>}</Text>
);