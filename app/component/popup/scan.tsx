import { ImageBackground, Modal, Platform, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { height, statusBarHeight, width, Бирюзовый } from '../../GLOBAL';
import { MainLayout } from '../layouts/MainLayout';
import { CloseIcon } from '../svg/svg';
import { BlurView } from 'expo-blur';
import { useState } from 'react';
import token from '../../model/token';
import apiFetch from '../../functions/api';
 
export function ScanModal(props:{visible?: boolean, onRequestClose?: () => void, onBarcodeScanned?: (uri?:string) => void}) {
    const [permission, requestPermission] = useCameraPermissions();
    
    return ( 
        // <ImageBackground style={{width:width, height:'100%'}} source={require('../../../assets/image/back.png')}>
            <MainLayout isStatusBar>
                <Modal visible={props.visible} onRequestClose={props.onRequestClose}>
                <TouchableOpacity activeOpacity={0.7} style={{zIndex:999, position:"absolute", top:statusBarHeight+10, right:0,width:34, height:34,}} onPress={props.onRequestClose}>
                    <View style={{padding:8, zIndex:1, overflow:"hidden", borderRadius:16, alignItems:'center', gap:4, marginRight:23}} >
                        <CloseIcon color={Бирюзовый}/>
                    </View>
                </TouchableOpacity>
                    <View style={{backgroundColor:'#35383FF2', width:width, height:height*0.29, position:"absolute", zIndex:3}}/>
                    <View style={{backgroundColor:'#35383FF2', width:width, height:height*0.29, bottom:0, position:"absolute", zIndex:3}}/>
                    <View style={{bottom:0, top:0, left:0, justifyContent:"center", position:"absolute", zIndex:3}}>
                        <View style={{backgroundColor:'#35383FF2', width:width*0.1, height:height*0.42}}/>
                    </View>
                    <View style={{bottom:0, top:0, right:0, justifyContent:"center", position:"absolute", zIndex:3}}>
                        <View style={{backgroundColor:'#35383FF2', width:width*0.1, height:height*0.42}}/>
                    </View>
                    {/* <View style={{bottom:0, top:0, right:0, left:0, justifyContent:"center", alignItems:'center', position:"absolute", zIndex:3}}>
                        <View style={{position:"absolute",backgroundColor:'#35383FF2', width:width*0.8, height:height*0.42}}/>
                    </View> */}
                    <CameraView barcodeScannerSettings={{barcodeTypes: ["qr"]}} onLayout={async()=> await requestPermission()}
                        onBarcodeScanned={(result)=>{
                            props.onBarcodeScanned(result?.data)
                            props.onRequestClose()
                        }} style={{width:width, height:height}}
                    />
                </Modal>
            </MainLayout>
        // </ImageBackground>
    )
}