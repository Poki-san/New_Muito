import { Image, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import { MainLayout } from '../../component';
import { height, statusBarHeight, width, Белый, Бирюзовый, Бирюзовый50 } from '../../GLOBAL';
import { ClusteredYamap, Marker } from 'react-native-yamap-shim';
import { useEffect, useState } from 'react';
import { styles } from '../../styles';
import { RegInstaIcon } from '../../component/svg/svg';
import { navigate } from '../../functions/navigate';
import { BlurView } from 'expo-blur';
import coordinate from '../../model/coordinate';
import { observer } from 'mobx-react-lite';
 
export const MapOrgScreen = observer(() => {
    const [countLoad, setCountLoader] = useState(0)
    const [people, setPeople] = useState(false)
    const [markers, setMarkers] = useState([{
        point: {
            lat: 55.754215,
            lon: 37.722504,
        },
        data: {id:1, uri:'../../../assets/image/people.jpg'},
    }, {
        point: {
            lat: 55.834215,
            lon: 37.752504
        },
        data: {id:2, uri:'../../../assets/image/people.jpg'},
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
                <View style={{top:8, left:16, right:16,  position:'absolute', alignItems:"center", zIndex:3}}>
                    <BlurView intensity={75} experimentalBlurMethod='dimezisBlurView' style={{flexDirection:"row", paddingHorizontal:10, paddingVertical:8,
                    overflow:"hidden", borderRadius:16, alignItems:'center', gap:4}} tint='systemChromeMaterialDark'>
                        <Text style={[styles.h4,{color:Белый, textAlign:"center"}]}>Участницы рядом</Text>
                    </BlurView>
                </View>
                <View style={{borderTopLeftRadius:16, borderTopRightRadius:16, overflow:"hidden"}}>
                    <ClusteredYamap
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
                            key={info.data?.id}
                            point={info.point}
                            
                            children={
                                <View key={index} style={{borderWidth:1, width: 40, height: 40, borderColor:Бирюзовый, borderRadius:12}}>
                                    <Image
                                        onLoad={() => countLoad < markers.length && setCountLoader(prevState => prevState + 1)}
                                        source={require('../../../assets/image/people.jpg')}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 12
                                        }}
                                    />
                                </View>
                            }
                            onPress={() => setPeople(true)}
                        />}
                    />
                    {people && <View style={{position:"absolute", bottom:74, alignItems:"center", left:0, right:0}}>
                        <TouchableOpacity activeOpacity={0.9} onPress={()=>{
                            navigate('People')
                            setPeople(false)
                        }}>
                            <Image source={require('../../../assets/image/people.jpg')} style={{width:width-32, height:width-32, borderRadius:16 }}/>
                            <View style={{position:"absolute", borderRadius:16, left:8, right:8, bottom:12, backgroundColor:'#00000066', paddingVertical:8, paddingHorizontal:13, flexDirection:"row", justifyContent:"space-between", alignItems:'center'}}>
                                <Text style={[styles.h4,{fontSize:18, color:'white', lineHeight:21.6}]}>Виктория <Text style={{color:'#FFFFFF99'}}>25</Text></Text>
                                <View style={{alignItems:'center', flexDirection:'row', gap:4}}>
                                    <Text style={[styles.smallText,{fontFamily:'PoppinsSemiBold', color:Бирюзовый50}]}>100К</Text>
                                    <RegInstaIcon/>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>}
                </View>
            </KeyboardAvoidingView>
        </MainLayout>
    )
})