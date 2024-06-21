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
import { Formik } from 'formik';
import * as yup from 'yup'
import token from '../../model/token';
import moment from 'moment';
import { showToastable } from 'react-native-toastable';
import error from '../../model/error';
import { apiFetchFile } from '../../functions/api';
const validations = yup.object().shape({
    email: yup.string().email('Введите корректный email').required('Обязательное поле'),
    name: yup.string().when('login',{
        is:login=>!login || login.length ==0,
        then:()=>yup.string().matches(/^[a-zа-яё\s]+$/iu, 'Имя может состоять только из букв').min(2, 'не менее 2 символов').required('Имя или Никнейм не могут быть пуcтыми')
    }),
    login: yup.string().when('name',{
        is:name=>!name || name.length == 0,
        then:()=>yup.string().matches(/^[a-zа-яё\s]+$/iu, 'Никнейм может состоять только из букв').min(2, 'не менее 2 символов').required('Имя или Никнейм не могут быть пуcтыми')
    }),
    last_name: yup.string().when('name',{
        is:name=>name,
        then:()=>yup.string().matches(/^[a-zа-яё\s]+$/iu, 'Фамилия может состоять только из букв').min(2, 'не менее 2 символов').required('Обязательное поле')
    }),
},[['login','name']])

export function EditOrgScreen() {
    const del = useRef<RBSheet>(null)
    const [isDate, setIsDate] = useState(false)
    const [date, setDate] = useState({text:'',server:new Date()})
    return ( 
        <MainLayout isStatusBar backgroundColor='#181818'>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1}}>
                <Formik
                    onSubmit={async(value)=>{
                        const bodyFormData = new FormData()
                        
                        value?.login != token?.data?.login && bodyFormData.append('login', value?.login)
                        value?.name && bodyFormData.append('name', value?.name)
                        value?.last_name && bodyFormData.append('last_name', value?.last_name)
                        // bodyFormData.append('email', value.email)
                        value?.telegram?.length > 0 && bodyFormData.append('telegram', value?.telegram)
                        value?.instagram?.length > 0 && bodyFormData.append('instagram', value?.instagram)
                        value?.birthday?.length > 0 && bodyFormData.append('birthday', value?.birthday)
                        console.log(bodyFormData);
                        
                        const result = await apiFetchFile('/profile/update',"POST",true,bodyFormData)
                        // console.log(result);
                        switch (result?.status) {
                            case 200:
                            case 201:
                            case 202:
                                token?.userUpdate(result?.user, token?.token)
                                showToastable({'message':'Изменения успешно сохранены'})
                                goBack()
                                break;
                        
                            default:
                                error.Input(true,'Что-то пошло не так!','Упс...', Platform.OS=='ios'?158:150)
                                break;
                        }
                    }}
                    validationSchema={validations}
                    initialValues={{
                        email:token?.data?.email,
                        name:token?.data?.name,
                        last_name:token?.data?.last_name,
                        telegram:token?.data?.telegram,
                        instagram:token?.data?.instagram,
                        login:token?.data?.login,
                        birthday:token?.data?.birthday
                    }}
                >
                    {({values, handleBlur, handleChange, setFieldValue, errors, handleSubmit, touched})=>(
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
                            <Text style={[styles.bodyText,{textAlign:'center', color:'white'}]}>или</Text>
                            <Input 
                                backgroundColor='#FFFFFF00' 
                                placeholderTextColor={'#FFFFFF99'} 
                                title='Никнейм' 
                                style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                                value={values.login}
                                onChangeText={handleChange('login')}
                                onBlur={handleBlur('login')}
                                errorText={errors.login}
                                touched={touched.login}
                            />
                            {/* <Input 
                                backgroundColor='#FFFFFF00' 
                                placeholderTextColor={'#FFFFFF99'} 
                                title='Email' 
                                style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                errorText={errors.email}
                                touched={touched.email}
                            /> */}
                            {/* <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Город' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/> */}
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>setIsDate(true)}>
                                <Input editable={false} value={values.birthday} backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Дата рождения' style={{borderWidth:1, borderColor:'#FFFFFF99', paddingRight:20}}/>
                                <View style={{position:'absolute', right:10, top:0, bottom:0, justifyContent:'center'}}><CalendarIcon/></View>
                            </TouchableOpacity>
                            {isDate && 
                                <DateTimePickerModal
                                    isVisible={isDate}
                                    mode="date"
                                    is24Hour={true}
                                    locale='ru_RU'
                                    onConfirm={(value)=>{  
                                        setFieldValue('birthday',moment(value).format("YYYY-MM-DD"))                  
                                        setIsDate(false)
                                    }}
                                    onCancel={()=>setIsDate(false)}
                                /> 
                            }
                            <Input 
                                backgroundColor='#FFFFFF00' 
                                placeholderTextColor={'#FFFFFF99'} 
                                title='Телеграм' 
                                style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                                value={values.telegram}
                                onChangeText={handleChange('telegram')}
                                onBlur={handleBlur('telegram')}
                            />
                            <Input 
                                backgroundColor='#FFFFFF00' 
                                placeholderTextColor={'#FFFFFF99'} 
                                title='Инстаграм' 
                                style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                                value={values.instagram}
                                onChangeText={handleChange('instagram')}
                                onBlur={handleBlur('instagram')}
                            />
                        </View>
                        <View style={{marginVertical:13,paddingHorizontal:16,width:'100%', gap:16}}>
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>del.current.open()} style={{padding:3}}>
                                <Text style={[styles.bodyText, {color:'#FF000066', textAlign:'center'}]}>Удалить профиль</Text>
                            </TouchableOpacity>
                            <ButtonMy text='Сохранить изменения' onPress={handleSubmit} backgroundColor='#88FFF9' colorText='#171717'/>
                        </View>
                        <ModalDel ref={del}/>
                        </KeyboardAvoidingView>
                    )}
                </Formik>
            </ScrollView>
        </MainLayout>
    )
}