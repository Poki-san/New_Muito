import { Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { EventItem, MainLayout } from '../../component';
import { height, statusBarHeight, width, Бирюзовый } from '../../GLOBAL';
import { styles } from '../../styles';
import { CalendarIcon } from '../../component/svg/svg';
import { Tags, TagsNoScroll } from '../../component/ui/tags';
import { BlurView } from 'expo-blur';
import { useRef, useState } from 'react';
import { ModalDatePoint } from '../../component/popup/date';
import RBSheet from '@nonam4/react-native-bottom-sheet';

export function SearchScreen() {
    const [events, setEvents] = useState([1,2,3,4,5])
    const date = useRef<RBSheet>(null)
    
    return ( 
        <ImageBackground style={{width:width, height:height}} source={require('../../../assets/image/back.png')}>
            <MainLayout isStatusBar>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1}}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : 'height'}
                        keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                        style={{ flex: 1 }}
                    >
                        <View style={{marginTop:statusBarHeight+16, marginBottom:16}}>
                            <View style={{marginHorizontal:16, marginBottom:8, flexDirection:'row', alignItems:'center', justifyContent:"space-between"}}>
                                <Text style={[styles.h4, {color:'white'}]}>Мероприятия</Text>
                                <TouchableOpacity onPress={()=>date.current?.open()} style={{borderRadius:16, width:42, alignItems:'center', justifyContent:"center", height:42, backgroundColor:'#00000033'}}>
                                    <CalendarIcon color='#fff'/>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginHorizontal:16, marginBottom:8, flexDirection:'row', alignItems:'center', gap:8}}>
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
                            </View>
                            <Image source={require('../../../assets/image/line.png')} style={{height:1}}/>
                        </View>
                        <View style={{marginHorizontal:16}}>
                            <Tags paddingV={5} style={{paddingHorizontal:0}} onPress={(data)=>console.log(data)} noBorder data={[{value:'1', name:'Сегодня', colorInActive:'#00000033', color:'#374A4E', colorText:'#FFFFFF', colorTextInActive:'#FFFFFFAB'}, {value:'2', name:'Завтра', color:'#374A4E', colorInActive:'#00000033', colorTextInActive:'#FFFFFFAB', colorText:'#FFFFFF'}, {value:'3', colorInActive:'#00000033', colorTextInActive:'#FFFFFFAB', name:'Оплачиваемые', color:'#374A4E', colorText:'#FFFFFF'}, {value:'4', colorInActive:'#00000033', colorTextInActive:'#FFFFFFAB', name:'Еда', color:'#374A4E', colorText:'#FFFFFF'}, {value:'5', colorInActive:'#00000033', colorTextInActive:'#FFFFFFAB', name:'Алкоголь', color:'#374A4E', colorText:'#FFFFFF'}]}/>
                        </View>
                        {events.length != 0 ? <View style={{marginHorizontal:16, flex:1, marginTop:16, gap:8, marginBottom:76}}>
                            {events.map((el,i)=><EventItem size={92} noEdit key={i} type={'guest'}/>)}
                        </View> :
                        <View style={{marginTop:16, flex:1}}>
                            <BlurView intensity={75} experimentalBlurMethod='dimezisBlurView' style={styles.blurNoWoman} tint='systemChromeMaterialDark'>
                                <Text style={[styles.bodyText,{color:'white',textAlign:"center"}]}>{'По этому запросу ничего не найдено.\nПопробуйте изменить набор фильтров'}</Text>
                                <TouchableOpacity activeOpacity={0.7}>
                                    <Text style={[styles.button,{color:Бирюзовый, paddingTop:8}]}>Сбросить фильтр</Text>
                                </TouchableOpacity>
                            </BlurView>
                        </View>}
                    </KeyboardAvoidingView>
                    <ModalDatePoint ref={date}/>
                </ScrollView>
            </MainLayout>
        </ImageBackground>
    )
}