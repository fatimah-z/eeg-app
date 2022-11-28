import { async } from "@firebase/util";
import { StatusBar } from "expo-status-bar";
import { QuerySnapshot } from "firebase/firestore";
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
  const todoRef = firebase.firestore().collection("eegFiles");
  async function deletePatient(item) {
    deleteDoc(doc(db, "eegFiles", item.name));
    console.log("done");
  }
  useEffect(() => {
    async function fetchData() {
      todoRef.onSnapshot((querySnapshot) => {
        const patients = [];
        querySnapshot.forEach((doc) => {
          const { patientData, name } = doc.data();
          if (patientData && patientData?.firstName) {
            patients.push({
              firstName: patientData.firstName,
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
      <FlatList
        data={patients}
        numColumns={1}
        renderItem={({ item }) => (
          <View>
            <Text>{item.firstName}</Text>
            <Pressable
              onPress={() =>
                navigation.navigate("patientHistoryScreen", {
                  getEmail: email,
                  boolVar: true,
                  name: item.name,
                })
              }
            >
              <Text>Edit</Text>
            </Pressable>
            <Pressable onPress={() => deletePatient(item)}>
              <Text>Delete</Text>
            </Pressable>
          </View>
        )}
      ></FlatList>
    </View>
  );
};
export default ViewPatient;
