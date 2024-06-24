import { View } from 'react-native';
import { width } from '../../GLOBAL';
import { Modal } from 'react-native-paper';
import YaMap from 'react-native-yamap-plus';
import coordinate from '../../model/coordinate';
import { requestDadataCoordinates } from '../../functions/mapPress';
 
export function ChoiceMapModal(props?:{setAddress?:(value?:string)=>void, onCoordinate?:(lat?:any, lon?:any)=>void, visible?:boolean, onDismiss?: () => void}) {

    const {setAddress, visible, onDismiss} = props

    return ( 
        <Modal visible={visible} onDismiss={onDismiss} style={{justifyContent:"center", alignItems:"center"}}>
            <View style={{height:'85%', width:width-32,borderRadius:16, overflow:"hidden"}}>
                <YaMap 
                    style={{height:'100%', width:'100%', borderRadius:16, overflow:"hidden", backgroundColor:"white"}}
                    initialRegion={{
                        lat: coordinate.lat==0 ? 55.755864 : coordinate.lat,
                        lon: coordinate.lon==0 ? 37.617698 : coordinate.lon,
                        zoom: 8
                    }}
                    showUserPosition={true}
                    onMapPress={async(value)=>{
                        requestDadataCoordinates(value.nativeEvent,(value)=>{
                            setAddress(value?.value)
                            !!props.onCoordinate && props.onCoordinate(value?.data?.geo_lat, value?.data?.geo_lon)
                        })
                    }}
                />
            </View>
        </Modal>
    )
}