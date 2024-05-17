import { NavigationContainerRef } from "@react-navigation/native";
import { TransitionSpecs, createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { BackHandler } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export const MainStack = createStackNavigator();
export const MainBottom = createBottomTabNavigator();

export const navigationRef = React.createRef<NavigationContainerRef>()

export function handleBackButton  ()  {
    BackHandler.exitApp();
    return true;
}
export const BackHandlerFirstScreen = { 
    focus: () => BackHandler.addEventListener('hardwareBackPress',handleBackButton), 
    blur: () => BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
}

export const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};
export const closeConfig = TransitionSpecs.BottomSheetSlideOutSpec;