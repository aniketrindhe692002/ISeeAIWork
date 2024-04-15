import { StyleSheet } from "react-native";

const bodyStyles = StyleSheet.create({
    welcome:{
        fontSize:20,
        top:-35,
        left:110,
        fontWeight:'bold'
    },
    img:{
        height:400,
        width:400
    },
    imgBox:{
        height:400,
        width:500,
        top:70,
        left:6
    },
    textBox:{
        height:'auto',
        width:400, 
        top:25,
        backgroundColor:'lightgrey',
        fontSize:15,
        justifyContent:'center',
        fontWeight:'bold',
        lineHeight:20,
        borderRadius:10,
        padding:10
    }
});

export default bodyStyles;