import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { MainLayout, PeopleItemMap } from '../../component';
import { height, statusBarHeight, width, Белый, Бирюзовый } from '../../GLOBAL';
import { ClusteredYamap, Marker } from 'react-native-yamap-plus';
import { useEffect, useState } from 'react';
import { styles } from '../../styles';
import { BlurView } from 'expo-blur';
import coordinate from '../../model/coordinate';
import { observer } from 'mobx-react-lite';
import apiFetch from '../../functions/api';
 
export const MapOrgScreen = observer(() => {
    const [countLoad, setCountLoader] = useState(0)
    const [people, setPeople] = useState(false)
    const [markers, setMarkers] = useState([]);
    const [up, setUp] = useState(1)
    const [markerItem, setMarkerItem] = useState(0);
    const [loader, setLoader] = useState(false)

    const handlerNear = async () => {
        const response = await apiFetch('/event/near','GET',true)
        setMarkers(response?.data)
        setLoader(false)
    }
    useEffect(() => {
        setLoader(true)
        handlerNear().catch(e => console.log(e))
    }, [])

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
                <View style={{top:8, left:16, right:16,  position:'absolute', alignItems:"center", zIndex:3}}>
                    <BlurView intensity={75}  style={{flexDirection:"row", paddingHorizontal:10, paddingVertical:8,
                    overflow:"hidden", borderRadius:16, alignItems:'center', gap:4}} tint='systemChromeMaterialDark'>
                        <Text style={[styles.h4,{color:Белый, textAlign:"center"}]}>Участницы рядом</Text>
                    </BlurView>
                </View>
                <View style={{borderTopLeftRadius:16, borderTopRightRadius:16, overflow:"hidden"}}>
                    {(!loader && markers.length > 0) ? <ClusteredYamap
                        // ref={ref}
                        key={up}
                        clusterColor={Бирюзовый}
                        style={{width:width, height:height-statusBarHeight, borderTopLeftRadius:16, borderTopRightRadius:16, overflow:"hidden"}}
                        initialRegion={{
                            lat: coordinate.lat==0 ? 55.755864 : coordinate.lat,
                            lon: coordinate.lon==0 ? 37.617698 : coordinate.lon,
                            zoom: 8
                        }}
                        clusteredMarkers={markers}
                        onTouchMove={()=>{
                            if (people) {
                                setPeople(false)
                            }
                        }}
                        renderMarker={(info, index) => <Marker
                            key={info.id}
                            point={info.point}
                            children={
                                <View key={index} style={{borderWidth:1, width: 40, height: 40, overflow:"hidden", borderColor:Бирюзовый, borderRadius:16}}>
                                    <Image
                                        onLoad={() => countLoad < markers.length && setCountLoader(prevState => prevState + 1)}
                                        source={{uri:info.marker}}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 16
                                        }}
                                    />
                                </View>
                            }
                            onPress={() => {
                                console.log(info);
                                
                                setMarkerItem(index)
                                setPeople(true)
                            }}
                        />}
                    /> :
                    <View style={{alignItems:"center", justifyContent:"center", width:width,height:height-statusBarHeight}}>
                        <View style={{backgroundColor:'#181818CC', borderRadius:90, padding:10}}><ActivityIndicator size={40} color={Бирюзовый}/></View>
                    </View>
                    }
                    {people && <View style={{position:"absolute", bottom:74, alignItems:"center", left:0, right:0}}>
                        <PeopleItemMap data={markers[markerItem]} />
                    </View>}
                    {up==1&&<View style={{alignItems:"center", justifyContent:"center", backgroundColor:'#181818', zIndex:9999, position:"absolute", width:width,height:height-statusBarHeight}}>
                        <View style={{backgroundColor:'#181818CC', borderRadius:90, padding:10}}><ActivityIndicator size={40} color={Бирюзовый}/></View>
                    </View>}
                </View>
            </KeyboardAvoidingView>
        </MainLayout>
    )
})