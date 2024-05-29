import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ButtonMy, Input, MainLayout, PeopleItem } from '../../component';
import { statusBarHeight, tagsTest, Бирюзовый, Бирюзовый50 } from '../../GLOBAL';
import { styles } from '../../styles';
import { goBack } from '../../functions/navigate';
import { BackArrowIcon, CalendarIcon } from '../../component/svg/svg';
import { useRef, useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ModalDel } from '../../component/popup/del';
import RBSheet from '@nonam4/react-native-bottom-sheet';
import { BlurView } from 'expo-blur';
import { showToastable } from 'react-native-toastable';
import { delElement } from '../../functions/arrayFormater';
 
export function EditGuestScreen() {
    const del = useRef<RBSheet>(null)
    const [isDate, setIsDate] = useState(false)
    const [date, setDate] = useState({text:'',server:new Date()})
    const [text, setText] = useState('')
    const [tag, setTag] = useState(0)
    return ( 
        <MainLayout isStatusBar backgroundColor='#181818'>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1}}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                    style={{ flex: 1 }}
                >
                    <View style={{marginTop:statusBarHeight+19, marginBottom:9}}>
                        <View style={{marginHorizontal:16, justifyContent:'space-between', flexDirection:"row", alignItems:"center"}}>
                            <TouchableOpacity activeOpacity={0.7} onPress={goBack} style={{width:42, height:42, alignItems:"center", justifyContent:"center", backgroundColor:'#221E1E80', borderRadius:16}}>
                                <BackArrowIcon/>
                            </TouchableOpacity>
                            <Text style={[styles.h4, {color:'white'}]}>Редактирование анкеты</Text>
                            <View  style={{width:42, height:42}}/>
                        </View>
                    </View>
                    <View style={{borderRadius:16, overflow:"hidden", borderWidth:1, borderColor:'#374A4E99', flexDirection:"row", justifyContent:'space-between', alignItems:"center", marginHorizontal:16, marginBottom:16}}>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>setTag(0)} style={{
                            paddingVertical:8,
                            alignItems:"center",
                            justifyContent:'center',
                            width:'33.3%',
                            backgroundColor:tag==0 ? '#374A4E' : '#374A4E00',
                            borderRadius:16
                        }}>
                            <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Личные данные</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>setTag(1)} style={{
                            paddingVertical:8,
                            alignItems:"center",
                            justifyContent:'center',
                            width:'33.3%',
                            backgroundColor:tag==1 ? '#374A4E' : '#374A4E00',
                            borderRadius:16
                        }}>
                            <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Интересы</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>setTag(2)} style={{
                            paddingVertical:8,
                            alignItems:"center",
                            justifyContent:'center',
                            width:'33.3%',
                            backgroundColor:tag==2 ? '#374A4E' : '#374A4E00',
                            borderRadius:16
                        }}>
                            <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Контакты</Text>
                        </TouchableOpacity>
                    </View>
                    {tag==0 && 
                        <View style={{gap:8, marginHorizontal:16, flex:1}}>
                            <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Имя' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                            <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Фамилия' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>setIsDate(true)}>
                                <Input editable={false} value={date.text} backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Дата рождения' style={{borderWidth:1, borderColor:'#FFFFFF99', paddingRight:20, pointerEvents:"none"}}/>
                                <View style={{position:'absolute', right:10, top:0, bottom:0, justifyContent:'center'}}><CalendarIcon/></View>
                            </TouchableOpacity>
                            {isDate && 
                                <DateTimePickerModal
                                    isVisible={isDate}
                                    mode="date"
                                    is24Hour={true}
                                    locale='ru_RU'
                                    onConfirm={(value)=>{                    
                                        setDate({text:value.getDate().toString()+'.'+value.getMonth().toString()+'.'+value.getFullYear().toString(),server:value})
                                        setIsDate(false)
                                    }}
                                    onCancel={()=>setIsDate(false)}
                                /> 
                            }
                            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                <View style={{width:'48%'}}>
                                    <Input backgroundColor='#FFFFFF00' keyboardType='number-pad' placeholderTextColor={'#FFFFFF99'} title='Рост' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                                </View>
                                <View style={{width:'48%'}}>
                                    <Input backgroundColor='#FFFFFF00' keyboardType='number-pad' placeholderTextColor={'#FFFFFF99'} title='Вес' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                                </View>
                            </View>
                            <View style={{gap:4}}>
                                <Text style={[styles.smallText,{color:'#FFFFFF90', marginRight:10, textAlign:'right'}]}>0/300</Text>
                                <TextInput
                                    placeholder='Описание'
                                    multiline
                                    maxLength={300}
                                    placeholderTextColor={'#FFFFFF99'}
                                    style={[styles.bodyText,{ borderRadius:16, borderWidth:1, borderTopLeftRadius:16, borderColor:'#FFFFFF99', borderTopRightRadius:16, maxHeight:230, color:'white', paddingVertical:7, paddingLeft:17}]}
                                />
                            </View>
                        </View>
                    }
                    {tag==1&&<StepThree/>}
                    {tag==2&&<StepFour/>}
                    <View style={{marginVertical:13,paddingHorizontal:16,width:'100%', gap:16}}>
                        {tag==0 && <TouchableOpacity activeOpacity={0.7} onPress={()=>del.current.open()} style={{padding:3}}>
                            <Text style={[styles.bodyText, {color:'#FF000066', textAlign:'center'}]}>Удалить профиль</Text>
                        </TouchableOpacity>}
                        <ButtonMy text='Сохранить изменения' onPress={goBack} backgroundColor='#88FFF9' colorText='#171717'/>
                    </View>
                    <ModalDel ref={del}/>
                </KeyboardAvoidingView>
            </ScrollView>
        </MainLayout>
    )
}

