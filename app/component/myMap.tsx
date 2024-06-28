import { ActivityIndicator, View } from 'react-native';
import { height, statusBarHeight, width,  Бирюзовый } from '../GLOBAL';
import { ClusteredYamap, Marker } from 'react-native-yamap-plus';
import coordinate from '../model/coordinate';
import { memo, useRef } from 'react';

export const Map = memo((props:{onTouchMove?:any, onPress?:any, markers?:any, up?:any}) => {
    const {onTouchMove, onPress, up, markers} = props
    return (<View style={{position:"relative"}}>
        <ClusteredYamap
            key={up}
            clusterColor={Бирюзовый}
            style={{width:width, height:height-statusBarHeight, borderTopLeftRadius:16, borderTopRightRadius:16, overflow:"hidden"}}
            initialRegion={{
                lat: coordinate.lat==0 ? 55.755864 : coordinate.lat,
                lon: coordinate.lon==0 ? 37.617698 : coordinate.lon,
                zoom: 8
            }}
            onTouchStart={onTouchMove}
            onTouchMove={onTouchMove}
            clusteredMarkers={markers}
            showUserPosition={true}
            renderMarker={(info, index) => 
                <Marker
                    key={info?.id}
                    point={info.point}
                    source={{uri:info?.marker}}
                    scale={2.3}
                    onPress={() => onPress(index)}
                />
            }
        /> 

        {up==1&&
            <View style={{alignItems:"center", justifyContent:"center", backgroundColor:'#181818', zIndex:9999, position:"absolute", width:width,height:height-statusBarHeight}}>
                <View style={{backgroundColor:'#181818CC', borderRadius:90, padding:10}}>
                    <ActivityIndicator size={40} color={Бирюзовый}/>
                </View>
            </View>
        }
        </View>
    )
}, (prevProps, nextProps) => prevProps.up === nextProps.up)