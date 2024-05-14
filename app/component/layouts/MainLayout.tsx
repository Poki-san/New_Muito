import React from "react";
import { StyleProp, ViewStyle, SafeAreaView, StatusBarStyle, View, Platform, StatusBar } from "react-native";

interface MainLayoutProps { 
    children?:any, 
    isStatusBar?:boolean, 
    backgroundColor?:string, 
    style?:StyleProp<ViewStyle>, 
    statusColor?: string,
    barStyle?: StatusBarStyle,
    safeAreaBottomColor?:string
}

/**
 * Блок со статус баром и безопасными занами
 * @param isStatusBar Отключает статус бар
 * @param backgroundColor Задний фон
 * @param safeAreaBottomColor Цвет нижнего свайпа IOS
 * @param style Стили контейнера
 * @param statusColor Цвет статус бара
 * @param barStyle Светлые или темные иконки
 */
export class MainLayout extends React.PureComponent<MainLayoutProps>{
    render()
    {
        return(
            <View style={{backgroundColor:this.props.backgroundColor, flexGrow:1}}>
                <StatusBar barStyle={this.props.barStyle ?? 'light-content'} translucent backgroundColor={'transparent'}/>
                {this.props.children}
                <SafeAreaView style={ { flex: 0, zIndex:9999 }}/>
            </View>
        )    
    }
}