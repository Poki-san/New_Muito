import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Белый } from '../../GLOBAL';
import React, { PureComponent } from 'react';
// import { styles } from '../../style/style';
// import { RadioSvg } from '../svg/mainSvg';

/**
 * Отображает элементы для выбора
 * @param data Принимает массив
 * @argument name Название для отображения
 * @argument value Уникальное значение
 * 
 * @param onPress Возвращает выбранный элемент
 */
export class RadioButtons extends PureComponent<{data:{name:string, value:string}[], errorText?:string, touched?:boolean, onPress?:(value?:string, index?:number, name?:string)=>void}> {
    state={
        active:-1
    }
    render(){
        return ( 
            <>
                <FlatList
                    scrollEnabled={false}
                    data={this.props.data}
                    contentContainerStyle={{gap:12}}
                    renderItem={(item)=>(
                        <TouchableOpacity activeOpacity={0.6} onPress={()=>{
                            !!this.props.onPress&&this.props.onPress(item.item.value, item.index, item.item.name)
                            this.setState({active:item.index})
                        }} style={{flexDirection:"row", alignItems:'center', gap:10}}>
                            <View style={{borderRadius:360, backgroundColor: this.state.active == item.index ? 'blue' : 'gray', alignItems:"center", justifyContent:'center', aspectRatio:1, width:15}}>
                                <View style={{borderRadius:360, backgroundColor:'white', alignItems:"center", justifyContent:'center', aspectRatio:1, width:11}}/>
                            </View>
                            {/* <RadioSvg color={this.state.active == item.index ? Акцентный : Фон}/> */}
                            <Text>{item.item.name}</Text>
                        </TouchableOpacity>
                    )}
                /> 
                {(!!this.props.errorText && this.props.touched)&&<Text style={[{color:'black'}]}>{this.props.errorText}</Text>}
            </>      
        )
    }
}