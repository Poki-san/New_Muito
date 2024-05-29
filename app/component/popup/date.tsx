import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import React, { forwardRef, useState } from 'react'
import RBSheet from '@nonam4/react-native-bottom-sheet';
import { statusBarHeight, Белый50, Фон } from "../../GLOBAL";
import { styles } from "../../styles";
import {  ArrowCalendarLeft, ArrowCalendarRight, ModalCloseIcon } from "../svg/svg";
import { Calendar,CalendarUtils } from "react-native-calendars";
import { ButtonMy } from "../ui/ButtonMy";

/**
 * Модалка для вызова дат
 * @param ref для взаимодействия с модальным окном
 */
export const ModalDate = forwardRef((props:{onPeroid?:(start?:string, end?:string)=>void},ref)=>{
    const [selectedSE, setSelectedSE] = useState({start:{text:'',obj:{}},end:{text:'',obj:{}}})
    const [selected, setSelected] = useState({})

    const getDatePeriod = (start_date?:string, end_date?:string) => {
        let start = new Date(start_date);
        let count=1
        let flag = true
        let arr = {[start_date]:{selected: true, startingDay: true, endingDay: false, textColor:'black', color:'#355855'}}
        while (flag==true) {
            const newDate = start.setDate(start.getDate() + count); 
            const date = CalendarUtils.getCalendarDateString(newDate)
            if (date == end_date) {
                arr = {...arr, [end_date]:{selected: true, startingDay: false, endingDay: true, textColor:'white', color:'#528e8a'}}
                flag = false
            } else {
                arr = {...arr, [date]:{selected: true, startingDay: false, endingDay: false, textColor:'white', color:'#3d5f5d'}}
            }  
        }
        setSelected(arr)
        return;
      };
    return (
        <>
            <RBSheet
                ref={ref}
                height={519}
                closeOnDragDown={true}
                // dragFromTopOnly
                closeOnPressMask={true} 
                customStyles={{
                    draggableIcon:{
                        backgroundColor:Белый50,
                        margin:0,
                        padding:0,
                        height:0,
                        borderTopRightRadius:0,
                        borderTopLeftRadius:0,
                    },
                    container: {
                        borderTopLeftRadius:16,
                        borderTopRightRadius:16,
                        paddingHorizontal:16,
                        backgroundColor:Фон
                    }
                }}>
                <ScrollView scrollEnabled={false} style={{flexGrow:1}} keyboardShouldPersistTaps='always'>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : undefined}
                        keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                        style={{ flex: 1 }}
                    >
                        <View style={{alignItems:"center", marginBottom:10}}><ModalCloseIcon/></View>
                        <View style={{gap:18}}>
                            <Text style={[styles.h4,{color:'white', textAlign:'center'}]}>Выберите дату мероприятия</Text>
                            <View style={{backgroundColor:'#1C1A1A'}}>
                                <Calendar
                                    firstDay={1}
                                    enableSwipeMonths
                                    markingType='period'
                                    onDayPress={day => {
                                        if (selectedSE.start.text == '') {
                                            setSelectedSE({start:{text:day.dateString, obj:day}, end:selectedSE.end})
                                            setSelected({[day.dateString]:{selected: true, startingDay: true, endingDay: true, color:'#355855'}})
                                        } else {
                                            if (selectedSE.end.text == '') {
                                                const d1: Date = new Date(day.dateString);
                                                const d2: Date = new Date(selectedSE.start.text);
                                                if (d1.getTime()<d2.getTime()) {
                                                    setSelectedSE({start:{text:day.dateString, obj:day}, end:{text:selectedSE.start.text, obj:day}})
                                                    getDatePeriod(day.dateString, selectedSE.start.text)
                                                } else {                                                
                                                    setSelectedSE({start:selectedSE.start, end:{text:day.dateString, obj:day}})
                                                    getDatePeriod(selectedSE.start.text, day.dateString)
                                                }
                                            } else {
                                                const d1: Date = new Date(day.dateString);
                                                const d2: Date = new Date(selectedSE.start.text);
                                                if (d1.getTime()<d2.getTime()) {
                                                    setSelectedSE({start:{text:day.dateString, obj:day}, end:selectedSE.end})
                                                    getDatePeriod(day.dateString, selectedSE.end.text)
                                                } else{
                                                    setSelectedSE({start:selectedSE.start, end:{text:day.dateString, obj:day}})
                                                    getDatePeriod(selectedSE.start.text, day.dateString)
                                                }
                                            }
                                        }
                                    }}
                                    style={{ borderRadius:16, paddingVertical:10}}
                                    markedDates={selected}
                                    renderArrow={direction => (
                                        direction==='left' ? 
                                            <View style={{padding:7, alignItems:'center', justifyContent:"center"}}>
                                                <ArrowCalendarLeft/>
                                            </View> : 
                                            <View style={{padding:7, alignItems:'center', justifyContent:"center"}}>
                                                <ArrowCalendarRight/>
                                            </View>
                                        )
                                    }
                                    theme={ThemeCalender}
                                />
                            </View>
                            <ButtonMy text='Выбрать' onPress={()=>{
                                ref?.current?.close()
                                props.onPeroid(selectedSE.start.text, selectedSE.end.text)
                                setSelectedSE({start:{text:'',obj:{}},end:{text:'',obj:{}}})
                                setSelected({})

                            }} backgroundColor='#88FFF9' colorText='#171717'/>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </RBSheet>
        </>
    )
})


