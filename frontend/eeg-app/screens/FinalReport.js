import React, { useState, useEffect } from "react";
import { View,Text,StyleSheet,ImageBackground } from "react-native";
import Background from "../assets/background.jpg";

export default function App({navigation,route}){
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [head, setHead] = useState("");
  const [dengue, setDengue] = useState("");
  const [genetic, setGenetic] = useState("");
  useEffect=(()=>{
    eegFilesRef.onSnapshot((querySnapshot) => {
      // const patients = [];
      querySnapshot.forEach((doc) => {
        const { patientData } = doc.data();
        if (patientData?.name) {
          // console.log("1234567");
          // console.log(patientData.email);
          // console.log(patientEmail);
          if (patientData.email == route.params.email) {
            setPatientName(patientData.name);
            setHead(patientData.headInjury);
            setDengue(patientData.dengue);
            setGender(patientData.gender);
            setGenetic(patientData.genaticInfluence);
            setDOB(patientData.dateOfBirth);
            console.log(patientData.email);
            console.log("abcd");
          }
        }
      });
    }

 )});
  
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
                <Text style={Styles.Details}>Patient Name: {route.params.pname}</Text>
                <Text style={Styles.Details}>Gender: {gender}</Text>
                <Text style={Styles.Details}>Date of Birth: {DOB}</Text>
                <View>
                  <Text>Patient History and Symptoms</Text>
                <Text style={Styles.Details}>Dengue/Post-Dengue:{dengue}</Text>
                <Text style={Styles.Details}>Head Injury:{head}</Text>
                <Text style={Styles.Details}>Genetic Influence:{genetic}</Text>
                </View>
                <Text style={Styles.Prediction}>Abnormal EEG fragments detected.</Text>
                <Text style={Styles.Prediction}>The seizure Percentage is found to be {route.params.data_sent}</Text>
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