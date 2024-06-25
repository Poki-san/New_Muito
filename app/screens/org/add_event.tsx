import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ButtonMy, Input, MainLayout } from '../../component';
import { DADATATOKEN, URLDADATA, statusBarHeight, width, Бирюзовый } from '../../GLOBAL';
import { BackArrowIcon, CalendarIcon, ClockIcon, CrossIcon, MapPinIcon } from '../../component/svg/svg';
import { goBack } from '../../functions/navigate';
import { styles } from '../../styles';
import { useEffect, useRef, useState } from 'react';
import { TagsNoScroll } from '../../component/ui/tags';
import { ModalImg } from '../../component/popup/img';
import RBSheet from '@nonam4/react-native-bottom-sheet';
import { showToastable } from 'react-native-toastable';
import { ModalDate } from '../../component/popup/date';
import { Formik } from 'formik';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import useDebounce from '../../hooks/Debounce';
import { ChoiceMapModal } from '../../component/popup/choice_map';
import apiFetch, { apiFetchFile } from '../../functions/api';
import * as yup from 'yup'
import { fileExpansion, fileName } from '../../functions/addImage';
import error from '../../model/error';

const validations = yup.object().shape({
    title:yup.string().required('Обязательное поле'),
    address:yup.string().required('Обязательное поле'),
    date_event:yup.string().required('Обязательное поле'),
    end_date_event:yup.string().required('Обязательное поле'),
    time:yup.string().required('Обязательное поле')
})

