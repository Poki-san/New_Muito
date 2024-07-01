import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import React, { forwardRef, useState } from 'react'
import RBSheet from '@poki_san/react-native-bottom-sheet';
import { statusBarHeight, Белый50, Фон } from "../../GLOBAL";
import { styles } from "../../styles";
import {  ArrowCalendarLeft, ArrowCalendarRight, ModalCloseIcon } from "../svg/svg";
import { Calendar,CalendarUtils } from "react-native-calendars";
import { ButtonMy } from "../ui/ButtonMy";
import apiFetch, { apiFetchNoStatus } from "../../functions/api";
import moment from "moment";

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
        let arr = {[start_date]:{selected: true, startingDay: true, disableTouchEvent:true, endingDay: false, textColor:'black', color:'#355855'}}
        while (flag==true) {
            const newDate = start.setDate(start.getDate() + count); 
            const date = CalendarUtils.getCalendarDateString(newDate)
            if (date == end_date) {
                arr = {...arr, [end_date]:{selected: true, disableTouchEvent:true, startingDay: false, endingDay: true, textColor:'white', color:'#528e8a'}}
                flag = false
            } else {
                arr = {...arr, [date]:{selected: true, disableTouchEvent:false, startingDay: false, endingDay: false, textColor:'white', color:'#3d5f5d'}}
            }  
        }
        setSelected(arr)
        return;
      };
    return (
        <>
            <RBSheet
                ref={ref}
                height={Platform.OS=='ios'? 550:520}
                closeOnDragDown={true}
                // dragFromTopOnly
                onClose={()=>{
                    setSelectedSE({start:{text:'',obj:{}},end:{text:'',obj:{}}})
                    setSelected({})
                }}
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
                                            setSelected({[day.dateString]:{selected: true, startingDay: true, endingDay: true, disableTouchEvent:true, color:'#355855'}})
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
                                                <ArrowCalendarLeft color="#FFFFFF99"/>
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
export const ModalDatePoint = forwardRef((props:{onPress?:(date?:string)=>void},ref)=>{
    const [selected, setSelected] = useState('')
    const [dates, setDates] = useState({})
    const [loading, setLoading] = useState(false)
    
    return (
        <>
            <RBSheet
                ref={ref}
                height={Platform.OS=='ios'? 460:420}
                closeOnDragDown={true}
                // dragFromTopOnly
                onClose={()=>setSelected('')}
                onOpen={async()=>{
                    setLoading(true)
                    const date = new Date()
                    console.log(moment(date).format("YYYY-MM"));
                    
                    const result = await apiFetchNoStatus(`/event/calendar?date=${moment(date).format("YYYY-MM").toString()}`,'GET',true)
                    if (result) {
                        if (result?.length > 0) {
                            let obj
                            result?.forEach(element => {
                               obj = {...obj, [element]:{disableTouchEvent: false, selected:true}} 
                            });
                            
                            setDates(obj)
                        }
                    }
                    setLoading(false)
                }}
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
                {!loading && <ScrollView scrollEnabled={false} style={{flexGrow:1}} keyboardShouldPersistTaps='always'>
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
                                    onPressArrowRight={async(method,values)=>{
                                        setDates({})
                                        let month = values.getMonth() + 2
                                        let date
                                        if (month == 13) {
                                            console.log(`${values.getFullYear()+1}-01`);
                                            date = `${values.getFullYear()+1}-01`
                                        } else {
                                            console.log(`${values.getFullYear()}-${month.toString().length==1?"0":''}${month}`);
                                            date = `${values.getFullYear()}-${month.toString().length==1?"0":''}${month}`
                                        }
                                        const result = await apiFetchNoStatus(`/event/calendar?date=${date}`,'GET',true)
                                        
                                        if (result) {
                                            if (result?.length > 0) {
                                                let obj
                                                result?.forEach(element => {
                                                   obj = {...obj, [element]:{disableTouchEvent: false, selected:true}} 
                                                });
                                                
                                                setDates(obj)
                                            }
                                        }
                                        
                                        method()
                                    }}
                                    onPressArrowLeft={async(method,values)=>{
                                        setDates({})
                                        let month = values.getMonth()
                                        let date
                                        if (month == 0) {
                                            console.log(`${values.getFullYear()-1}-12`);
                                            date = `${values.getFullYear()-1}-12`
                                        } else {
                                            console.log(`${values.getFullYear()}-${month.toString().length==1?"0":''}${month}`);
                                            date = `${values.getFullYear()}-${month.toString().length==1?"0":''}${month}`
                                        }
                                        const result = await apiFetchNoStatus(`/event/calendar?date=${date}`,'GET',true)
                                        if (result) {
                                            if (result?.length > 0) {
                                                let obj
                                                result?.forEach(element => {
                                                   obj = {...obj, [element]:{disableTouchEvent: false, selected:true}} 
                                                });
                                                
                                                setDates(obj)
                                            }
                                        }

                                        method()
                                    }}
                                    onDayPress={day => {                                        
                                        setSelected(day.dateString)
                                        console.log(day.dateString);
                                        
                                        !!props.onPress&&props.onPress(day.dateString)
                                    }}
                                    style={{ borderRadius:16, paddingVertical:10}}
                                    markedDates={{
                                        [selected]:{disableTouchEvent: true, marked:false, color:'#355855'},
                                        ...dates                                  
                                    }}
                                    renderArrow={direction => (
                                        direction==='left' ? 
                                            <View style={{padding:7, alignItems:'center', justifyContent:"center"}}>
                                                <ArrowCalendarLeft color="#FFFFFF99"/>
                                            </View> : 
                                            <View style={{padding:7, alignItems:'center', justifyContent:"center"}}>
                                                <ArrowCalendarRight color="#85FDFB"/>
                                            </View>
                                        )
                                    }
                                    theme={ThemeCalender}
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>}
            </RBSheet>
        </>
    )
})

const ThemeCalender = {
    backgroundColor: '#221E1E80',
    calendarBackground: '#221E1E80',
    todayTextColor: 'white',
    todayBackgroundColor: '#00000066',
    selectedDayBackgroundColor: '#221E1E80',
    selectedDayTextColor: '#83FDF4',
    dayTextColor:'white',
    textDisabledColor: '#FFFFFF65',
    // textDayHeaderFontFamily: "Roboto-Regular",
    textSectionTitleColor: 'gray',
    monthTextColor:'#fff',
    selectedBorderRadius:16,
    // textMonthFontFamily: "Roboto-Medium",
    textMonthFontSize: 18,
    textDayFontSize:15,
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