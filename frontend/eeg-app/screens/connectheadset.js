import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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
import EEG from "../assets/images/EEGheadset.png";
import Background from "../assets/images/background.png";
import Loading from "../assets/images/loading.png";
export default function App({ navigation }) {
  const onUpload = () => {
    navigation.navigate("Upload");
  };
  return (
    <View style={Styles.container}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={Styles.image}
      >
        <View style={Styles.headsetdiv}>
          <Image source={EEG} style={Styles.headset}></Image>
        </View>
        <View style={Styles.innerContainer}>
          <TouchableOpacity style={Styles.loginBtn}>
            <Text style={Styles.loginText}>Connect Headset</Text>
          </TouchableOpacity>
        </View>
        <View style={Styles.statusContainer}>
          <Text style={Styles.txt}>Status:</Text>
        </View>
        <View style={Styles.statusContainerConnect}>
          <Image source={Loading} style={Styles.loadingimg}></Image>
          <Text style={Styles.txt}>Connecting! Please wait.......</Text>
        </View>
        <View style={Styles.uploadbtn}>
          <TouchableOpacity style={Styles.loginBtn} onPress={onUpload}>
            <Text style={Styles.loginText}>Upload EEG Data</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
const Styles = StyleSheet.create({
  headset: {
    width: "100%",
    height: "60%",
    marginTop: "10%",
  },
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
    margin: 10,
  },
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  innerContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: -20,
  },
  txt: {
    color: "#264CE3",
    fontSize: 17,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
  },
  statusContainerConnect:{flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop:"-3%"
  },
  uploadbtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "4%",
  },
  loginText: {
    color: "#FFFFFF",
  },
  headsetdiv: {},
  image: {
    height: "100%",
  },
});
