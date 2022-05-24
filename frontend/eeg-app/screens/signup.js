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
  ImageBackground

} from "react-native";
import Background from "../assets/images/background.png";
export default function App({navigation}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onSignup =()=>{
      
      navigation.navigate('Login');
    }
   
    return (
      
      <View style={styles.outterdiv}>
          <ImageBackground source={Background} resizeMode="cover" style={styles.image}>

          <View>
              <Text style={styles.appnametxt}>
                 NEUROSCAN
              </Text>
          </View>
          
        <View style={styles.container}>
       
        <StatusBar style="auto" />
        <View style={styles.nameouttercontainer}>


        <View style={styles.namefields}>
          <TextInput
           color="#FFFFFF"
            placeholder="First Name"
            placeholderTextColor="#FFFFFF"
            onChangeText={(email) => setEmail(email)}
            />
        </View>
        <View style={styles.namefields}>
          <TextInput
            color="#FFFFFF"
            placeholder="Last Name"
            placeholderTextColor="#FFFFFF"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email"
            placeholderTextColor="#FFFFFF"
            onChangeText={(email) => setEmail(email)}
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
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Confirm Password"
            placeholderTextColor="#FFFFFF"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
   
        <TouchableOpacity>
          <Text style={styles.forgot_button}>Not a registered user?</Text>
        </TouchableOpacity>
   
        <TouchableOpacity style={styles.loginBtn} onPress={onSignup}>
          <Text style={styles.loginText}>SignUp</Text>
        </TouchableOpacity>

  </View>
  </ImageBackground>
  </View>
    );
  }
   
  const styles = StyleSheet.create({
    container: {
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 40,
        marginBottom:60
       
     
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
      borderColor:"#FFFFFF",
    borderBottomWidth:1,
    color:"#FFFFFF"
    },
   
    forgot_button: {
      height: 30,
      marginBottom: 30,
      color:"#FFFFFF",
      fontWeight:"bold",
      fontSize:15
    },
    image: {
      flex: 1,
      justifyContent: "center",
      height:"100%"
    },
   appnametxt:{
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    width: 400,
  color:"#FFFFFF",
    marginTop:30

   },
   namefields:{
    
    
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 10,
    borderColor:"#FFFFFF",
  borderBottomWidth:1,
  


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
    nameouttercontainer:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        width:220,

        
       
    },
    outterdiv:{
        backgroundColor:"#FCF1FB`",
        height:"100%"
    },
    loginText:{
      color:"#FFFFFF"
    }
  });