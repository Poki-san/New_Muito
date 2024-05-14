import { Dimensions } from "react-native";
import Constants from 'expo-constants';

export const height = Dimensions.get('window').height
export const width = Dimensions.get('window').width
export const statusBarHeight = Constants.statusBarHeight

export const URL = ''
export const WEBSOCKET = ''

enum colors{
    'Белый'='#ffffff',
}

export const {
    Белый
} = colors