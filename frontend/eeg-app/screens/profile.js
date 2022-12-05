import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import AnimatedLoader from "react-native-animated-loader";
// import DropDownPicker from "react-native-dropdown-picker";
// import Record from "../assets/images/record.png";
import Background from "../assets/background.jpg";
// import Loading from "../assets/images/loading.png";
import * as DocumentPicker from "expo-document-picker";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../config";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { firebase } from "../configauth";
import Tile from "../components/Tile";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const Profile = ({ route, navigation }) => {
  const email = firebase?.auth()?.currentUser?.email;
  const [username, setUsername] = useState("");
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth()?.currentUser.uid)
      .get()
      .then((doc) => {
        const data = doc.data();
        if (data.username) {
          setUsername(data.username);
        }
      });
  }, []);
  const uploadDataBtn = () => {
    navigation.navigate("newOrOldPatient", {
      getEmail: email,
    });
  };
  const viewPatientBtn = () => {
    navigation.navigate("viewPatient");
  };
  return (
    <View style={Styles.container}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={Styles.image}
      >
        <View style={Styles.header}>
          <Text style={{ fontSize: 20 }}>
            Welcome!
            <Text> </Text>
            <Text style={{ fontStyle: "italic" }}>
              {username ? username : null}
            </Text>
          </Text>
        </View>
        <View style={Styles.box}>
          {/* <View> */}
          {/* <Text style={Styles.txt}>{route.params.sendEmail}</Text>
          </View> */}

          <View style={Styles.row}>
            <Tile
              onPress={uploadDataBtn}
              text="Upload Data"
              icon={<Feather name="upload-cloud" size={40} color="black" />}
            />
            <Tile
              icon={
                <MaterialCommunityIcons name="brain" size={40} color="black" />
              }
              text="Record EEG Data"
            />
          </View>
          <View style={Styles.row}>
            <Tile
              onPress={() => viewPatientBtn()}
              text="View Patients"
              icon={<Ionicons name="people-outline" size={40} color="black" />}
            />
          </View>

          {/* <View>
            <View style={Styles.submitbtndiv}>
              <TouchableOpacity
                style={Styles.loginBtn}
                onPress={() => uploadDataBtn()}
              >
                <Text style={Styles.loginText}>Upload Data</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={Styles.uploadbtndiv}>
              <TouchableOpacity style={Styles.loginBtn}>
                <Text style={Styles.loginText}>Record EEG Data</Text>
              </TouchableOpacity>
            </View>
          </View> */}
          <StatusBar style="auto" />

          {/* another test line */}
        </View>
      </ImageBackground>
    </View>
  );
};
export default Profile;
const Styles = StyleSheet.create({
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#BB005E",
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
  uploadbtndiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "18%",
  },
  image: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  lottie: {
    width: 100,
    height: 100,
  },
  container: {
    backgroundColor: "#FFFFFF",
    color: "grey",
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
    marginBottom: "33%",
    fontSize: 18,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    backgroundColor: "#b3b3b350",
    borderRadius: 15,
    height: "70%",
    margin: 20,
    marginTop: "5%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
  },
  header: {
    marginTop: 50,
    marginHorizontal: 20,
    height: "10%",
    backgroundColor: "#b3b3b350",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  appnametxt: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: "25%",
    width: 400,
    color: "#000000",
    marginLeft: -16,
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
    marginBottom: "3%",
    fontSize: 28,
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
});
