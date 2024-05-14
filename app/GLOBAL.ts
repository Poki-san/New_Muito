import { Dimensions } from "react-native";
import Constants from 'expo-constants';

export const height = Dimensions.get('window').height
export const width = Dimensions.get('window').width
export const statusBarHeight = Constants.statusBarHeight

export const URL = ''
export const WEBSOCKET = ''

enum colors{
    'Белый'='#ffffff',
    'Белый50'='#FFFFFF80',
    'Бирюзовый'='#88FFF9',
    'Бирюзовый50'='#88FFF990',
    'Зеленый'='#06504E',
    'Черный'='#17171A',
    'Фон'='#1C1A1A'
}

export const {
    Белый,
    Бирюзовый,
    Зеленый,
    Черный,
    Белый50,
    Фон,
    Бирюзовый50
} = colors