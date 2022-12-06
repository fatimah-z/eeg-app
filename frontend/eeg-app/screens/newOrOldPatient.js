import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import Background from "../assets/login.jpg";
import { Ionicons } from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Pressable,
} from "react-native";
import { doc, getDoc } from "firebase/firestore";

import { firebase } from "../configauth";
import db from "../config";
import Tile from "../components/Tile";
const NewOrOldPatient = ({ navigation }) => {
  const useremail = firebase.auth().currentUser.email;
  const eegFilesRef = firebase.firestore().collection("eegFiles");
  const [selected, setSelected] = useState(""); // new or existing
  const [patientEmail, setPatientEmail] = useState("");
  const [patientName, setPatientName] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [head, setHead] = useState("");
  const [dengue, setDengue] = useState("");
  const [genetic, setGenetic] = useState("");
  // const docRef = doc(db, "eegFiles", "SF");

  const onContinue = async () => {
    eegFilesRef.onSnapshot((querySnapshot) => {
      // const patients = [];
      querySnapshot.forEach((doc) => {
        const { patientData } = doc.data();
        if (patientData?.name) {
          // console.log("1234567");
          // console.log(patientData.email);
          // console.log(patientEmail);
          if (patientData.email == patientEmail) {
            navigation.navigate("importDataScreen", {
              name: patientData.name,
              email: patientEmail,
              gender: patientData.gender,
              head: patientData.headInjury,
              parental: patientData.dengue,
              genatic: patientData.genaticInfluence,
              DOB: patientData.dateOfBirth,
              useremail: useremail,
            });
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
    });
  };
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Tile
            onPress={() =>
              navigation.navigate("patientHistoryScreen", { boolVar: false })
            }
            text="Add new Patient"
            icon={
              <Ionicons name="person-add-outline" size={40} color="black" />
            }
            style={
              selected === "new"
                ? { borderColor: "#c3c3c3", borderWidth: 3 }
                : null
            }
          />
          <Tile
            onPress={() => {
              setSelected("existing");
            }}
            icon={<Ionicons name="person-outline" size={40} color="black" />}
            text="Existing Patient"
            style={
              selected === "existing"
                ? { borderColor: "#c3c3c3", borderWidth: 3 }
                : null
            }
          />
        </View>

        {selected === "existing" ? (
          <View style={{ width: "70%", alignItems: "center" }}>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#c3c3c3",
                height: 50,
                textAlign: "center",
                marginVertical: 50,
                width: "100%",
              }}
              placeholder="Enter Patient Email"
              onChangeText={(val) => {
                setPatientEmail(val);
              }}
              value={patientEmail}
            ></TextInput>
            <TouchableOpacity
              style={{
                width: "100%",
                borderRadius: 10,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
              }}
              onPress={onContinue}
            >
              <Text>Continue</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ImageBackground>
    </View>
  );
};
export default NewOrOldPatient;
