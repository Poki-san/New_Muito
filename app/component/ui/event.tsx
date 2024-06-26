import { ActivityIndicator, Image, Platform, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { styles } from '../../styles';
import { BlurView } from 'expo-blur';
import { CheckIcon, EditIcon, InstaIcon, MiniInfIcon, MoneyIcon, TaxiIcon, TrashIcon } from '../../component/svg/svg';
import { navigate } from '../../functions/navigate';
import { ButtonMy } from './ButtonMy';
import { ModalDelEvent } from '../popup/del_event';
import RBSheet from '@nonam4/react-native-bottom-sheet';
import { useEffect, useRef, useState } from 'react';
import { ModalReview } from '../popup/review';
import { width, Бирюзовый } from '../../GLOBAL';
import moment from 'moment';
import apiFetch from '../../functions/api';
 
export function EventItem(props:{tag?:number, size?:number, onDelete?: () => void, check?:boolean, data?:{}, style?: StyleProp<ViewStyle>, noEdit?:boolean, type?:'guest'|'org'}) {
    const del = useRef<RBSheet>()
    const review = useRef<RBSheet>(null)
    const {data} = props
    console.log(data);
    
    
    return ( 
        <TouchableOpacity activeOpacity={0.7} style={[{width:width-32},props.style]} onPress={()=>navigate('Event',{type:props.type, id:data?.id})}>
            <BlurView intensity={75} tint='systemChromeMaterialDark' style={{borderRadius:16, overflow:"hidden", borderWidth:1, borderColor:'#FFFFFF99', padding:8, flexDirection:"row",gap:10, width:'100%'}}>
                <View>
                    <Image source={{uri:data?.img[0]?.small}} style={{height:props.size??72,aspectRatio:1, borderRadius:16}}/>
                    {!props.noEdit &&<View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginTop:8}}>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>del.current?.open()} style={{width:33, height:33, borderRadius:180, backgroundColor:'#4D000190', alignItems:"center", justifyContent:"center"}}>
                            <TrashIcon/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>navigate('EditEvent',{id:data?.id})} style={{width:33, height:33, borderRadius:180, backgroundColor:'#374A4E90', alignItems:"center", justifyContent:"center"}}>
                            <EditIcon/>
                        </TouchableOpacity>
                    </View>}
                    {!!data?.status?.invite && <View style={{position:"absolute", top:3, left:3}}>
                        <CheckIcon/>
                    </View>}
                </View>
                <View style={{flex:1, justifyContent:"space-between",gap:6}}>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                        {data?.time_part && <Text style={[styles.smallText,{color:'white'}]}>{data?.time_part}</Text>}

                        {moment(data?.date_event).format("DD MMM YY") != moment(data?.end_date_event).format("DD MMM YY") ? 
                            <Text style={[styles.smallText,{color:'white'}]}>{moment(data?.date_event).format("DD ")}<Text style={{fontSize:10, color:"#FFFFFF99"}}>{moment(data?.date_event).format("MMM YY")} -</Text> {moment(data?.end_date_event).format("DD ")}<Text style={{fontSize:10, color:"#FFFFFF99"}}>{moment(data?.end_date_event).format("MMM YY")}</Text></Text>
                        :
                            <Text style={[styles.smallText,{color:'white'}]}>{moment(data?.date_event).format("DD ")}<Text style={{fontSize:10, color:"#FFFFFF99"}}>{moment(data?.date_event).format("MMM YY")}</Text></Text>
                        }
                    </View>
                    
                    <Text style={[styles.h4,{color:'white', flex:1}]}>{data?.title}</Text>
                    {props.noEdit ? <View style={{flexDirection:"row", alignItems:"center", gap:4, justifyContent:"space-between"}}>
                        {data?.for_participants?.length >0&&<View style={{flexDirection:"row", alignItems:'flex-end', gap:2}}>
                            <Text style={[styles.smallText,{color:'#5AA19D', fontSize:10}]}>Для вас:</Text>
                            {data?.for_participants?.length >0&& data?.for_participants?.map((el,i)=>(i==0 ||i==1 ||i==2) && <Image key={i} style={{width:16, height:16}} resizeMethod='resize' source={{uri:el?.uri}} resizeMode='contain'/>)}
                            {data?.for_participants?.length > 3 && <Text style={[styles.smallText,{color:'#5AA19D', fontFamily:"PoppinsMedium"}]}>+{data?.for_participants?.length-3}</Text>}
                        </View>}
                        {data?.from_participants?.length >0 && <View style={{flexDirection:"row", alignItems:'flex-end', gap:4}}>
                            <Text style={[styles.smallText,{color:'#5AA19D', fontSize:10}]}>От вас:</Text>
                            {data?.from_participants?.length >0&& data?.from_participants?.map((el,i)=>(i==0 ||i==1 ||i==2) && <Image key={i} style={{width:16, height:16}} resizeMethod='resize' source={{uri:el?.uri}} resizeMode='contain'/>)}
                            {data?.from_participants?.length > 3 && <Text style={[styles.smallText,{color:'#5AA19D', fontFamily:"PoppinsMedium"}]}>+{data?.from_participants?.length-3}</Text>}
                        </View>}
                    </View>:<>
                        {props.tag == 2 && <ButtonMy text={data?.count+' заявки'} disabled={data?.count == 0 ? true:false} onPress={()=>navigate('EventPeople',{id:data?.id})} backgroundColor='#88FFF900' colorText='#FFF' borderColor='#88FFF9' onPressColor='#393939'/>}
                        {props.tag == 1 && <ButtonMy text='Оценить' disabled={false} onPress={()=>review.current?.open()} backgroundColor='#88FFF900' colorText='#FFF' borderColor='#88FFF9' onPressColor='#393939'/>}
                        {props.tag == 0 && <ButtonMy text='Опубликовать' onPressColor='#393939' disabled={false} onPress={()=>{}} backgroundColor='#88FFF900' colorText='#FFF' borderColor='#88FFF9'/>}
                    </>}
                </View>
                <ModalDelEvent ref={del} id={props.data?.id} onDelete={props.onDelete}/>
                <ModalReview ref={review}/>
            </BlurView>
        </TouchableOpacity>
    )
}


