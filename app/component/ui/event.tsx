import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../styles';
import { BlurView } from 'expo-blur';
import { CheckIcon, EditIcon, InstaIcon, MiniInfIcon, MoneyIcon, TaxiIcon, TrashIcon } from '../../component/svg/svg';
import { navigate } from '../../functions/navigate';
import { ButtonMy } from './ButtonMy';
import { ModalDelEvent } from '../popup/del_event';
import RBSheet from '@nonam4/react-native-bottom-sheet';
import { useRef } from 'react';
import { ModalReview } from '../popup/review';
import { width } from '../../GLOBAL';
 
export function EventItem(props:{tag?:number, size?:number, check?:boolean, noEdit?:boolean, type?:'guest'|'org'}) {
    const del = useRef<RBSheet>()
    const review = useRef<RBSheet>(null)
    return ( 
        <TouchableOpacity activeOpacity={0.7} style={{width:width-32}} onPress={()=>navigate('Event',{type:props.type})}>
            <BlurView intensity={75} tint='systemChromeMaterialDark' style={{borderRadius:16, overflow:"hidden", borderWidth:1, borderColor:'#FFFFFF99', padding:8, flexDirection:"row",gap:10, width:'100%'}}>
                <View>
                    <Image source={require('../../../assets/image/event.jpg')} style={{height:props.size??72,aspectRatio:1, borderRadius:16}}/>
                    {!props.noEdit &&<View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginTop:8}}>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>del.current?.open()} style={{width:33, height:33, borderRadius:180, backgroundColor:'#4D000190', alignItems:"center", justifyContent:"center"}}>
                            <TrashIcon/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>navigate('EditEvent')} style={{width:33, height:33, borderRadius:180, backgroundColor:'#374A4E90', alignItems:"center", justifyContent:"center"}}>
                            <EditIcon/>
                        </TouchableOpacity>
                    </View>}
                    {props.check && <View style={{position:"absolute", top:3, left:3}}>
                        <CheckIcon/>
                    </View>}
                </View>
                <View style={{flex:1, justifyContent:"space-between",gap:6}}>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                        <Text style={[styles.smallText,{color:'white'}]}>18:00</Text>
                        <Text style={[styles.smallText,{color:'white'}]}>10 <Text style={{fontSize:10, color:"#FFFFFF99"}}>авг. -</Text> 10 <Text style={{fontSize:10, color:"#FFFFFF99"}}>авг.</Text></Text>
                    </View>
                    
                    <Text style={[styles.h4,{color:'white', flex:1}]}>Название вечеринки Paty Dens Nou</Text>
                    {props.noEdit ? <View style={{flexDirection:"row", alignItems:"center", gap:4, justifyContent:"space-between"}}>
                        <View style={{flexDirection:"row", alignItems:'flex-end', gap:2}}>
                            <Text style={[styles.smallText,{color:'#5AA19D', fontSize:10}]}>Для вас:</Text>
                            <MiniInfIcon/>
                            <TaxiIcon/>
                            {/* <AlchIcon/>
                            <EatIcon/>
                            <CaliyanIcon/> */}
                            <MoneyIcon/>
                            <Text style={[styles.smallText,{color:'#5AA19D', fontFamily:"PoppinsMedium"}]}>+3</Text>
                        </View>
                        <View style={{flexDirection:"row", alignItems:'flex-end', gap:4}}>
                            <Text style={[styles.smallText,{color:'#5AA19D', fontSize:10}]}>От вас:</Text>
                            <InstaIcon/>
                        </View>
                    </View>:<>
                        {props.tag == 0 && <ButtonMy text='25 заявок' disabled={false} onPress={()=>navigate('EventPeople')} backgroundColor='#88FFF900' colorText='#FFF' borderColor='#88FFF9' onPressColor='#393939'/>}
                        {props.tag == 1 && <ButtonMy text='Оценить' disabled={false} onPress={()=>review.current?.open()} backgroundColor='#88FFF900' colorText='#FFF' borderColor='#88FFF9' onPressColor='#393939'/>}
                        {props.tag == 2 && <ButtonMy text='Опубликовать' onPressColor='#393939' disabled={false} onPress={()=>{}} backgroundColor='#88FFF900' colorText='#FFF' borderColor='#88FFF9'/>}
                    </>}
                </View>
                <ModalDelEvent ref={del}/>
                <ModalReview ref={review}/>
            </BlurView>
        </TouchableOpacity>
    )
}