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
import DropDownPicker from "react-native-dropdown-picker";
import Record from "../assets/images/record.png";
import Background from "../assets/images/background.png";
import Loading from "../assets/images/loading.png";

export default function App({ navigation }) {
  const onAnalyze = () => {
    navigation.navigate("Analyze");
  };
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "CSV", value: "csv" },
    { label: "TXT", value: "txt" },
  ]);
  return (
    <View style={Styles.container}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={Styles.image}
      >
        <View style={Styles.uploadimgdiv}>
          <Image style={Styles.uploadimg} source={Record}></Image>
        </View>

        {/* another test line */}

        <View style={Styles.innerContainer}>
          <View style={Styles.uploadbtn}>
            <TouchableOpacity style={Styles.loginBtn}>
              <Text style={Styles.loginText}>Record EEG Data</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.statusContainer}>
          <Text style={Styles.txt}>Status:</Text>
        </View>
        <View style={Styles.statusUploadContainer}>
          <Image source={Loading} style={Styles.loadingimg}></Image>
          <Text style={Styles.uploadtxt}>Recording! Please wait.......</Text>
        </View>
        <View style={Styles.analyzebtn}>
          <TouchableOpacity style={Styles.loginBtn} onPress={onAnalyze}>
            <Text style={Styles.loginText}>Analyze EEG Data</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
const Styles = StyleSheet.create({
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
    margin: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  innerContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: "72%",
  },
  txt: {
    color: "#264CE3",
    fontSize: 17,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  uploadtxt: {
    color: "#264CE3",
    fontSize: 17,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  statusUploadContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-3%",
  },
  uploadbtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "8%",
    marginBottom: "5%",
  },
  analyzebtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "4%",
    marginBottom: "2%",
  },
  loginText: {
    color: "#FFFFFF",
  },

  uploadimg: { width: "50%", height: "250%", marginTop: "24%" },
  uploadimgdiv: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  selectfiles: {
    borderBottomWidth: 2,
  },
});
