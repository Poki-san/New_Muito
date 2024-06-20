import { BackHandler, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ButtonMy, Input, MainLayout } from '../../component';
import { height, statusBarHeight, width, Бирюзовый } from '../../GLOBAL';
import { BlurView } from 'expo-blur';
import { styles } from '../../styles';
import { CalendarIcon, CameraIcon, CloseIcon, LogoIcon, ModalCloseIcon } from '../../component/svg/svg';
import { goBack, navigate } from '../../functions/navigate';
import { useEffect, useRef, useState } from 'react';
import { ModalImg } from '../../component/popup/img';
import RBSheet from '@nonam4/react-native-bottom-sheet';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Formik, FormikErrors, FormikTouched } from 'formik';
import * as yup from 'yup'
import moment from 'moment';
import { fileExpansion, fileName } from '../../functions/addImage';
import { apiFetchFile } from '../../functions/api';
import { showToastable } from 'react-native-toastable';
import token from '../../model/token';
import { save } from '../../functions/storage';
import { handlerDevicesSubscribe, registerForPushNotificationsAsync } from '../../functions/auth';

const validationsStepOneRegister = yup.object().shape({
    email: yup.string().email('Введите корректный email').required('Обязательное поле'),
    password: yup.string().min(8, 'не менее 8 символов').typeError('Введите верный пароль').required('Обязательное поле'),
    password_confirmation: yup.string().oneOf([yup.ref('password')], 'Пароли не сопадают').required('Обязательное поле'),
})
const validationsStepTwoRegister = yup.object().shape({
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

export function RegisterOrgScreen() {
    const [step, setStep] = useState(0)
    const [paths, setPaths] = useState('')  
    useEffect(() => {
        const backAction = () => {
            switch (step) {
                case 0:
                    goBack()
                    break;
                default:
                    setStep(step-1)
                    break;
            }
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
    
        return () => backHandler.remove(); // cleanup function to remove event listener
      }, [step]);
    return ( 
        <ImageBackground style={{width:width, height:height}} source={require('../../../assets/image/back.png')}>
            <MainLayout isStatusBar>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : 'height'}
                    keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                    style={{ flex: 1 }}
                >
                    <Formik
                        onSubmit={async(value)=>{
                            if (step==3) {
                                const bodyFormData = new FormData()
                                if (value?.login?.length > 0) {
                                    bodyFormData.append('login', value?.login)
                                } else {
                                    bodyFormData.append('name', value?.name)
                                    bodyFormData.append('last_name', value?.last_name)
                                }
                                bodyFormData.append('email', value.email)
                                bodyFormData.append('password', value.password)
                                bodyFormData.append('password_confirmation', value.password_confirmation)
                                value?.telegram?.length > 0 && bodyFormData.append('telegram', value?.telegram)
                                value?.instagram?.length > 0 && bodyFormData.append('instagram', value?.instagram)
                                value?.birthday?.length > 0 && bodyFormData.append('birthday', value?.birthday)
                                bodyFormData.append('type', 'org')
                                value?.images?.length > 0 && bodyFormData.append('images[]', {
                                    uri: value?.images,
                                    name: fileName(value?.images),
                                    type: fileExpansion(value?.images, 'image')
                                })
                                const result = await apiFetchFile('/register',"POST", false, bodyFormData)
                                console.log(result);
                                if (result?.status == 201) {
                                    token.userInput(result?.user, result?.token)
                                    save('@userData',result)
                                    registerForPushNotificationsAsync().then(token => {
                                        !!token && !!result?.token && handlerDevicesSubscribe(result?.token, token)
                                    });
                                    navigate('Main')
                                }
                            } else {
                                const index = step + 1
                                setStep(index)
                            }
                            // navigate('Main')
                        }}
                        validationSchema={(step==0||step==1)?
                            validationsStepOneRegister
                            :
                            ((step==2)&&validationsStepTwoRegister)
                        }
                        initialValues={{
                            email:'',
                            password:'',
                            password_confirmation:'',
                            images:'',
                            name:'',
                            last_name:'',
                            telegram:'',
                            instagram:'',
                            login:'',
                            birthday:''
                        }}
                    >
                        {({handleSubmit, handleChange, handleBlur, errors, touched, values, setFieldValue})=>(
                        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1, marginHorizontal:16, marginVertical:Platform.OS=='ios'? statusBarHeight:10, justifyContent:"space-between"}}>
                            <View style={{gap:10}}>
                                <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                                    switch (step) {
                                        case 0:
                                            goBack()
                                            break;
                                        default:
                                            setStep(step-1)
                                            break;
                                    }
                                }} style={{borderRadius:90, transform:[{rotate:'90deg'}],backgroundColor:'#221E1E80', padding:6, position:'absolute', top:Platform.OS=='ios'? 28:statusBarHeight+8, zIndex:1}}>
                                    <ModalCloseIcon/>
                                </TouchableOpacity>
                                {step == 0 && <View style={{marginTop:17}}>
                                    <View style={{marginTop:statusBarHeight, marginBottom:13, alignItems:"center"}}>
                                        <LogoIcon/>
                                    </View>
                                    <Text style={{color:'#ffffff', fontFamily:'PoppinsBold', textAlign:'center', marginTop:-8}}>Добавим смысла в праздник</Text>
                                </View>}
                            </View>
                            {step == 0 && <View style={{gap:24}}>
                                <BlurView experimentalBlurMethod='dimezisBlurView' intensity={30} tint='systemChromeMaterialDark' style={styles.blurContainer}>
                                    <View style={{marginHorizontal:8}}>
                                        <Text style={{color:'white', fontWeight:'700', fontSize:18, textAlign:'center', fontFamily:'PoppinsBold'}}>Регистрация для организатора</Text>
                                    </View>
                                    <View style={{gap:8}}>
                                        <Input 
                                            backgroundColor='#FFFFFF00' 
                                            placeholderTextColor={'#FFFFFF99'} 
                                            title='Email' 
                                            style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                                            value={values.email}
                                            errorText={errors.email}
                                            touched={touched.email}
                                            keyboardType='email-address'
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                        />
                                        <Input 
                                            backgroundColor='#FFFFFF00' 
                                            placeholderTextColor={'#FFFFFF99'} 
                                            title='Придумайте пароль' 
                                            securePass 
                                            style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                                            value={values.password}
                                            errorText={errors.password}
                                            touched={touched.password}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                        />
                                        <Input 
                                            backgroundColor='#FFFFFF00' 
                                            placeholderTextColor={'#FFFFFF99'} 
                                            title='Повторите пароль' 
                                            securePass 
                                            style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                                            value={values.password_confirmation}
                                            errorText={errors.password_confirmation}
                                            touched={touched.password_confirmation}
                                            onChangeText={handleChange('password_confirmation')}
                                            onBlur={handleBlur('password_confirmation')}
                                        />
                                    </View>
                                    <ButtonMy text='Зарегистрироваться' onPress={handleSubmit} backgroundColor='#88FFF9' colorText='#171717'/>
                                    <Text style={{color:'white', fontSize:12, textAlign:'center', fontFamily:'Poppins'}}>Нажимая кнопку «Зарегистрироваться», Вы принимаете <Text style={{textDecorationLine:'underline'}}>Политику конфиденциальности</Text> и <Text style={{textDecorationLine:'underline'}}>Пользовательское соглашение</Text></Text>
                                </BlurView>
                                <View style={{gap:10, alignItems:"center"}}>
                                    <Text style={{color:'white', fontWeight:'500', opacity:0.6}}>{'Уже есть аккаунт?'}</Text>
                                    <TouchableOpacity activeOpacity={0.7} onPress={()=>navigate('Auth')}>
                                        <Text style={{color:'white', fontWeight:'700', fontFamily:'PoppinsBold', fontSize:16}}>{'Вход'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>}
                            {step != 0 &&<View style={{flex:1, marginTop:statusBarHeight+44}}>
                                <View style={{marginTop:16, gap:8}}>
                                    <Text style={[styles.h4,{fontSize:18, color:'white'}]}>Заполнение анкеты</Text>
                                    <View style={{height:2, width:'100%',backgroundColor:'#FFFFFF33'}}>
                                        <View style={{left:0, top:0, height:2, width:step == 1 &&'30%'||step==2&&'65%'||step==3&&'90%'||'0%', backgroundColor:Бирюзовый}}/>
                                    </View>
                                </View>
                                {step == 1 && <StepOne path={paths} setImg={setPaths} onPress={()=>{
                                    if (paths?.length == 0) {
                                        showToastable({message:'Добавьте фотографию'})
                                    } else{
                                        setFieldValue('images',paths)
                                        handleSubmit()
                                    }
                                }}/>}
                                {step == 2 && <StepTwo 
                                    values={values} 
                                    handleChange={handleChange} 
                                    handleBlur={handleBlur} 
                                    onPress={handleSubmit}
                                    errors={errors}
                                    touched={touched}
                                />}
                                {step == 3 && <StepThree 
                                    onPress={handleSubmit}
                                    setFieldValue={setFieldValue}
                                    handleChange={handleChange} 
                                    handleBlur={handleBlur}
                                    values={values}
                                />}
                            </View>}
                        </ScrollView>)}
                    </Formik>
                </KeyboardAvoidingView>    
            </MainLayout>
        </ImageBackground>
    )
}

