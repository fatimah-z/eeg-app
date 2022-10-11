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
import { firebase } from "../configauth";
import Background from "../assets/login.jpg";

import ImportData from "./importeegdata";
const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (email, password, username) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.outterdiv}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.div}>
          <View style={styles.namediv}>
            <Text style={styles.appnametxt}>NEUROSCAN</Text>
          </View>

          <View style={styles.container}>
            <StatusBar style="auto" />
            

            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Email"
                placeholderTextColor="#808080"
                onChangeText={(val) => setEmail(val)}
              />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Password"
                placeholderTextColor="#808080"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate("Registeration")}
            >
              <Text style={styles.forgot_button}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => loginUser(email, password, username)}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 100,
  },

  inputView: {
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,

    borderColor: "#000000",
    borderBottomWidth: 1,
    color: "#000000",
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: "#000000",
    fontWeight: "bold",
    fontSize: 15,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  appnametxt: {
    textAlign: "center",
    fontSize: 18,

    width: 300,
    fontWeight: "bold",
    color: "#000000",
    marginTop: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#81E3CD",
  },
  div: {},

  namediv: {
    alignItems: "center",
  },
  outterdiv: {
    backgroundColor: "c",
    height: "100%",
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
  },
  loginText: {
    color: "#000000",
    fontWeight: "bold",
  },
});
