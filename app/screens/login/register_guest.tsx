import { BackHandler, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ButtonMy, Input, MainLayout } from '../../component';
import { height, statusBarHeight, tagsTest, width, Бирюзовый, Бирюзовый50 } from '../../GLOBAL';
import { BlurView } from 'expo-blur';
import { styles } from '../../styles';
import { CalendarIcon, CameraIcon, CloseIcon, LogoIcon, ModalCloseIcon, OKIcon, SmileIcon } from '../../component/svg/svg';
import { goBack, navigate } from '../../functions/navigate';
import { useEffect, useRef, useState } from 'react';
import { ModalImg } from '../../component/popup/img';
import RBSheet from '@poki_san/react-native-bottom-sheet';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { delElement } from '../../functions/arrayFormater';
import { showToastable } from 'react-native-toastable';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Formik, FormikErrors, FormikTouched } from 'formik';
import * as yup from 'yup'
import moment from 'moment';
import { fileExpansion, fileName } from '../../functions/addImage';
import apiFetch, { apiFetchFile, apiFetchNoStatus } from '../../functions/api';
import token from '../../model/token';
import { save } from '../../functions/storage';
import { handlerDevicesSubscribe, registerForPushNotificationsAsync } from '../../functions/auth';
import error from '../../model/error';
import { CommonActions } from '@react-navigation/native';
import { navigationRef } from '../../navigate/navigateProps';

const validationsStepOneRegister = yup.object().shape({
    email: yup.string().email('Введите корректный email').required('Обязательное поле'),
    password: yup.string().min(8, 'не менее 8 символов').typeError('Введите верный пароль').required('Обязательное поле'),
    password_confirmation: yup.string().oneOf([yup.ref('password')], 'Пароли не сопадают').required('Обязательное поле'),
})

const validationsStepTwoRegister = yup.object().shape({
    name: yup.string().matches(/^[a-zа-яё\s]+$/iu, 'Имя может состоять только из букв').min(2, 'не менее 2 символов').required('Имя или Никнейм не могут быть пуcтыми'),
    birthday: yup.string().required('Обязательное поле'),
    last_name: yup.string().matches(/^[a-zа-яё\s]+$/iu, 'Фамилия может состоять только из букв').min(2, 'не менее 2 символов').required('Обязательное поле'),
    growth: yup.number().test((value) => String(value).length > 2 && value > 139 && value < 230).required('Обязательное поле'),
    weight: yup.number().test((value) => String(value).length > 1 && value > 34 && value < 200).required('Обязательное поле')
},[['login','name']])

