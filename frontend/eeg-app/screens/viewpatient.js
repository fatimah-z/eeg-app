import { async } from "@firebase/util";
import { StatusBar } from "expo-status-bar";
import { QuerySnapshot } from "firebase/firestore";
import Background from "../assets/background.jpg";

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
  ScrollView,
  useColorScheme,
  Pressable,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { firebase } from "../configauth";
import { getFirestore, doc, updateDoc, deleteDoc } from "firebase/firestore";
const db = getFirestore();

const ViewPatient = ({ route, navigation }) => {
  const email = firebase.auth().currentUser.email;
  const [patients, setPatients] = useState([]);
  const eegFilesRef = firebase.firestore().collection("eegFiles");
  async function deletePatient(item) {
    deleteDoc(doc(db, "eegFiles", item.name));
    console.log("done");
  }
  useEffect(() => {
    async function fetchData() {
      eegFilesRef.onSnapshot((querySnapshot) => {
        const patients = [];
        querySnapshot.forEach((doc) => {
          const { patientData, name } = doc.data();
          if (patientData && patientData?.name) {
            patients.push({
              patientName: patientData.name,
              id: doc.id,
              name,
            });
          }
        });
        setPatients(patients);
      });
    }
    fetchData();
  }, []);
  return (
    <View>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            marginTop: 50,
            marginHorizontal: 20,
            height: "10%",
            backgroundColor: "#b3b3b350",
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>Patients</Text>
        </View>
        <FlatList
          style={{ marginTop: 20 }}
          data={patients
            .concat(patients)
            .concat(patients)
            .concat(patients)
            .concat(patients)}
          numColumns={1}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 10,
                backgroundColor: "#c3c3c350",
                marginVertical: 10,
                marginHorizontal: 20,
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text>{item.patientName}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  flex: 1,
                }}
              >
                <Pressable
                  onPress={() =>
                    navigation.navigate("patientData", {
                      getEmail: email,
                      boolVar: true,
                      name: item.patientName,
                    })
                  }
                >
                  <Text style={{ color: "grey" }}>View</Text>
                </Pressable>
                <Pressable
                  onPress={() =>
                    navigation.navigate("patientHistoryScreen", {
                      getEmail: email,
                      boolVar: true,
                      name: item.patientName,
                    })
                  }
                >
                  <Text style={{ color: "grey" }}>Edit</Text>
                </Pressable>
                <Pressable onPress={() => deletePatient(item)}>
                  <Text style={{ color: "red" }}>Delete</Text>
                </Pressable>
              </View>
            </View>
          )}
        ></FlatList>
      </ImageBackground>
    </View>
  );
};
export default ViewPatient;
