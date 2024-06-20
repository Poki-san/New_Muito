import { FlatList, Image, ImageBackground, KeyboardAvoidingView, Platform, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { EventItem, MainLayout } from '../../component';
import { height, statusBarHeight, width, Бирюзовый } from '../../GLOBAL';
import { styles } from '../../styles';
import { CalendarIcon } from '../../component/svg/svg';
import { Tags } from '../../component/ui/tags';
import { BlurView } from 'expo-blur';
import { useEffect, useRef, useState } from 'react';
import { ModalDatePoint } from '../../component/popup/date';
import RBSheet from '@nonam4/react-native-bottom-sheet';
import apiFetch from '../../functions/api';

export function SearchScreen() {
    const date = useRef<RBSheet>(null)
    const [page, setPage] = useState(1)
    const [meta, setMeta] = useState({})
    const [data, setData] = useState([])
    const [refresh, setRefresh] = useState(false)
    
    useEffect(()=>{
        (async()=>{
            const value = await apiFetch(`/event?page=1`,'GET', true)
            
            if (value?.status == 200) {
                setMeta(value.meta)
                setData(value.data)
            }
            
        })();
    },[])

    const onRefresh = async() => {
        setRefresh(true)
        setTimeout(async() => {
            const val = await apiFetch('/event?page=1','GET', true)
            // console.log(val);
            if (val?.status == 200) {
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
                {data.length != 0 ? 
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={data}
                        refreshControl={<RefreshControl
                            refreshing={refresh}
                            colors={[Бирюзовый]}
                            progressBackgroundColor={'#181818'}
                            onRefresh={onRefresh}
                        />}
                        onEndReached={async()=>{
                            if (meta?.last_page>page) {
                                const value = await apiFetch(`/event?page=${page+1}`,'GET', true)
                                setPage(page+1)
                                setMeta(value.meta)
                                setData(prevState => ([...prevState, ...value.data]))
                            }
                        }}
                        onEndReachedThreshold={0.8}
                        ListHeaderComponent={
                            <>
                                <View style={{marginBottom:16}}>
                                    <View style={{marginHorizontal:16, marginBottom:8, flexDirection:'row', alignItems:'center', justifyContent:"space-between"}}>
                                        <Text style={[styles.h4, {color:'white'}]}>Мероприятия</Text>
                                        <TouchableOpacity onPress={()=>date.current?.open()} style={{borderRadius:16, width:42, alignItems:'center', justifyContent:"center", height:42, backgroundColor:'#00000033'}}>
                                            <CalendarIcon color='#fff'/>
                                        </TouchableOpacity>
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
                                {/* <Tags paddingV={5} style={{paddingHorizontal:0}} onPress={(data)=>console.log(data)} noBorder data={[{value:'1', name:'Сегодня', colorInActive:'#00000033', color:'#374A4E', colorText:'#FFFFFF', colorTextInActive:'#FFFFFFAB'}, {value:'2', name:'Завтра', color:'#374A4E', colorInActive:'#00000033', colorTextInActive:'#FFFFFFAB', colorText:'#FFFFFF'}, {value:'3', colorInActive:'#00000033', colorTextInActive:'#FFFFFFAB', name:'Оплачиваемые', color:'#374A4E', colorText:'#FFFFFF'}, {value:'4', colorInActive:'#00000033', colorTextInActive:'#FFFFFFAB', name:'Еда', color:'#374A4E', colorText:'#FFFFFF'}, {value:'5', colorInActive:'#00000033', colorTextInActive:'#FFFFFFAB', name:'Алкоголь', color:'#374A4E', colorText:'#FFFFFF'}]}/> */}
                                
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
                            progressBackgroundColor={'#181818'}
                            onRefresh={onRefresh}
                        />}
                        contentContainerStyle={{flexGrow:1}} 
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{marginTop:statusBarHeight+15, marginBottom:16}}>
                            <View style={{marginHorizontal:16, marginBottom:8, flexDirection:'row', alignItems:'center', justifyContent:"space-between"}}>
                                <Text style={[styles.h4, {color:'white'}]}>Мероприятия</Text>
                                <TouchableOpacity onPress={()=>date.current?.open()} style={{borderRadius:16, width:42, alignItems:'center', justifyContent:"center", height:42, backgroundColor:'#00000033'}}>
                                    <CalendarIcon color='#fff'/>
                                </TouchableOpacity>
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
                        {/* <Tags paddingV={5} style={{paddingHorizontal:0}} onPress={(data)=>console.log(data)} noBorder data={[{value:'1', name:'Сегодня', colorInActive:'#00000033', color:'#374A4E', colorText:'#FFFFFF', colorTextInActive:'#FFFFFFAB'}, {value:'2', name:'Завтра', color:'#374A4E', colorInActive:'#00000033', colorTextInActive:'#FFFFFFAB', colorText:'#FFFFFF'}, {value:'3', colorInActive:'#00000033', colorTextInActive:'#FFFFFFAB', name:'Оплачиваемые', color:'#374A4E', colorText:'#FFFFFF'}, {value:'4', colorInActive:'#00000033', colorTextInActive:'#FFFFFFAB', name:'Еда', color:'#374A4E', colorText:'#FFFFFF'}, {value:'5', colorInActive:'#00000033', colorTextInActive:'#FFFFFFAB', name:'Алкоголь', color:'#374A4E', colorText:'#FFFFFF'}]}/> */}
                        
                        <View style={{flex:1}}>
                            <BlurView intensity={75} experimentalBlurMethod='dimezisBlurView' style={styles.blurNoWoman} tint='systemChromeMaterialDark'>
                                <Text style={[styles.bodyText,{color:'white',textAlign:"center"}]}>{'По этому запросу ничего не найдено.\nПопробуйте изменить набор фильтров'}</Text>
                                <TouchableOpacity activeOpacity={0.7}>
                                    <Text style={[styles.button,{color:Бирюзовый, paddingTop:8}]}>Сбросить фильтр</Text>
                                </TouchableOpacity>
                            </BlurView>
                        </View>
                    </ScrollView>}
                <ModalDatePoint ref={date}/>
            </MainLayout>
        </ImageBackground>
    )
}