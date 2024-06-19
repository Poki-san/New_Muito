import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MainLayout, ProfileBlock } from '../../component';
import { statusBarHeight, width } from '../../GLOBAL';
import { CameraIcon, CloseIcon, EditIcon, MiniHeartIcon } from '../../component/svg/svg';
import { styles } from '../../styles';
import { ModalImg } from '../../component/popup/img';
import { useRef, useState } from 'react';
import RBSheet from '@nonam4/react-native-bottom-sheet';
import avatar from '../../model/avatar';
import { observer } from 'mobx-react-lite';
import { ModalEmailHelp } from '../../component/popup/help';
import { navigate } from '../../functions/navigate';
import { logOut } from '../../functions/auth';
import token from '../../model/token';
import apiFetch from '../../functions/api';
 
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
                        <View style={styles.profileCameraContainer}>
                            {token?.data?.img ? 
                            <>
                                <Image source={{uri:token?.data?.img[0]?.uri}} style={{width:'100%', height:'100%', borderRadius:16}}/>
                                <TouchableOpacity activeOpacity={0.7} onPress={async()=>{
                                    const value = await apiFetch(`/profile/attachment/${token?.data?.img[0]?.id}`,'DELETE',true)
                                    if (value?.status == 200) {
                                        token?.userUpdate(value?.user, token?.token)
                                    }
                                }} style={{position:'absolute', alignItems:"center", justifyContent:"center", bottom:6, right:6, backgroundColor:'#221E1E80', pointerEvents:"box-only", padding:5, width:32, height:32, borderRadius:90}}>
                                    <CloseIcon/>
                                </TouchableOpacity>
                            </>
                            : 
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>img.current?.open()}>
                                <CameraIcon/>
                            </TouchableOpacity>
                            }
                            
                        </View>
                        <View style={{gap:4, alignItems:'center'}}>
                            <Text style={[styles.h2,{color:"white", textAlign:"center", fontFamily:"PoppinsSemiBold"}]}>{token?.data?.login ?? token?.data?.name + ' '+ token?.data?.last_name}</Text>
                            <Text style={[styles.smallText,{color:"#FFFFFF99", textAlign:"center"}]}>{token?.data?.email}</Text>
                            <View style={{flexDirection:"row", alignItems:"center", gap:15}}>
                                {/* <Text style={[styles.bodyText,{color:"#FFFFFF99", fontFamily:'PoppinsMedium'}]}>Москва</Text> */}
                                <View style={{flexDirection:'row', alignItems:"center", gap:4}}>
                                    <MiniHeartIcon/>
                                    <Text style={[styles.bodyText,{color:"#FFFFFF"}]}>{token?.data?.rating}</Text>
                                </View>
                            </View>
                        </View>
                        <Image style={{width:width, height:1, marginVertical:16, opacity:0.9}} source={require('../../../assets/image/line.png')}/>
                        <View style={{paddingHorizontal:16, width:'100%', gap:8, flex:1}}>
                            <ProfileBlock text='Скрытые анкеты' onPress={()=>navigate('NoWatch')}/>
                            <ProfileBlock text='Редактировать профиль' onPress={()=>navigate('EditOrg')}/>
                            <ProfileBlock text='Изменить пароль' onPress={()=>navigate('EditPass')}/>
                            <ProfileBlock text='Помощь' msgIcon={true} onPress={()=>help.current.open()}/>
                        </View>
                        <TouchableOpacity activeOpacity={0.7} onPress={logOut} style={{width:'100%', marginBottom:80}}>
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