export function EventMapItem(props:{tag?:number, size?:number, onDelete?: () => void, check?:boolean, data?:{}, style?: StyleProp<ViewStyle>, noEdit?:boolean, type?:'guest'|'org'}) {
    const del = useRef<RBSheet>()
    const review = useRef<RBSheet>(null)
    const [event, setEvent] = useState(null)
    const {data} = props
    
    useEffect(()=>{
        (async()=>{
            const value = await apiFetch(`/event/${data?.id}`,'GET',true)
            if (value?.status == 200) {
                setEvent(value.data)
            }
        })();
    },[])
    
    return (event ?
        <TouchableOpacity activeOpacity={0.7} style={[{width:width-32},props.style]} onPress={()=>navigate('Event',{type:props.type, id:data?.id})}>
            <BlurView intensity={Platform.OS=='android'? 100:75} tint='systemChromeMaterialDark' style={{borderRadius:16, overflow:"hidden", borderWidth:1, borderColor:'#FFFFFF99', padding:8, flexDirection:"row",gap:10, width:'100%'}}>
                <View>
                    <Image source={{uri:event?.img[0]?.small}} style={{height:props.size??72,aspectRatio:1, borderRadius:16}}/>
                    {!!event?.status?.invite && <View style={{position:"absolute", top:3, left:3}}>
                    <CheckIcon/>
                </View>}
                </View>
                <View style={{flex:1, justifyContent:"space-between",gap:6}}>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                        {data?.time_part && <Text style={[styles.smallText,{color:'white'}]}>{data?.time_part}</Text>}

                        {moment(event?.date_event).format("DD MMM YY") != moment(event?.end_date_event).format("DD MMM YY") ? 
                            <Text style={[styles.smallText,{color:'white'}]}>{moment(event?.date_event).format("DD ")}<Text style={{fontSize:10, color:"#FFFFFF99"}}>{moment(event?.date_event).format("MMM YY")} -</Text> {moment(event?.end_date_event).format("DD ")}<Text style={{fontSize:10, color:"#FFFFFF99"}}>{moment(event?.end_date_event).format("MMM YY")}</Text></Text>
                            :
                            <Text style={[styles.smallText,{color:'white'}]}>{moment(event?.date_event).format("DD ")}<Text style={{fontSize:10, color:"#FFFFFF99"}}>{moment(event?.date_event).format("MMM YY")}</Text></Text>
                        }
                    </View>
                    
                    <Text style={[styles.h4,{color:'white', flex:1}]}>{event?.title}</Text>
                    {props.noEdit ? <View style={{flexDirection:"row", alignItems:"center", gap:4, justifyContent:"space-between"}}>
                        {event?.for_participants?.length >0&&<View style={{flexDirection:"row", alignItems:'flex-end', gap:2}}>
                            <Text style={[styles.smallText,{color:'#5AA19D', fontSize:10}]}>Для вас:</Text>
                            {event?.for_participants?.length >0&& event?.for_participants?.map((el,i)=>(i==0 ||i==1 ||i==2) && <Image key={i} style={{width:16, height:16}} resizeMethod='resize' source={{uri:el?.uri}} resizeMode='contain'/>)}
                            {event?.for_participants?.length > 3 && <Text style={[styles.smallText,{color:'#5AA19D', fontFamily:"PoppinsMedium"}]}>+{event?.for_participants?.length-3}</Text>}
                        </View>}
                        {event?.from_participants?.length >0 && <View style={{flexDirection:"row", alignItems:'flex-end', gap:4}}>
                            <Text style={[styles.smallText,{color:'#5AA19D', fontSize:10}]}>От вас:</Text>
                            {event?.from_participants?.length >0&& event?.from_participants?.map((el,i)=>(i==0 ||i==1 ||i==2) && <Image key={i} style={{width:16, height:16}} resizeMethod='resize' source={{uri:el?.uri}} resizeMode='contain'/>)}
                            {event?.from_participants?.length > 3 && <Text style={[styles.smallText,{color:'#5AA19D', fontFamily:"PoppinsMedium"}]}>+{event?.from_participants?.length-3}</Text>}
                        </View>}
                    </View>:<>
                        {props.tag == 2 && <ButtonMy text={event?.count+' заявки'} disabled={false} onPress={()=>navigate('EventPeople')} backgroundColor='#88FFF900' colorText='#FFF' borderColor='#88FFF9' onPressColor='#393939'/>}
                        {props.tag == 1 && <ButtonMy text='Оценить' disabled={false} onPress={()=>review.current?.open()} backgroundColor='#88FFF900' colorText='#FFF' borderColor='#88FFF9' onPressColor='#393939'/>}
                        {props.tag == 0 && <ButtonMy text='Опубликовать' onPressColor='#393939' disabled={false} onPress={()=>{}} backgroundColor='#88FFF900' colorText='#FFF' borderColor='#88FFF9'/>}
                    </>}
                </View>
            </BlurView>
        </TouchableOpacity> :
        <View style={{alignItems:"center", justifyContent:"center", width:width-32}}>
            <View style={{backgroundColor:'#181818CC', borderRadius:90, padding:10}}><ActivityIndicator size={40} color={Бирюзовый}/></View>
        </View>
    )
}