function StepThree(props:{onPress?:()=>void}) {
    const [activeTag, setTag] = useState([])
    
    return (
        <View style={{marginHorizontal:16, flex:1}}>
            <View style={{width:"100%"}}>
                {tagsTest.map((el,i)=>(
                    <View key={i} style={{gap:8, marginBottom:16}}>
                        <Text style={[styles.bodyText,{color:'#ffffff'}]}>{el.title}</Text>
                        <View style={{flexDirection:'row', alignItems:"center", flexWrap:'wrap', gap:8}}>
                            {el.tags.map((el2,i2)=>(
                                <TouchableOpacity key={i2} activeOpacity={0.7} onPress={()=>{
                                    const index = activeTag.indexOf(el2.id)
                                    let tmp = activeTag
                                    if (index==-1) {
                                        if (activeTag.length<5) {
                                            tmp.push(el2.id) 
                                        } else {
                                            showToastable({message:'Можно добавить только 5 тегов'})
                                        }
                                    } else{
                                        tmp = delElement(tmp,index)
                                    }
                                    setTag([...tmp])
                                }} style={{paddingHorizontal:16, alignSelf:'flex-start', paddingVertical:8, borderRadius:16, borderWidth:1, borderColor:Бирюзовый50, backgroundColor:activeTag.indexOf(el2.id)!=-1?Бирюзовый:'transparent'}}>
                                    <Text style={[styles.smallText,{color:'#ffffff'}]}>{el2.title}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}

function StepFour(props:{onPress?:()=>void}) {
    return (
        <View style={{flex:1, marginHorizontal:16, alignItems:'center', justifyContent:"space-between"}}>
            <View style={{gap:21, width:"100%"}}>
                <View style={{gap:8}}>
                    <View style={{flexDirection:'row', flex:1, justifyContent:'space-between', alignItems:'center'}}>
                        <View style={{width:'55%'}}>
                            <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Инстаграм' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                        </View>
                        <View style={{width:'43%'}}>
                            <Input backgroundColor='#FFFFFF00' keyboardType='number-pad' placeholderTextColor={'#FFFFFF99'} title='Подписчики' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                        </View>
                    </View>
                    <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Телефон' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                    <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Телеграм' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                </View>
            </View>
        </View>
    )
}
