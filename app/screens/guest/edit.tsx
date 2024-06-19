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
import { showToastable } from 'react-native-toastable';
import { delElement } from '../../functions/arrayFormater';
import token from '../../model/token';
import { Formik } from 'formik';
import * as yup from 'yup'
import apiFetch from '../../functions/api';
import error from '../../model/error';
 
const validations = yup.object().shape({
    name: yup.string().matches(/^[a-zа-яё\s]+$/iu, 'Имя может состоять только из букв').min(2, 'не менее 2 символов').required('Имя или Никнейм не могут быть пуcтыми'),
    last_name: yup.string().matches(/^[a-zа-яё\s]+$/iu, 'Фамилия может состоять только из букв').min(2, 'не менее 2 символов').required('Обязательное поле'),
    growth: yup.number().test((value) => String(value).length > 2 && value > 139 && value < 230).required('Обязательное поле'),
    weight: yup.number().test((value) => String(value).length > 1 && value > 34 && value < 200).required('Обязательное поле')
},[['login','name']])

export function EditGuestScreen() {
    const del = useRef<RBSheet>(null)
    const [isDate, setIsDate] = useState(false)
    const [date, setDate] = useState({text:'',server:new Date()})
    const [text, setText] = useState('')
    const [tag, setTag] = useState(0)
    return ( 
        <MainLayout isStatusBar backgroundColor='#181818'>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1}}>
                <Formik
                    onSubmit={async(value)=>{
                        const result = await apiFetch('/profile/update',"POST",true,value)
                        console.log(result);
                        switch (result?.status) {
                            case 200:
                            case 201:
                            case 202:
                                token?.userUpdate(result?.user, token?.token)
                                showToastable({'message':'Изменения успешно сохранены'})
                                goBack()
                                break;
                        
                            default:
                                error.Input(true,'Что-то пошло не так!','Упс...', Platform.OS=='ios'?158 :150)
                                break;
                        }
                        
                    }}
                    validationSchema={validations}
                    initialValues={{
                        name:token?.data?.name,
                        last_name:token?.data?.last_name,
                        growth:token?.data?.growth?.toString(),
                        birthday:token?.data?.birthday,
                        weight:token?.data?.weight?.toString(),
                        description:token?.data?.description,
                        hashtags:[],
                        instagram:token?.data?.instagram,
                        count_instagram:token?.data?.count_instagram,
                        mobile_number:token?.data?.mobile_number,
                        telegram:token?.data?.telegram
                    }}
                >
                    {({values, handleChange, handleBlur, errors, touched, handleSubmit})=>(
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
                                <Input 
                                    backgroundColor='#FFFFFF00' 
                                    placeholderTextColor={'#FFFFFF99'} 
                                    title='Имя' 
                                    style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    errorText={errors.name}
                                    touched={touched.name}
                                />
                                <Input 
                                    backgroundColor='#FFFFFF00' 
                                    placeholderTextColor={'#FFFFFF99'} 
                                    title='Фамилия' 
                                    style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                                    value={values.last_name}
                                    onChangeText={handleChange('last_name')}
                                    onBlur={handleBlur('last_name')}
                                    errorText={errors.last_name}
                                    touched={touched.last_name}
                                />
                                <TouchableOpacity activeOpacity={0.7} onPress={()=>setIsDate(true)}>
                                    <Input editable={false} value={values.birthday} backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Дата рождения' style={{borderWidth:1, borderColor:'#FFFFFF99', paddingRight:20, pointerEvents:"none"}}/>
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
                                        <Input 
                                            backgroundColor='#FFFFFF00' 
                                            keyboardType='number-pad' 
                                            placeholderTextColor={'#FFFFFF99'} 
                                            title='Рост'
                                            value={values.growth}
                                            onChangeText={handleChange('growth')}
                                            onBlur={handleBlur('growth')}
                                            errorText={errors.growth}
                                            touched={touched.growth}
                                            style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                                        />
                                    </View>
                                    <View style={{width:'48%'}}>
                                        <Input 
                                            backgroundColor='#FFFFFF00' 
                                            keyboardType='number-pad' 
                                            placeholderTextColor={'#FFFFFF99'} 
                                            title='Вес' 
                                            style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                                            value={values.weight}
                                            onChangeText={handleChange('weight')}
                                            onBlur={handleBlur('weight')}
                                            errorText={errors.weight}
                                            touched={touched.weight}
                                        />
                                    </View>
                                </View>
                                <View style={{gap:4}}>
                                    <Text style={[styles.smallText,{color:'#FFFFFF90', marginRight:10, textAlign:'right'}]}>{values.description?.length}/300</Text>
                                    <TextInput
                                        placeholder='Описание'
                                        multiline
                                        maxLength={300}
                                        value={values.description}
                                        onChangeText={handleChange('description')}
                                        onBlur={handleBlur('description')}
                                        placeholderTextColor={'#FFFFFF99'}
                                        style={[styles.bodyText,{ borderRadius:16, borderWidth:1, borderTopLeftRadius:16, borderColor:'#FFFFFF99', borderTopRightRadius:16, maxHeight:230, color:'white', paddingVertical:7, paddingLeft:17}]}
                                    />
                                    {(!!errors.description && touched.description)&&<Text style={[styles.smallText,{color:'#FF000086', paddingLeft:14}]}>{errors.description}</Text>}
                                </View>
                            </View>
                        }
                        {tag==1&&<StepThree/>}
                        {tag==2&&<StepFour values={values} handleBlur={handleBlur} handleChange={handleChange}/>}
                        <View style={{marginVertical:13,paddingHorizontal:16,width:'100%', gap:16}}>
                            {tag==0 && <TouchableOpacity activeOpacity={0.7} onPress={()=>del.current.open()} style={{padding:3}}>
                                <Text style={[styles.bodyText, {color:'#FF000066', textAlign:'center'}]}>Удалить профиль</Text>
                            </TouchableOpacity>}
                            <ButtonMy text='Сохранить изменения' onPress={handleSubmit} backgroundColor='#88FFF9' colorText='#171717'/>
                        </View>
                        <ModalDel ref={del}/>
                    </KeyboardAvoidingView>)}
                </Formik>
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

