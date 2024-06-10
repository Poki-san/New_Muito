import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ButtonMy, Input, MainLayout } from '../../component';
import { statusBarHeight, width, Бирюзовый } from '../../GLOBAL';
import { BackArrowIcon, CalendarIcon, ClockIcon, CrossIcon, MapPinIcon } from '../../component/svg/svg';
import { goBack } from '../../functions/navigate';
import { styles } from '../../styles';
import { useRef, useState } from 'react';
import { TagsNoScroll } from '../../component/ui/tags';
import { ModalImg } from '../../component/popup/img';
import RBSheet from '@nonam4/react-native-bottom-sheet';
import { showToastable } from 'react-native-toastable';
import { ModalDate } from '../../component/popup/date';
 
export function AddEventScreen() {
    const [paths, setPaths] = useState([])
    const [dateTxt, setDateTxt] = useState('')
    const img = useRef<RBSheet>(null)
    const date = useRef<RBSheet>(null)
    
    return ( 
        <MainLayout isStatusBar backgroundColor='#181818'>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1}}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                    style={{ flex: 1 }}
                >
                    <View style={{marginHorizontal:16, marginTop:statusBarHeight+19, marginBottom:20, flex:1}}>
                        <View style={{justifyContent:'space-between', marginBottom:19, flexDirection:"row", alignItems:"center"}}>
                            <TouchableOpacity activeOpacity={0.7} onPress={goBack} style={{width:42, height:42, alignItems:"center", justifyContent:"center", backgroundColor:'#221E1E80', borderRadius:16}}>
                                <BackArrowIcon/>
                            </TouchableOpacity>
                            <Text style={[styles.h4, {color:'white'}]}>Новый эвент</Text>
                            <View style={{width:42, height:42}}/>
                        </View>
                        <View style={{gap:8}}>
                            <View style={{gap:8}}>
                                <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                                    <Text style={[styles.h4,{color:'#FFFFFF', fontFamily:"Poppins"}]}>Фотография эвента</Text>
                                    <TouchableOpacity activeOpacity={0.7} onPress={()=>img.current?.open()}>
                                        <Text style={[styles.h4,{color:Бирюзовый, fontFamily:"Poppins"}]}>{paths.length != 0 ? 'Изменить':'Добавить'}</Text>
                                    </TouchableOpacity>
                                </View>
                                {paths.length != 0 && <View style={{flexDirection:"row", flex:1, alignItems:"center", gap:6, flexWrap:'wrap'}}>
                                    {paths.map((el,i)=><View key={i}>
                                        <Image source={{uri:el}} style={{width:(((width-32))/4)-(18/4), height:((width-32)/4)-(18/4), borderRadius:16, overflow:'hidden'}}/>
                                        <TouchableOpacity activeOpacity={0.7} onPress={()=>setPaths([])} style={{position:"absolute", backgroundColor:"#00000066", borderRadius:90, top:3, right:3}}>
                                            <CrossIcon/>
                                        </TouchableOpacity>
                                    </View>
                               )}
                                </View>}
                            </View>
                            <View style={{gap:4}}>
                                <Text style={[styles.smallText,{color:'#FFFFFF90', marginRight:10, textAlign:'right'}]}>0/50</Text>
                                <TextInput
                                    placeholder='Название эвента'
                                    multiline
                                    maxLength={50}
                                    placeholderTextColor={'#FFFFFF99'}
                                    style={[styles.bodyText,{ borderRadius:16, borderWidth:1, borderTopLeftRadius:16, borderColor:'#FFFFFF99', borderTopRightRadius:16, maxHeight:100, color:'white', paddingVertical:Platform.OS=='ios'?13:7, paddingLeft:17}]}
                                />
                            </View>
                            <TouchableOpacity activeOpacity={0.7} onPress={()=>{}}>
                                <Input editable={false} backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Адрес' style={{borderWidth:1, borderColor:'#FFFFFF99', paddingRight:20}}/>
                                <View style={{position:'absolute', right:10, top:0, bottom:0, justifyContent:'center'}}><MapPinIcon/></View>
                            </TouchableOpacity>
                            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
                                <TouchableOpacity activeOpacity={0.7} style={{width:"70%"}} onPress={()=>date.current?.open()}>
                                    <Input editable={false} value={dateTxt} backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Дата проведения' style={{borderWidth:1, borderColor:'#FFFFFF99', paddingRight:20}}/>
                                    <View style={{position:'absolute', right:10, top:0, bottom:0, justifyContent:'center'}}><CalendarIcon/></View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.7} style={{width:'28%'}} onPress={()=>{}}>
                                    <Input editable={false} value='00:00' backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Начало' style={{borderWidth:1, borderColor:'#FFFFFF99', paddingRight:19}}/>
                                    <View style={{position:'absolute', right:10, top:0, bottom:0, justifyContent:'center'}}><ClockIcon/></View>
                                </TouchableOpacity>
                            </View>
                            <View style={{gap:4}}>
                                <Text style={[styles.smallText,{color:'#FFFFFF90', marginRight:10, textAlign:'right'}]}>0/500</Text>
                                <TextInput
                                    placeholder='Описание'
                                    multiline
                                    maxLength={500}
                                    placeholderTextColor={'#FFFFFF99'}
                                    style={[styles.bodyText,{ borderRadius:16, borderWidth:1, borderTopLeftRadius:16, borderColor:'#FFFFFF99', borderTopRightRadius:16, maxHeight:230, color:'white', paddingVertical:Platform.OS=='ios'?13:7, paddingLeft:17}]}
                                />
                            </View>
                            <View style={{gap:8, marginTop:8}}>
                                <Text style={[styles.h4,{color:'#FFFFFF'}]}>Для участниц:</Text>
                                <TagsNoScroll data={[{name:'Такси', value:'1'},{name:'Кальян', value:'2'},{name:'Алкоголь', value:'3'},{name:'Еда', value:'4'},{name:'Оплачиваемые', value:'5'},{name:'Подробнее в описании', value:'6'}]} />
                            </View>
                            <View style={{gap:8, marginTop:8}}>
                                <Text style={[styles.h4,{color:'#FFFFFF'}]}>От участниц:</Text>
                                <TagsNoScroll data={[{name:'Отметка в соцсетях', value:'1'}]} />
                            </View>
                            <View style={{marginTop:8, gap:16}}>
                                <ButtonMy text='Создать мероприятие' onPress={()=>{
                                    showToastable({message:'Ваше мероприятие успешно создано'})
                                    goBack()
                                }} backgroundColor='#88FFF9' colorText='#171717'/>
                                <ButtonMy text='Сохранить как черновик' onPress={()=>{
                                    showToastable({message:'Изменения сохранены'})
                                    goBack()
                                }} borderColor='#88FFF9' onPressColor='#393939' backgroundColor='#171717' colorText='#FFF'/>
                            </View>
                        </View>
                    </View>
                    <ModalImg ref={img} onPath={setPaths}/>
                    <ModalDate ref={date} onPeroid={(start,end)=>{
                        setDateTxt(start+' '+end)
                    }}/>
                </KeyboardAvoidingView>
            </ScrollView>
        </MainLayout>
    )
}