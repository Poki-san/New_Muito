import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MainLayout, ProfileBlock } from '../../component';
import { statusBarHeight, width } from '../../GLOBAL';
import { CameraIcon, EditIcon, MiniHeartIcon } from '../../component/svg/svg';
import { styles } from '../../styles';
import { ModalImg } from '../../component/popup/img';
import { useRef, useState } from 'react';
import RBSheet from '@nonam4/react-native-bottom-sheet';
import avatar from '../../model/avatar';
import { observer } from 'mobx-react-lite';
import { ModalEmailHelp } from '../../component/popup/help';
import { navigate } from '../../functions/navigate';
 
export const ProfileScreen = observer(() => {
    const img = useRef<RBSheet>(null)
    const help = useRef<RBSheet>(null)
    return ( 
        <MainLayout isStatusBar backgroundColor='#181818'>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1}}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : 'height'}
                    keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                    style={{ flex: 1 }}
                >
                    <View style={{width:'100%', flex:1, alignItems:'center', marginTop:statusBarHeight+20}}>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>img.current?.open()} style={styles.profileCameraContainer}>
                            {avatar.uri ? <>
                            <Image source={{uri:avatar.uri}} style={{width:'100%', height:'100%', borderRadius:16}}/>
                            <TouchableOpacity activeOpacity={0.7} style={{position:'absolute', alignItems:"center", justifyContent:"center", bottom:6, right:6, backgroundColor:'#221E1E80', pointerEvents:"box-only", padding:5, width:32, height:32, borderRadius:90}}>
                                <EditIcon/>
                            </TouchableOpacity></>
                            : <CameraIcon/>}
                            
                        </TouchableOpacity>
                        <View style={{gap:4, alignItems:'center'}}>
                            <Text style={[styles.h2,{color:"white", textAlign:"center", fontFamily:"PoppinsSemiBold"}]}>Александр</Text>
                            <Text style={[styles.smallText,{color:"#FFFFFF99", textAlign:"center"}]}>info21@mail.com</Text>
                            <View style={{flexDirection:"row", alignItems:"center", gap:15}}>
                                <Text style={[styles.bodyText,{color:"#FFFFFF99", fontFamily:'PoppinsMedium'}]}>Москва</Text>
                                <View style={{flexDirection:'row', alignItems:"center", gap:4}}>
                                    <MiniHeartIcon/>
                                    <Text style={[styles.bodyText,{color:"#FFFFFF"}]}>5.0</Text>
                                </View>
                            </View>
                        </View>
                        <Image style={{width:width, height:1, marginVertical:16, opacity:0.9}} source={require('../../../assets/image/line.png')}/>
                        <View style={{paddingHorizontal:16, width:'100%', gap:8, flex:1}}>
                            <ProfileBlock text='Скрытые анкеты' onPress={()=>navigate('NoWatch')}/>
                            <ProfileBlock text='Редактировать профиль' onPress={()=>navigate('EditOrg')}/>
                            <ProfileBlock text='Изменить пароль'/>
                            <ProfileBlock text='Помощь' msgIcon={true} onPress={()=>help.current.open()}/>
                        </View>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>navigate('Auth')} style={{width:'100%', marginBottom:80}}>
                            <Text style={[styles.smallText,{color:"#FFFFFF99", textAlign:'center'}]}>Выйти из аккаунта</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                <ModalImg ref={img} onPath={(path)=>avatar.Input(path[0])}/>
                <ModalEmailHelp ref={help}/>
            </ScrollView> 
        </MainLayout>
    )
})