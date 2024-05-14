import user from '../model/token'
import { navigationRef } from '../navigate/navigateProps';
import apiFetch from './api';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { CommonActions } from '@react-navigation/native';
import Constants from 'expo-constants';
import chatAuth from '../model/chatAuth';

export const logOut = async () => {
    
    const verf = await apiFetch('/profile/logout', 'POST', true)
    if(!verf.noInet)
    {
        user.userClear()
        chatAuth.reconnectInput(false)
        const bottomReset = CommonActions.reset({
            index: 0,
            routes: [{name: 'Auth'}],
          });
        navigationRef.current?.dispatch(bottomReset)
    }
}

export async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        const projectId = Constants.expoConfig.extra.eas.projectId;
        token = (await Notifications.getExpoPushTokenAsync({
            projectId
        })).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}