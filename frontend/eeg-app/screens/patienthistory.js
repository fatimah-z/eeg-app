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

import Background from "../assets/images/background.png";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

export default function App({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [head, setHead] = useState("");
  const [parental, setParental] = useState("");
  const [genatic, setGenatic] = useState("");
  const [genderIndex, setGenderIndex] = useState(0);
  const [headIndex, setHeadIndex] = useState(0);
  const [parentalIndex, setParentalIndex] = useState(0);
  const [geneticIndex, setGeneticIndex] = useState(0);
  const onSubmit = () => {
    navigation.navigate("ReportGeneration");
  };
  var radio_props = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];
  var radio_propshead = [
    { label: "Yes", value: "yes" },
    { label: "NO", value: "no" },
  ];
  var radio_propsparental = [
    { label: "Yes", value: "yes" },
    { label: "NO", value: "no" },
  ];
  var radio_propsgenetic = [
    { label: "Yes", value: "yes" },
    { label: "NO", value: "no" },
  ];
  var RadioButtonProject = (React.createClass = () => {
    return (value = 0);
  });

  const handleGenderOnPress = (val) => {
    setGender(val);
    switch (val) {
      case "male":
        setGenderIndex(0);
        break;
      case "female":
        setGenderIndex(1);
        break;
      case "other":
        setGenderIndex(2);
        break;
      default:
        break;
    }
    console.log(val);
  };
  const handleHeadTraumaOnPress = (val) => {
    setHead(val);
    switch (val) {
      case "yes":
        setHeadIndex(0);
        break;
      case "no":
        setHeadIndex(1);
        break;

      default:
        break;
    }
    console.log(val);
  };
  const handleParentalInjuryOnPress = (val) => {
    setParental(val);
    switch (val) {
      case "yes":
        setParentalIndex(0);
        break;
      case "no":
        setParentalIndex(1);
        break;

      default:
        break;
    }
    console.log(val);
  };
  const handleGeneticInfluenceOnPress = (val) => {
    setGenatic(val);
    switch (val) {
      case "yes":
        setGeneticIndex(0);
        break;
      case "no":
        setGeneticIndex(1);
        break;

      default:
        break;
    }
    console.log(val);
  };

  return (
    <View style={styles.outterdiv}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={styles.image}
      >
        <View>
          <Text style={styles.appnametxt}>Patient History Form</Text>
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
          <View style={styles.nameouttercontainer}>
            <View style={styles.namefields}>
              <TextInput
                color="#FFFFFF"
                placeholder="Contact Number"
                placeholderTextColor="#FFFFFF"
                onChangeText={(email) => setEmail(email)}
              />
            </View>
          </View>

          <View style={styles.inputView}>
            <View style={styles.dropdowndiv}>
              <Text style={styles.DOB}>Select DOB</Text>
              <View marginRight={"-15%"}>
                
              </View>
            </View>
          </View>
          <View style={styles.radio}>
            <Text style={styles.radioHeading}>Gender</Text>
            <RadioForm formHorizontal={true}>
              {radio_props.map((obj, i) => (
                <RadioButton labelHorizontal={true} key={i}>
                  {/*  You can set RadioButtonLabel before RadioButtonInput */}
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={genderIndex === i}
                    onPress={handleGenderOnPress}
                    borderWidth={1}
                    buttonInnerColor={"#fff"}
                    buttonOuterColor={"#fff"}
                    buttonSize={20}
                    buttonOuterSize={30}
                    buttonStyle={{}}
                    buttonWrapStyle={{ marginLeft: 10 }}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={handleGenderOnPress}
                    labelStyle={{ fontSize: 15, color: "#fff" }}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              ))}
            </RadioForm>
          </View>
          <View style={styles.radio}>
            <Text style={styles.radioHeading}>Head trauma</Text>
            <RadioForm formHorizontal={true}>
              {radio_propshead.map((obj, i) => (
                <RadioButton labelHorizontal={true} key={i}>
                  {/*  You can set RadioButtonLabel before RadioButtonInput */}
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={headIndex === i}
                    onPress={handleHeadTraumaOnPress}
                    borderWidth={1}
                    buttonInnerColor={"#fff"}
                    buttonOuterColor={"#fff"}
                    buttonSize={20}
                    buttonOuterSize={30}
                    buttonStyle={{}}
                    buttonWrapStyle={{ marginLeft: 10 }}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={handleHeadTraumaOnPress}
                    labelStyle={{ fontSize: 15, color: "#fff" }}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              ))}
            </RadioForm>
          </View>
          <View style={styles.radio}>
            <Text style={styles.radioHeading}>Prental injury</Text>
            <RadioForm formHorizontal={true}>
              {radio_propsgenetic.map((obj, i) => (
                <RadioButton labelHorizontal={true} key={i}>
                  {/*  You can set RadioButtonLabel before RadioButtonInput */}
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={parentalIndex === i}
                    onPress={handleParentalInjuryOnPress}
                    borderWidth={1}
                    buttonInnerColor={"#fff"}
                    buttonOuterColor={"#fff"}
                    buttonSize={20}
                    buttonOuterSize={30}
                    buttonStyle={{}}
                    buttonWrapStyle={{ marginLeft: 10 }}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={handleGenderOnPress}
                    labelStyle={{ fontSize: 15, color: "#fff" }}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              ))}
            </RadioForm>
          </View>
          <View style={styles.radio}>
            <Text style={styles.radioHeading}>Genetic Influece</Text>
            <RadioForm formHorizontal={true}>
              {radio_propsgenetic.map((obj, i) => (
                <RadioButton labelHorizontal={true} key={i}>
                  {/*  You can set RadioButtonLabel before RadioButtonInput */}
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={geneticIndex === i}
                    onPress={handleGeneticInfluenceOnPress}
                    borderWidth={1}
                    buttonInnerColor={"#fff"}
                    buttonOuterColor={"#fff"}
                    buttonSize={20}
                    buttonOuterSize={30}
                    buttonStyle={{}}
                    buttonWrapStyle={{ marginLeft: 10 }}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={handleGeneticInfluenceOnPress}
                    labelStyle={{ fontSize: 15, color: "#fff" }}
                    labelWrapStyle={{}}
                  />
                </RadioButton>
              ))}
            </RadioForm>
          </View>
          <View style={styles.nameouttercontainer}>
            <View style={styles.namefields}>
              <TextInput
                color="#FFFFFF"
                placeholder="Medical History"
                placeholderTextColor="#FFFFFF"
                onChangeText={(email) => setEmail(email)}
                multiline
              />
            </View>
          </View>
          <View style={styles.submitbtndiv}>
            <TouchableOpacity style={styles.loginBtn} onPress={onSubmit}>
              <Text style={styles.loginText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 60,
  },

  inputView: {
    width: "70%",
    height: 45,
    marginTop: "7%",
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
  radio: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    // justifyContent: "center",
  },
  DOB: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: "30%",
    marginTop: "1%",

    color: "#FFFFFF",
  },
  submitbtndiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  radioHeading: {
    height: 70,
    padding: 10,
    width: "25%",
    textAlign: "right",
    color: "#FFFFFF",
  },

  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
  },
  dropdowndiv: {
    flexDirection: "row",
    width: "100%",
    marginTop: "-3%",
  },
  dropdown: {
    width: "30%",
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

  namefields: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 10,
    borderColor: "#FFFFFF",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
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
  nameouttercontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",

    marginLeft: "24%",
  },

  outterdiv: {
    backgroundColor: "#FCF1FB`",
    height: "100%",
  },
  loginText: {
    color: "#FFFFFF",
  },
});
