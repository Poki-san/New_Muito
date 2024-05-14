import {  MainStack, navigationRef } from "./navigateProps";
import { memo } from "react";
import * as screens from '../screens'
import { NavigationContainer } from "@react-navigation/native";
import { observer } from "mobx-react-lite";

const AppStack = observer(() =>{
    return (
      <NavigationContainer ref={navigationRef}>
        <MainStack.Navigator 
          screenOptions={{headerShown: false}} 
          initialRouteName={"Auth"}>
          <MainStack.Screen name="Auth" component={screens.LoginScreen} />
        </MainStack.Navigator>
      </NavigationContainer>
    )
})

export default memo(AppStack)