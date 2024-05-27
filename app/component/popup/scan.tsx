import { ImageBackground, Modal, Platform, TouchableOpacity, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { height, width, Бирюзовый } from '../../GLOBAL';
import { MainLayout } from '../layouts/MainLayout';
import { CloseIcon } from '../svg/svg';
import { BlurView } from 'expo-blur';
 
export function ScanModal(props:{visible?: boolean, onRequestClose?: () => void, onBarcodeScanned?: (code?:string) => void}) {
    const [permission, requestPermission] = useCameraPermissions();
    
    return ( 
        // <ImageBackground style={{width:width, height:'100%'}} source={require('../../../assets/image/back.png')}>
            <MainLayout isStatusBar>
                <Modal visible={props.visible} onRequestClose={props.onRequestClose}>
                <TouchableOpacity activeOpacity={0.7} style={{zIndex:999, position:"absolute", top:24, right:0,width:34, height:34}} onPress={props.onRequestClose}>
                    <View style={{padding:8, overflow:"hidden", borderRadius:16, alignItems:'center', gap:4, marginRight:16}} >
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
                    <CameraView onLayout={async()=> await requestPermission()} 
                        onBarcodeScanned={(result)=>{
                            if (Platform.OS == 'ios') {
                                if (result?.cornerPoints[0]?.y>0.3 && result?.cornerPoints[0]?.y<0.7) {
                                    
                                    if (result?.cornerPoints[0]?.x>0.1 && result?.cornerPoints[0]?.x<0.9) {
                                        props.onBarcodeScanned()
                                    }
                                }
                            } else {
                                if (result?.boundingBox?.size.width>30) {
                                    if (result?.cornerPoints[0]?.y>height*0.3 && result?.cornerPoints[0]?.y<height*0.7) {
                                        if (result?.cornerPoints[0]?.x>width*0.1 && result?.cornerPoints[0]?.x<width*0.9) {
                                            props.onBarcodeScanned()
                                        }
                                    }
                                }
                            }
                        }} style={{width:width, height:height}}
                    />
                </Modal>
            </MainLayout>
        // </ImageBackground>
    )
}