function StepOne(props:{onPress?:()=>void, setImg?:(path?:string)=>void, path?:string}) {
    const img = useRef<RBSheet>(null)
    return (
        <View style={{marginTop:11, flex:1}}>
            <Text style={[styles.bodyText,{fontFamily:'Poppins', color:'#ffffff90'}]}>Вы можете добавить личную фотографию, логотип или картинку.</Text>
            <View style={{flex:1, marginTop:25, alignItems:'center', justifyContent:"space-between"}}>
                <BlurView experimentalBlurMethod='dimezisBlurView' intensity={30} tint='systemChromeMaterialDark' style={{width:290, height:290, borderRadius:16, borderWidth:2, borderColor:'#B5B5B54D', overflow:"hidden"}}>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>img.current?.open()} style={{width:290, height:290, alignItems:"center", justifyContent:"center"}}>
                        {props.path?
                            <View style={{width:290, height:290}}>
                                <Image style={{resizeMode:'cover', width:290, height:290}} source={{uri:props.path}}/>
                                <TouchableOpacity activeOpacity={0.7} onPress={()=>props.setImg('')} style={{width:33, height:33,borderRadius:90, backgroundColor:'#00000066', zIndex:1, position:"absolute", bottom:9, right:8, alignItems:'center', justifyContent:'center'}}>
                                    <CloseIcon/>
                                </TouchableOpacity>
                            </View> :
                            <CameraIcon/>
                        }
                    </TouchableOpacity>
                </BlurView>
                <View style={{marginTop:10, width:'100%', marginBottom:15}}><ButtonMy text='Далее' onPress={props.onPress} backgroundColor='#88FFF9' colorText='#171717'/></View>
            </View>
            <ModalImg ref={img} onPath={(path)=>{
                props.setImg(path[0])
                img.current?.close()
            }}/>
        </View>
    )
}

