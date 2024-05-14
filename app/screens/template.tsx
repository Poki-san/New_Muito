import { ScrollView, View } from 'react-native';
import { ButtonMy, Input, MainLayout, RadioButtons } from '../component';
 
export function Screen() {
    return ( 
        <MainLayout>
            <ScrollView showsVerticalScrollIndicator={false} style={{flexGrow:1, marginHorizontal:16, marginVertical:10}}>
               <View style={{gap:10}}>
                   <ButtonMy text='123' onPress={()=>console.log('press')}/>
                   <RadioButtons data={[{name:'123',value:'1'},{name:'456',value:'2'}]}/>
                   <Input label='Название'/>
                   <Input placeholder='Название'/>
               </View>
            </ScrollView>
        </MainLayout>
    )
}