export function RegisterGuestScreen() {
    const [step, setStep] = useState(0)
    const [stepCamera, setStepCamera] = useState(false)
    const [path, setPath] = useState([])
    const [tags, setTags] = useState([])
    const camera = useRef<CameraView>(null)
    const [check, setCheck] = useState(false)

    const [activeTag, setTag] = useState([])
    const [activeTagCount, setTagCount] = useState([])

    const [permission, requestPermission] = useCameraPermissions();
    // if (!permission.granted) {
    //     // Camera permissions are not granted yet.
    //     return (
    //       <View style={styles.container}>
    //         <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
    //         <Button onPress={requestPermission} title="grant permission" />
    //       </View>
    //     );
    //   }

    useEffect(() => {
        (async()=>{
            const tags = await apiFetchNoStatus('/hashtags?new=1','GET',false)
            setTags(tags);
        })();
    }, []);

    useEffect(() => {
        const backAction = () => {
            switch (step) {
                case 0:
                    goBack()
                    break;
                case 5:
                    console.log('ничего не делать');
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
                    // keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                    style={{ flex: 1 }}
                >
                    <Formik
                        validationSchema={
                            step==0&&validationsStepOneRegister ||
                            step==2&&validationsStepTwoRegister
                        }
                        onSubmit={async(value)=>{
                            switch (step) {
                                case 4:
                                    const bodyFormData = new FormData()
                                    bodyFormData.append('name', value?.name)
                                    bodyFormData.append('last_name', value?.last_name)
                                    bodyFormData.append('email', value.email)
                                    bodyFormData.append('password', value.password)
                                    bodyFormData.append('password_confirmation', value.password_confirmation)
                                    value?.telegram?.length > 0 && bodyFormData.append('telegram', value?.telegram)
                                    value?.instagram?.length > 0 && bodyFormData.append('instagram', value?.instagram)
                                    value?.mobile_number?.length > 0 && bodyFormData.append('mobile_number', value?.mobile_number)
                                    value?.count_instagram?.length > 0 && bodyFormData.append('count_instagram', value?.count_instagram)
                                    value?.birthday?.length > 0 && bodyFormData.append('birthday', value?.birthday)
                                    value?.weight?.length > 0 && bodyFormData.append('weight', value?.weight)
                                    value?.growth?.length > 0 && bodyFormData.append('growth', value?.growth)
                                    value?.description?.length > 0 && bodyFormData.append('description', value?.description)
                                    value?.hashtags && bodyFormData.append('hashtags', JSON.stringify(value?.hashtags))
                                    bodyFormData.append('type', 'guest')
                                    path?.length > 0 && path.map(el => {
                                        !el.user_id && bodyFormData.append('images[]', {
                                            uri: el,
                                            name: fileName(el),
                                            type: fileExpansion(el, 'image')
                                        })
                                    })
                                    const result = await apiFetchFile('/register',"POST", false, bodyFormData)
                                    console.log(result);
                                    if (result?.status == 201) {
                                        token.userInput(result?.user, result?.token)
                                        save('@userData',result)
                                        registerForPushNotificationsAsync().then(token => {
                                            !!token && !!result?.token && handlerDevicesSubscribe(result?.token, token)
                                        });
                                        setStep(val=>val+1)
                                    }  else if (result?.status == 422) {
                                        setTimeout(() => error.Input(true, 'Такой пользователь уже есть!', 'Упс!...', Platform.OS=='ios'?175:145), 300);
                                    } else {
                                        error.Input(true,'Такой пользователь уже есть','Упс...', Platform.OS=='ios'?158 :150)
                                    }
                                    break;
                                default:
                                    setStep(val=>val+1)
                                    break;
                            }
                        }}
                        initialValues={{
                            name:'',
                            last_name:'',
                            email:'',
                            password:'',
                            password_confirmation:'',
                            growth:'',
                            birthday:'',
                            weight:'',
                            description:'',
                            hashtags:[],
                            instagram:'',
                            count_instagram:'',
                            mobile_number:'',
                            telegram:''
                        }}
                    >
                        {({values, errors, touched, handleSubmit, handleChange, handleBlur, setFieldValue})=>
                            (<ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled' contentContainerStyle={{flexGrow:1, marginHorizontal:16, marginVertical:Platform.OS=='ios'?statusBarHeight:10, justifyContent:"space-between"}}>
                            <View style={{gap:10}}>
                                {step != 5 && <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                                    switch (step) {
                                        case 0:
                                            goBack()
                                            break;
                                        case 5:
                                            console.log('ничего не делать');
                                            break;
                                        default:
                                            setStep(step-1)
                                            break;
                                    }
                                }} style={{borderRadius:90, transform:[{rotate:'90deg'}],backgroundColor:'#221E1E80', padding:6, position:'absolute', top:Platform.OS=='ios'?28:statusBarHeight+8, zIndex:1}}>
                                    <ModalCloseIcon/>
                                </TouchableOpacity>}
                                {step == 0 && <View style={{marginTop:17}}>
                                    <View style={{marginTop:statusBarHeight, marginBottom:13, alignItems:"center"}}>
                                        <LogoIcon/>
                                    </View>
                                    <Text style={{color:'#ffffff', fontFamily:'PoppinsBold', textAlign:'center', marginTop:-8}}>Приложение красивых людей</Text>
                                </View>}
                            </View>
                            {step == 0 && <View style={{gap:24}}>
                                <BlurView  intensity={30} tint='systemChromeMaterialDark' style={styles.blurContainer}>
                                    <View style={{marginHorizontal:8}}>
                                        <Text style={{color:'white', fontWeight:'700', fontSize:18, textAlign:'center', fontFamily:'PoppinsBold'}}>Регистрация для участницы</Text>
                                    </View>
                                    <View style={{gap:8}}>
                                        <Input 
                                            backgroundColor='#FFFFFF00' 
                                            placeholderTextColor={'#FFFFFF99'} 
                                            title='Email' 
                                            keyboardType='email-address'
                                            style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            value={values.email}
                                            errorText={errors.email}
                                            touched={touched.email}
                                        />
                                        <Input 
                                            backgroundColor='#FFFFFF00' 
                                            placeholderTextColor={'#FFFFFF99'} 
                                            title='Придумайте пароль' 
                                            securePass 
                                            style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            value={values.password}
                                            errorText={errors.password}
                                            touched={touched.password}
                                        />
                                        <Input 
                                            backgroundColor='#FFFFFF00' 
                                            placeholderTextColor={'#FFFFFF99'} 
                                            title='Повторите пароль' 
                                            securePass 
                                            style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                                            onChangeText={handleChange('password_confirmation')}
                                            onBlur={handleBlur('password_confirmation')}
                                            value={values.password_confirmation}
                                            errorText={errors.password_confirmation}
                                            touched={touched.password_confirmation}
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
                            {(step != 0 && step != 5 && step != 6) &&<View style={{marginTop:statusBarHeight+40, marginBottom:15, flex:1}}>
                                <View style={{marginTop:16, gap:8}}>
                                    <Text style={[styles.h4,{fontSize:18, color:'white'}]}>Заполнение анкеты</Text>
                                    <View style={{height:2, width:'100%',backgroundColor:'#FFFFFF33'}}>
                                        <View style={{left:0, top:0, height:2, width:
                                            step == 1 && '19%'||
                                            step == 2 && '38%'||
                                            step == 3 && '57%'||
                                            step == 4 && '76%'||
                                            step == 5 && '95%'||'0%', backgroundColor:Бирюзовый}}/>
                                    </View>
                                </View>
                                {step == 1 && <StepOne onPress={(paths)=>{
                                    const tmp = []
                                    paths.forEach(el=> el.length != 0 && tmp.push(el))                                    
                                    setPath(tmp)
                                    handleSubmit()
                                }}/>}
                                {step == 2 && <StepTwo 
                                    onPress={handleSubmit}
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    setFieldValue={setFieldValue}
                                />}
                                {(step == 3 && tags?.length > 0) && <StepThree 
                                    onPress={handleSubmit}
                                    setFieldValue={setFieldValue}
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    hashtags={tags}
                                    activeTag={activeTag}
                                    activeTagCount={activeTagCount}
                                    setTag={setTag}
                                    setTagCount={setTagCount}
                                />}
                                {step == 4 && <StepFour 
                                    onPress={handleSubmit}
                                    values={values}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />}
                            </View>}
                            {(step == 5 && stepCamera == false) && <StepFive block={check} onPress={async()=>{
                                const request = await requestPermission()
                                if (request.granted) {
                                    setStepCamera(true)
                                }
                            }}/>}
                            {step == 6 && <StepPhoto photo={path} onPress={()=>{
                                const bottomReset = CommonActions.reset({
                                    index: 0,
                                    routes: [{name: "MainGuest"}],
                                  });
                                navigationRef.current?.dispatch(bottomReset)
                            }}/>}
                            <View style={{height:60}}/>
                        </ScrollView>)
                        }
                    </Formik>
                </KeyboardAvoidingView>
            </MainLayout>
            {stepCamera && <View style={{position:"absolute", top:0, left:0, width:width, height:height}}>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>setStepCamera(false)} style={{borderRadius:90, transform:[{rotate:'90deg'}],backgroundColor:'#221E1E99', padding:6, position:'absolute', top:statusBarHeight+8, zIndex:5, pointerEvents:'box-only', left:16}}>
                    <ModalCloseIcon/>
                </TouchableOpacity>
                <Image source={require('../../../assets/image/camera.png')} style={{position:'absolute', width:'100%', height:height-30, top:0, left:0, zIndex:3}}/>
                {permission.granted &&<CameraView ref={camera} facing='front' style={{width:'100%', height:'100%', zIndex:1}}/>}
                <View style={{position:"absolute", zIndex:3, left:0, right:0, bottom:187, alignItems:'center',  width:width}}>
                    <Text style={[styles.additional,{color:'white', marginTop:180}]}>Постарайтесь не двигаться</Text>
                </View>
                <View style={{position:"absolute", zIndex:3, left:0, right:0, bottom:Platform.OS=='ios'?statusBarHeight:20, alignItems:'center', width:width, height:80}}>
                    <TouchableOpacity disabled={step==6} activeOpacity={0.7} onPress={async()=>{
                        const photo = await camera.current?.takePictureAsync({quality: 0.5})
                        setPath(photo);
                        setStepCamera(false)
                        const bodyFormData = new FormData()
                        bodyFormData.append('images[]',{
                            uri: photo?.uri,
                            name: fileName(photo?.uri),
                            type: fileExpansion(photo?.uri, 'image')
                        })
                        const result = await apiFetchFile('/face-check',"POST", true, bodyFormData)
                        if (result?.status == 202) {
                            setStep(6)
                            setCheck(false)
                        }
                    }} style={{borderRadius:180, borderColor:'white', borderWidth:3, width:78, height:78, alignItems:"center", justifyContent:'center', zIndex:5, pointerEvents:'box-only'}}>
                        <View style={{borderRadius:180, backgroundColor:'white', width:66, height:66}}/>
                    </TouchableOpacity>
                </View>
            </View>}
        </ImageBackground>
    )
}

function StepOne(props:{onPress?:(paths?:string[])=>void}) {
    const img = useRef<RBSheet>(null)
    const [paths, setPaths] = useState(['','',''])   
    const [active, setActive] = useState(-1)   
    return (
        <View style={{marginTop:11, flex:1}}>
            <Text style={[styles.bodyText,{fontFamily:'Poppins', color:'#ffffff90'}]}>Добавление фотографий</Text>
            <View style={{flex:1, marginTop:25, alignItems:'center', justifyContent:"space-between"}}>
                <View style={{marginBottom:10}}>
                    <BlurView  intensity={30} tint='systemChromeMaterialDark' style={{width:290, height:290, borderRadius:16, borderWidth:2, borderColor:'#B5B5B54D', overflow:"hidden"}}>
                        <TouchableOpacity onPress={()=>{
                            setActive(0)
                            img.current?.open()
                        }} activeOpacity={0.7} style={{width:290, height:290, alignItems:"center", justifyContent:"center"}}>
                            {paths[0]?
                                <View style={{width:290, height:290}}>
                                    <Image style={{resizeMode:'cover', width:290, height:290}} source={{uri:paths[0]}}/>
                                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                                            const tmp = paths
                                            tmp[0] = ''
                                            setPaths([...tmp])
                                        }} style={{width:33, height:33,borderRadius:90, backgroundColor:'#00000066', zIndex:1, position:"absolute", bottom:9, right:8, alignItems:'center', justifyContent:'center'}}>
                                        <CloseIcon/>
                                    </TouchableOpacity>
                                </View> :
                                <CameraIcon/>
                            }
                        </TouchableOpacity>
                    </BlurView>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:"space-between", marginTop:10}}>
                        <BlurView  intensity={30} tint='systemChromeMaterialDark' style={{width:(280/2), height:(280/2), borderRadius:16, borderWidth:2, borderColor:'#B5B5B54D', overflow:"hidden"}}>
                            <TouchableOpacity onPress={()=>{
                                img.current?.open()
                                setActive(1)
                            }} activeOpacity={0.7} style={{width:(280/2), height:(280/2), alignItems:"center", justifyContent:"center"}}>
                                {paths[1]?
                                    <View style={{width:(280/2), height:(280/2)}}>
                                        <Image style={{resizeMode:'cover', width:(280/2), height:(280/2)}} source={{uri:paths[1]}}/>
                                        <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                                            const tmp = paths
                                            tmp[1] = ''
                                            setPaths([...tmp])
                                        }} style={{width:33, height:33,borderRadius:90, backgroundColor:'#00000066', zIndex:1, position:"absolute", bottom:9, right:8, alignItems:'center', justifyContent:'center'}}>
                                            <CloseIcon/>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <CameraIcon/>
                                }
                            </TouchableOpacity>
                        </BlurView>
                        <BlurView  intensity={30} tint='systemChromeMaterialDark' style={{width:(280/2), height:(280/2), borderRadius:16, borderWidth:2, borderColor:'#B5B5B54D', overflow:"hidden"}}>
                            <TouchableOpacity onPress={()=>{
                                img.current?.open()
                                setActive(2)
                            }} activeOpacity={0.7} style={{width:(280/2), height:(280/2), alignItems:"center", justifyContent:"center"}}>
                                {paths[2]?
                                    <View style={{width:(280/2), height:(280/2)}}>
                                        <Image style={{resizeMode:'cover', width:(280/2), height:(280/2)}} source={{uri:paths[2]}}/>
                                        <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                                            const tmp = paths
                                            tmp[2] = ''
                                            setPaths([...tmp])
                                        }} style={{width:33, height:33,borderRadius:90, backgroundColor:'#00000066', zIndex:1, position:"absolute", bottom:9, right:8, alignItems:'center', justifyContent:'center'}}>
                                            <CloseIcon/>
                                        </TouchableOpacity>
                                    </View>:
                                    <CameraIcon/>
                                }
                            </TouchableOpacity>
                        </BlurView>
                    </View>
                </View>
                <View style={{marginTop:10, width:'100%', marginBottom:15}}><ButtonMy text='Далее' onPress={()=>{
                    const tmp = []
                    paths.forEach(el=>el.length != 0 && tmp.push(el))
                    if (tmp.length > 0) {
                        props.onPress(paths)
                    } else {
                        showToastable({message:'Добавьте одну фотографию'})
                    }
                }} backgroundColor='#88FFF9' colorText='#171717'/></View>
            </View>
            <ModalImg ref={img} onPath={(path)=>{
                const tmp = paths
                tmp[active] = path[0]
                setPaths([...tmp])
                img.current?.close()
            }}/>
        </View>
    )
}

