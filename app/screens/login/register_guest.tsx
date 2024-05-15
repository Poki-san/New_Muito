import { BackHandler, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ButtonMy, Input, MainLayout } from '../../component';
import { height, statusBarHeight, tagsTest, width, Бирюзовый, Бирюзовый50 } from '../../GLOBAL';
import { BlurView } from 'expo-blur';
import { styles } from '../../styles';
import { CalendarIcon, CameraIcon, CloseIcon, ModalCloseIcon } from '../../component/svg/svg';
import { goBack, navigate } from '../../functions/navigate';
import { useEffect, useRef, useState } from 'react';
import { ModalImg } from '../../component/popup/img';
import RBSheet from '@nonam4/react-native-bottom-sheet';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { delElement } from '../../functions/arrayFormater';
import { showToastable } from 'react-native-toastable';
 
export function RegisterGuestScreen() {
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
                                <Text style={{color:'#ffffff', fontFamily:'PoppinsBold', textAlign:'center', marginTop:-8}}>Приложение красивых людей</Text>
                            </View>}
                        </View>
                        {step == 0 && <View style={{gap:24}}>
                            <BlurView experimentalBlurMethod='dimezisBlurView' intensity={30} tint='systemChromeMaterialDark' style={styles.blurContainer}>
                                <View style={{marginHorizontal:8}}>
                                    <Text style={{color:'white', fontWeight:'700', fontSize:18, textAlign:'center', fontFamily:'PoppinsBold'}}>Регистрация для участницы</Text>
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
                        {step != 0 &&<View style={{marginTop:statusBarHeight+44, flex:1}}>
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
                            {step == 1 && <StepOne onPress={()=>setStep(2)}/>}
                            {step == 2 && <StepTwo onPress={()=>setStep(3)}/>}
                            {step == 3 && <StepThree onPress={()=>setStep(4)}/>}
                        </View>}
                    </ScrollView>
                </KeyboardAvoidingView>
            </MainLayout>
        </ImageBackground>
    )
}

function StepOne(props:{onPress?:()=>void}) {
    const img = useRef<RBSheet>(null)
    const [paths, setPaths] = useState(['','',''])   
    const [active, setActive] = useState(-1)   
    return (
        <View style={{marginTop:11, flex:1}}>
            <Text style={[styles.bodyText,{fontFamily:'PoppinsMedium', color:'#ffffff90'}]}>Добавление фотографий</Text>
            <View style={{flex:1, marginTop:25, alignItems:'center', justifyContent:"space-between"}}>
                <View>
                    <BlurView experimentalBlurMethod='dimezisBlurView' intensity={30} tint='systemChromeMaterialDark' style={{width:290, height:290, borderRadius:16, borderWidth:2, borderColor:'#B5B5B54D', overflow:"hidden"}}>
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
                        <BlurView experimentalBlurMethod='dimezisBlurView' intensity={30} tint='systemChromeMaterialDark' style={{width:(280/2), height:(280/2), borderRadius:16, borderWidth:2, borderColor:'#B5B5B54D', overflow:"hidden"}}>
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
                        <BlurView experimentalBlurMethod='dimezisBlurView' intensity={30} tint='systemChromeMaterialDark' style={{width:(280/2), height:(280/2), borderRadius:16, borderWidth:2, borderColor:'#B5B5B54D', overflow:"hidden"}}>
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
                <View style={{marginTop:10, width:'100%', marginBottom:15}}><ButtonMy text='Далее' onPress={props.onPress} backgroundColor='#88FFF9' colorText='#171717'/></View>
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

function StepTwo(props:{onPress?:()=>void}) {
    const [text, setText] = useState('')
    const [isDate, setIsDate] = useState(false)
    const [date, setDate] = useState({text:'',server:new Date()})
    return (
        <View style={{marginTop:11, flex:1}}>
            <Text style={[styles.bodyText,{fontFamily:'PoppinsMedium', color:'#ffffff90'}]}>Данные обязательные для заполнения</Text>
            <View style={{flex:1, marginTop:25, alignItems:'center', justifyContent:"space-between"}}>
                <View style={{gap:21, width:"100%"}}>
                    <View style={{gap:8}}>
                        <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Имя' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                        <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Фамилия' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>setIsDate(true)}>
                            <Input editable={false} value={date.text} backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Дата рождения' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
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
                        <View style={{flexDirection:'row', flex:1, justifyContent:'space-between', alignItems:'center'}}>
                            <View style={{width:'48%'}}>
                                <Input backgroundColor='#FFFFFF00' keyboardType='number-pad' placeholderTextColor={'#FFFFFF99'} title='Рост' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                            </View>
                            <View style={{width:'48%'}}>
                                <Input backgroundColor='#FFFFFF00' keyboardType='number-pad' placeholderTextColor={'#FFFFFF99'} title='Вес' style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                            </View>
                        </View>
                    </View>
                    <View style={{gap:4}}>
                        <Text style={[styles.smallText,{color:'#FFFFFF90', marginRight:10, textAlign:'right'}]}>{text.length}/300</Text>
                        <Input mode='outlined' value={text} onChangeText={setText} backgroundColor='#FFFFFF00' maxLength={300} placeholderTextColor={'#FFFFFF99'} title='О себе' style={{borderWidth:1, borderColor:'#FFFFFF99', height:140}} multiline/>
                    </View>
                </View>
                <View style={{marginTop:10, width:'100%', marginBottom:15}}><ButtonMy text='Далее' onPress={props.onPress} backgroundColor='#88FFF9' colorText='#171717'/></View>
            </View>
        </View>
    )
}

function StepThree(props:{onPress?:()=>void}) {
    const [activeTag, setTag] = useState([])
    
    return (
        <View style={{marginTop:11, flex:1}}>
            <Text style={[styles.bodyText,{fontFamily:'PoppinsMedium', color:'#ffffff90'}]}>Анна, выберите интересы</Text>
            <View style={{flex:1, marginTop:25, alignItems:'center', justifyContent:"space-between"}}>
                <View style={{width:"100%"}}>
                    {tagsTest.map((el,i)=>(
                        <View key={i} style={{gap:8, marginBottom:8}}>
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
                <View style={{marginTop:10, width:'100%', marginBottom:15}}><ButtonMy text='Далее' onPress={props.onPress} backgroundColor='#88FFF9' colorText='#171717'/></View>
            </View>
        </View>
    )
}