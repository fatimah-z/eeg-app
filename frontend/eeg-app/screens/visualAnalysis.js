import React, { useContext, useEffect, useState } from "react";
import Background from "../assets/images/background.png";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from "react-native";

export default function App({navigation,route}){

  // const[data,setdata]=useState(); 
  const{data_}=route.params.resp_data;
  useEffect(()=>{
    // setdata(route.params.resp_data)
    // setdata(navigation.getparam('resp_data'))
  })
  const handleonPress= ()=>{
    navigation.navigate('ViewReport',{data_sent:route.params.resp_data,filename:route.params.filename,pname:route.params.name});
  }
    return(
        <View style={styles.outterdiv}>
          <View style={styles.container}>
          <ScrollView horizontal={true}>

          <Image
          source={
            require("../assets/rawgraph.png")
          }
          />
          </ScrollView>
          <Text style={styles.txt}>EEG snapshot</Text>
          <TouchableOpacity style={styles.loginBtn} onPress={handleonPress}>
            <Text style={styles.loginText} >View More</Text>
          </TouchableOpacity>
          </View>
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
  image: {
    height: "100%",
    width: "100%",
  },
  lottie: {
    width: 100,
    height: 100,
  },
  outterdiv: {
    backgroundColor: "#FCF1FB`",
    height: "100%",
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
  eegdataimg: { width: "100%", height: "300%", marginTop: "24%" },
});