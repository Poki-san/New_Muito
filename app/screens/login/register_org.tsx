import { BackHandler, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ButtonMy, Input, MainLayout } from '../../component';
import { height, statusBarHeight, width, Бирюзовый } from '../../GLOBAL';
import { BlurView } from 'expo-blur';
import { styles } from '../../styles';
import { CalendarIcon, CameraIcon, CloseIcon, ModalCloseIcon } from '../../component/svg/svg';
import { goBack, navigate } from '../../functions/navigate';
import { useEffect, useRef, useState } from 'react';
import { ModalImg } from '../../component/popup/img';
import RBSheet from '@nonam4/react-native-bottom-sheet';
import DateTimePickerModal from "react-native-modal-datetime-picker";
 
export function RegisterOrgScreen() {
    const [step, setStep] = useState(0)
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
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1, marginHorizontal:16, marginVertical:10, justifyContent:"space-between"}}>
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
                            }} style={{borderRadius:90, transform:[{rotate:'90deg'}],backgroundColor:'#221E1E80', padding:6, position:'absolute', top:statusBarHeight+8, zIndex:1}}>
                                <ModalCloseIcon/>
                            </TouchableOpacity>
                            {step == 0 && <View style={{marginTop:17}}>
                                <Text style={{fontSize:60, fontWeight:'500', color:'#83FDF4', fontFamily:'OswaldMedium', textAlign:'center'}}>MUITO</Text>
                                <Text style={{color:'#ffffff', fontFamily:'PoppinsBold', textAlign:'center', marginTop:-8}}>Добавим смысла в праздник</Text>
                            </View>}
                        </View>
                        {step == 0 && <View style={{gap:24}}>
                            <BlurView experimentalBlurMethod='dimezisBlurView' intensity={30} tint='systemChromeMaterialDark' style={styles.blurContainer}>
                                <View style={{marginHorizontal:8}}>
                                    <Text style={{color:'white', fontWeight:'700', fontSize:18, textAlign:'center', fontFamily:'PoppinsBold'}}>Регистрация для организатора</Text>
                                </View>
                                <View style={{gap:8}}>
                                    <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Логин' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                                    <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Придумайте пароль' securePass style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                                    <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Повторите пароль' securePass style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                                </View>
                                <ButtonMy text='Зарегистрироваться' onPress={()=>setStep(1)} backgroundColor='#88FFF9' colorText='#171717'/>
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
                            {step == 1 && <StepOne onPress={()=>setStep(2)}/>}
                            {step == 2 && <StepTwo onPress={()=>setStep(3)}/>}
                            {step == 3 && <StepThree onPress={()=>{}}/>}
                        </View>}
                    </ScrollView>
                </KeyboardAvoidingView>    
            </MainLayout>
        </ImageBackground>
    )
}

function StepOne(props:{onPress?:()=>void}) {
    const img = useRef<RBSheet>(null)
    const [paths, setPaths] = useState('')  
    return (
        <View style={{marginTop:11, flex:1}}>
            <Text style={[styles.bodyText,{fontFamily:'PoppinsMedium', color:'#ffffff90'}]}>Вы можете добавить личную фотографию, логотип или картинку.</Text>
            <View style={{flex:1, marginTop:25, alignItems:'center', justifyContent:"space-between"}}>
                <BlurView experimentalBlurMethod='dimezisBlurView' intensity={30} tint='systemChromeMaterialDark' style={{width:290, height:290, borderRadius:16, borderWidth:2, borderColor:'#B5B5B54D', overflow:"hidden"}}>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>img.current?.open()} style={{width:290, height:290, alignItems:"center", justifyContent:"center"}}>
                        {paths[0]?
                            <View style={{width:290, height:290}}>
                                <Image style={{resizeMode:'cover', width:290, height:290}} source={{uri:paths}}/>
                                <TouchableOpacity activeOpacity={0.7} onPress={()=>setPaths('')} style={{width:33, height:33,borderRadius:90, backgroundColor:'#00000066', zIndex:1, position:"absolute", bottom:9, right:8, alignItems:'center', justifyContent:'center'}}>
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
                setPaths(path[0])
                img.current?.close()
            }}/>
        </View>
    )
}

function StepTwo(props:{onPress?:()=>void}) {
    return (
        <View style={{marginTop:11, flex:1}}>
            <Text style={[styles.bodyText,{fontFamily:'PoppinsMedium', color:'#ffffff90'}]}>Данные обязательные для заполнения</Text>
            <View style={{flex:1, marginTop:25, alignItems:'center', justifyContent:"space-between"}}>
                <View style={{gap:21, width:"100%"}}>
                    <View style={{gap:8}}>
                        <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Имя' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                        <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Фамилия' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                        <Text style={[styles.bodyText,{textAlign:'center', color:'white'}]}>или</Text>
                        <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Никнейм' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                    </View>
                    <Image source={require('../../../assets/image/line.png')} style={{height:1, width:width-32}}/>
                    <View style={{gap:4}}>
                        <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Телеграм' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                        <Text style={[styles.smallText,{color:'#FFFFFF90', marginLeft:10}]}>Ваш контакт будет доступен только одобренным девушкам</Text>
                    </View>
                </View>
                <View style={{marginTop:10, width:'100%', marginBottom:15}}><ButtonMy text='Далее' onPress={props.onPress} backgroundColor='#88FFF9' colorText='#171717'/></View>
            </View>
        </View>
    )
}

function StepThree(props:{onPress?:()=>void}) {
    const [isDate, setIsDate] = useState(false)
    const [date, setDate] = useState({text:'',server:new Date()})
    return (
        <View style={{marginTop:11, flex:1}}>
            <Text style={[styles.bodyText,{fontFamily:'PoppinsMedium', color:'#ffffff90'}]}>Данные обязательные для заполнения</Text>
            <View style={{flex:1, marginTop:25, alignItems:'center', justifyContent:"space-between"}}>
                <View style={{gap:21, width:"100%"}}>
                    <View style={{gap:8}}>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>setIsDate(true)}>
                            <Input editable={false} value={date.text} backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Дата рождения' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                            <View style={{position:'absolute', right:10, top:0, bottom:0, justifyContent:'center'}}><CalendarIcon/></View>
                        </TouchableOpacity>
                        <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Инстаграм' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                    </View>
                </View>
                <View style={{marginTop:10, width:'100%', marginBottom:15}}><ButtonMy text='Далее' onPress={props.onPress} backgroundColor='#88FFF9' colorText='#171717'/></View>
            </View>
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
        </View>
    )
}