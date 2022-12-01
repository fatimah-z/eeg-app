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
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
const BoxLayout = () => {
  return (
    <View style={Styles.bigContainer}>
      <View style={Styles.extraSpaceUp}></View>
      <View style={Styles.boxLayout}>
        <View style={Styles.leftBox}>
          <LinearGradient
            colors={["#fff", "#fff", "#81E3CD"]}
            style={Styles.linearGradient}
          >
            <View>
              <Icon name="pulse" size={50} color="#81E3CD"></Icon>
              <Text>Record EEG</Text>
            </View>
          </LinearGradient>
          <LinearGradient
            style={Styles.leftBox2}
            colors={["#fff", "#fff", "#81E3CD"]}
          >
            <View> 
              <Icon name="cloud-upload" size={50} color="#81E3CD">

              </Icon>
              <Text>Upload EEG</Text>
              </View>
          </LinearGradient>
        </View>
        <View style={Styles.rightBox}>
          <LinearGradient
            style={Styles.rightBox1}
            colors={["#fff", "#fff", "#81E3CD"]}
          >
            <View>
            <Icon name="pulse" size={50} color="#81E3CD"></Icon>
              <Text>Record EEG</Text>
            </View>
          </LinearGradient>
          <LinearGradient
            style={Styles.rightBox2}
            colors={["#fff", "#fff", "#81E3CD"]}
          >
            <View>
            <Icon name="pulse" size={50} color="#81E3CD"></Icon>
              <Text>Record EEG</Text>
            </View>
          </LinearGradient>
        </View>
      </View>
      <View style={Styles.extraSpaceDown}></View>
    </View>
  );
};
export default BoxLayout;
const Styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  extraSpaceUp: {
    flex: 1,
    backgroundColor: "#fff",
  },
  boxLayout: {
    flex: 4,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  leftBox: {
    flex: 1,
    backgroundColor: "#fff",
    marginRight: "2.5%",
    marginLeft: "12%",
    marginVertical: "15%",
  },
  leftBox1: {
    flex: 2,
    backgroundColor: "#fff",
    marginBottom: "15%",
    borderRadius: 15,
    elevation: 10,
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  leftBox2: {
    flex: 3,
    backgroundColor: "#fff",
    borderRadius: 15,
    elevation: 10,
    marginBottom: "15%",
  },
  linearGradient: {
    flex: 2,
    backgroundColor: "#fff",
    marginBottom: "15%",
    borderRadius: 15,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  rightBox: {
    flex: 1,
    backgroundColor: "#fff",
    marginLeft: "2.5%",
    marginRight: "12%",
    borderRadius: 15,
    marginVertical: "15%",
  },
  rightBox1: {
    flex: 3,
    backgroundColor: "#fff",
    marginBottom: "15%",
    borderRadius: 15,
    elevation: 10,
  },
  rightBox2: {
    flex: 2,
    backgroundColor: "#fff",
    marginBottom: "15%",
    borderRadius: 15,
    elevation: 10,
  },
  extraSpaceDown: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
