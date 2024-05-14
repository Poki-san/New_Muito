import {  MainStack, navigationRef } from "./navigateProps";
import { memo } from "react";
import * as screens from '../screens'
import { NavigationContainer } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { CardStyleInterpolators, TransitionSpecs } from "@react-navigation/stack";

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
          <MainStack.Screen name="Auth" component={screens.LoginScreen} />
          <MainStack.Screen name="RegisterOrg" component={screens.RegisterOrgScreen} />
        </MainStack.Navigator>
      </NavigationContainer>
    )
})

export default memo(AppStack)