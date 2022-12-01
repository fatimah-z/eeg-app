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
import { AntDesign } from "@expo/vector-icons";
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
    <View style={styles.outterdiv}>
      <ImageBackground
        source={require("../assets/background.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.header}>
          <Text style={{ fontSize: 20 }}>Patient History Form</Text>
        </View>

        <View style={styles.box}>
          <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.nameouttercontainer}>
              <View style={styles.namefields}>
                <TextInput
                  color="#000000"
                  placeholder="Full Name"
                  cursorColor="grey"
                  placeholderTextColor="#808080"
                  onChangeText={(val) => setName(val)}
                />
              </View>
            </View>
            <View style={styles.nameouttercontainer}>
              <View style={styles.namefields}>
                <TextInput
                  color="#000000"
                  cursorColor="grey"
                  placeholder="Contact Number"
                  placeholderTextColor="#808080"
                  onChangeText={(val) => setContact(val)}
                />
              </View>
            </View>

            <View style={styles.submitbtndiv}>
              <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
      </ImageBackground>
    </View>
  );
};
export default ViewPatient;
const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 60,
  },
  header: {
    marginTop: 80,
    marginHorizontal: 20,
    height: "10%",
    backgroundColor: "#b3b3b350",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  inputView: {
    height: 45,
    marginVertical: "7%",
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 10,
    borderColor: "#000000",
    borderBottomWidth: 1,
    color: "#000000",
  },
  radio: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    // justifyContent: "center",
  },
  DOB: {
    flexDirection: "row",
    backgroundColor: "#ffffff80",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    color: "#000000",
  },
  submitbtndiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  radioHeading: {
    minHeight: 70,
    width: "25%",
    textAlign: "right",
    color: "#000000",
  },

  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
  },
  dropdowndiv: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    width: "30%",
  },
  appnametxt: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: "25%",
    marginLeft: -16,
    width: 400,
    color: "#000000",
  },

  namefields: {
    height: 50,
    flex: 1,
    padding: 5,
    width: "60%",
    borderColor: "grey",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtn: {
    width: "80%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  nameouttercontainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  outterdiv: {
    backgroundColor: "#FCF1FB`",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontWeight: "bold",
  },
  box: {
    backgroundColor: "#b3b3b350",
    borderRadius: 15,
    height: "75%",
    margin: 20,
    marginTop: "5%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
  },
});
