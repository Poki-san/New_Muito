import { BackHandlerFirstScreen, MainBottom, MainStack, navigationRef } from "./navigateProps";
import { memo } from "react";
import * as screens from '../screens'
import { NavigationContainer } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { CardStyleInterpolators, TransitionSpecs } from "@react-navigation/stack";
import { Белый } from "../GLOBAL";
import { Image, View } from "react-native";
import { AddEventIcon, HeartMenuIcon, MapMenuIcon, ProfileMenuIcon } from "../component/svg/svg";
import { styles } from "../styles";

const AppStack = observer(() =>{
    return (
      <NavigationContainer ref={navigationRef}>
        <MainStack.Navigator 
          screenOptions={{headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
            transitionSpec: {
              open: TransitionSpecs.FadeInFromBottomAndroidSpec,
              close: TransitionSpecs.FadeOutToBottomAndroidSpec,
            },}} 
          initialRouteName={"Auth"}>
          <MainStack.Screen name="Auth" component={screens.LoginScreen} listeners={BackHandlerFirstScreen} />
          <MainStack.Screen name="RegisterWelcome" component={screens.RegisterWScreen} />
          <MainStack.Screen name="RegisterOrg" component={screens.RegisterOrgScreen} />
          <MainStack.Screen name="RegisterGuest" component={screens.RegisterGuestScreen} />
          <MainStack.Screen name="Main" component={MainScreenBottom} />
        </MainStack.Navigator>
      </NavigationContainer>
    )
})

const MainScreenBottom = observer(() => {
  return (
    <View style={{flex:1}}>
      <View style={{height:0.88, width:'100%',position:"absolute", bottom:62,right:0, left:0,}}>
        <Image source={require('../../assets/image/line.png')} style={{resizeMode:'contain', height:0.88, zIndex:999, width:'94%', opacity:0.55,alignSelf:"center",  marginHorizontal:16}}/>
      </View>
     
      <MainBottom.Navigator
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarInactiveTintColor: '#FFFFFF80',
          tabBarActiveTintColor: Белый,
          tabBarStyle: [styles.shadow, {height:54, zIndex:999, marginHorizontal:16, position:"absolute", bottom:8, borderRadius:16, backgroundColor:'#1C1A1AE5', borderTopWidth:0}],
          tabBarItemStyle: {height: 54}
        }}>
        <MainBottom.Screen
          name="Like"
          listeners={BackHandlerFirstScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: (icon) => (
              <HeartMenuIcon color={icon.color}/>
            )
          }}
          component={screens.LikeScreen}/>
        <MainBottom.Screen
          name="Map"
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: (icon) => (
              <MapMenuIcon color={icon.color}/>
            )
          }}
          component={screens.MapOrgScreen}/>
        <MainBottom.Screen
          name="AddEvent"
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: (icon) => (
              <AddEventIcon color={icon.color}/>
            )
          }}
          component={screens.AddEventScreen}/>
        <MainBottom.Screen
          name="Profile"
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: (icon) => (
                <ProfileMenuIcon color={icon.color}/>
              )
            }}
          component={screens.ProfileScreen}/>
      </MainBottom.Navigator>
    </View>
  )
})

export default memo(AppStack)