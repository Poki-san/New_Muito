import { ActivityIndicator, Image, ImageBackground, KeyboardAvoidingView, Linking, Platform, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MainLayout, ModalErrScan, PeopleModal, ScanModal, ModalQrCode, ModalWarning, ModalReview, ModalDelEvent } from '../component';
import { height, statusBarHeight, width, Бирюзовый, Бирюзовый50 } from '../GLOBAL';
import { styles } from '../styles';
import { BlurView } from 'expo-blur';
import { goBack, navigate } from '../functions/navigate';
import { BackArrowIcon, EditIcon, GOIcon, InstaEventIcon, MiniHeartIcon, ProfileMenuIcon, QRIcon, ScanIcon, SettingIcon, TGEventIcon, TrashIcon, WarningIcon } from '../component/svg/svg';
import { useEffect, useRef, useState } from 'react';
import RBSheet from '@poki_san/react-native-bottom-sheet';
import { showToastable } from 'react-native-toastable';
import apiFetch from '../functions/api';
import moment from 'moment';
import token from '../model/token';
import error from '../model/error';
 
export function EventScreen(props?:{route?:{params:{type?:''}}}) {
    const [alert, setAlert] = useState(false)
    const [scan, setScan] = useState(false)
    const [data, setData] = useState(null)
    const [go, setGo] = useState(false)
    const [people, setPeople] = useState(false)
    const [peopleScan, setPeopleScan] = useState({})
    const [tag, setTag] = useState(0)
    const errScan = useRef<RBSheet>(null)
    const qr = useRef<RBSheet>(null)
    const warning = useRef<RBSheet>(null)
    const review = useRef<RBSheet>(null)
    const [refresh, setRefresh] = useState(false)
    const type = props.route.params.type=='' ? 'org' : props.route.params.type
    const id = props.route.params?.id
    const del = useRef<RBSheet>()

    // review.current?.open()
    const handleBarCodeScanned = async (data?:string) => {
        try {
            const requestTo = await fetch(data, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token?.token}`,
                    "Accept": "application/json"
                },
            })
            const response = await requestTo.json()
            
            if (requestTo.status === 202) {
                setPeople(true)
                setPeopleScan(response)
            } else {
                setTimeout(() => errScan.current?.open(), 300);
            }
        } catch (e) {
            console.log(e)
            setTimeout(() => errScan.current?.open(), 300);
        }
        
      };
    const onStatus = async() => {
        const value = await apiFetch(`/event/${id}`,'GET',true)
        setData(value?.data)
    }

    useEffect(()=>{
        onStatus()
    },[])

    const onRefresh = async() => {
        setRefresh(true)
        setTimeout(async() => {
            onStatus()
            setRefresh(false)
        }, 1000);
    }
    
    return ( 
        <MainLayout isStatusBar backgroundColor='#181818'>
            {data ? <>
                <TouchableOpacity activeOpacity={0.7} disabled={go} onPress={async()=>{
                    if (type=='org') {
                        setScan(true)
                    } else {
                        if (!!data?.status?.invite) {
                            qr.current?.open()
                        } else {
                            if (go==false) {
                                if (data?.status?.invite == 0) {
                                    showToastable({message:'Вашу заявку отклонили'})
                                } else {
                                    const value = await apiFetch(`/event/join/${data?.id}`,'GET',true)
                                    if (value?.status == 200) {
                                        showToastable({message:'Ваша заявка отпралена'})
                                        setGo(true)
                                    } else {
                                        setTimeout(() => error.Input(true, 'Что-то пошло не так!', 'Упс!...', Platform.OS=='ios'?175:145), 300);
                                    }
                                }
                            }
                        }
                    }
                }} style={[styles.buttonEvent,{backgroundColor:go?Бирюзовый50:Бирюзовый}]}>
                    {type=='org' ? <ScanIcon/> :
                    !!data?.status?.invite ?  <QRIcon/> : <GOIcon go={go}/>}
                </TouchableOpacity>
                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    keyboardShouldPersistTaps='always' 
                    contentContainerStyle={{flexGrow:1}}
                    refreshControl={<RefreshControl
                        refreshing={refresh}
                        colors={[Бирюзовый]}
                        tintColor={Бирюзовый}
                        progressBackgroundColor={'#181818'}
                        onRefresh={onRefresh}
                    />} 
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : 'height'}
                        keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                        style={{ flex: 1 }}
                    >
                        <ImageBackground source={{uri:data?.img[0]?.uri}} resizeMode='cover' style={{width:width, height:height*0.5, borderBottomLeftRadius:16, borderBottomRightRadius:16, marginBottom:16, overflow:'hidden'}}>
                            {alert &&<View onTouchStart={()=>setAlert(false)} style={{position:"absolute", top:0, left:0, width:width*2, height:height*2, zIndex:Platform.OS=='ios'? 0:1}} />}
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
                                    {type != 'org' ? <TouchableOpacity onPress={()=>warning.current?.open()} activeOpacity={0.7} style={{flexDirection:"row", gap:7, alignItems:"center"}}>
                                        <WarningIcon/>
                                        <Text style={[styles.bodyText,{color:'#BC1115'}]}>Пожаловаться</Text>
                                    </TouchableOpacity>
                                    :<>
                                    <TouchableOpacity activeOpacity={0.7} onPress={()=>navigate('EditEvent',{id:data?.id})} style={{flexDirection:"row", gap:7, alignItems:"center", pointerEvents:'box-only', padding:3, margin:-3}}>
                                        <EditIcon/>
                                        <Text style={[styles.bodyText,{color:'white'}]}>Редактировать</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.7} onPress={()=>del.current?.open()} style={{flexDirection:"row", gap:7, alignItems:"center"}}>
                                        <TrashIcon color='#BC1115' fillOpacity={1}/>
                                        <Text style={[styles.bodyText,{color:'#BC1115'}]}>Удалить</Text>
                                    </TouchableOpacity></>}
                                </View>}
                            </View>
                            <View style={[styles.blurLikeContainer,{position:"absolute", bottom:0, paddingBottom:11}]}>
                                <BlurView tint='systemChromeMaterialDark' style={{gap:7, paddingHorizontal:15, paddingTop:12, paddingBottom:12, borderRadius:16, overflow:'hidden'}} intensity={55} >
                                    <View style={{flexDirection:'row', alignItems:"center", justifyContent:'space-between'}}>
                                        {data?.time_part && <Text style={[styles.bodyText,{color:'white', fontFamily:'PoppinsMedium'}]}>{data?.time_part}</Text>}

                                            {moment(data?.date_event).format("DD MMM YY") != moment(data?.end_date_event).format("DD MMM YY") ? 
                                                <Text style={[styles.bodyText,{color:'white', fontFamily:'PoppinsMedium'}]}>{moment(data?.date_event).format("DD ")}<Text style={{fontSize:10, color:"#FFFFFF99"}}>{moment(data?.date_event).format("MMM YY")} -</Text> {moment(data?.end_date_event).format("DD ")}<Text style={{fontSize:10, color:"#FFFFFF99"}}>{moment(data?.end_date_event).format("MMM YY")}</Text></Text>
                                            :
                                                <Text style={[styles.bodyText,{color:'white', fontFamily:'PoppinsMedium'}]}>{moment(data?.date_event).format("DD ")}<Text style={{fontSize:10, color:"#FFFFFF99"}}>{moment(data?.date_event).format("MMM YY")}</Text></Text>
                                            }

                                    </View>
                                    <Text style={[styles.h4,{fontSize:18, color:'white', paddingTop:6}]}>{data?.title}</Text>
                                </BlurView>
                            </View>
                        </ImageBackground>
                        <View style={{marginHorizontal:16, flex:1, marginBottom:15}}>
                            {alert &&<View onTouchStart={()=>setAlert(false)} style={{position:"absolute", top:0, left:0, width:width*2, height:height*2, zIndex:1}} />}
                            {(!!data?.from_participants && !!data?.for_participants) && 
                            <>
                                <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginBottom:8}}>
                                    <Text style={[styles.smallText,{color:'#5AA19D'}]}>Для вас:</Text>
                                    <Text style={[styles.smallText,{color:'#5AA19D'}]}>От вас:</Text>
                                </View> 
                                <View style={{gap:3, flexDirection:"row", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16}}>
                                    <View style={{gap:3, width:'45%'}}>
                                        {data?.for_participants?.map((el, i)=>
                                            <View key={i} style={{flexDirection:"row", alignItems:"center", gap:4}}>
                                                <Image style={{width:16, height:16}} resizeMethod='resize' resizeMode='contain' source={{uri:el?.uri}}/>
                                                <Text style={[styles.smallText,{color:'#5AA19D'}]}>- {el?.title}</Text>
                                            </View>
                                        )}
                                    </View>
                                   <View style={{gap:3, width:'45%', alignItems:"flex-end"}}>
                                        {data?.from_participants?.map((el, i)=>
                                            <View key={i} style={{flexDirection:"row", alignItems:"center", gap:4}}>
                                                <Text style={[styles.smallText,{color:'#5AA19D'}]}>{el?.title} -</Text>
                                                <Image style={{width:16, height:16}} resizeMethod='resize' resizeMode='contain' source={{uri:el?.uri}}/>
                                            </View>
                                        )}
                                   </View>
                                </View>
                            </>
                            }
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
                                <Text style={[styles.bodyText,{color:'white'}]}>{data?.description}</Text>
                            </View>}
                            {tag==1 && <View style={{gap:8}}>
                                <Text style={[styles.bodyText,{color:'white'}]}>Адрес:</Text>
                                <Text style={[styles.bodyText,{color:'white'}]}>{JSON.parse(data?.address)?.address}</Text>
                                {/* <Text style={[styles.bodyText,{color:'#5AA19D', textDecorationLine:'underline'}]}>Показать на карте</Text> */}
                            </View>}
                            {tag==2 && <View style={{flexDirection:"row", justifyContent:'space-between'}}>
                                <View style={{flexDirection:"row", gap:8}}>
                                    {data?.author_full?.img?.length > 0 ? 
                                        <Image style={{width:39, height:39, borderRadius:8, overflow:'hidden'}} source={{uri:data?.author_full?.img[0]?.small}}/> :
                                        <View style={{width:39, height:39, borderRadius:8, overflow:'hidden', alignItems:"center"}}>
                                            <ProfileMenuIcon/>
                                        </View>
                                    }
                                    <View style={{gap:4}}>
                                        <Text style={[styles.bodyText,{color:'white'}]}>{data?.author_full?.login ?? data?.author_full?.name}</Text>
                                        <View style={{flexDirection:"row", alignItems:"center", gap:4}}>
                                            <MiniHeartIcon/>
                                            <Text style={[styles.bodyText,{color:'white'}]}>{data?.author_full?.rating}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{alignItems:"flex-end", flex:1, gap:7}}>
                                    <View style={{flexDirection:"row",gap:6}}>
                                        {data?.author_full?.instagram && <TouchableOpacity 
                                            activeOpacity={0.7}
                                            onPress={()=>{
                                                if (type=='org') {
                                                    Linking.openURL('https://www.instagram.com/'+data?.author_full?.instagram?.replace('@',''))
                                                } else{
                                                    if(!!data?.status?.invite){
                                                        Linking.openURL('https://www.instagram.com/'+data?.author_full?.instagram?.replace('@',''))
                                                    }
                                                }
                                            }}
                                        >
                                            <InstaEventIcon/>
                                        </TouchableOpacity>}
                                        {data?.author_full?.telegram && <TouchableOpacity 
                                            activeOpacity={0.7}
                                            onPress={()=>{
                                                if (type=='org') {
                                                    Linking.openURL('https://t.me/'+data?.author_full?.telegram?.replace('@',''))
                                                } else{
                                                    if(!!data?.status?.invite){
                                                        Linking.openURL('https://t.me/'+data?.author_full?.telegram?.replace('@',''))
                                                    }
                                                }
                                            }}
                                        >
                                            <TGEventIcon/>
                                        </TouchableOpacity>}
                                    </View>
                                    <Text style={[styles.smallText,{color:'#FFFFFF80', textAlign:'right', width:'80%'}]}>Контакты будут доступны после одобрения заявки</Text>
                                </View>
                            </View>}
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                {scan && <ScanModal visible={scan} onBarcodeScanned={(uri)=>{
                    handleBarCodeScanned(uri)
                    // setScan(false)
                    // setTimeout(() => {
                    //     // setPeople(true)
                    //     errScan.current?.open()
                    // }, 300);
                    
                }} onRequestClose={()=>setScan(false)}/>}
                {people&&<PeopleModal data={peopleScan} visible={people} onRequestClose={()=>setPeople(false)}/>}
                <ModalDelEvent ref={del} id={data?.id} onDelete={goBack}/>
                <ModalErrScan ref={errScan} onPress={()=>{
                    errScan?.current?.close()
                    setTimeout(() => setScan(true), 300);
                }}/>
                <ModalQrCode ref={qr} value={data?.link_invitation}/>
                <ModalWarning ref={warning} onClose={()=>setAlert(false)} type={'Жалоба на эвент'} id={data?.id} uri={'/complaint/event'}/>
                <ModalReview event title='Оцените мероприятие' ref={review}/>
            </>:<>
                <View style={{justifyContent:"center", alignItems:"center", flex:1}}><ActivityIndicator size={40} color={Бирюзовый}/></View>
            </>}
        </MainLayout>
    )
}