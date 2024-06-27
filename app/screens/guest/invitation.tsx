import { FlatList, Image, ImageBackground, KeyboardAvoidingView, Platform, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { EventItem, MainLayout } from '../../component';
import { height, statusBarHeight, width, Бирюзовый } from '../../GLOBAL';
import { styles } from '../../styles';
import { BlurView } from 'expo-blur';
import { PlusIcon } from '../../component/svg/svg';
import { useEffect, useState } from 'react';
import { navigate } from '../../functions/navigate';
import apiFetch from '../../functions/api';
 
export function InvitationScreen() {
    const [tag, setTag] = useState(2)
    const [events, setEvents] = useState({})
    const [data, setData] = useState([])
    const [meta, setMeta] = useState({})
    const [page, setPage] = useState(1)
    const [refresh, setRefresh] = useState(false)

    const onStatus = async(status?:number) => {
        const value = await apiFetch(`/event/invites?page=1${(status === 0 || status === 1) ? `&status=${status}` : ''}`,'GET', true)
            // console.log(value);
            
        if (value?.status == 200) {
            setEvents(value)
            setPage(1)
            setMeta(value.meta)
            setData(value.data)
        }
    }

    useEffect(()=>{
        onStatus(tag)
    },[])
    const onRefresh = async() => {
        setRefresh(true)
        setTimeout(async() => {
            const val = await apiFetch(`/event/invites?page=1${(tag === 0 || tag === 1) ? `&status=${tag}` : ''}`,'GET', true)
            // console.log(val);
            if (val?.status == 200) {
                setEvents(val)
                setMeta(val.meta)
                setData(val.data)
            }
            setPage(1)
            setRefresh(false)
        }, 1000);
    }
    
    return ( 
        <ImageBackground style={{width:width, height:height}} source={require('../../../assets/image/back.png')}>
            <MainLayout isStatusBar>
                {/* {events.length != 0 && <TouchableOpacity activeOpacity={0.7} onPress={()=>navigate('AddEvent')} style={styles.addEventContainer}>
                    <PlusIcon/>
                </TouchableOpacity>} */}
                <View style={{flexGrow:1}}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : 'height'}
                        keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                        style={{ flex: 1 }}
                    >
                        <View style={{marginTop:statusBarHeight+16, marginBottom:16}}>
                            <View style={{marginHorizontal:16, marginBottom:16}}>
                                <Text style={[styles.h4, {color:'white'}]}>Мои эвенты</Text>
                            </View>
                            <Image source={require('../../../assets/image/line.png')} style={{height:1}}/>
                        </View>
                        {data.length == 0 ?
                        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl
                            refreshing={refresh}
                            colors={[Бирюзовый]}
                            tintColor={Бирюзовый}
                            progressBackgroundColor={'#181818'}
                            onRefresh={onRefresh}
                        />} style={{flexGrow:1}} contentContainerStyle={{flexGrow:1}}>
                             <BlurView  intensity={75} tint='systemChromeMaterialDark' style={{borderRadius:16, overflow:"hidden", borderWidth:1, borderColor:'#374A4E99', flexDirection:"row", justifyContent:'space-between', alignItems:"center", marginHorizontal:16, marginBottom:16}}>
                                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                                        setTag(2)
                                        onStatus(2)
                                    }} style={{
                                        paddingVertical:8,
                                        alignItems:"center",
                                        justifyContent:'center',
                                        width:'33.3%',
                                        backgroundColor:tag==2 ? '#374A4E' : '#374A4E00',
                                        borderRadius:16
                                    }}>
                                        <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Все <Text style={{color:'#FFFFFF80'}}>{events?.all}</Text></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                                        setTag(1)
                                        onStatus(1)
                                    }} style={{
                                        paddingVertical:8,
                                        alignItems:"center",
                                        justifyContent:'center',
                                        width:'33.3%',
                                        backgroundColor:tag==1 ? '#374A4E' : '#374A4E00',
                                        borderRadius:16
                                    }}>
                                        <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Принятые <Text style={{color:'#FFFFFF80'}}>{events?.accept}</Text></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                                        setTag(0)
                                        onStatus(0)
                                    }} style={{
                                        paddingVertical:8,
                                        alignItems:"center",
                                        justifyContent:'center',
                                        width:'33.3%',
                                        backgroundColor:tag==0 ? '#374A4E' : '#374A4E00',
                                        borderRadius:16
                                    }}>
                                        <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Отправленные <Text style={{color:'#FFFFFF80'}}>{events?.send}</Text></Text>
                                    </TouchableOpacity>
                                </BlurView>
                            <BlurView  intensity={75} tint='systemChromeMaterialDark'  style={{borderRadius:16, overflow:"hidden", borderWidth:1, borderColor:'#374A4E99', marginHorizontal:16, flex:1, marginBottom:Platform.OS=="ios"? 100:70, justifyContent:"center", alignItems:"center", gap:15}}>
                                <Text style={[styles.h3,{fontSize:20, color:"white"}]}>У вас нет мероприятий</Text>
                                {/* <TouchableOpacity activeOpacity={0.7} onPress={()=>navigate('AddEvent')} style={{width:60, height:60, borderRadius:90, backgroundColor:Бирюзовый, justifyContent:"center", alignItems:"center"}}>
                                    <PlusIcon/>
                                </TouchableOpacity> */}
                            </BlurView> 
                        </ScrollView> : <>
                        <FlatList
                            data={data}
                            refreshControl={<RefreshControl
                                refreshing={refresh}
                                colors={[Бирюзовый]}
                                tintColor={Бирюзовый}
                                progressBackgroundColor={'#181818'}
                                onRefresh={onRefresh}
                            />}
                            onEndReached={async()=>{
                                if (meta?.last_page>page) {
                                    const value = await apiFetch(`/event/invites?page=${page+1}`+`${(tag === 0 || tag === 1) ? `&status=${tag}` : ''}`,'GET', true)
                                    setPage(page+1)
                                    setMeta(value.meta)
                                    setData(prevState => ([...prevState, ...value.data]))
                                }
                            }}
                            onEndReachedThreshold={0.8}
                            keyExtractor={(el,i)=>i.toString()}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{flexGrow:1, gap:8}}
                            ListFooterComponent={<View style={{height:70}}/>}
                            ListHeaderComponent={
                                <BlurView  intensity={75} tint='systemChromeMaterialDark'  style={{borderRadius:16, overflow:"hidden", borderWidth:1, borderColor:'#374A4E99', flexDirection:"row", justifyContent:'space-between', alignItems:"center", marginHorizontal:16, marginBottom:16}}>
                                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                                        setTag(2)
                                        onStatus(2)
                                    }} style={{
                                        paddingVertical:8,
                                        alignItems:"center",
                                        justifyContent:'center',
                                        width:'33.3%',
                                        backgroundColor:tag==2 ? '#374A4E' : '#374A4E00',
                                        borderRadius:16
                                    }}>
                                        <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Все <Text style={{color:'#FFFFFF80'}}>{events?.all}</Text></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                                        setTag(1)
                                        onStatus(1)
                                    }} style={{
                                        paddingVertical:8,
                                        alignItems:"center",
                                        justifyContent:'center',
                                        width:'33.3%',
                                        backgroundColor:tag==1 ? '#374A4E' : '#374A4E00',
                                        borderRadius:16
                                    }}>
                                        <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Принятые <Text style={{color:'#FFFFFF80'}}>{events?.accept}</Text></Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                                        setTag(0)
                                        onStatus(0)
                                    }} style={{
                                        paddingVertical:8,
                                        alignItems:"center",
                                        justifyContent:'center',
                                        width:'33.3%',
                                        backgroundColor:tag==0 ? '#374A4E' : '#374A4E00',
                                        borderRadius:16
                                    }}>
                                        <Text style={[styles.smallText,{color:'white', textAlign:'center'}]}>Отправленные <Text style={{color:'#FFFFFF80'}}>{events?.send}</Text></Text>
                                    </TouchableOpacity>
                                </BlurView> 
                            }
                            renderItem={({item})=><EventItem size={92} data={item} style={{marginHorizontal:16}} check={false} noEdit type={'guest'}/>}
                        />
                        </>}
                    </KeyboardAvoidingView>
                </View>
            </MainLayout>
        </ImageBackground>
    )
}