import { Image, View } from 'react-native';
import {Бирюзовый } from '../GLOBAL';
import { Marker } from 'react-native-yamap-plus';

export const MarkerMap = ({info, index, onLoad, onPress}) => {
    return (
        <Marker
            point={info.point}
            children={
                <View style={{borderWidth:1, width: 40, height: 40, overflow:"hidden", borderColor:Бирюзовый, borderRadius:16}}>
                    <Image
                        onLoad={onLoad}
                        source={{uri:info?.marker}}
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                    />
                </View>
            }
            onPress={() => onPress(index)}
        />
    )
}