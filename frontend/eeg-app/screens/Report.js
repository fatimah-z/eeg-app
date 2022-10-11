import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    ImageBackground,
    ScrollView
  } from "react-native";
  import Background from "../assets/background.jpg";


  export default function App({navigation,route}){
    const[data,setdata] = useState();
    const{data_}=route.params.data_sent;
    useEffect(()=>{
      // setdata(route.params.sent_data)
      // setdata(navigation.getparam('sent_data'))
    });
    return(
        <View style={styles.outterdiv}>
           <ScrollView>
            <View style={styles.container}>
            <ScrollView horizontal={true}>
            <Image
            source={require("../assets/ep1.png")}
            />
            </ScrollView>
            <Text style={styles.txt}>Seizure Window 1</Text>
            </View>

            <View style={styles.container}>
            <ScrollView horizontal={true}>
            <Image
            source={require("../assets/ep2.png")}
            />
            </ScrollView>
            <Text style={styles.txt}>Seizure Window 2</Text>
            </View>

            <View style={styles.container}>
            <ScrollView horizontal={true}>
            <Image
            source={require("../assets/ep3.png")}
            />
            </ScrollView>
            <Text style={styles.txt}>Seizure Window 3</Text>
            </View>

            <View style={styles.container}>
            <ScrollView horizontal={true}>
            <Image
            source={require("../assets/ep4.png")}
            />
            </ScrollView>
            <Text style={styles.txt}>Seizure Window 4</Text>
            </View>
            <View style={styles.txtbox}>
            <Text style={styles.txt}>Seizure Confidence:{route.params.data_sent}</Text>
            </View>
           </ScrollView>
        </View>
    );
  }

  const styles = StyleSheet.create({
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
  
      backgroundColor: "#BB005E",
    },
    txtbox:{
      height:"30%",
      width: "80%"
    },
    loadingimg: {
      flexDirection: "row",
      alignItems: "center",
    },
    loginText: {
      color: "#000000",
      fontWeight: "bold",
    },
    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "5%",
      backgroundColor: "#81E3CD",
    },
    submitbtndiv: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    image: {
      height: "100%",
      width: "100%",
    },
    lottie: {
      width: 100,
      height: 100,
    },
    outterdiv: {
      backgroundColor: "#FCF1FB`",
      height: "100%",
    },
    container: {
      backgroundColor: "#FFFFFF",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      borderRadius: 5,
    },
    innerContainer: {
      flexDirection: "column",
      alignItems: "center",
    },
    txt: {
      fontWeight: "bold",
      marginBottom: "3%",
    },
    statusContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    box: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      backgroundColor: "#FFFFFF",
      borderRadius: 15,
      shadowOpacity: 0.8,
      shadowRadius: 2,
      height: "70%",
      margin: 20,
      marginTop: "5%",
      alignItems: "center",
      justifyContent: "center",
      overflow: "scroll",
    },
    appnametxt: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 18,
      marginTop: "25%",
      width: 400,
      color: "#000000",
    },
    uploadbtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "6%",
      marginBottom: "5%",
    },
    galleryContainer: {
      marginTop: "-10%",
    },
    uploadContainer: {
      marginTop: "40%",
    },
    row: {
      flexDirection: "row",
      justifyContent: "center",
    },
    dropdown: {
      // marginTop: "5%",
      // width: "50%",
    },
    text: {
      fontWeight: "bold",
      marginBottom: "3%",
      borderBottomWidth: 3,
      borderBottomColor: "#000000",
      fontSize: 17,
    },
    uploadimg: { width: "80%", height: "200%", marginTop: "25%" },
    uploadimgdiv: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    dropdowndiv: {
      marginTop: "10%",
      width: "100%",
      padding: "20%",
    },
    selectfiles: {
      borderBottomWidth: 2,
    },
    eegdataimg: { width: "100%", height: "300%", marginTop: "24%" },
  });