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
import Background from "../assets/login.jpg";

import { firebase } from "../configauth";
const Registeration = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  RegisterUser = async (email, password, firstname, lastname) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://test-3fc13.firebaseapp.com",
          })
          .then(() => {
            alert("verification email sent");
          })
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                id: firebase.auth().currentUser.uid,
                username,
                email,
              })
              .then(() => {
                alert("Created");
              });
            // navigation.navigate("Login", { id: "1" });
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.outterdiv}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={styles.image}
      >
        <View>
          <Text style={styles.appnametxt}>WELCOME TO NEUROSCAN</Text>
        </View>

        <View style={styles.container}>
          <StatusBar style="auto" />
          <View style={styles.nameouttercontainer}>
            <View style={styles.inputView}>
              <TextInput
                color="#FFFFFF"
                placeholder="Username"
                placeholderTextColor="#808080"
                onChangeText={(username) => setUsername(username)}
                style={styles.TextInput}
              />
            </View>
          </View>
          <View style={styles.inputView}>
            <TextInput
              color="#FFFFFF"
              placeholder="Email"
              placeholderTextColor="#808080"
              onChangeText={(email) => setEmail(email)}
              style={styles.TextInput}
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
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm Password"
              placeholderTextColor="#808080"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("loginScreen")}>
            <Text style={styles.forgot_button}>Already Registered?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => RegisterUser(email, password)}
          >
            <Text style={styles.loginText}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
export default Registeration;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 60,
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
    marginLeft: 10,
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
  },
  appnametxt: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 0,
    width: 400,
    color: "#000000",
    marginTop: 30,
  },
  namefields: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 10,
    borderColor: "#000000",
    borderBottomWidth: 1,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 220,
    marginTop: "6%",
  },
  outterdiv: {
    backgroundColor: "#FCF1FB`",
    height: "100%",
  },
  loginText: {
    color: "#000000",
    fontWeight: "bold",
  },
});
