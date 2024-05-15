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

export const tagsTest = [{
    title:'Активный отдых',
    tags:[{
        id:0,
        title:'Клубы'
    },{
        id:1,
        title:'Путешествия'
    },{
        id:2,
        title:'Фильмы'
    },{
        id:3,
        title:'Спорт'
    },{
        id:4,
        title:'Фитнес'
    },{
        id:5,
        title:'Фигурное катание'
    },{
        id:6,
        title:'Блогерство'
    },{
        id:7,
        title:'Благотворительность'
    }]
},{
    title:'Спокойный отдых',
    tags:[{
        id:8,
        title:'Клубы'
    },{
        id:9,
        title:'Путешествия'
    },{
        id:10,
        title:'Фильмы'
    },{
        id:11,
        title:'Спорт'
    },{
        id:12,
        title:'Фитнес'
    },{
        id:13,
        title:'Фигурное катание'
    },{
        id:14,
        title:'Блогерство'
    },{
        id:15,
        title:'Благотворительность'
    }]
},{
    title:'Творчество',
    tags:[{
        id:16,
        title:'Клубы'
    },{
        id:17,
        title:'Путешествия'
    },{
        id:18,
        title:'Фильмы'
    },{
        id:19,
        title:'Спорт'
    },{
        id:20,
        title:'Фитнес'
    },{
        id:21,
        title:'Фигурное катание'
    },{
        id:22,
        title:'Блогерство'
    },{
        id:23,
        title:'Благотворительность'
    }]
}]