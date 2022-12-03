import React, { useState, useEffect } from "react";
import { View,Text,StyleSheet,ImageBackground } from "react-native";
import Background from "../assets/background.jpg";


export default function App({navigation,route}){
    const[data,setdata] = useState();

    return(

        <View style={Styles.container}>
            <ImageBackground
            source={Background}
            resizeMode="cover"
            style={Styles.image}>

            <View style={Styles.header}>
                <Text style={{ fontSize: 20 }}>
                    Report
                </Text>
                </View>   
                <View style={Styles.box}>
                <Text style={Styles.Details}>File: {route.params.filename}</Text>
                <Text style={Styles.Details}>Date: {new Date().toLocaleDateString()}</Text>
                <Text style={Styles.Details}>Time: {new Date().toLocaleTimeString()}</Text>
                <Text style={Styles.Prediction}>No Abnormal EEG framents detected.</Text>
                <Text style={Styles.Prediction}>The estimated risk calculated  is less than {route.params.resp_data}</Text>
                </View>
            
            </ImageBackground>
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        color: "grey",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        borderRadius: 5,
      },
      header: {
        marginTop: 50,
        marginHorizontal: 20,
        height: "10%",
        backgroundColor: "#b3b3b350",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        // width: "80%"
      },
      box: {
        backgroundColor: "#b3b3b350",
        borderRadius: 15,
        height: "70%",
        // width: "80%",
        margin: 20,
        marginTop: "5%",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        overflow: "scroll",
        padding: 10,
      },
      image: {
        height: "100%",
        width: "100%",
      },
      Details:{
        fontWeight:"bold",
        fontSize:15,
        marginTop:15,
      },
      Prediction:{
        fontSize:20,
        paddingTop:20,
      },
})