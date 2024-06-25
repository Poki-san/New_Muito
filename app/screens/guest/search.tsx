import { FlatList, Image, ImageBackground, KeyboardAvoidingView, Platform, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { EventItem, MainLayout } from '../../component';
import { height, statusBarHeight, width, Бирюзовый } from '../../GLOBAL';
import { styles } from '../../styles';
import { CalendarIcon, CloseIcon } from '../../component/svg/svg';
import { Tags } from '../../component/ui/tags';
import { BlurView } from 'expo-blur';
import { useEffect, useRef, useState } from 'react';
import { ModalDatePoint } from '../../component/popup/date';
import RBSheet from '@nonam4/react-native-bottom-sheet';
import apiFetch from '../../functions/api';
import moment from 'moment';
import token from '../../model/token';
import { BackHandlerFirstScreen } from '../../navigate/navigateProps';

export function SearchScreen() {
    const date = useRef<RBSheet>(null)
    const [page, setPage] = useState(1)
    const [tag, setTag] = useState(-1)
    const [meta, setMeta] = useState({})
    const [dateTxt, setDate] = useState('')
    const [data, setData] = useState([])
    const [forParticipants, setForParticipants] = useState([])
    const [refresh, setRefresh] = useState(false)
    
    useEffect(()=>{
        (async()=>{
            const value = await apiFetch(`/event?page=1`,'GET', true)
            
            if (value?.status == 200) {
                setDate('')
                setMeta(value.meta)
                setData(value.data)
                setForParticipants(value?.forParticipants)
                setPage(1)
            }
            
        })();
    },[])

    const onRefresh = async() => {
        setRefresh(true)
        setTimeout(async() => {
            let uri = '/event?page=1'
            if (dateTxt?.length > 0 ) {
                uri += `&date=${dateTxt}`
            }
            if (tag != -1) {
                uri += `&for=${tag}`
            }
            console.log(uri);
            const val = await apiFetch(uri,'GET', true)
            if (val?.status == 200) {
                setMeta(val.meta)
                setData(val.data)
                setForParticipants(val?.forParticipants)
            }
            setPage(1)
            setRefresh(false)
        }, 1000);
    }
    
    return ( 
        <ImageBackground style={{width:width, height:height}} source={require('../../../assets/image/back.png')}>
            <MainLayout isStatusBar>
                {data.length != 0 ? 
                    <FlatList
                        showsVerticalScrollIndicator={false}
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
                                let uri = `/event?page=${page+1}`
                                if (dateTxt?.length > 0 ) {
                                    uri += `&date=${dateTxt}`
                                } 
                                if (tag != -1) {
                                    uri += `&for=${tag}`
                                }
                                console.log(uri);
                                const val = await apiFetch(uri,'GET', true)
                                setPage(page+1)
                                setMeta(val.meta)
                                setData(prevState => ([...prevState, ...val.data]))
                            }
                        }}
                        onEndReachedThreshold={0.8}
                        ListHeaderComponent={
                            <>
                                <View style={{marginBottom:16}}>
                                    <View style={{marginHorizontal:16, marginBottom:8, flexDirection:'row', alignItems:'center', justifyContent:"space-between"}}>
                                        <Text style={[styles.h4, {color:'white'}]}>Мероприятия</Text>
                                        <View style={{flexDirection:"row", alignItems:"center", gap:8}}>
                                            {dateTxt.length>0 && <TouchableOpacity onPress={()=>{
                                                setDate("")
                                                onRefresh()
                                            }} style={{borderRadius:16, width:42, alignItems:'center', justifyContent:"center", height:42, backgroundColor:'#00000033'}}>
                                                <CloseIcon color='#fff'/>
                                            </TouchableOpacity>}
                                            <TouchableOpacity onPress={()=>date.current?.open()} style={{borderRadius:16, width:42, alignItems:'center', justifyContent:"center", height:42, backgroundColor:'#00000033'}}>
                                                <CalendarIcon color='#fff'/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    {/* <View style={{marginHorizontal:16, marginBottom:8, flexDirection:'row', alignItems:'center', gap:8}}>
                                        <TouchableOpacity style={{borderRadius:90, borderWidth:2, borderColor:Бирюзовый, overflow:'hidden', width:63, height:63}} activeOpacity={0.7}>
                                            <Image source={require('../../../assets/image/event.jpg')} style={{height:'100%', width:'100%'}}/>
                                            <View style={{backgroundColor:"#00000044", position:"absolute", justifyContent:"center", alignItems:"center", top:0, left:0, width:63, height:63}}>
                                                <Text style={[styles.smallText,{color:'white', fontSize:10, textAlign:"center"}]}>DJ сет</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{borderRadius:90, overflow:'hidden', width:63, height:63}} activeOpacity={0.7}>
                                            <Image source={require('../../../assets/image/event.jpg')} style={{height:'100%', width:'100%'}}/>
                                            <View style={{backgroundColor:"#00000044", position:"absolute", justifyContent:"center", alignItems:"center", top:0, left:0, width:63, height:63}}>
                                                <Text style={[styles.smallText,{color:'white', fontSize:10, textAlign:"center"}]}>Рестораны</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>*/}
                                    <Image source={require('../../../assets/image/line.png')} style={{height:1}}/> 
                                </View>
                                <Tags default={tag} paddingV={5} style={{paddingHorizontal:16}} onPress={(tags)=>{
                                    setTag(tags)
                                    onRefresh()
                                }} noBorder data={forParticipants}/>
                                
                            </>
                        }
                        keyExtractor={(el,i)=>i.toString()}
                        style={{marginTop:statusBarHeight+16}}
                        ListFooterComponent={<View style={{height:70}}/>}
                        contentContainerStyle={{flexGrow:1, gap:8}}
                        renderItem={({item})=>
                            <EventItem size={92} data={item} noEdit style={{marginHorizontal:16}} type={'guest'}/>
                        }
                    />:
                    <ScrollView 
                        refreshControl={<RefreshControl
                            refreshing={refresh}
                            colors={[Бирюзовый]}
                            tintColor={Бирюзовый}
                            progressBackgroundColor={'#181818'}
                            onRefresh={onRefresh}
                        />}
                        contentContainerStyle={{flexGrow:1}} 
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{marginTop:statusBarHeight+15, marginBottom:16}}>
                            <View style={{marginHorizontal:16, marginBottom:8, flexDirection:'row', alignItems:'center', justifyContent:"space-between"}}>
                                <Text style={[styles.h4, {color:'white'}]}>Мероприятия</Text>
                                <View style={{flexDirection:"row", alignItems:"center", gap:8}}>
                                    {dateTxt.length>0 && <TouchableOpacity onPress={()=>{
                                        setDate('')
                                        onRefresh()
                                    }} style={{borderRadius:16, width:42, alignItems:'center', justifyContent:"center", height:42, backgroundColor:'#00000033'}}>
                                        <CloseIcon color='#fff'/>
                                    </TouchableOpacity>}
                                    <TouchableOpacity onPress={()=>date.current?.open()} style={{borderRadius:16, width:42, alignItems:'center', justifyContent:"center", height:42, backgroundColor:'#00000033'}}>
                                        <CalendarIcon color='#fff'/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* <View style={{marginHorizontal:16, marginBottom:8, flexDirection:'row', alignItems:'center', gap:8}}>
                                <TouchableOpacity style={{borderRadius:90, borderWidth:2, borderColor:Бирюзовый, overflow:'hidden', width:63, height:63}} activeOpacity={0.7}>
                                    <Image source={require('../../../assets/image/event.jpg')} style={{height:'100%', width:'100%'}}/>
                                    <View style={{backgroundColor:"#00000044", position:"absolute", justifyContent:"center", alignItems:"center", top:0, left:0, width:63, height:63}}>
                                        <Text style={[styles.smallText,{color:'white', fontSize:10, textAlign:"center"}]}>DJ сет</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{borderRadius:90, overflow:'hidden', width:63, height:63}} activeOpacity={0.7}>
                                    <Image source={require('../../../assets/image/event.jpg')} style={{height:'100%', width:'100%'}}/>
                                    <View style={{backgroundColor:"#00000044", position:"absolute", justifyContent:"center", alignItems:"center", top:0, left:0, width:63, height:63}}>
                                        <Text style={[styles.smallText,{color:'white', fontSize:10, textAlign:"center"}]}>Рестораны</Text>
                                    </View>
                                </TouchableOpacity>
                            </View> */}
                            <Image source={require('../../../assets/image/line.png')} style={{height:1}}/>
                        </View>
                        
                        <View style={{flex:1}}>
                            <BlurView intensity={75}  style={styles.blurNoWoman} tint='systemChromeMaterialDark'>
                                <Text style={[styles.bodyText,{color:'white',textAlign:"center"}]}>{'По этому запросу ничего не найдено.\nПопробуйте изменить набор фильтров'}</Text>
                                <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                                    setDate('')
                                    onRefresh()
                                }}>
                                    <Text style={[styles.button,{color:Бирюзовый, paddingTop:8}]}>Обновить</Text>
                                </TouchableOpacity>
                            </BlurView>
                        </View>
                    </ScrollView>}
                <ModalDatePoint onPress={async(data)=>{
                    setDate(moment(data).format("YYYY-MM-DD"));
                    onRefresh()
                    date?.current?.close()
                }} ref={date}/>
            </MainLayout>
        </ImageBackground>
    )
}