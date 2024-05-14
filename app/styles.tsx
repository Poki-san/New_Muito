import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    blurContainer: {
      borderWidth:1,
      borderColor:'#9999991A',
      paddingVertical: 20,
      paddingHorizontal: 24,
      textAlign: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      borderRadius: 20,
      gap:12
    },
    h1:{
        fontWeight:'400',
        lineHeight:33.6,
        fontSize:28,
        color:'#000000',
        fontFamily:'Poppins'
    },
    h2:{
        fontWeight:'400',
        lineHeight:28.8,
        fontSize:24,
        color:'#000000',
        fontFamily:'Poppins'
    },
    h3:{
        fontWeight:'600',
        lineHeight:28.8,
        fontSize:24,
        color:'#000000',
        fontFamily:'PoppinsSemiBold'
    },
    h4:{
        fontWeight:'600',
        lineHeight:19.2,
        fontSize:16,
        color:'#000000',
        fontFamily:'PoppinsSemiBold'
    },
    bodyText:{
        fontWeight:'400',
        lineHeight:16.8,
        fontSize:14,
        color:'#000000',
        fontFamily:'Poppins'
    },
    additional:{
        fontWeight:'400',
        lineHeight:19.2,
        fontSize:16,
        color:'#000000',
        fontFamily:'Poppins'
    },
    button:{
        fontWeight:'600',
        lineHeight:16.8,
        fontSize:14,
        color:'#000000',
        fontFamily:'PoppinsSemiBold'
    },
    smallText:{
        fontWeight:'400',
        lineHeight:14.4,
        fontSize:12,
        color:'#000000',
        fontFamily:'Poppins'
    },
});