import { ActivityIndicator, Image, View } from 'react-native';
import { height, statusBarHeight, width,  Бирюзовый } from '../GLOBAL';
import { ClusteredYamap, Marker } from 'react-native-yamap-plus';
import coordinate from '../model/coordinate';
import { observer } from 'mobx-react-lite';
import { memo, useRef } from 'react';
import { MarkerMap } from './marker';
 
export const MapOrg = memo(({onTouchMove, onLoad, onPress, markers, up}) => {
    // console.log(up);
    const ref = useRef();
    return ( 
        <View style={{position:"relative"}}>
            <ClusteredYamap
                ref={ref}
                key={up}
                clusterColor={Бирюзовый}
                showUserPosition={true}
                style={{width:width, height:height-statusBarHeight, borderTopLeftRadius:16, borderTopRightRadius:16, overflow:"hidden"}}
                initialRegion={{
                    lat: coordinate.lat==0 ? 55.755864 : coordinate.lat,
                    lon: coordinate.lon==0 ? 37.617698 : coordinate.lon,
                    zoom: 8
                }}
                clusteredMarkers={markers}
                onTouchMove={onTouchMove}
                renderMarker={(info, index) => <MarkerMap key={info.id} onPress={onPress} info={info} index={index} onLoad={onLoad}/>}
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


 
export const MapGuest = memo(({onTouchMove, onLoad, onPress, markers, up}) => {
    // console.log(up);
    const ref = useRef();
    return (<View style={{position:"relative"}}>
        <ClusteredYamap
            ref={ref}
            key={up}
            clusterColor={Бирюзовый}
            style={{width:width, height:height-statusBarHeight, borderTopLeftRadius:16, borderTopRightRadius:16, overflow:"hidden"}}
            initialRegion={{
                lat: coordinate.lat==0 ? 55.755864 : coordinate.lat,
                lon: coordinate.lon==0 ? 37.617698 : coordinate.lon,
                zoom: 8
            }}
            onTouchMove={onTouchMove}
            clusteredMarkers={markers}
            showUserPosition={true}
            renderMarker={(info, index) => <Marker
                key={info?.id}
                point={info.point}
                children={
                    <View key={index} style={{width: 40, height: 40, borderRadius:16, borderColor:Бирюзовый, overflow:"hidden"}}>
                        <Image
                            onLoad={onLoad}
                            source={{uri:info?.marker}}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 16
                            }}
                        />
                    </View>
                }
                onPress={() => onPress(index)}
            />}
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