function StepTwo(props:{
    onPress?:()=>void,
    handleChange?: any,
    handleBlur?:any,
    setFieldValue?:any,
    errors?: FormikErrors<{
        name: string;
        last_name: string;
        birthday:string;
        weight:string;
        growth:string;
        description:string;
    }>,
    touched?: FormikTouched<{
        name: string;
        last_name: string;
        birthday:string;
        weight:string;
        growth:string;
        description:string;
    }>,
    values?: {
        name: string;
        last_name: string;
        telegram:string;
        birthday:string;
        weight:string;
        growth:string;
        description:string;
    }
}) {
    const [isDate, setIsDate] = useState(false)
    const [date, setDate] = useState('')
    return (
        <View style={{marginTop:11, flex:1}}>
            <Text style={[styles.bodyText,{fontFamily:'PoppinsMedium', color:'#ffffff90'}]}>Данные обязательные для заполнения</Text>
            <View style={{flex:1, marginTop:25, alignItems:'center', justifyContent:"space-between"}}>
                <View style={{gap:14, width:"100%"}}>
                    <View style={{gap:8}}>
                        <Input 
                            backgroundColor='#FFFFFF00' 
                            placeholderTextColor={'#FFFFFF99'} 
                            title='Имя' 
                            style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                            value={props.values.name}
                            errorText={props.errors.name}
                            touched={props.touched.name}
                            onChangeText={props.handleChange('name')}
                            onBlur={props.handleBlur('name')}
                        />
                        <Input 
                            backgroundColor='#FFFFFF00' 
                            placeholderTextColor={'#FFFFFF99'} 
                            title='Фамилия' 
                            style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                            value={props.values.last_name}
                            errorText={props.errors.last_name}
                            touched={props.touched.last_name}
                            onChangeText={props.handleChange('last_name')}
                            onBlur={props.handleBlur('last_name')}
                        />
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>setIsDate(true)}>
                            <Input 
                                editable={false} 
                                value={props.values.birthday} 
                                backgroundColor='#FFFFFF00' 
                                placeholderTextColor={'#FFFFFF99'} 
                                title='Дата рождения' 
                                errorText={props.errors?.birthday}
                                touched={props.touched?.birthday}
                                style={{borderWidth:1, borderColor:'#FFFFFF99', pointerEvents:"none", paddingRight:20}}
                            />
                            <View style={{position:'absolute', right:10, height:40, top:0, bottom:0, justifyContent:'center'}}>
                                <CalendarIcon/>
                            </View>
                        </TouchableOpacity>
                        {isDate && 
                            <DateTimePickerModal
                                isVisible={isDate}
                                mode="date"
                                is24Hour={true}
                                locale='ru_RU'
                                onConfirm={(value)=>{                    
                                    setDate(moment(value).format("YYYY-MM-DD"))
                                    props.setFieldValue('birthday',moment(value).format("YYYY-MM-DD"))
                                    setIsDate(false)
                                }}
                                onCancel={()=>setIsDate(false)}
                            /> 
                        }
                        <View style={{flexDirection:'row', marginTop:1, flex:1, justifyContent:'space-between'}}>
                            <View style={{width:'48.5%'}}>
                                <Input 
                                    backgroundColor='#FFFFFF00' 
                                    keyboardType='number-pad' 
                                    placeholderTextColor={'#FFFFFF99'} 
                                    title='Рост' 
                                    style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                                    value={props.values.growth}
                                    errorText={props.errors.growth}
                                    touched={props.touched.growth}
                                    onChangeText={props.handleChange('growth')}
                                    onBlur={props.handleBlur('growth')}
                                />
                            </View>
                            <View style={{width:'48.5%'}}>
                                <Input 
                                    backgroundColor='#FFFFFF00' 
                                    keyboardType='number-pad' 
                                    placeholderTextColor={'#FFFFFF99'} 
                                    title='Вес' 
                                    style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                                    value={props.values.weight}
                                    errorText={props.errors.weight}
                                    touched={props.touched.weight}
                                    onChangeText={props.handleChange('weight')}
                                    onBlur={props.handleBlur('weight')}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{gap:4}}>
                        <Text style={[styles.smallText,{color:'#FFFFFF90', marginRight:10, textAlign:'right'}]}>{props.values.description.length}/300</Text>
                        <Input 
                            mode='outlined' 
                            value={props.values.description}
                            errorText={props.errors.description}
                            touched={props.touched.description}
                            onChangeText={props.handleChange('description')}
                            onBlur={props.handleBlur('description')}
                            backgroundColor='#FFFFFF00' 
                            maxLength={300} 
                            placeholderTextColor={'#FFFFFF99'} 
                            title='О себе' 
                            style={{borderWidth:1, borderColor:'#FFFFFF99', height:140}} 
                            multiline
                        />
                    </View>
                </View>
                <View style={{marginTop:10, width:'100%', marginBottom:15}}><ButtonMy text='Далее' onPress={props.onPress} backgroundColor='#88FFF9' colorText='#171717'/></View>
            </View>
        </View>
    )
}

