import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ButtonMy, Input, MainLayout } from '../../component';
import { height, width } from '../../GLOBAL';
import { BlurView } from 'expo-blur';
 
export function LoginScreen() {
    return ( 
        <ImageBackground style={{width:width, height:height}} source={require('../../../assets/image/back.png')}>
            <MainLayout isStatusBar>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1, marginHorizontal:16, marginVertical:10, justifyContent:"space-between"}}>
                    <View style={{gap:10}}>
                        <Text style={{fontSize:60, fontWeight:'500', color:'#83FDF4', fontFamily:'OswaldMedium', textAlign:'center', marginTop:17}}>MUITO</Text>
                    </View>
                    <View style={{gap:24}}>
                        <BlurView experimentalBlurMethod='dimezisBlurView' intensity={30} tint='dark' style={styles.blurContainer}>
                            <Text style={{color:'white', fontWeight:'700', fontSize:18, textAlign:'center', fontFamily:'PoppinsBold'}}>Вход</Text>
                            <View style={{gap:8}}>
                                <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Логин' borderRadius={24} style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                                <Input backgroundColor='#FFFFFF00' placeholderTextColor={'#FFFFFF99'} title='Пароль' securePass borderRadius={24} style={{borderWidth:1, borderColor:'#FFFFFF99'}}/>
                                <Text style={{fontSize:12, color:'#88FFF966', textAlign:"right"}}>Забыли пароль?</Text>
                            </View>
                            <ButtonMy text='Войти' backgroundColor='#88FFF9' colorText='#171717'/>
                        </BlurView>
                        <View style={{gap:10, alignItems:"center"}}>
                            <Text style={{color:'white', fontWeight:'500', opacity:0.6}}>Нет аккаута</Text>
                            <TouchableOpacity activeOpacity={0.7}>
                                <Text style={{color:'white', fontWeight:'700', fontFamily:'PoppinsBold'}}>Регистрация</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </MainLayout>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    blurContainer: {
      flex: 1,
      borderWidth:1,
      borderColor:'#9999991A',
      paddingVertical: 20,
      paddingHorizontal: 16,
      textAlign: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      borderRadius: 20,
      gap:16
    },
  });