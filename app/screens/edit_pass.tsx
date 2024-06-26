import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ButtonMy, Input, MainLayout, ModalRecovery } from '../component';
import { statusBarHeight } from '../GLOBAL';
import { styles } from '../styles';
import { goBack } from '../functions/navigate';
import { BackArrowIcon } from '../component/svg/svg';
import { useRef } from 'react';
import RBSheet from '@poki_san/react-native-bottom-sheet';
import { Formik } from 'formik';
import * as yup from 'yup'
import apiFetch from '../functions/api';
import { showToastable } from 'react-native-toastable';
 
const validations = yup.object().shape({
    old_password: yup.string().min(8, 'не менее 8 символов').typeError('Введите верный пароль').required('Обязательное поле'),
    password: yup.string().min(8, 'не менее 8 символов').typeError('Введите верный пароль').required('Обязательное поле'),
    password_confirmation: yup.string().oneOf([yup.ref('password')], 'Пароли не сопадают').required('Обязательное поле'),
})
export function EditPassScreen() {
    const recovery = useRef<RBSheet>()
    return ( 
        <MainLayout isStatusBar backgroundColor='#181818'>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1}}>
                <Formik 
                    onSubmit={async(value)=>{
                        const result = await apiFetch('/email/password','POST',true,value)
                        switch (result?.status) {
                            case 200:
                            case 201:
                            case 202:
                                showToastable({'message':'Ваш пароль успешно изменен'})
                                goBack()
                                break;
                        
                            default:
                                break;
                        }
                        
                    }}
                    validationSchema={validations}
                    initialValues={{
                        old_password:'',
                        password:'',
                        password_confirmation:''
                    }}
                >
                    {({values, handleChange, handleBlur, handleSubmit, errors, touched})=>(
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
                                <Text style={[styles.h4, {color:'white'}]}>Изменение пароля</Text>
                                <View  style={{width:42, height:42}}/>
                            </View>
                        </View>
                            <View style={{gap:8, marginHorizontal:16, flex:1}}>
                                <Input 
                                    backgroundColor='#FFFFFF00' 
                                    securePass 
                                    placeholderTextColor={'#FFFFFF99'} 
                                    title='Старый пароль' 
                                    style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                                    value={values.old_password}
                                    errorText={errors.old_password}
                                    touched={touched.old_password}
                                    onChangeText={handleChange('old_password')}
                                    onBlur={handleBlur('old_password')}
                                />
                                <TouchableOpacity activeOpacity={0.7} onPress={()=>recovery.current?.open()}>
                                    <Text style={{fontSize:12, color:'#88FFF966', textAlign:"right"}}>Забыли пароль?</Text>
                                </TouchableOpacity>
                                <Input 
                                    backgroundColor='#FFFFFF00' 
                                    securePass 
                                    placeholderTextColor={'#FFFFFF99'} 
                                    title='Новый пароль' 
                                    style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                                    value={values.password}
                                    errorText={errors.password}
                                    touched={touched.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                />
                                <Input 
                                    backgroundColor='#FFFFFF00' 
                                    securePass 
                                    placeholderTextColor={'#FFFFFF99'} 
                                    title='Повторите новый пароль' 
                                    style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                                    value={values.password_confirmation}
                                    errorText={errors.password_confirmation}
                                    touched={touched.password_confirmation}
                                    onChangeText={handleChange('password_confirmation')}
                                    onBlur={handleBlur('password_confirmation')}
                                />
                            </View>
                        
                        <View style={{marginVertical:13,paddingHorizontal:16,width:'100%', gap:16}}>
                            <ButtonMy text='Сохранить изменения' onPress={handleSubmit} backgroundColor='#88FFF9' colorText='#171717'/>
                        </View>
                    </KeyboardAvoidingView>)}
                </Formik>
            </ScrollView>
            <ModalRecovery ref={recovery}/>
        </MainLayout>
    )
}
