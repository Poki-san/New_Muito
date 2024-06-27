import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { EventMapItem, MainLayout, ModalDatePoint } from '../../component';
import { height, statusBarHeight, width, Белый, Бирюзовый } from '../../GLOBAL';
import { useEffect, useRef, useState } from 'react';
import coordinate from '../../model/coordinate';
import { CalendarIcon, CloseIcon } from '../../component/svg/svg';
import { styles } from '../../styles';
import RBSheet from '@poki_san/react-native-bottom-sheet';
import { BlurView } from 'expo-blur';
import apiFetch from '../../functions/api';
import moment from 'moment';
import { Map } from '../../component/myMap';
import { observer } from 'mobx-react-lite';
 
export const MapGuestScreen=observer(()=> {
    const [event, setEvent] = useState(false)
    const date = useRef<RBSheet>(null)
    const [markers, setMarkers] = useState([]);
    const [markerItem, setMarkerItem] = useState(0);
    const [loader, setLoader] = useState(false)
    const [dateTxt, setDate] = useState('')

    useEffect(()=>{
        (async()=>{
            setLoader(true)
            const value = await apiFetch('/event/map','GET',true)
            console.log(value);
            
            switch (value?.status) {
                case 200:
                case 201:
                case 202:
                    setMarkers(value?.data)
                    break;
                default:
                    break;
            }
            setLoader(false)
            
        })();
    },[])

    const onDate = async(date?:string) => {
        setLoader(true)
        setMarkers([])
        coordinate.setLoad(0)
        if (date.length>0) {
            const val = await apiFetch(`/event/map?date=${date}`,'GET', true)
            if (val?.status == 200) {
                setMarkers(val?.data)
                setLoader(false)
            }
        } else{
            const val = await apiFetch(`/event/map`,'GET', true)
            if (val?.status == 200) {
                setMarkers(val?.data)
                setLoader(false)
            }
        }
    }

    return ( 
        <MainLayout isStatusBar backgroundColor='#181818'>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : 'height'}
                keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                style={{ flex: 1, marginTop:statusBarHeight }}
            >
                <View style={{borderTopLeftRadius:16, borderTopRightRadius:16, overflow:"hidden"}}>
                    <View style={{paddingHorizontal:16, position:"absolute", gap:6, top:8, left:0, right:0,  flexDirection:'row', alignItems:'center', justifyContent:"space-between", zIndex:3}}>
                        <View style={{width:42, height:42}}/>
                        <BlurView intensity={75} style={{flexDirection:"row", paddingHorizontal:10, paddingVertical:8,
                        overflow:"hidden", borderRadius:16, alignItems:'center', gap:4}} tint='systemChromeMaterialDark'>
                            <Text style={[styles.h4,{color:Белый, textAlign:"center"}]}>Мероприятия рядом</Text>
                        </BlurView>
                        {/* <View style={{width:42, height:42}}/> */}
                        <View style={{flexDirection:"row", alignItems:"center", gap:4}}>
                            {dateTxt?.length>0 && <TouchableOpacity onPress={()=>{
                                    setDate('')
                                    onDate('')
                                }} style={{borderRadius:16, width:42, alignItems:'center', justifyContent:"center", height:42, backgroundColor:'#00000088'}}>
                                    <CloseIcon color='#fff'/>
                                </TouchableOpacity>}
                            <TouchableOpacity onPress={()=>date.current?.open()} style={{borderRadius:16, width:42, alignItems:'center', justifyContent:"center", height:42, backgroundColor:'#00000088'}}>
                                <CalendarIcon color='#fff'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {(!loader&& markers?.length > 0) ? 
                    <>
                        {markers?.length > 0 ?<Map 
                            up={2} 
                            markers={markers}
                            onTouchMove={() => setEvent(false)}
                            onPress={(index)=>{
                                setMarkerItem(index)
                                setEvent(true)
                            }}
                        /> :
                        <Map 
                            up={2} 
                            markers={[]}
                        />
                        }
                    </>
                    : 
                    <View style={{alignItems:"center", justifyContent:"center", width:width,height:height-statusBarHeight}}>
                        <View style={{backgroundColor:'#181818CC', borderRadius:90, padding:10}}><ActivityIndicator size={40} color={Бирюзовый}/></View>
                    </View>
                    }
                    {event&&<View  style={{marginHorizontal:16, position:'absolute', bottom:0, marginBottom:76}}>
                        <EventMapItem data={markers[markerItem]} size={92} noEdit type={'guest'}/>
                    </View>}
                </View>
            </KeyboardAvoidingView>
            <ModalDatePoint ref={date} onPress={(value)=>{
                setDate(moment(value).format("YYYY-MM-DD"))
                onDate(moment(value).format("YYYY-MM-DD"))
                date.current?.close()
            }}/>
        </MainLayout>
    )
})