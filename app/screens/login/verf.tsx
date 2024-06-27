import { BackHandler, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ButtonMy, Input, MainLayout } from '../../component';
import { height, statusBarHeight, tagsTest, width, Бирюзовый, Бирюзовый50 } from '../../GLOBAL';
import { BlurView } from 'expo-blur';
import { styles } from '../../styles';
import { CalendarIcon, CameraIcon, CloseIcon, ModalCloseIcon, OKIcon, SmileIcon } from '../../component/svg/svg';
import { goBack, navigate } from '../../functions/navigate';
import { useEffect, useRef, useState } from 'react';
import { ModalImg } from '../../component/popup/img';
import RBSheet from '@poki_san/react-native-bottom-sheet';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { delElement } from '../../functions/arrayFormater';
import { showToastable } from 'react-native-toastable';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { FormikErrors, FormikTouched } from 'formik';
import moment from 'moment';
import token from '../../model/token';
import { fileExpansion, fileName } from '../../functions/addImage';
import { apiFetchFile } from '../../functions/api';
import { save } from '../../functions/storage';
import { CommonActions } from '@react-navigation/native';
import { navigationRef } from '../../navigate/navigateProps';

export function VerfScreen() {
    const [step, setStep] = useState(0)
    const [check, setCheck] = useState(true)
    const [stepCamera, setStepCamera] = useState(false)
    const [path, setPath] = useState([])
    const camera = useRef<CameraView>(null)
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
    console.log(token?.data);
    
    return ( 
        <ImageBackground style={{width:width, height:height}} source={require('../../../assets/image/back.png')}>
            <MainLayout isStatusBar>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : 'height'}
                    keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                    style={{ flex: 1 }}
                >
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1, marginHorizontal:16, marginVertical:Platform.OS=='ios'?statusBarHeight:10, justifyContent:"space-between"}}>
                        <View style={{gap:10}}>
                            {step != 0 && <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                                switch (step) {
                                    case 0:
                                        goBack()
                                        break;
                                    default:
                                        setStep(step-1)
                                        break;
                                }
                            }} style={{borderRadius:90, transform:[{rotate:'90deg'}],backgroundColor:'#221E1E80', padding:6, position:'absolute', top:Platform.OS=='ios'?28:statusBarHeight+8, zIndex:1}}>
                                <ModalCloseIcon/>
                            </TouchableOpacity>}
                        </View>
                        {(step == 0 && stepCamera == false) && <StepFive buttonBlock={path?.uri?.length > 0} onPress={async()=>{
                            const request = await requestPermission()
                            if (request.granted) {
                                setStepCamera(true)
                            }
                        }}/>}
                        {step == 1 && <StepPhoto photo={path} buttonBlock={check} onPress={()=>{
                            save('@userData',{token:token.token, user:token.data})
                            const bottomReset = CommonActions.reset({
                                index: 0,
                                routes: [{name: "MainGuest"}],
                              });
                            navigationRef.current?.dispatch(bottomReset)
                        }}/>}
                    </ScrollView>
                </KeyboardAvoidingView>
            </MainLayout>
            {stepCamera && <View style={{position:"absolute", top:0, left:0, width:width, height:height}}>
                <TouchableOpacity activeOpacity={0.7} onPress={()=>setStepCamera(false)} style={{borderRadius:90, transform:[{rotate:'90deg'}],backgroundColor:'#221E1E99', padding:6, position:'absolute', top:statusBarHeight+8, zIndex:5, pointerEvents:'box-only', left:16}}>
                    <ModalCloseIcon/>
                </TouchableOpacity>
                <Image source={require('../../../assets/image/camera.png')} style={{position:'absolute', width:'100%', height:'100%', top:0, left:0, zIndex:3}}/>
                {permission.granted &&<CameraView ref={camera} facing='front' style={{width:'100%', height:'100%', zIndex:1}}/>}
                <View style={{position:"absolute", zIndex:3, top:0, left:0, right:0, bottom:0, alignItems:'center', justifyContent:'center', width:width, height:height}}>
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
                            setStep(1)
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

function StepFive(props:{onPress?:()=>void, buttonBlock?:boolean}) {
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
                        <ButtonMy text='Пройти верификацию' disabled={props.buttonBlock} onPress={props.onPress} backgroundColor='#88FFF9' colorText='#171717'/>
                    </View>
                </View>
            </View>
        </View>
    )
}

function StepPhoto(props:{onPress?:()=>void,  buttonBlock?:boolean, photo?:{}}) {
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
                    <ButtonMy text='Далее' disabled={props.buttonBlock} onPress={props.onPress} backgroundColor='#88FFF9' colorText='#171717'/>
                </View>
            </View>
        </View>
    )
}