function StepFour(props:{
    onPress?:()=>void,
    handleChange?: any,
    handleBlur?:any,
    values?: {
        instagram: string;
        count_instagram: string;
        mobile_number:string;
        telegram:string;
    }

}) {
    return (
        <View style={{flex:1, marginHorizontal:16, alignItems:'center', justifyContent:"space-between"}}>
            <View style={{gap:21, width:"100%"}}>
                <View style={{gap:8}}>
                    <View style={{flexDirection:'row', flex:1, justifyContent:'space-between', alignItems:'center'}}>
                        <View style={{width:'55%'}}>
                            <Input 
                                backgroundColor='#FFFFFF00' 
                                placeholderTextColor={'#FFFFFF99'} 
                                title='Инстаграм' 
                                style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                                value={props.values.instagram}
                                onChangeText={props.handleChange('instagram')}
                                onBlur={props.handleBlur('instagram')}
                            />
                        </View>
                        <View style={{width:'43%'}}>
                            <Input 
                                backgroundColor='#FFFFFF00' 
                                keyboardType='number-pad' 
                                placeholderTextColor={'#FFFFFF99'} 
                                title='Подписчики' 
                                style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                                value={props.values.count_instagram}
                                onChangeText={props.handleChange('count_instagram')}
                                onBlur={props.handleBlur('count_instagram')}
                            />
                        </View>
                    </View>
                    <Input 
                        backgroundColor='#FFFFFF00' 
                        placeholderTextColor={'#FFFFFF99'} 
                        title='Телефон' 
                        style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                        value={props.values.mobile_number}
                        onChangeText={props.handleChange('mobile_number')}
                        onBlur={props.handleBlur('mobile_number')}
                    />
                    <Input 
                        backgroundColor='#FFFFFF00' 
                        placeholderTextColor={'#FFFFFF99'} 
                        title='Телеграм' 
                        style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                        value={props.values.telegram}
                        onChangeText={props.handleChange('telegram')}
                        onBlur={props.handleBlur('telegram')}
                    />
                </View>
            </View>
        </View>
    )
}
