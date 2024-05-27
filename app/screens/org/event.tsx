import { Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MainLayout, ModalErrScan, PeopleModal } from '../../component';
import { height, statusBarHeight, width, Бирюзовый } from '../../GLOBAL';
import { styles } from '../../styles';
import { BlurView } from 'expo-blur';
import { goBack } from '../../functions/navigate';
import { AlchIcon, BackArrowIcon, CaliyanIcon, EatIcon, EditIcon, InstaEventIcon, InstaIcon, MiniHeartIcon, MiniInfIcon, MoneyIcon, ScanIcon, SettingIcon, TGEventIcon, TaxiIcon, TrashIcon } from '../../component/svg/svg';
import { useRef, useState } from 'react';
import { ScanModal } from '../../component/popup/scan';
import RBSheet from '@nonam4/react-native-bottom-sheet';
 
export function EventScreen() {
    const [alert, setAlert] = useState(false)
    const [scan, setScan] = useState(false)
    const [people, setPeople] = useState(false)
    const [tag, setTag] = useState(0)
    const errScan = useRef<RBSheet>(null)
    return ( 
        <MainLayout isStatusBar backgroundColor='#181818'>
            <TouchableOpacity activeOpacity={0.7} onPress={()=>setScan(true)} style={styles.buttonEvent}>
                <ScanIcon/>
            </TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1}}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : 'height'}
                    keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                    style={{ flex: 1 }}
                >
                    <ImageBackground source={require('../../../assets/image/event.jpg')} resizeMode='cover' style={{width:width, height:height*0.5, borderBottomLeftRadius:16, borderBottomRightRadius:16, marginBottom:16, overflow:'hidden'}}>
                        {alert &&<View onTouchStart={()=>setAlert(false)} style={{position:"absolute", top:0, left:0, width:width*2, height:height*2, zIndex:1}} />}
                        <View style={{flexDirection:"row", alignItems:"center", gap:8, marginTop:statusBarHeight+7, marginHorizontal:16, justifyContent:"space-between"}}>
                            <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
                                <BlurView intensity={30} tint='systemChromeMaterialDark' style={styles.backArrowContainer}>
                                    <BackArrowIcon/>
                                </BlurView>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>setAlert(!alert)}>
                                <BlurView intensity={30} style={[styles.backArrowContainer]} tint='systemChromeMaterialDark'>
                                    <SettingIcon color={Бирюзовый}/>
                                </BlurView>
                            </TouchableOpacity>
                            {alert && <View style={[styles.alertContainer,{right:0}]}>
                                <TouchableOpacity activeOpacity={0.7} style={{flexDirection:"row", gap:7, alignItems:"center"}}>
                                    <EditIcon/>
                                    <Text style={[styles.bodyText,{color:'white'}]}>Редактировать</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.7} style={{flexDirection:"row", gap:7, alignItems:"center"}}>
                                    <TrashIcon color='#BC1115' fillOpacity={1}/>
                                    <Text style={[styles.bodyText,{color:'#BC1115'}]}>Удалить</Text>
                                </TouchableOpacity>
                            </View>}
                        </View>
                        <View style={[styles.blurLikeContainer,{position:"absolute", bottom:0, paddingBottom:11}]}>
                            <BlurView tint='systemChromeMaterialDark' style={{gap:7, paddingHorizontal:15, paddingTop:12, paddingBottom:12, borderRadius:16, overflow:'hidden'}} intensity={40} experimentalBlurMethod='dimezisBlurView'>
                                <View style={{flexDirection:'row', alignItems:"center", justifyContent:'space-between'}}>
                                    <Text style={[styles.bodyText,{color:'white', fontFamily:'PoppinsMedium'}]}>18:00</Text>
                                    <Text style={[styles.bodyText,{color:'white', fontFamily:'PoppinsMedium'}]}>10 <Text style={{fontSize:12, color:'#FFFFFF99'}}>авг</Text></Text>
                                </View>
                                <Text style={[styles.h4,{fontSize:18, color:'white', paddingTop:6}]}>Название вечеринки Paty Dens Nou</Text>
                            </BlurView>
                        </View>
                    </ImageBackground>
                    <View style={{marginHorizontal:16, flex:1, marginBottom:15}}>
                        {alert &&<View onTouchStart={()=>setAlert(false)} style={{position:"absolute", top:0, left:0, width:width*2, height:height*2, zIndex:1}} />}
                        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginBottom:8}}>
                            <Text style={[styles.smallText,{color:'#5AA19D'}]}>Для вас:</Text>
                            <View style={{flexDirection:'row', alignItems:'flex-end', gap:6}}>
                                <Text style={[styles.smallText,{color:'#5AA19D'}]}>От вас:</Text>
                                <InstaIcon/>
                            </View>
                        </View>
                        <View style={{gap:3, marginBottom:16}}>
                            <View style={{flexDirection:"row", alignItems:"center", gap:4}}>
                                <TaxiIcon/>
                                <Text style={[styles.smallText,{color:'#5AA19D'}]}>- такси</Text>
                            </View>
                            <View style={{flexDirection:"row", alignItems:"center", gap:4}}>
                                <AlchIcon/>
                                <Text style={[styles.smallText,{color:'#5AA19D'}]}>- алкоголь</Text>
                            </View>
                            <View style={{flexDirection:"row", alignItems:"center", gap:4}}>
                                <EatIcon/>
                                <Text style={[styles.smallText,{color:'#5AA19D'}]}>- еда</Text>
                            </View>
                            <View style={{flexDirection:"row", alignItems:"center", gap:4}}>
                                <CaliyanIcon/>
                                <Text style={[styles.smallText,{color:'#5AA19D'}]}>- кальян</Text>
                            </View>
                            <View style={{flexDirection:"row", alignItems:"center", gap:4}}>
                                <MiniInfIcon/>
                                <Text style={[styles.smallText,{color:'#5AA19D'}]}>- подробности в описании</Text>
                            </View>
                            <View style={{flexDirection:"row", alignItems:"center", gap:4}}>
                                <MoneyIcon/>
                                <Text style={[styles.smallText,{color:'#5AA19D'}]}>- оплачиваемые</Text>
                            </View>
                        </View>
                        <View style={[styles.blurTagEventContainer,{marginHorizontal:0}]}>
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>setTag(0)} style={[styles.tagEventContainer, {
                                backgroundColor:tag==0 ? '#374A4E' : '#374A4E00'
                            }]}>
                                <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Описание</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>setTag(1)} style={[styles.tagEventContainer, {
                                backgroundColor:tag==1 ? '#374A4E' : '#374A4E00'
                            }]}>
                                <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Место</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>setTag(2)} style={[styles.tagEventContainer, {
                                backgroundColor:tag==2 ? '#374A4E' : '#374A4E00'
                            }]}>
                                <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Организатор</Text>
                            </TouchableOpacity>
                        </View>
                        {tag==0 && <View>
                            <Text style={[styles.bodyText,{color:'white'}]}>На вечеринке царит атмосфера безудержного веселья и радости. Гости танцуют под ритмичные мелодии диджея, наслаждаются коктейлями и весело общаются. В зале висит яркое освещение, а декорации создают праздничное настроение. На углях горит костер, вокруг которого собираются гости, чтобы погреться и поболтать. Атмосфера праздника заставляет забыть обо всех заботах и наслаждаться каждым моментом вечеринки.</Text>
                        </View>}
                        {tag==1 && <View style={{gap:8}}>
                            <Text style={[styles.bodyText,{color:'white'}]}>Адрес:</Text>
                            <Text style={[styles.bodyText,{color:'white'}]}>Москва, ул. Московская, д. 5, строение 1</Text>
                            <Text style={[styles.bodyText,{color:'#5AA19D', textDecorationLine:'underline'}]}>Показать на карте</Text>
                        </View>}
                        {tag==2 && <View style={{flexDirection:"row", justifyContent:'space-between'}}>
                            <View style={{flexDirection:"row", gap:8}}>
                                <Image style={{width:39, height:39, borderRadius:8, overflow:'hidden'}} source={require('../../../assets/image/people.jpg')}/>
                                <View style={{gap:4}}>
                                    <Text style={[styles.bodyText,{color:'white'}]}>Александр</Text>
                                    <View style={{flexDirection:"row", alignItems:"center", gap:4}}>
                                        <MiniHeartIcon/>
                                        <Text style={[styles.bodyText,{color:'white'}]}>5.0</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{alignItems:"flex-end", flex:1, gap:7}}>
                                <View style={{flexDirection:"row",gap:6}}>
                                    <InstaEventIcon/>
                                    <TGEventIcon/>
                                </View>
                                <Text style={[styles.smallText,{color:'#FFFFFF80', textAlign:'right', width:'80%'}]}>Контакты будут доступны после одобрения заявки</Text>
                            </View>
                        </View>}
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            {scan && <ScanModal visible={scan} onBarcodeScanned={()=>{
                setScan(false)
                setTimeout(() => {
                    // setPeople(true)
                    errScan.current?.open()
                }, 300);
            }} onRequestClose={()=>setScan(false)}/>}
            {people&&<PeopleModal visible={people} onRequestClose={()=>setPeople(false)}/>}
            <ModalErrScan ref={errScan}/>
        </MainLayout>
    )
}