import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
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
import Background from "../assets/images/background.png";
import { logout } from "../auth/auth";
import AuthContext from "../auth/authContext";

export default function App({ navigation }) {
  const authContextValue = useContext(AuthContext);
  const onUpload = () => {
    navigation.navigate("Headset");
  };
  const onImport = () => {
    navigation.navigate("Import");
  };
  return (
    <View>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.container}>
          <TouchableOpacity style={styles.loginBtn} onPress={onImport}>
            <Text style={styles.loginText}>Import EEG Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginBtn} onPress={onUpload}>
            <Text style={styles.loginText}>Upload EEG Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => logout(authContextValue.setSignedIn)}
          >
            <Text style={styles.loginText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    backgroundColor: "#000000",
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#BB005E",
  },
  loginText: {
    color: "#FFFFFF",
  },
});
