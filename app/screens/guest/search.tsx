import { Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { MainLayout } from '../../component';
import { height, statusBarHeight, width } from '../../GLOBAL';
import { styles } from '../../styles';
import { CalendarIcon } from '../../component/svg/svg';
import { Calendar,CalendarUtils } from "react-native-calendars";
import { useState } from 'react';
 
export function SearchScreen() {
    const [selectedSE, setSelectedSE] = useState({start:{text:'',obj:{}},end:{text:'',obj:{}}})
    const [selected, setSelected] = useState({})


    const getDatePeriod = (start_date?:string, end_date?:string) => {
        let start = new Date(start_date);
        let count=1
        let flag = true
        let arr = {[start_date]:{selected: true, startingDay: true, color:'#355855', customStyles: {
            container: {
              backgroundColor: 'green'
            },
            text: {
              color: 'black',
              fontWeight: 'bold'
            }
          }}}
        while (flag==true) {
            const newDate = start.setDate(start.getDate() + count); 
            const date = CalendarUtils.getCalendarDateString(newDate)
            if (date == end_date) {
                arr = {...arr, [end_date]:{selected: true, endingDay: true, textColor:'white', color:'#528e8a'}}
                flag = false
            } else {
                arr = {...arr, [date]:{selected: true, textColor:'white', color:'#3d5f5d'}}
            }  
        }
        setSelected(arr)
        return;
      };
    return ( 
        <ImageBackground style={{width:width, height:height}} source={require('../../../assets/image/back.png')}>
            <MainLayout isStatusBar>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='always' contentContainerStyle={{flexGrow:1}}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : 'height'}
                        keyboardVerticalOffset={Platform.OS === "ios" && statusBarHeight}
                        style={{ flex: 1 }}
                    >
                        <View style={{marginTop:statusBarHeight+16, marginBottom:16}}>
                            <View style={{marginHorizontal:16, marginBottom:16, flexDirection:'row', alignItems:'center', justifyContent:"space-between"}}>
                                <Text style={[styles.h4, {color:'white'}]}>Мероприятия</Text>
                                <View style={{borderRadius:16, width:42, alignItems:'center', justifyContent:"center", height:42, backgroundColor:'#00000033'}}>
                                    <CalendarIcon color='#fff'/>
                                </View>
                            </View>
                            <Image source={require('../../../assets/image/line.png')} style={{height:1}}/>
                        </View>
                        <View style={{backgroundColor:'#1C1A1A'}}>
                            <Calendar
                                firstDay={1}
                                enableSwipeMonths
                                markingType='period'
                                onDayPress={day => {
                                    if (selectedSE.start.text == '') {
                                        setSelectedSE({start:{text:day.dateString, obj:day}, end:selectedSE.end})
                                        setSelected({[day.dateString]:{selected: true, color:'#355855', customStyles: { container: {borderRadius: 90}}}})
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
                                            const d2: Date = new Date(selectedSE.end.text);
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
                                style={{ borderRadius:30, paddingVertical:10, marginTop:16, marginBottom:20 }}
                                markedDates={selected}
                                renderArrow={direction => (
                                    direction==='left' ? 
                                        <View style={{padding:15, borderRadius:360, backgroundColor:'white', alignItems:'center', justifyContent:"center"}}>
                                            
                                        </View> : 
                                        <View style={{transform:[{rotate:'180deg'}],padding:15, borderRadius:360, backgroundColor:'white', alignItems:'center', justifyContent:"center"}}>
                                            
                                        </View>
                                    )
                                }
                                theme={ThemeCalender}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </MainLayout>
        </ImageBackground>
    )
}

export const ThemeCalender = {
    backgroundColor: '#221E1E80',
    calendarBackground: '#221E1E80',
    todayTextColor: 'white',
    todayBackgroundColor: '#1f1c1c',
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
    }
  };