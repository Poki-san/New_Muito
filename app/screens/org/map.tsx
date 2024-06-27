import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { MainLayout, PeopleItemMap } from '../../component';
import { height, statusBarHeight, width, Белый, Бирюзовый } from '../../GLOBAL';
import { useEffect, useState } from 'react';
import { styles } from '../../styles';
import { BlurView } from 'expo-blur';
import { observer } from 'mobx-react-lite';
import apiFetch from '../../functions/api';
import {Map} from '../../component/myMap';
 
export const MapOrgScreen = observer(() => {
    const [people, setPeople] = useState(false)
    const [markers, setMarkers] = useState([]);
    const [markerItem, setMarkerItem] = useState(0);
    const [loader, setLoader] = useState(false)

    const handlerNear = async () => {
        const response = await apiFetch('/event/near','GET',true)
        switch (response?.status) {
            case 200:
            case 201:
            case 202:
                setMarkers(response?.data)
                break;
            default:
                break;
        }
        setLoader(false)
    }
    useEffect(() => {
        setLoader(true)
        handlerNear().catch(e => console.log(e))
    }, [])

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
                {(!loader&& markers?.length > 0) ? 
                    <>
                        {markers?.length > 0 ?<Map 
                            up={2} 
                            markers={markers}
                            onTouchMove={()=>{
                                if (people) {
                                    setPeople(false)
                                }
                            }}
                            onPress={(index) => {
                                setPeople(false)
                                setMarkerItem(index)
                                setPeople(true)
                            }}
                        /> :
                        <Map 
                            up={2} 
                            markers={[]}
                        />
                        }
                    </>
                    : 
                    <View style={{alignItems:"center", justifyContent:"center", width:width,height:height-statusBarHeight}}>
                        <View style={{backgroundColor:'#181818CC', borderRadius:90, padding:10}}><ActivityIndicator size={40} color={Бирюзовый}/></View>
                    </View>
                    }
                    
                </View>
                {people && 
                    <>
                        <View style={{position:"absolute", bottom:74, alignItems:"center", zIndex:999, left:0, right:0}}>
                            <PeopleItemMap data={markers[markerItem]} />
                        </View>
                        <View onTouchStart={()=>setPeople(false)} style={{height:height, width:width,position:"absolute",bottom:74,top:0, zIndex:3}}/>
                    </>
                }
            </KeyboardAvoidingView>
        </MainLayout>
    )
})