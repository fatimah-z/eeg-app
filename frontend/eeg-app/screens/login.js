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
import { getAccessToken } from "react-native-axios-jwt";
import Background from "../assets/images/background.png";
import { login } from "../auth/auth";
import AuthContext from "../auth/authContext";
export default function App({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authContextValue = useContext(AuthContext);
  const signedIn = authContextValue.signedIn;
  const setSignedIn = authContextValue.setSignedIn;
  const onLogin = () => {
    login(username, password, setSignedIn);
  };

  return (
    <View style={styles.outterdiv}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={styles.image}
      >
        <View>
          <Text style={styles.appnametxt}>NEUROSCAN</Text>
        </View>

        <View style={styles.container}>
          <StatusBar style="auto" />

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Username"
              placeholderTextColor="#FFFFFF"
              onChangeText={(username) => setUsername(username)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#FFFFFF"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.forgot_button}>SignUp</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
            <Text style={styles.loginText}>LogIn</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

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
    borderColor: "#FFFFFF",
    borderBottomWidth: 1,
    color: "#FFFFFF",
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: "#FFFFFF",
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
    color: "#FFFFFF",
    marginTop: 30,
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

  outterdiv: {
    backgroundColor: "#FCF1FB`",
    height: "100%",
  },
  loginText: {
    color: "#FFFFFF",
  },
});
