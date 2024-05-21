import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MainLayout } from '../component';
import { height, statusBarHeight, width } from '../GLOBAL';
import { CameraIcon } from '../component/svg/svg';
import { styles } from '../styles';
 
export function ProfileScreen() {
    return ( 
        // <ImageBackground style={{width:width, height:height}} source={require('../../assets/image/back.png')}>
            <MainLayout isStatusBar backgroundColor='#181818'>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1}}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : 'height'}
                        keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                        style={{ flex: 1 }}
                    >
                        <View style={{width:'100%', alignItems:'center', marginTop:statusBarHeight+20}}>
                            <TouchableOpacity activeOpacity={0.7} style={{width:width*0.5, marginBottom:8, alignItems:"center", justifyContent:"center", borderRadius:16, height:width*0.5, backgroundColor:'#00000044'}}>
                                <CameraIcon/>
                            </TouchableOpacity>
                            <Text style={[styles.h2,{color:"white", fontFamily:"PoppinsSemiBold"}]}>Александр</Text>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </MainLayout>
        // </ImageBackground>
    )
} 