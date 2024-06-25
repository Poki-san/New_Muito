import { BackHandlerFirstScreen, MainBottom, MainStack, navigationRef } from "./navigateProps";
import { memo } from "react";
import * as screens from '../screens'
import { NavigationContainer } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { CardStyleInterpolators, TransitionSpecs } from "@react-navigation/stack";
import { Белый } from "../GLOBAL";
import { Image, View } from "react-native";
import { AddEventIcon, HeartMenuIcon, MapMenuIcon, ProfileMenuIcon, SearchIcon } from "../component/svg/svg";
import { styles } from "../styles";
import avatar from "../model/avatar";
import token from "../model/token";
import { NoPayModal } from "../component/popup/noPay";

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
          initialRouteName={token?.token?.length > 0 ? (token?.data?.type =='guest' ? 'MainGuest':'Main') :"Auth"}>
          <MainStack.Screen name="Auth" component={screens.LoginScreen} listeners={BackHandlerFirstScreen} />
          <MainStack.Screen name="RegisterWelcome" component={screens.RegisterWScreen} />
          <MainStack.Screen name="RegisterOrg" component={screens.RegisterOrgScreen} />
          <MainStack.Screen name="RegisterGuest" component={screens.RegisterGuestScreen} />
          <MainStack.Screen name="Event" component={screens.EventScreen}/>

          <MainStack.Screen name="Main" component={MainScreenBottom} />
          <MainStack.Screen name="EventPeople" component={screens.EventPeopleScreen} />
          <MainStack.Screen name="People" component={screens.PeopleScreen} />
          <MainStack.Screen name="NoWatch" component={screens.NoWatchPeopleScreen} />
          <MainStack.Screen name="EditOrg" component={screens.EditOrgScreen}/>
          <MainStack.Screen name="AddEvent" component={screens.AddEventScreen}/>
          <MainStack.Screen name="EditEvent" component={screens.EditEventScreen}/>

          <MainStack.Screen name="MainGuest" component={MainGuestScreenBottom}/>
          <MainStack.Screen name="EditGuest" component={screens.EditGuestScreen}/>
          <MainStack.Screen name="EditPass" component={screens.EditPassScreen}/>
          <MainStack.Screen name="Verf" component={screens.VerfScreen}/>
        </MainStack.Navigator>
      </NavigationContainer>
    )
})

const MainScreenBottom = observer(() => {
  
  return (
    <View style={{flex:1}}>
      <View style={{height:0.88, width:'100%',position:"absolute", bottom:58,right:0, left:0,}}>
        <Image source={require('../../assets/image/line.png')} style={{resizeMode:'contain', height:0.88, zIndex:999, width:'94%', opacity:0.55,alignSelf:"center",  marginHorizontal:16}}/>
      </View>
      {token.data?.may_publish == 0 && <NoPayModal visible={true}/>}
      <MainBottom.Navigator
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarInactiveTintColor: '#FFFFFF80',
          tabBarActiveTintColor: Белый,
          tabBarStyle: [styles.shadow, {height:50, zIndex:999, marginHorizontal:16, position:"absolute", bottom:8, borderRadius:16, backgroundColor:'#1C1A1AE5', borderTopWidth:0}],
          tabBarItemStyle: {height: 50}
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
          name="AddEventCatalog"
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: (icon) => (
              <AddEventIcon color={icon.color}/>
            )
          }}
          component={screens.AddEventCatalogScreen}/>
        <MainBottom.Screen
          name="Profile"
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: (icon) => (token?.data?.img?.length > 0 ?
                <Image source={{uri:token?.data?.img[0]?.small}} resizeMode='cover' style={{borderWidth:icon.focused? 2 : 0, borderColor:'white', borderRadius:90, width:24, height:24}}/>
                : <ProfileMenuIcon color={icon.color}/>
              )
            }}
          component={screens.ProfileScreen}/>
      </MainBottom.Navigator>
    </View>
  )
})

const MainGuestScreenBottom = observer(() => {
  
  return (
    <View style={{flex:1}}>
      <View style={{height:0.88, width:'100%',position:"absolute", bottom:58,right:0, left:0,}}>
        <Image source={require('../../assets/image/line.png')} style={{resizeMode:'contain', height:0.88, zIndex:999, width:'94%', opacity:0.55,alignSelf:"center",  marginHorizontal:16}}/>
      </View>
      <MainBottom.Navigator
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarInactiveTintColor: '#FFFFFF80',
          tabBarActiveTintColor: Белый,
          tabBarStyle: [styles.shadow, {height:50, zIndex:999, marginHorizontal:16, position:"absolute", bottom:8, borderRadius:16, backgroundColor:'#1C1A1AE5', borderTopWidth:0}],
          tabBarItemStyle: {height: 50}
        }}>
        <MainBottom.Screen
          name="Search"
          listeners={BackHandlerFirstScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: (icon) => (
              <SearchIcon color={icon.color}/>
            )
          }}
          component={screens.SearchScreen}/>
        <MainBottom.Screen
          name="Map"
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: (icon) => (
              <MapMenuIcon color={icon.color}/>
            )
          }}
          component={screens.MapGuestScreen}/>
        <MainBottom.Screen
          name="Invitation"
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: (icon) => (
              <HeartMenuIcon color={icon.color}/>
            )
          }}
          component={screens.InvitationScreen}/>
        <MainBottom.Screen
          name="Profile"
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarIcon: (icon) => (token?.data?.img?.length > 0 ?
                <Image source={{uri:token?.data?.img[0]?.small}} resizeMode='cover' style={{borderWidth:icon.focused? 1 : 0, borderColor:'white', borderRadius:90, width:24, height:24}}/> : 
                <ProfileMenuIcon color={icon.color}/>
              )
            }}
          component={screens.ProfileGuestScreen}/>
      </MainBottom.Navigator>
    </View>
  )
})

export default memo(AppStack)