function StepTwo(props:{
    onPress?:()=>void,
    handleChange?: any,
    handleBlur?:any,
    errors?: FormikErrors<{
        name: string;
        last_name: string;
        login:string;
    }>,
    touched?: FormikTouched<{
        name: string;
        last_name: string;
        login:string;
    }>,
    values?: {
        name: string;
        last_name: string;
        telegram:string;
        login:string;
    }
}) {    
    return (
        <View style={{marginTop:11, flex:1}}>
            <Text style={[styles.bodyText,{fontFamily:'Poppins', color:'#ffffff90'}]}>Данные обязательные для заполнения</Text>
            <View style={{flex:1, marginTop:25, alignItems:'center', justifyContent:"space-between"}}>
                <View style={{gap:21, width:"100%"}}>
                    <View style={{gap:8}}>
                        <Input 
                            backgroundColor='#FFFFFF00' 
                            placeholderTextColor={'#FFFFFF99'} 
                            title='Имя'
                            value={props.values.name}
                            onChangeText={props.handleChange('name')}
                            onBlur={props.handleBlur('name')}
                            errorText={props.errors.name}
                            touched={props.touched.name}
                            style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                        />
                        <Input 
                            backgroundColor='#FFFFFF00' 
                            placeholderTextColor={'#FFFFFF99'} 
                            title='Фамилия' 
                            value={props.values.last_name}
                            onChangeText={props.handleChange('last_name')}
                            onBlur={props.handleBlur('last_name')}
                            errorText={props.errors.last_name}
                            touched={props.touched.last_name}
                            style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                        />
                        <Text style={[styles.bodyText,{textAlign:'center', color:'white'}]}>или</Text>
                        <Input 
                            backgroundColor='#FFFFFF00' 
                            placeholderTextColor={'#FFFFFF99'} 
                            title='Никнейм' 
                            style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                            value={props.values.login}
                            onChangeText={props.handleChange('login')}
                            onBlur={props.handleBlur('login')}
                            errorText={props.errors.login}
                            touched={props.touched.login}
                        />
                    </View>
                    <Image source={require('../../../assets/image/line.png')} style={{height:1, width:width-32}}/>
                    <View style={{gap:4}}>
                        <Input 
                            backgroundColor='#FFFFFF00' 
                            placeholderTextColor={'#FFFFFF99'} 
                            title='Телеграм' 
                            value={props.values.telegram}
                            onChangeText={props.handleChange('telegram')}
                            onBlur={props.handleBlur('telegram')}
                            style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                        />
                        <Text style={[styles.smallText,{color:'#FFFFFF90', marginLeft:10}]}>Ваш контакт будет доступен только одобренным девушкам</Text>
                    </View>
                </View>
                <View style={{marginTop:10, width:'100%', marginBottom:15}}><ButtonMy text='Далее' onPress={props.onPress} backgroundColor='#88FFF9' colorText='#171717'/></View>
            </View>
        </View>
    )
}

