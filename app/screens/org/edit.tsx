import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ButtonMy, Input, MainLayout, PeopleItem } from '../../component';
import { statusBarHeight } from '../../GLOBAL';
import { styles } from '../../styles';
import { goBack } from '../../functions/navigate';
import { BackArrowIcon, CalendarIcon } from '../../component/svg/svg';
import { useRef, useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ModalDel } from '../../component/popup/del';
import RBSheet from '@nonam4/react-native-bottom-sheet';
 
export function EditOrgScreen() {
    const del = useRef<RBSheet>(null)
    const [isDate, setIsDate] = useState(false)
    const [date, setDate] = useState({text:'',server:new Date()})
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
                            <Text style={[styles.h4, {color:'white'}]}>Редактирование профиля</Text>
                            <View  style={{width:42, height:42}}/>
                        </View>
                    </View>
                    <View style={{gap:8, marginHorizontal:16, flex:1}}>
                        <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Имя' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                        <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Фамилия' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                        <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Email' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                        <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Город' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>setIsDate(true)}>
                            <Input editable={false} value={date.text} backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Дата рождения' style={{borderWidth:1, borderColor:'#FFFFFF99', paddingRight:20}}/>
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
                        <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Телеграм' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                        <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Инстаграм' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                    </View>
                    <View style={{marginVertical:13,paddingHorizontal:16,width:'100%', gap:16}}>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>del.current.open()} style={{padding:3}}>
                            <Text style={[styles.bodyText, {color:'#FF000066', textAlign:'center'}]}>Удалить профиль</Text>
                        </TouchableOpacity>
                        <ButtonMy text='Сохранить изменения' onPress={goBack} backgroundColor='#88FFF9' colorText='#171717'/>
                    </View>
                    <ModalDel ref={del}/>
                </KeyboardAvoidingView>
            </ScrollView>
        </MainLayout>
    )
}