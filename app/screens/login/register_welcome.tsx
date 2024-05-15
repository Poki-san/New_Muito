import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ButtonMy, MainLayout } from '../../component';
import { height, statusBarHeight, width, Бирюзовый } from '../../GLOBAL';
import { BlurView } from 'expo-blur';
import { styles } from '../../styles';
import { ModalCloseIcon, RegBagIcon, RegDiamondIcon, RegHeartIcon, RegInstaIcon, RegMapIcon, WarningIcon } from '../../component/svg/svg';
import { goBack, navigate } from '../../functions/navigate';
 
export function RegisterWScreen(props?:any) {
    const type = props?.route?.params?.type
    
    return ( 
        <ImageBackground style={{width:width, height:height}} source={require('../../../assets/image/back.png')}>
            <MainLayout isStatusBar>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow:1, marginHorizontal:16, marginVertical:10, justifyContent:"space-between"}}>
                    <View style={{gap:10}}>
                        <TouchableOpacity activeOpacity={0.7} onPress={goBack} style={{borderRadius:90, transform:[{rotate:'90deg'}],backgroundColor:'#221E1E80', padding:6, position:'absolute', top:statusBarHeight+8, zIndex:1}}>
                            <ModalCloseIcon/>
                        </TouchableOpacity>
                        <Text style={{fontSize:60, fontWeight:'500', color:'#83FDF4', fontFamily:'OswaldMedium', textAlign:'center', marginTop:17}}>MUITO</Text>
                    </View>
                    <View>
                        {type == 'org'&&
                            <BlurView experimentalBlurMethod='dimezisBlurView' intensity={30} tint='systemChromeMaterialDark' style={styles.blurContainer}>
                                <View style={{gap:16}}>
                                    <View style={{flexDirection:"row", flex:1,gap:8}}>
                                        <RegHeartIcon/>
                                        <Text style={{fontSize:14, color:'white', fontFamily:'PoppinsSemiBold', flex:1, lineHeight:21}}>Приглашай участниц для повышения привлекательности своего заведения</Text>
                                    </View>
                                    <View style={{flexDirection:"row", flex:1,gap:8}}>
                                        <RegInstaIcon/>
                                        <Text style={{fontSize:14, color:'white', flex:1, fontFamily:'PoppinsSemiBold', lineHeight:21}}>Повысь охват и узнаваемость от репостов участниц </Text>
                                    </View>
                                    <View style={{flexDirection:"row", flex:1,gap:8}}>
                                        <RegBagIcon/>
                                        <Text style={{fontSize:14, color:'white', flex:1, fontFamily:'PoppinsSemiBold', lineHeight:21}}>Запланируй мероприятие и создай ажиотаж</Text>
                                    </View>
                                    <View style={{flexDirection:"row", flex:1,gap:8}}>
                                        <RegDiamondIcon/>
                                        <Text style={{fontSize:14, flex:1, color:'white', fontFamily:'PoppinsSemiBold', lineHeight:21}}>Отбирай подходящих красивых гостей</Text>
                                    </View>
                                </View>
                                <Image source={require('../../../assets/image/line.png')} style={{width:'100%', height:1}}/>
                                <View style={{gap:8}}>
                                    <View style={{flexDirection:"row", gap:15, alignItems:'center'}}>
                                        <WarningIcon/>
                                        <Text style={{fontSize:18, textTransform:'uppercase', color:'#BC1115', fontFamily:'PoppinsSemiBold', lineHeight:25.2}}>Запрещено</Text>
                                    </View>
                                    <View style={{gap:6}}>
                                        <Text style={{fontSize:12, color:'white', fontFamily:'Poppins', lineHeight:18}}>1. Нарушать заявленные условия</Text>
                                        <Text style={{fontSize:12, color:'white', fontFamily:'Poppins', lineHeight:18}}>2. Публиковать мероприятия с содержанием 18+ (интимного характера)</Text>
                                    </View>
                                </View>
                            </BlurView>
                        }
                        {type == 'guest'&&
                            <BlurView experimentalBlurMethod='dimezisBlurView' intensity={30} tint='systemChromeMaterialDark' style={styles.blurContainer}>
                                <View style={{gap:16}}>
                                    <View style={{flexDirection:"row", flex:1,gap:8}}>
                                        <RegMapIcon/>
                                        <View style={{gap:8, flex:1}}>
                                            <Text style={{fontSize:14, color:Бирюзовый, fontFamily:'PoppinsSemiBold', flex:1, lineHeight:21}}>Найди подходящее</Text>
                                            <Text style={[styles.smallText,{color:'white', flex:1}]}>Ужин, клубы, закрытые тусовки и другие интересные места</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:"row", flex:1,gap:8}}>
                                        <RegDiamondIcon/>
                                        <View style={{gap:8, flex:1}}>
                                            <Text style={{fontSize:14, color:Бирюзовый, fontFamily:'PoppinsSemiBold', flex:1, lineHeight:21}}>Получи особые условия</Text>
                                            <Text style={[styles.smallText,{color:'white', flex:1}]}>Eда, кальян, такси и другие бонусы</Text>
                                            <Image resizeMode='contain' style={{width:111, height:16}} source={require('../../../assets/image/guest_w.png')}/>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:"row", flex:1,gap:8}}>
                                        <RegInstaIcon/>
                                        <View style={{gap:8, flex:1}}>
                                            <Text style={{fontSize:14, color:Бирюзовый, fontFamily:'PoppinsSemiBold', flex:1, lineHeight:21}}>Используй социальные сети</Text>
                                            <Text style={[styles.smallText,{color:'white', flex:1}]}>Обновляй контент и становись ещё популярное</Text>
                                        </View>
                                    </View>
                                </View>
                                <Image source={require('../../../assets/image/line.png')} style={{width:'100%', height:1}}/>
                                <View style={{gap:8}}>
                                    <View style={{flexDirection:"row", gap:15, alignItems:'center'}}>
                                        <WarningIcon/>
                                        <Text style={{fontSize:18, textTransform:'uppercase', color:'#BC1115', fontFamily:'PoppinsSemiBold', lineHeight:25.2}}>Запрещено</Text>
                                    </View>
                                    <View style={{gap:6}}>
                                        <Text style={{fontSize:12, color:'white', fontFamily:'Poppins', lineHeight:18}}>1. Публикация фото 18+</Text>
                                        <Text style={{fontSize:12, color:'white', fontFamily:'Poppins', lineHeight:18}}>2. Предложение услуг интимного характера</Text>
                                        <Text style={{fontSize:12, color:'white', fontFamily:'Poppins', lineHeight:18}}>3. Нарушение условий посещения мероприятий</Text>
                                    </View>
                                </View>
                            </BlurView>
                        }
                    </View>
                    <View style={{width:'100%', marginBottom:15}}>
                        <ButtonMy text='Далее' onPress={()=>{
                            switch (type) {
                                case 'org':
                                    navigate('RegisterOrg')
                                    break;
                                case 'guest':
                                    navigate('RegisterGuest')
                                    break;
                            }
                        }} backgroundColor='#88FFF9' colorText='#171717'/>
                    </View>
                </ScrollView>
            </MainLayout>
        </ImageBackground>
    )
}
