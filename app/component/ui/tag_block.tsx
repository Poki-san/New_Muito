import { Text, View } from 'react-native';
import { styles } from '../../styles';
 
export function TagBlock(props:{text?:string}) {

    return ( 
        <View style={styles.tagContainer}>
            <Text style={[styles.shadow,{color:'white'}]}>{props.text}</Text>
        </View>
    )
}