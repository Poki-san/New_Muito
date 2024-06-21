import { ScrollView, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Белый, Бирюзовый, Бирюзовый50, Фон } from '../../GLOBAL';
import { useEffect, useState } from 'react';
import { styles } from '../../styles';
 
export function Tags(props:{default?:string, data:{title:string, id:number, colorText?:string, color?:string, colorTextInActive?:string, colorInActive?:string}[], styleContainer?: StyleProp<ViewStyle>, style?: StyleProp<ViewStyle>, paddingV?:number, noBorder?:boolean, onPress?:(value:number)=>void}) {
    const [active, setActive] = useState(-1)
    useEffect(()=>setActive(props.default),[props.default])
    return (
        <View>
            <ScrollView showsHorizontalScrollIndicator={false} style={[{marginVertical:props.paddingV??20},props.styleContainer]} contentContainerStyle={[{gap:15, paddingHorizontal:16, flexGrow:1},props.style]} horizontal>
                {props.data&& 
                    props.data.map((el,i)=>(
                        <TouchableOpacity 
                            key={i}
                            activeOpacity={0.7}
                            onPress={()=>{
                                if (active != el.id) {
                                    !!props.onPress && props.onPress(el.id)
                                    setActive(el.id)
                                } else {
                                    !!props.onPress && props.onPress(-1)
                                    setActive(-1)
                                }
                            }}
                            style={{borderColor:active == el.id ? (el.color ?? Бирюзовый50) : (el.colorInActive ?? Фон), paddingVertical:6, backgroundColor:active == el.id ? (el.color ?? '#17171A') : (el.colorInActive ?? '#17171A'), paddingHorizontal:13, borderWidth:1, borderRadius:20}}
                        >
                            <Text style={[styles.smallText,{color:active == el.id ? (el.colorText ?? Белый) : (el.colorTextInActive ?? 'white')}]}>{el.title}</Text>
                        </TouchableOpacity>
                    )) 
                }
            </ScrollView>
        </View>
    )
}

export function TagsNoScroll(props:{default?:string, data:{name:string, value:string, incolorText?:string, incolor?:string, colorText?:string, color?:string}[], style?: StyleProp<ViewStyle>, oneTag?:boolean, onPress?:(value:any[])=>void, paddingV?:number, noBorder?:boolean}) {
    const [active, setActive] = useState([])
    // useEffect(()=>setActive(props.default),[props.default])
    return (
        <View style={[{gap:10, alignItems:'center', flexGrow:1, flexDirection:'row', flexWrap:"wrap"},props.style]}>
            {props.data&& 
                props.data.map((el,i)=>(
                    <TouchableOpacity 
                        key={i}
                        activeOpacity={0.7}
                        onPress={()=>{
                            let tmp = active
                            const index = tmp?.findIndex(value => value == el?.value)
                            if (props.oneTag == true) {
                                tmp = []
                                tmp[0]=el.value
                            } else {
                                if (index==-1) {
                                    if (tmp.length != 10) {
                                        tmp.push(el.value)
                                    }
                                } else {
                                    tmp.splice(index,1)
                                }
                            }
                            !!props.onPress && props.onPress(tmp)
                            setActive([...tmp])
                        }}
                        style={{borderColor:Бирюзовый50, paddingVertical:(props.paddingV ?? 6), backgroundColor:active?.findIndex(value => value == el?.value)!=-1 ? (el.color ?? Бирюзовый) : (el.incolor ?? '#17171A'), paddingHorizontal:13, borderWidth:props.noBorder ?0 : 1, borderRadius:20}}
                    >
                        <Text style={[styles.smallText,{color:active?.findIndex(value => value == el?.value)!=-1 ? (el.colorText ?? '#17171A') : (el.incolorText ??'white')}]}>{el.name}</Text>
                    </TouchableOpacity>
                )) 
            }
        </View>
    )
}