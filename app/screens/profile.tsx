import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { MainLayout } from '../component';
import { height, statusBarHeight, width } from '../GLOBAL';
 
export function ProfileScreen() {
    return ( 
        <ImageBackground style={{width:width, height:height}} source={require('../../assets/image/back.png')}>
            <MainLayout isStatusBar>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1}}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : 'height'}
                        keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                        style={{ flex: 1 }}
                    >
                        
                    </KeyboardAvoidingView>
                </ScrollView>
            </MainLayout>
        </ImageBackground>
    )
}