import { ImageBackground, Linking, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import { height, statusBarHeight, width, Бирюзовый } from '../../GLOBAL';
import { CloseIcon, TelegramIcon, WhatsAppIcon } from '../svg/svg';
import { logOut } from '../../functions/auth';
import { styles } from '../../styles';
 
export function NoPayModal(props:{visible?: boolean, onRequestClose?: () => void, noClose?:boolean, onBarcodeScanned?: (code?:string) => void}) {
    
    return ( 
        <ImageBackground style={{width:width, height:'100%'}} source={require('../../../assets/image/backModal.jpg')}>
            <Modal visible={props.visible} style={{width:width, height:'100%'}}>
                <ImageBackground style={{width:width, height:'100%'}} source={require('../../../assets/image/backModal.jpg')}>
                    <View style={{alignItems:"center", justifyContent:'center', height:'100%'}}>
                        <View style={{borderRadius:30, position:'relative', backgroundColor:'#181818', paddingHorizontal:24, paddingVertical:23, justifyContent:"center", alignItems:'center', width:'88%'}}>
                            <Text style={[styles.h2,{ color:'white', fontSize:22}]}>Создай свое мероприятие</Text>
                            <Text style={[styles.additional,{color:'white', textAlign:'center', marginVertical:15}]}>Для создания мероприятия вам нужно оплатить тариф. Свяжитесь с менеджером по номеру для оплаты</Text>
                            <View style={{flexDirection:"row", alignItems:"center", gap:18, marginBottom:15, justifyContent:"space-between"}}>
                                <TouchableOpacity activeOpacity={0.7}>
                                    <TelegramIcon/>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.7}>
                                    <WhatsAppIcon/>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity activeOpacity={0.5} onPress={logOut} style={{backgroundColor:'#181818', borderWidth:1, borderColor:'#81D8D0', width:'100%', borderRadius:30, paddingHorizontal:45, paddingVertical:10}}>
                                <Text style={{color:'#81D8D0', fontSize:18, textAlign:'center'}}>Выйти из аккаунта</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </Modal>
        </ImageBackground>
    )
}