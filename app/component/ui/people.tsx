import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { width, Бирюзовый50 } from '../../GLOBAL';
import { styles } from '../../styles';
import { EditIcon, RegInstaIcon } from '../../component/svg/svg';
import { navigate } from '../../functions/navigate';
 
export function PeopleItem() {
    return ( 
        <TouchableOpacity onPress={()=>navigate('People')} activeOpacity={0.7}>  
            <ImageBackground style={{
                width:((width-32)/2.1),
                height:(((width-32)/2)/(167/203)),
                borderRadius:16,
                overflow:'hidden'
            }} source={require('../../../assets/image/people.jpg')}>
                <View style={styles.instaContainer}>
                    <Text style={[styles.smallText,{color:Бирюзовый50, fontFamily:"PoppinsSemiBold"}]}>100К</Text>
                    <RegInstaIcon/>
                </View>
                <View style={styles.tgContainer}>
                    <Text style={[styles.bodyText,{color:'white'}]}>Виктория <Text style={{color:'#FFFFFF90'}}>25</Text></Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}