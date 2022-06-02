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
import Col from "../components/Col";
import Heading from "../components/Heading";
import LightText from "../components/LightText";
import Row from "../components/Row";

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
        <View style={styles.reportCol}>
          <Row>
            <Col flex={1}>
              <Heading style={{ textAlign: "right" }} text="NAME" />
            </Col>
            <Col flex={2}>
              <LightText
                style={{ textAlign: "left", marginLeft: 3 }}
                text="AAMNA SHAHID"
              />
            </Col>
          </Row>

          <Row>
            <Col flex={1}>
              <Heading style={{ textAlign: "right" }} text="AGE" />
            </Col>
            <Col flex={2}>
              <LightText
                style={{ textAlign: "left", marginLeft: 3 }}
                text="21"
              />
            </Col>
          </Row>
          <Row>
            <Col flex={1}>
              <Heading style={{ textAlign: "right" }} text="GENDER" />
            </Col>
            <Col flex={2}>
              <LightText
                style={{ textAlign: "left", marginLeft: 3 }}
                text="Female"
              />
            </Col>
          </Row>
          <Row>
            <Col flex={1}>
              <Heading
                style={{ textAlign: "right" }}
                text="Predicted Desiese"
              />
            </Col>
            <Col flex={2}>
              <LightText
                style={{ textAlign: "left", marginLeft: 3 }}
                text="ENCEPHLITIS"
              />
            </Col>
          </Row>
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.loginBtn} onPress={onImport}>
            <Text style={styles.loginText}>Import EEG Data</Text>
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
    color: "#fff",
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
  reportCol: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  reportRow: {
    display: "flex",
    flexDirection: "row",
  },
});
