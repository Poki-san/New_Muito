import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import { EventItem, MainLayout } from '../../component';
import { height, statusBarHeight, width, Бирюзовый } from '../../GLOBAL';
import { ClusteredYamap, Marker } from 'react-native-yamap-shim';
import { useEffect, useState } from 'react';
import coordinate from '../../model/coordinate';
 
export function MapGuestScreen() {
    const [countLoad, setCountLoader] = useState(0)
    const [event, setEvent] = useState(false)
    const [markers, setMarkers] = useState([{
        point: {
            lat: 55.754215,
            lon: 37.722504,
        },
        data: {id:1, uri:'../../../assets/image/event.jpg'},
    }, {
        point: {
            lat: 55.834215,
            lon: 37.752504
        },
        data: {id:2, uri:'../../../assets/image/event.jpg'},
    }]);
    const [up, setUp] = useState(1)
    useEffect(() => {
        if (countLoad > 0 && markers.length > 0 && countLoad === markers.length) {
            // console.log('Все изображения загрузились!')
            setUp(2)
        }
    }, [countLoad])
    return ( 
        <MainLayout isStatusBar backgroundColor='#181818'>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : 'height'}
                keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                style={{ flex: 1, marginTop:statusBarHeight }}
            >
                <View style={{borderTopLeftRadius:16, borderTopRightRadius:16, overflow:"hidden"}}>
                    <ClusteredYamap
                        key={up}
                        clusterColor={Бирюзовый}
                        style={{width:width, height:height-statusBarHeight, borderTopLeftRadius:16, borderTopRightRadius:16, overflow:"hidden"}}
                        initialRegion={{
                            lat: coordinate.lat==0 ? 55.755864 : coordinate.lat,
                            lon: coordinate.lon==0 ? 37.617698 : coordinate.lon,
                            zoom: 8
                        }}
                        onTouchMove={() => setEvent(false)}
                        clusteredMarkers={markers}
                        renderMarker={(info, index) => <Marker
                            key={info.data?.id}
                            point={info.point}
                            children={
                                <View key={index} style={{width: 40, height: 40, borderRadius:16, overflow:"hidden"}}>
                                    <Image
                                        onLoad={() => countLoad < markers.length && setCountLoader(prevState => prevState + 1)}
                                        source={require('../../../assets/image/event.jpg')}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 16
                                        }}
                                    />
                                </View>
                            }
                            onPress={() => setEvent(true)}
                        />}
                    />
                    {event&&<View style={{position:"absolute", bottom:74, alignItems:"center", left:0, right:0, paddingHorizontal:16}}>
                        <EventItem size={92} noEdit type={'guest'}/>
                    </View>}
                </View>
            </KeyboardAvoidingView>
        </MainLayout>
    )
}