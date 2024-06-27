import { ActivityIndicator, Image, ImageBackground, Linking, Text, TouchableOpacity, View } from 'react-native';
import { width, Бирюзовый, Бирюзовый50 } from '../../GLOBAL';
import { styles } from '../../styles';
import { EditIcon, InstaEventIcon, RegInstaIcon, TGIcon, TelegramIcon } from '../../component/svg/svg';
import { navigate } from '../../functions/navigate';
import { useEffect, useState } from 'react';
import apiFetch from '../../functions/api';
import { date } from 'yup';
 
export function PeopleItem(props:{data?:{}}) {
    console.log(props.data?.img[0]);
    
    return ( 
        <TouchableOpacity onPress={()=>navigate('People',{id:props.data?.id})} activeOpacity={0.7}>  
            <ImageBackground style={{
                width:((width-32)/2.1),
                height:(((width-32)/2)/(167/203)),
                borderRadius:16,
                overflow:'hidden'
            }} source={{uri:props.data?.img[0]?.small}}>
                {props.data?.instagram &&<View style={styles.instaContainer}>
                    {props.data?.count_instagram&&<Text style={[styles.smallText,{color:Бирюзовый50, fontFamily:"PoppinsSemiBold"}]}>{props.data?.count_instagram}</Text>}
                    <RegInstaIcon/>
                </View>}
                <View style={styles.tgContainer}>
                    <Text style={[styles.bodyText,{color:'white'}]}>{props.data?.name} <Text style={{color:'#FFFFFF90'}}>{props.data?.age}</Text></Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

export function PeopleItemMap(props:{data?:{}}) {
    const [people, setPeople] = useState(null)

    useEffect(()=>{
        (async()=>{
            const value = await apiFetch(`/users/${props?.data?.id}`,'GET',true)
            
            if (value?.status == 200) {
                // console.log(value.data);
                
                setPeople(value.data)
            }
        })();
    },[])
    
    return(people ?
        <TouchableOpacity activeOpacity={0.9} onPress={()=>{
            navigate('People',{id:people?.id})
        }}>
            <Image source={{uri:people?.img[0].uri}} style={{width:width-32, height:width-32, borderRadius:16 }}/>
            <View style={{position:"absolute", borderRadius:16, left:8, right:8, bottom:12, backgroundColor:'#00000066', paddingVertical:8, paddingHorizontal:13, flexDirection:"row", justifyContent:"space-between", alignItems:'center'}}>
                <Text style={[styles.h4,{fontSize:18, color:'white', lineHeight:21.6}]}>{people?.name} <Text style={{color:'#FFFFFF99'}}>{people?.age}</Text></Text>
                <View style={{flexDirection:"row", alignItems:"center", gap:5}}>
                    {people?.instagram&&<TouchableOpacity 
                        activeOpacity={0.7} 
                        style={{alignItems:'center', flexDirection:'row', gap:4}}
                        onPress={()=>{
                            Linking.openURL('https://www.instagram.com/'+people?.instagram?.replace('@',''))
                        }}
                    >
                        <Text style={[styles.smallText,{fontFamily:'PoppinsSemiBold', color:Бирюзовый50}]}>{people?.count_instagram}</Text>
                        <InstaEventIcon color={"#83FDF4"} opacity={1}/>
                    </TouchableOpacity>}
                    {people?.telegram && <TouchableOpacity activeOpacity={0.7} onPress={()=>{
                        Linking.openURL('https://t.me/'+people?.telegram?.replace('@',''))
                    }} style={{alignItems:'center', flexDirection:'row', gap:4}}>
                        <TGIcon color={"#83FDF4"}/>
                    </TouchableOpacity>}
                </View>
            </View>
        </TouchableOpacity> :
        <View style={{alignItems:"center", justifyContent:"center", width:width-32}}>
            <View style={{backgroundColor:'#181818CC', borderRadius:90, padding:10}}><ActivityIndicator size={40} color={Бирюзовый}/></View>
        </View>
    )
}