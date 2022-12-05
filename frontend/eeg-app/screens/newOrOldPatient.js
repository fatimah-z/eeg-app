import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import Background from "../assets/login.jpg";
import { Ionicons } from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Pressable,
} from "react-native";
import Tile from "../components/Tile";
const NewOrOldPatient = ({ navigation }) => {
  const [selected, setSelected] = useState(""); // new or existing
  const [patientName, setPatientName] = useState("");
  const func = () => {};
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Tile
            onPress={() =>
              navigation.navigate("patientHistoryScreen", { boolVar: false })
            }
            text="Add new Patient"
            icon={
              <Ionicons name="person-add-outline" size={40} color="black" />
            }
            style={
              selected === "new"
                ? { borderColor: "#c3c3c3", borderWidth: 3 }
                : null
            }
          />
          <Tile
            onPress={() => {
              setSelected("existing");
            }}
            icon={<Ionicons name="person-outline" size={40} color="black" />}
            text="Existing Patient"
            style={
              selected === "existing"
                ? { borderColor: "#c3c3c3", borderWidth: 3 }
                : null
            }
          />
        </View>

        {selected === "existing" ? (
          <View style={{ width: "70%", alignItems: "center" }}>
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#c3c3c3",
                height: 50,
                textAlign: "center",
                marginVertical: 50,
                width: "100%",
              }}
              placeholder="Enter Patient Name"
              onChangeText={(val) => {
                setPatientName(val);
              }}
              value={patientName}
            ></TextInput>
            <TouchableOpacity
              style={{
                width: "100%",
                borderRadius: 10,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffffff",
              }}
            >
              <Text>Continue</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ImageBackground>
    </View>
  );
};
export default NewOrOldPatient;
