import { StatusBar } from "expo-status-bar";
import React, { useContext, useState,useEffect } from "react";
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
  import Background from "../assets/background.jpg";
// const Background = require("../assets/rawgraph.png");
import AnimatedLoader from "react-native-animated-loader";


export default function App({navigation}){
  const [loading, setloading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [data,setData] = useState(0.0);
  const back_data=0.046;
  useEffect(() => {
    setInterval(() => {
      setVisible(!visible);
      // setData(back_data);
    }, 2000);
  }, [data]);

    const onAnalyze = async ()=>{
      setloading(true);
        try{
          const response = await fetch("http://192.168.43.137:4000/load", {
            method: "GET",
          });
          const resp = await response.json();
          console.log(resp.data);
          setData(resp.data);
          
          // await response.json().then((resp)=>{
          //   console.log(resp.data);
          //   setData(resp.data);
          // });
          console.log(data);
        }catch (error) {
          
        }
        finally{
          // if(data){

            setloading(false);
            navigation.navigate('ViewAnalysis',{resp_data:data});
          // }
        }
      }
    return(
        <View style={styles.outterdiv}>
          {loading?(
            <View>
            <AnimatedLoader
              visible={visible}
              overlayColor="rgba(255,255,255,0.75)"
              animationStyle={styles.lottie}
              speed={1}
            >
              <Text style={styles.txt}>Loading</Text>
            </AnimatedLoader>
          </View>
          ):(

      <ImageBackground
        source={require("../assets/background.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.container}>
          <TouchableOpacity style={styles.loginBtn} onPress={onAnalyze}>
            <Text style={styles.loginText}>View Analysis</Text>
          </TouchableOpacity>
         
        </View>
      </ImageBackground>
          )}
    </View>
    );
}

const styles = StyleSheet.create({
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
    lottie: {
      width: 100,
      height: 100,
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
    outterdiv: {
      backgroundColor: "#FCF1FB`",
      height: "100%",
    },
    image: {
      height: "100%",
      width: "100%",
    },
    lottie: {
      width: 100,
      height: 100,
    },
    container: {
      backgroundColor: "#FFFFFF",
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
      marginBottom: "3%",
    },
    statusContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    box: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      backgroundColor: "#FFFFFF",
      borderRadius: 15,
      shadowOpacity: 0.8,
      shadowRadius: 2,
      height: "70%",
      margin: 20,
      marginTop: "5%",
      alignItems: "center",
      justifyContent: "center",
      overflow: "scroll",
    },
    appnametxt: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 18,
      marginTop: "25%",
      width: 400,
      color: "#000000",
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
      fontWeight: "bold",
      marginBottom: "3%",
      borderBottomWidth: 3,
      borderBottomColor: "#000000",
      fontSize: 17,
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