function StepThree(props:{
    onPress?:()=>void, 
    handleChange?: any,
    setFieldValue?:any,
    handleBlur?:any,
    errors?: FormikErrors<{
        birthday: string;
        instagram:string;
    }>,
    touched?: FormikTouched<{
        birthday:string;
        instagram:string;
    }>,
    values?: {
        birthday: string;
        instagram: string;
    }
}) {
    const [isDate, setIsDate] = useState(false)
    return (
        <View style={{marginTop:11, flex:1}}>
            <Text style={[styles.bodyText,{fontFamily:'Poppins', color:'#ffffff90'}]}>Данные обязательные для заполнения</Text>
            <View style={{flex:1, marginTop:25, alignItems:'center', justifyContent:"space-between"}}>
                <View style={{gap:21, width:"100%"}}>
                    <View style={{gap:8}}>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>setIsDate(true)}>
                            <Input editable={false} value={props.values?.birthday} backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Дата рождения' style={{borderWidth:1, borderColor:'#FFFFFF99', paddingRight:20}}/>
                            <View style={{position:'absolute', right:10, top:0, bottom:0, justifyContent:'center'}}><CalendarIcon/></View>
                        </TouchableOpacity>
                        <Input 
                            backgroundColor='#FFFFFF00' 
                            placeholderTextColor={'#FFFFFF99'} 
                            title='Инстаграм' 
                            style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                            onBlur={props.handleBlur('instagram')}
                            onChangeText={props.handleChange('instagram')}
                            value={props.values.instagram}
                        />
                    </View>
                </View>
                <View style={{marginTop:10, width:'100%', marginBottom:15}}><ButtonMy text='Зарегестрироваться' onPress={props.onPress} backgroundColor='#88FFF9' colorText='#171717'/></View>
            </View>
            {isDate && 
                <DateTimePickerModal
                    isVisible={isDate}
                    mode="date"
                    is24Hour={true}
                    locale='ru_RU'
                    onConfirm={(value)=>{     
                        props.setFieldValue('birthday',moment(value).format("YYYY-MM-DD"))
                        setIsDate(false)
                    }}
                    onCancel={()=>setIsDate(false)}
                /> 
            }
        </View>
    )
}