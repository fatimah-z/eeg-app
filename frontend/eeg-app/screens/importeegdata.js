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
import Upload from "../assets/images/upload.png";
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
          <Image style={Styles.uploadimg} source={Upload}></Image>
        </View>

        {/* Cetered this.. */}
        <View style={Styles.dropdowndiv}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={Styles.dropdown}
          />
          <TouchableOpacity
            style={{
              borderWidth: 2,
              borderColor: "#000",
              padding: 10,
              marginTop: "5%",
            }}
          >
            <Text>Select file to upload</Text>
          </TouchableOpacity>
        </View>

        {/* another test line */}

        <View style={Styles.innerContainer}>
          <View style={Styles.uploadbtn}>
            <TouchableOpacity style={Styles.loginBtn}>
              <Text style={Styles.loginText}>Import EEG Data</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.statusContainer}>
          <Text style={Styles.txt}>Status:</Text>
        </View>
        <View style={Styles.statusContainer}>
          <Image source={Loading} style={Styles.loadingimg}></Image>
          <Text style={Styles.txt}>Uploading! Please wait.......</Text>
        </View>
        <View style={Styles.uploadbtn}>
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
   
  },
  txt: {
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
  uploadbtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop:"6%",
    marginBottom: "5%",
  },
  loginText: {
    color: "#FFFFFF",
  },
  dropdown: {
    // marginTop: "5%",
    // width: "50%",
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
