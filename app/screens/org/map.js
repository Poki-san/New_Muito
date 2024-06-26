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
import {MapOrg} from '../../component/myMap';
 
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
        // setLoader(true) 
            setUp(2)
            // setTimeout(() => {
            //     setLoader(false)
            // }, 15000);
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
                    {(!loader && markers.length > 0) ? <>
                        <MapOrg
                            up={up} 
                            markers={markers} 
                            onLoad={() => countLoad < markers.length && setCountLoader(prevState => prevState + 1)}
                            onTouchMove={()=>{
                                if (people) {
                                    setPeople(false)
                                }
                            }}
                            onPress={(index) => {
                                setMarkerItem(index)
                                setPeople(true)
                            }}
                        /> 
                    </>
                    :
                    <View style={{alignItems:"center", justifyContent:"center", width:width,height:height-statusBarHeight}}>
                        <View style={{backgroundColor:'#181818CC', borderRadius:90, padding:10}}><ActivityIndicator size={40} color={Бирюзовый}/></View>
                    </View>
                    }
                    
                </View>
                {people && <View style={{position:"absolute", bottom:74, alignItems:"center", left:0, right:0}}>
                    <PeopleItemMap data={markers[markerItem]} />
                </View>}
            </KeyboardAvoidingView>
        </MainLayout>
    )
})