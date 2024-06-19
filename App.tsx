import React, { useEffect, useRef, useState } from 'react';
import * as Font from 'expo-font';
import AppStack from './app/navigate/navigate'
import { MainLayout } from './app/component';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { height, width, Бирюзовый50 } from './app/GLOBAL';
import Toastable from 'react-native-toastable';
import { styles } from './app/styles';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'moment/locale/ru';
import { LocaleConfig } from 'react-native-calendars';
import * as Location from 'expo-location'
import YaMap from 'react-native-yamap-plus';
import coordinate from './app/model/coordinate';
import { useFonts } from 'expo-font';
import { ModalErr } from './app/component/popup/err';
import error from './app/model/error';
import RBSheet from '@nonam4/react-native-bottom-sheet';
import { observer } from 'mobx-react-lite';
import { load } from './app/functions/storage';
import token from './app/model/token';

LocaleConfig.locales["ru"] = {
  monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
  monthNamesShort: ["Янв", "Февр", "Март", "Апрель", "Май", "Июнь", "Июль.", "Авг", "Сент", "Окт", "Нояб", "Дек"],
  dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
  dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  today: "Сегодня",
};

LocaleConfig.defaultLocale = "ru";

const App = observer(() => {
  if (__DEV__) {
    console.log('Development');
  } else {
    YaMap.init('9686e034-f846-4d6c-a556-fc6f621bd36a');
  }
  const [appIsReady, setAppIsReady] = useState(false);
  const errRef = useRef<RBSheet>(null);
  // const [fontsLoaded] = useFonts({
  //   'OswaldMedium': require('./assets/fonts/Oswald-Medium.ttf'),
  //   'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
  //   'PoppinsMedium': require('./assets/fonts/Poppins-Medium.ttf'),
  //   'PoppinsSemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  //   'PoppinsBold': require('./assets/fonts/Poppins-Bold.ttf'),
  // })
  async function preload() {
    try {
      
      Font.loadAsync({
        'OswaldMedium': require('./assets/fonts/Oswald-Medium.ttf'),
        'Poppins': require('./assets/fonts/Poppins-Regular.ttf'),
        'PoppinsMedium': require('./assets/fonts/Poppins-Medium.ttf'),
        'PoppinsSemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
        'PoppinsBold': require('./assets/fonts/Poppins-Bold.ttf'),
      })
      
      const tmp = await load('@userData')
      token?.userInput(tmp?.user, tmp?.token)
      console.log(tmp);
      

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
      }
      const location = await Location.getCurrentPositionAsync({});
      if (!!location.coords.latitude && !!location.coords.longitude) {
        coordinate.Input(location.coords.latitude, location.coords.longitude)
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAppIsReady(true);
    } catch (error) {
      console.log(error);
      setAppIsReady(false)
    } 
  }

  useEffect(()=>{    
    preload().catch(e => console.log(e))
  },[])
  useEffect(()=>{
    if (error.switch == true) {
      errRef.current.open()
    }
  },[error.switch])
  return ((appIsReady)?
    <SafeAreaProvider>
      <MainLayout>
        <Toastable
          containerStyle={{borderRadius: 8}}
          messageStyle={{borderRadius: 8}}
          position="top"
          animationOutTiming={500}
          renderContent={(prop) =>
            <View style={{
              backgroundColor: Бирюзовый50,
              paddingVertical: 10,
              paddingHorizontal: 12,
              zIndex: 999,
              borderRadius: 16,
              alignSelf: 'center',
              gap: 5
            }}>
              <Text style={[styles.bodyText, {color: 'black', textAlign:"center"}]}>{prop.message}</Text>
              {prop.title && <Text style={[styles.smallText, {color: 'black'}]}>{prop.title}</Text>}
            </View>
          }
        />
        <AppStack/>
        <ModalErr ref={errRef} text={error.text} height={error.height} title={error.title}/>
      </MainLayout>
    </SafeAreaProvider>
    :
    <View style={{flex:1}}>
      <Image style={{width:width, height:height}} source={require('./assets/image/welcome.jpg')}/>
    </View>
  );
})

export default App;