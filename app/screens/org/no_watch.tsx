import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MainLayout, PeopleItem } from '../../component';
import { statusBarHeight } from '../../GLOBAL';
import { styles } from '../../styles';
import { goBack } from '../../functions/navigate';
import { BackArrowIcon } from '../../component/svg/svg';
 
export function NoWatchPeopleScreen() {
    return ( 
        <MainLayout isStatusBar backgroundColor='#181818'>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1}}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : 'height'}
                    keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                    style={{ flex: 1 }}
                >
                    <View style={{marginTop:statusBarHeight+19, marginBottom:9}}>
                        <View style={{marginHorizontal:16, justifyContent:'space-between', flexDirection:"row", alignItems:"center"}}>
                            <TouchableOpacity activeOpacity={0.7} onPress={goBack} style={{width:42, height:42, alignItems:"center", justifyContent:"center", backgroundColor:'#221E1E80', borderRadius:16}}>
                                <BackArrowIcon/>
                            </TouchableOpacity>
                            <Text style={[styles.additional, {color:'white'}]}>Больше не показывать</Text>
                            <View  style={{width:42, height:42}}/>
                        </View>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <View style={styles.eventPeopleImgContainer}>
                            {[1,2,3,4,5].map((el,i)=><PeopleItem key={i}/>)}
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </MainLayout>
    )
}