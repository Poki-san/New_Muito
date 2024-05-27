import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../styles';
import { BlurView } from 'expo-blur';
import { EditIcon,TrashIcon } from '../../component/svg/svg';
import { navigate } from '../../functions/navigate';
import { ButtonMy } from './ButtonMy';
import { ModalDelEvent } from '../popup/del_event';
import RBSheet from '@nonam4/react-native-bottom-sheet';
import { useRef } from 'react';
 
export function EventItem(props:{tag?:number}) {
    const del = useRef<RBSheet>()
    return ( 
        <TouchableOpacity activeOpacity={0.7} onPress={()=>navigate('Event')}>
            <BlurView intensity={75} tint='systemChromeMaterialDark' style={{borderRadius:16, overflow:"hidden", borderWidth:1, borderColor:'#FFFFFF99', padding:8, flexDirection:"row",gap:10}}>
                <View>
                    <Image source={require('../../../assets/image/event.jpg')} style={{width:72, height:72, borderRadius:16}}/>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginTop:8}}>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>del.current?.open()} style={{width:33, height:33, borderRadius:180, backgroundColor:'#4D000190', alignItems:"center", justifyContent:"center"}}>
                            <TrashIcon/>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={()=>navigate('EditEvent')} style={{width:33, height:33, borderRadius:180, backgroundColor:'#374A4E90', alignItems:"center", justifyContent:"center"}}>
                            <EditIcon/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex:1, justifyContent:"space-between",gap:6}}>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                        <Text style={[styles.smallText,{color:'white'}]}>18:00</Text>
                        <Text style={[styles.smallText,{color:'white'}]}>10 <Text style={{fontSize:10}}>авг.</Text></Text>
                    </View>
                    
                    <Text style={[styles.h4,{color:'white', flex:1}]}>Название вечеринки Paty Dens Nou</Text>
                    {props.tag == 0 && <ButtonMy text='25 заявок' disabled={false} onPress={()=>navigate('EventPeople')} backgroundColor='#88FFF900' colorText='#FFF' borderColor='#88FFF9' onPressColor='#393939'/>}
                    {props.tag == 1 && <ButtonMy text='Опубликовать' onPressColor='#393939' disabled={false} onPress={()=>{}} backgroundColor='#88FFF900' colorText='#FFF' borderColor='#88FFF9'/>}
                </View>
                <ModalDelEvent ref={del}/>
            </BlurView>
        </TouchableOpacity>
    )
}