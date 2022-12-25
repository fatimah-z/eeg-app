import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import Background from "../assets/background.jpg";
import { firebase } from "../configauth";

export default function App({ navigation, route }) {
  const eegFilesRef = firebase.firestore().collection("eegFiles");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [head, setHead] = useState("");
  const [dengue, setDengue] = useState("");
  const [genetic, setGenetic] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    eegFilesRef.onSnapshot((querySnapshot) => {
      // const patients = [];
      querySnapshot.forEach((doc) => {
        const { patientData } = doc.data();
        if (patientData?.name) {
          // console.log("1234567");
          // console.log(patientData.email);
          // console.log(patientEmail);
          if (patientData.email == "umaimarehman@gmail.com") {
            // setPatientName(patientData.name);
            setHead(patientData.headInjury);
            setDengue(patientData.dengue);
            setGender(patientData.gender);
            setGenetic(patientData.genaticInfluence);
            setName(patientData.name);
            setDOB(
              new Date(patientData.dateOfBirth.seconds * 1000)
                .toISOString()
                .split("T")[0]
            );
            console.log(patientData);
            console.log("abcd");
          }
        }
      });
    });
  }, []);

  return (
    <View style={Styles.container}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={Styles.image}
      >
        <View style={Styles.header}>
          <Text style={{ fontSize: 20 }}>Report</Text>
        </View>
        <View style={Styles.box}>
          {/* <Text style={Styles.Details}>File: {route.params.filename}</Text> */}
          <Text style={Styles.Details}>Date:</Text>
          <Text>{new Date().toISOString().split("T")[0]}</Text>
          <Text style={Styles.Details}>Time:</Text>
          <Text>{new Date().toLocaleTimeString()}</Text>
          <Text style={Styles.Details}>Patient Name: </Text>
          <Text>{name}</Text>
          <Text style={Styles.Details}>Gender:</Text>
          <Text>{gender}</Text>
          <Text style={Styles.Details}>Date of Birth: </Text>
          <Text>{DOB}</Text>
          <Text style={Styles.Details}>Patient History and Symptoms:</Text>
          <View style={Styles.innerBox}>
            <Text style={Styles.innerText}>Dengue/Post-Dengue:</Text>
            <Text>{dengue}</Text>
            <Text style={Styles.innerText}>Head Injury:</Text>
            <Text> {head}</Text>
            <Text style={Styles.innerText}>Genetic Influence:</Text>
            <Text>{genetic}</Text>
          </View>
          <Text style={Styles.Finaldetail}>Final Verdict: </Text>
          <Text style={Styles.Prediction}>
            Abnormal EEG fragments detected.
          </Text>
          <Text style={Styles.Prediction}>
            {/* The seizure Percentage is found to be {route.params.data_sent} */}
          </Text>
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
    padding: 7,
  },
  innerBox: {
    // backgroundColor: "transpar",
    borderRadius: 15,
    height: "25%",
    width: "50%",
    margin: 5,
    marginTop: "3%",
    alignItems: "center",
    justifyContent: "flex-start",
    overflow: "scroll",
    padding: 2,
    borderWidth: 1,
    borderColor: "#000000",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  Details: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 10,
  },
  Finaldetail: {
    fontWeight: "bold",
    fontSize: 20,
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
  innerText: { fontWeight: "bold", marginTop: 2 },
  Prediction: {
    fontSize: 17,
    paddingTop: 5,
  },
});
