import { Text, TouchableOpacity, View } from 'react-native';
import { BlockArrowIcon, MessageIcon } from '../../component/svg/svg';
import { styles } from '../../styles';
import { Бирюзовый } from '../../GLOBAL';
 
export function ProfileBlock(props:{text?:string, msgIcon?:boolean, onPress?:()=>void}) {
    return ( 
        <TouchableOpacity activeOpacity={0.7} onPress={props.onPress} style={styles.blockProfile}>
            <Text style={[styles.bodyText,{color:'white', marginLeft:5}]}>{props.text}</Text>
            {props.msgIcon ? 
                <View style={{marginVertical:-8, alignItems:"center", justifyContent:"center", marginRight:-8, backgroundColor:Бирюзовый, borderRadius:16}}><MessageIcon/></View>
                : <BlockArrowIcon/>
            }
        </TouchableOpacity>
    )
} 