/**
 * Модалка для вызова дат
 * @param ref для взаимодействия с модальным окном
 */
export const ModalDatePoint = forwardRef((props:{onPeroid?:(date?:string)=>void},ref)=>{
    const [selected, setSelected] = useState('')
    return (
        <>
            <RBSheet
                ref={ref}
                height={400}
                closeOnDragDown={true}
                // dragFromTopOnly
                closeOnPressMask={true} 
                customStyles={{
                    draggableIcon:{
                        backgroundColor:Белый50,
                        margin:0,
                        padding:0,
                        height:0,
                        borderTopRightRadius:0,
                        borderTopLeftRadius:0,
                    },
                    container: {
                        borderTopLeftRadius:16,
                        borderTopRightRadius:16,
                        paddingHorizontal:16,
                        backgroundColor:Фон
                    }
                }}>
                <ScrollView scrollEnabled={false} style={{flexGrow:1}} keyboardShouldPersistTaps='always'>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : undefined}
                        keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                        style={{ flex: 1 }}
                    >
                        <View style={{alignItems:"center", marginBottom:10}}><ModalCloseIcon/></View>
                        <View style={{gap:18}}>
                            <View style={{backgroundColor:'#1C1A1A'}}>
                                <Calendar
                                    firstDay={1}
                                    enableSwipeMonths
                                    onDayPress={day => {
                                        setSelected(day.dateString)
                                        !!props.onPeroid&&props.onPeroid(day.dateString)
                                    }}
                                    style={{ borderRadius:16, paddingVertical:10}}
                                    markedDates={{[selected]:{selected: true, disableTouchEvent: true, marked:false, color:'#355855'}}}
                                    renderArrow={direction => (
                                        direction==='left' ? 
                                            <View style={{padding:7, alignItems:'center', justifyContent:"center"}}>
                                                <ArrowCalendarLeft/>
                                            </View> : 
                                            <View style={{padding:7, alignItems:'center', justifyContent:"center"}}>
                                                <ArrowCalendarRight/>
                                            </View>
                                        )
                                    }
                                    theme={ThemeCalender}
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </RBSheet>
        </>
    )
})

const ThemeCalender = {
    backgroundColor: '#221E1E80',
    calendarBackground: '#221E1E80',
    todayTextColor: 'white',
    todayBackgroundColor: '#00000066',
    selectedDayBackgroundColor: '#355855',
    selectedDayTextColor: '#000',
    dayTextColor:'white',
    textDisabledColor: '#FFFFFF65',
    // textDayHeaderFontFamily: "Roboto-Regular",
    textSectionTitleColor: 'gray',
    monthTextColor:'#fff',
    selectedBorderRadius:16,
    // textMonthFontFamily: "Roboto-Medium",
    textMonthFontSize: 18,
    textDayStyle: {
      fontSize: 14,
      // fontFamily: "Roboto-Regular",
      lineHeight: 16,
      color: 'white',
    },
    "stylesheet.calendar.main":{
        container:{
            paddingLeft: 10,
            paddingRight: 10,
            borderRadius:16,
            borderWidth:1,
            borderColor:'#B5B5B54D',
            overflow:'hidden',
            backgroundColor:'#221E1E80',
        }
    },
    "stylesheet.calendar.header": {
        headerContainer: {
            position: "absolute",
            flexDirection: "row",
            left: 7,
            gap: 20,
            backgroundColor:'#1C1A1A',
            borderRadius:360,
            paddingVertacal:5,
            paddingHorizontal:7
        },
        header: {
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center"
        }
    },
    "stylesheet.day.basic": {
        base: {
            width: 35,
            height: 35,
            alignItems: "center",
            justifyContent: "center",
            borderRadius:360,
            overflow: 'hidden'
        },
    },
    "stylesheet.day.period": {
        base: {
            width: 35,
            height: 35,
            alignItems: "center",
            justifyContent: "center",
            borderRadius:360,
            overflow: 'hidden'
        },
        selected: {
            width: 35,
            height: 35,
            alignItems: "center",
            justifyContent: "center",
            borderRadius:360,
            overflow: 'hidden'
        },
    },
};