export function AddEventScreen() {
    
    const [paths, setPaths] = useState([])
    const [errPath, setErrPath] = useState(false)
    const [data, setData] = useState(null)
    const img = useRef<RBSheet>(null)
    const date = useRef<RBSheet>(null)
    const [isDate, setIsDate] = useState(false)


    const [text, setText] = useState('')
    const [textAddress, setTextAddress] = useState('')
    const [location, setLocation] = useState({lat:"",lon:""})

    const [choiceMap, setChoice] = useState(false)

    useDebounce(requestFiles, 1000,[text])
    
    async function requestFiles() {
        setTextAddress('')
        await fetch(`${URLDADATA}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + DADATATOKEN
            },
            body: JSON.stringify({
                query: text,
            })
        })
            .then((resp) => resp.json())
            .then((data) => {
                if(data.suggestions?.length > 0){
                    setTextAddress(data.suggestions[0])
                    setLocation({lat:data.suggestions[0]?.data?.geo_lat, lon:data.suggestions[0]?.data?.geo_lon})
                }
            })
            .catch(() => {
                // setCities([])
            })
    }
    const tagsFetch = async()=>{
        const value = await apiFetch('/event/participants','GET',true)
        if (value?.status ==200) {
            setData(value);
        }
    }
    useEffect(()=>{
        tagsFetch();
    },[])

    return ( 
        <MainLayout isStatusBar backgroundColor='#181818'>
            {<ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1}}>
                <Formik
                    onSubmit={async(value)=>{
                        setTextAddress('')
                        if (paths.length > 0 ) {
                            console.log(value);
                            // console.log(location);
                            // console.log(paths);
                            const bodyFormData = new FormData()

                            bodyFormData.append('title', value.title)
                            bodyFormData.append('date_event', value.date_event)
                            bodyFormData.append('end_date_event', value.end_date_event)
                            bodyFormData.append('time', value.time)
                            bodyFormData.append('address', JSON.stringify({ "address": value.address }))
                            value.description.length > 0 && bodyFormData.append('description', value.description)
                            bodyFormData.append('location', JSON.stringify(location))
                            value.for_participants?.length > 0 &&  value.for_participants.forEach(el=>{bodyFormData.append('for_participants[]', el)})
                            value.from_participants?.length > 0 &&  value.from_participants.forEach(el=>{bodyFormData.append('from_participants[]', el)})
                            paths?.length > 0 && paths.map(el => {
                                bodyFormData.append('images[]', {
                                    uri: el,
                                    name: fileName(el),
                                    type: fileExpansion(el, "image")
                                })
                            })
                            
                            const result = await apiFetchFile('/event/create','POST',true, bodyFormData)
                            switch (result?.status) {
                                case 200:
                                case 201:
                                case 202:
                                    showToastable({message:'Ваше мероприятие успешно создано'})
                                    goBack()
                                    break;
                            
                                default:
                                    setTimeout(() => error.Input(true, 'Что-то пошло не так!', 'Упс!...', Platform.OS=='ios'?175:145), 300);
                                    break;
                            }
                            console.log(result);
                            
                        } else {
                            setErrPath(true)
                        }
                        
                    }}
                    validationSchema={validations}
                    initialValues={{
                        title:'',
                        address:'',
                        description:'',
                        time:'',
                        date_event:'',
                        end_date_event:'',
                        for_participants:[],
                        from_participants:[]
                    }}
                >
                    {({values, errors, touched, setFieldValue, handleChange, handleBlur, handleSubmit})=>(<KeyboardAvoidingView
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
                                    {errPath && <Text style={[styles.smallText,{color:'#FF000086'}]}>Нужно добавить фотографию</Text>}
                                </View>
                                <View style={{gap:4}}>
                                    <Text style={[styles.smallText,{color:'#FFFFFF90', marginRight:10, textAlign:'right'}]}>{values.title?.length}/50</Text>
                                    <TextInput
                                        placeholder='Название эвента'
                                        multiline
                                        maxLength={50}
                                        value={values.title}
                                        onChangeText={handleChange('title')}
                                        onBlur={handleBlur('title')}
                                        placeholderTextColor={'#FFFFFF99'}
                                        style={[styles.bodyText,{ borderRadius:16, borderWidth:1, borderTopLeftRadius:16, borderColor:'#FFFFFF99', borderTopRightRadius:16, maxHeight:100, color:'white', paddingVertical:Platform.OS=='ios'?13:7, paddingLeft:17}]}
                                    />
                                    {(!!errors.title && touched.title)&&<Text style={[styles.smallText,{color:'#FF000086', paddingLeft:14}]}>{errors.title}</Text>}
                                </View>
                                <View style={{gap:6, marginBottom:textAddress.length>0?5:0}}>
                                    <View>
                                        <Input 
                                            value={values.address} 
                                            onChangeText={(value)=>{
                                                setText(value)
                                                setFieldValue('address',value)
                                            }} 
                                            errorText={errors.address}
                                            touched={touched.address}
                                            backgroundColor='#FFFFFF00' 
                                            placeholderTextColor={'#FFFFFF99'} 
                                            title='Адрес' 
                                            style={{borderWidth:1, borderColor:'#FFFFFF99', paddingRight:20}}
                                        />
                                        <TouchableOpacity 
                                            activeOpacity={0.7} 
                                            onPress={()=>setChoice(true)} 
                                            style={{position:'absolute', right:10, height:40, top:0, bottom:0, justifyContent:'center'}}>
                                            <MapPinIcon/>
                                        </TouchableOpacity>
                                    </View>
                                    {textAddress?.value?.length > 0 && <TouchableOpacity activeOpacity={0.7} 
                                            onPress={()=>{
                                                setFieldValue('address',textAddress?.value)
                                                setLocation({lat:textAddress?.data?.geo_lat, lon:textAddress?.data?.geo_lon})
                                                setTextAddress('')
                                            }}>
                                        <Text style={[styles.bodyText,{color:'#ffffffAA', marginHorizontal:14}]}>{textAddress?.value}</Text>
                                    </TouchableOpacity>}
                                </View>
                                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                                    <TouchableOpacity activeOpacity={0.7} style={{width:"66%"}} onPress={()=>date.current?.open()}>
                                        <Input 
                                            contentStyle={{fontSize:13}} 
                                            editable={false} 
                                            value={values.date_event.length > 0 && (values.date_event + " "+ values.end_date_event)} 
                                            backgroundColor='#FFFFFF00' 
                                            placeholderTextColor={'#FFFFFF99'} 
                                            title='Дата проведения' 
                                            style={{borderWidth:1, borderColor:'#FFFFFF99', paddingRight:20}}
                                            errorText={errors.date_event ?? errors.end_date_event}
                                            touched={touched.date_event ?? touched.end_date_event}
                                        />
                                        <View style={{position:'absolute', right:10, height:40, top:0, bottom:0, justifyContent:'center'}}><CalendarIcon/></View>
                                    </TouchableOpacity>
                                    <TouchableOpacity activeOpacity={0.7} style={{width:'32%'}} onPress={()=>setIsDate(true)}>
                                        <Input 
                                            contentStyle={{fontSize:13}} 
                                            editable={false} 
                                            value={values.time} 
                                            backgroundColor='#FFFFFF00' 
                                            placeholderTextColor={'#FFFFFF99'} 
                                            title='Начало' 
                                            style={{borderWidth:1, borderColor:'#FFFFFF99', paddingRight:19}}
                                            errorText={errors.time}
                                            touched={touched.time}
                                        />
                                        <View style={{position:'absolute', right:10,height:40, top:0, bottom:0, justifyContent:'center'}}><ClockIcon/></View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{gap:4}}>
                                    <Text style={[styles.smallText,{color:'#FFFFFF90', marginRight:10, textAlign:'right'}]}>{values.description?.length}/500</Text>
                                    <TextInput
                                        placeholder='Описание'
                                        multiline
                                        value={values.description}
                                        onChangeText={handleChange('description')}
                                        onBlur={handleBlur('description')}
                                        maxLength={500}
                                        placeholderTextColor={'#FFFFFF99'}
                                        style={[styles.bodyText,{ borderRadius:16, borderWidth:1, borderTopLeftRadius:16, borderColor:'#FFFFFF99', borderTopRightRadius:16, maxHeight:230, color:'white', paddingVertical:Platform.OS=='ios'?13:7, paddingLeft:17}]}
                                    />
                                </View>
                                {data?.for_participants?.length > 0 && <View style={{gap:8, marginTop:8}}>
                                    <Text style={[styles.h4,{color:'#FFFFFF'}]}>Для участниц:</Text>
                                    <TagsNoScroll data={data?.for_participants} onPress={(value)=>{
                                        setFieldValue('for_participants',value)
                                    }}/>
                                </View>}
                                {data?.from_participants?.length > 0 && <View style={{gap:8, marginTop:8}}>
                                    <Text style={[styles.h4,{color:'#FFFFFF'}]}>От участниц:</Text>
                                    <TagsNoScroll data={data?.from_participants} onPress={(value)=>{
                                        setFieldValue('from_participants',value)
                                    }}/>
                                </View>}
                                <View style={{marginTop:8, gap:16}}>
                                    <ButtonMy text='Создать' onPress={handleSubmit} backgroundColor='#88FFF9' colorText='#171717'/>
                                    {/* <ButtonMy text='Сохранить как черновик' onPress={()=>{
                                        showToastable({message:'Изменения сохранены'})
                                        goBack()
                                    }} borderColor='#88FFF9' onPressColor='#393939' backgroundColor='#171717' colorText='#FFF'/> */}
                                </View>
                            </View>
                        </View>
                        <ModalImg ref={img} onPath={(value)=>{
                            setPaths(value)
                            img.current?.close()
                        }}/>
                        <ModalDate ref={date} onPeroid={(start,end)=>{
                            setFieldValue('date_event',start)
                            setFieldValue('end_date_event',end)
                        }}/>
                        {isDate && 
                            <DateTimePickerModal
                                isVisible={isDate}
                                mode="time"
                                is24Hour={true}
                                locale='ru_RU'
                                onConfirm={(value)=>{
                                    setFieldValue('time',moment(value).format("HH:mm"))                
                                    setIsDate(false)
                                }}
                                onCancel={()=>setIsDate(false)}
                            /> 
                        }
                        <ChoiceMapModal 
                            setAddress={(value)=>{
                                setTextAddress('')
                                setFieldValue('address',value)
                                setChoice(false)
                            }} 
                            visible={choiceMap} 
                            onDismiss={()=>setChoice(false)}
                            onCoordinate={(lat,lon)=>setLocation({lat:lat, lon:lon})}
                        />

                    </KeyboardAvoidingView>)}
                </Formik>
            </ScrollView>}
        </MainLayout>
    )
}