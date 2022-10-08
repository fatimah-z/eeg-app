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
import DateTimePicker from "@react-native-community/datetimepicker";

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";

export default function App({ navigation, route }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [head, setHead] = useState("");
  const [parental, setParental] = useState("");
  const [genatic, setGenatic] = useState("");
  const [genderIndex, setGenderIndex] = useState(0);
  const [headIndex, setHeadIndex] = useState(0);
  const [parentalIndex, setParentalIndex] = useState(0);
  const [geneticIndex, setGeneticIndex] = useState(0);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const onSubmit = () => {
    console.log(firstName);
    console.log(lastName);
    console.log(contact);
    console.log(gender);
    console.log(head);
    console.log(parental);
    console.log(genatic);
    console.log(genderIndex);
    console.log(headIndex);
    console.log(parentalIndex);
    console.log(geneticIndex);
    // console.log(route.params.sendEmail);
    console.log(date);

    // navigation.navigate("Home", {
    //   screen: "ImportData",
    //   params: {
    //     firstName: firstName,
    //     lastName: lastName,
    //     contact: contact,
    //     gender: gender,
    //     head: head,
    //     parental: parental,
    //     genatic: genatic,
    // email: route.params.sendEmail,
    //   },
    // });
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
        source={require("../assets/background.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View>
          <Text style={styles.appnametxt}>Patient History Form</Text>
        </View>
        <View style={styles.box}>
          <View style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.nameouttercontainer}>
              <View style={styles.namefields}>
                <TextInput
                  color="#FFFFFF"
                  placeholder="First Name"
                  placeholderTextColor="#000000"
                  onChangeText={(val) => setFirstName(val)}
                />
              </View>
              <View style={styles.namefields}>
                <TextInput
                  color="#FFFFFF"
                  placeholder="Last Name"
                  placeholderTextColor="#000000"
                  onChangeText={(val) => setLastName(val)}
                />
              </View>
            </View>
            <View style={styles.nameouttercontainer}>
              <View style={styles.namefields}>
                <TextInput
                  color="#FFFFFF"
                  placeholder="Contact Number"
                  placeholderTextColor="#000000"
                  onChangeText={(val) => setContact(val)}
                />
              </View>
            </View>

            <View style={styles.inputView}>
              <View style={styles.dropdowndiv}>
                <Text
                  style={styles.DOB}
                  onPress={() => setShowDatePicker(true)}
                >
                  Select DOB
                </Text>
                <View marginRight={"-15%"} marginTop={"4.7%"}>
                  {showDatePicker ? (
                    <DateTimePicker
                      value={date}
                      mode="date" // or date
                      onChange={(event, selectedDate) => {
                        setDate(selectedDate);
                        setShowDatePicker(false);
                      }}
                      on
                    />
                  ) : null}
                  <Text onPress={() => setShowDatePicker(true)}>
                    {date.toDateString()}
                  </Text>
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
                      buttonInnerColor={"#000"}
                      buttonOuterColor={"#000"}
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
                      labelStyle={{ fontSize: 15, color: "#000" }}
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
                      buttonInnerColor={"#000"}
                      buttonOuterColor={"#000"}
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
                      labelStyle={{ fontSize: 15, color: "#000" }}
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
                      buttonInnerColor={"#000"}
                      buttonOuterColor={"#000"}
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
                      labelStyle={{ fontSize: 15, color: "#000" }}
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
                      buttonInnerColor={"#000"}
                      buttonOuterColor={"#000"}
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
                      labelStyle={{ fontSize: 15, color: "#000" }}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                ))}
              </RadioForm>
            </View>

            <View style={styles.submitbtndiv}>
              <TouchableOpacity style={styles.loginBtn} onPress={onSubmit}>
                <Text style={styles.loginText}>Submit</Text>
              </TouchableOpacity>
            </View>
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
    borderColor: "#000000",
    borderBottomWidth: 1,
    color: "#000000",
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

    color: "#000000",
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
    color: "#000000",
    marginLeft: -15,
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
    marginTop:"25%",

    width: 400,
    color: "#000000",
  },

  namefields: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 10,
    borderColor: "#000000",
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
    marginBottom: "13%",
    backgroundColor: "#81E3CD",
  },
  nameouttercontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",

    marginLeft: "17%",
  },

  outterdiv: {
    backgroundColor: "#FCF1FB`",
    height: "100%",
  },
  loginText: {
    color: "#000000",
    fontWeight: "bold",
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
});