function StepThree(props:{
    onPress?:()=>void,
    setFieldValue?:any,
    activeTag?:any[]
    activeTagCount?:any[]
    setTag?:(activeTag?:any[])=>void,
    setTagCount?:(activeTagCount?:any[])=>void,
    errors?: FormikErrors<{
        hashtags: any[];
    }>,
    touched?: FormikTouched<{
        hashtags: any[];
    }>,
    values?: {
        hashtags: any[];
    },
    hashtags?:any[]
}) {
    const {activeTag, activeTagCount, setTag, setTagCount} = props
    
    return (
        <View style={{marginTop:11, flex:1}}>
            <Text style={[styles.bodyText,{fontFamily:'Poppins', color:'#ffffff90'}]}>Анна, выберите интересы</Text>
            <View style={{flex:1, marginTop:25, alignItems:'center', justifyContent:"space-between"}}>
                <View style={{width:"100%"}}>
                    {props.hashtags.map((el,i)=>(
                        <View key={i} style={{gap:8, marginBottom:16}}>
                            <Text style={[styles.bodyText,{color:'#ffffff'}]}>{el?.title}</Text>
                            <View style={{flexDirection:'row', alignItems:"center", flexWrap:'wrap', gap:8}}>
                                {el?.children.map((el2,i2)=>(
                                    <TouchableOpacity key={i2} activeOpacity={0.7} onPress={()=>{
                                        const index = activeTag.indexOf(el2?.value)
                                        const indexCount = activeTagCount?.findIndex(value => value?.parent == el2?.parent_id)
                                        
                                        let tmp = activeTag
                                        let tmpCount = activeTagCount

                                        if (index==-1) {     
                                            if (indexCount==-1) {
                                                tmpCount.push({parent:el2?.parent_id, count:1})
                                                tmp.push(el2?.value)
                                            } else {
                                                if (tmpCount[indexCount].count<4) {
                                                    tmpCount[indexCount].count += 1
                                                    tmp.push(el2?.value)
                                                } else {
                                                    showToastable({message:'Можно добавить только 4 тегов из одной группы'})
                                                }
                                            }
                                        } else {
                                            tmp = delElement(tmp,index)

                                            tmpCount[indexCount].count -= 1
                                            if (tmpCount[indexCount].count==0) {
                                                tmpCount.splice(indexCount,1)
                                            }
                                        }
                                        
                                        setTag([...tmp])
                                        setTagCount([...tmpCount])
                                        props.setFieldValue('hashtags',[...tmp])
                                       
                                    }} style={{paddingHorizontal:16, alignSelf:'flex-start', paddingVertical:8, borderRadius:16, borderWidth:1, borderColor:Бирюзовый50, backgroundColor:activeTag.indexOf(el2?.value)!=-1?Бирюзовый:'transparent'}}>
                                        <Text style={[styles.smallText,{color:activeTag.indexOf(el2?.value)!=-1?'#181818':'#ffffff'}]}>{el2.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ))}
                </View>
                <View style={{marginTop:10, width:'100%', marginBottom:Platform.OS=="ios"? 40:15}}>
                    <ButtonMy text='Далее' onPress={()=>{
                        console.log(activeTagCount);
                        let count = 0
                        if (activeTagCount?.length == 3) {
                            activeTagCount.forEach(el=>el?.count<=1 &&(count +=1))
                            if (count == 0) {
                                props.onPress()
                            } else {
                                showToastable({message:'Минимум 2 тега из каждой группы'})
                            }
                        } else {
                            showToastable({message:'Не все группы были выбраны'})
                        }
                    }} backgroundColor='#88FFF9' colorText='#171717'/>
                </View>
            </View>
        </View>
    )
}

function StepFour(
    props:{onPress?:()=>void,
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
        <View style={{marginTop:11, flex:1}}>
            <Text style={[styles.bodyText,{fontFamily:'Poppins', color:'#ffffff90'}]}>Анна, Ваш профиль почти готов.</Text>
            <Text style={[styles.bodyText,{fontFamily:'Poppins', color:Бирюзовый, opacity:0.7}]}>Укажите Инстаграм, чтобы получать больше приглашений</Text>
            <View style={{flex:1, marginTop:25, alignItems:'center', justifyContent:"space-between"}}>
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
                                    onBlur={props.handleBlur('instagram')}
                                    onChangeText={props.handleChange('instagram')}
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
                                    onBlur={props.handleBlur('count_instagram')}
                                    onChangeText={props.handleChange('count_instagram')}
                                />
                            </View>
                        </View>
                        <Input 
                            backgroundColor='#FFFFFF00' 
                            placeholderTextColor={'#FFFFFF99'} 
                            title='Телефон' 
                            style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                            value={props.values.mobile_number}
                            onBlur={props.handleBlur('mobile_number')}
                            onChangeText={props.handleChange('mobile_number')}
                        />
                        <Input 
                            backgroundColor='#FFFFFF00' 
                            placeholderTextColor={'#FFFFFF99'} 
                            title='Телеграм' 
                            style={{borderWidth:1, borderColor:'#FFFFFF99'}}
                            value={props.values.telegram}
                            onBlur={props.handleBlur('telegram')}
                            onChangeText={props.handleChange('telegram')}
                        />
                    </View>
                </View>
                <View style={{marginTop:10, width:'100%', marginBottom:15}}><ButtonMy text='Далее' onPress={props.onPress} backgroundColor='#88FFF9' colorText='#171717'/></View>
            </View>
        </View>
    )
}

function StepFive(props:{onPress?:()=>void, block?:boolean}) {
    return (
        <View style={{marginTop:statusBarHeight+60, flex:1}}>
            <Text style={[styles.h4,{fontSize:18, color:'white'}]}>Подтвердите свою личность с помощью селфи</Text>
            <View style={{marginTop:30, alignItems:'center', justifyContent:"space-between", flex:1}}>
                <View style={{borderRadius:180, borderWidth:1, borderColor:Бирюзовый50, alignItems:'center', justifyContent:'center', width:235, height:235}}>
                    <Image source={require('../../../assets/image/face.png')} style={{width:135, height:180}}/>
                </View>
                <View style={{width:'100%', gap:20}}>
                    <View style={{marginHorizontal:16, gap:10}}>
                        <View style={{flexDirection:'row',gap:10}}>
                            <SmileIcon/>
                            <Text style={[styles.bodyText,{color:'white', flex:1}]}>Разместите телефон так, чтобы лицо было в овале</Text>
                        </View>
                        <View style={{flexDirection:'row',gap:10}}>
                            <CameraIcon color={Бирюзовый} opacity={1}/>
                            <Text style={[styles.bodyText,{color:'white', flex:1}]}>Снимите очки и головной убор, так верификация пройдет успешнее</Text>
                        </View>
                    </View>
                    <View style={{marginTop:10, width:'100%', marginBottom:15}}>
                        <ButtonMy text='Пройти верификацию' disabled={props.block} onPress={props.onPress} backgroundColor='#88FFF9' colorText='#171717'/>
                    </View>
                </View>
            </View>
        </View>
    )
}

function StepPhoto(props:{onPress?:()=>void, photo?:{}}) {
    return (
        <View style={{marginTop:statusBarHeight+60, flex:1}}>
            <Text style={[styles.h4,{fontSize:18, color:'white'}]}>Верификация прошла успешно</Text>
            <View style={{marginTop:30, alignItems:'center', justifyContent:"space-between", flex:1}}>
                <View>
                    <View style={{borderRadius:180, borderWidth:1, borderColor:Бирюзовый50, alignItems:'center', overflow:'hidden', justifyContent:'center', width:235, height:235}}>
                        <Image source={{uri:props.photo?.uri}} resizeMode='cover' style={{width:'100%', height:'100%'}}/>
                    </View>
                    <View style={{marginTop:30, gap:8, alignItems:"center"}}>
                        <OKIcon/>
                        <Text style={[styles.h4,{color:Бирюзовый, fontSize:18, textAlign:"center"}]}>Готово</Text>
                    </View>
                   
                </View>
                <View style={{marginTop:10, width:'100%', marginBottom:15}}>
                    <ButtonMy text='Далее' onPress={props.onPress} backgroundColor='#88FFF9' colorText='#171717'/>
                </View>
            </View>
        </View>
    )
}