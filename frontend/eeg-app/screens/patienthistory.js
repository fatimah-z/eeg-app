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

import { doc, setDoc } from "firebase/firestore";
import { db } from "../config";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { firebase } from "../configauth";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

export default function App({ navigation, route }) {
  console.log(
    "PARAMS: ",
    route.params
    // new Date(
    //   firebase.firestore.Timestamp.fromDate(route.params.dateOfBirth.date)
    // )
  );
  const useremail = firebase.auth().currentUser.email;
  const [name, setName] = useState(route?.params?.name ?? "");
  const [Email, setEmail] = useState(route?.params?.email ?? "");
  const [gender, setGender] = useState(route?.params?.gender ?? "");
  const [head, setHead] = useState(route?.params?.headInjury ?? "");
  const [parental, setParental] = useState(route?.params?.dengue ?? "");
  const [genatic, setGenatic] = useState(route?.params?.genaticInfluence ?? "");
  const [genderIndex, setGenderIndex] = useState(
    gender == "other" ? 2 : gender == "female" ? 1 : 0
  );
  const [headIndex, setHeadIndex] = useState(head == "no" ? 1 : 0);
  const [parentalIndex, setParentalIndex] = useState(parental == "no" ? 1 : 0);
  const [geneticIndex, setGeneticIndex] = useState(genatic == "no" ? 1 : 0);
  const [boolVal, setBoolval] = useState(false);
  const [date, setDate] = useState(
    route?.params?.dateOfBirth
      ? new Date(route?.params?.dateOfBirth.seconds * 1000)
      : new Date()
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const onSubmit = () => {
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (name == "") {
      alert("Please Fill All Fields");
      return;
    } else if (Email == "") {
      alert("Please Fill All Fields");
      return;
    } else if (regName.test(name)) {
      alert(" Please Enter Valid Name");
      return;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)) {
      alert("Please Enter Valid Email");
      return;
    }

    if (route.params.boolVar == true) {
      console.log("hello");
      setDoc(
        doc(db, "eegFiles", "name12345"),
        {
          patientData: {
            name: name,
            email: Email,
          },
        },
        { merge: true }
      );
      console.log("done");
    } else {
      navigation.navigate("importDataScreen", {
        name: name,
        email: Email,
        gender: gender,
        head: head,
        parental: parental,
        genatic: genatic,
        useremail: useremail,
        DOB: date,
      });
    }
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
        <View style={styles.header}>
          <Text style={{ fontSize: 20 }}>Patient History Form</Text>
        </View>

        <View style={styles.box}>
          <ScrollView>
            <View style={styles.container}>
              <StatusBar style="auto" />
              <View style={styles.nameouttercontainer}>
                <View style={styles.namefields}>
                  <TextInput
                    color="#000000"
                    value={name}
                    placeholder="Full Name"
                    cursorColor="grey"
                    placeholderTextColor="#808080"
                    onChangeText={(val) => setName(val)}
                  />
                </View>
              </View>
              <View style={styles.nameouttercontainer}>
                <View style={styles.namefields}>
                  <TextInput
                    color="#000000"
                    cursorColor="grey"
                    value={Email}
                    placeholder="Email"
                    placeholderTextColor="#808080"
                    onChangeText={(val) => setEmail(val)}
                  />
                </View>
              </View>

              <View style={styles.inputView}>
                <View style={styles.dropdowndiv}>
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={styles.DOB}
                  >
                    <Text>Select DOB{"  "}</Text>
                    <AntDesign name="calendar" size={20} color="black" />
                  </TouchableOpacity>
                  <View style={{ marginLeft: 10 }}>
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
                    <Text>{date?.toDateString()}</Text>
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
                        buttonSize={15}
                        buttonOuterSize={20}
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
                <Text style={styles.radioHeading}>Head Injury</Text>
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
                        buttonSize={15}
                        buttonOuterSize={20}
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
                <Text style={styles.radioHeading}>Contacted Dengue</Text>
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
                        buttonSize={15}
                        buttonOuterSize={20}
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
                        buttonSize={15}
                        buttonOuterSize={20}
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
          </ScrollView>
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
  header: {
    marginTop: 80,
    marginHorizontal: 20,
    height: "10%",
    backgroundColor: "#b3b3b350",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  inputView: {
    height: 45,
    marginVertical: "7%",
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
    flexDirection: "row",
    backgroundColor: "#ffffff80",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    color: "#000000",
  },
  submitbtndiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  radioHeading: {
    minHeight: 70,
    width: "25%",
    textAlign: "right",
    color: "#000000",
  },

  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
  },
  dropdowndiv: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    width: "30%",
  },
  appnametxt: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: "25%",
    marginLeft: -16,
    width: 400,
    color: "#000000",
  },

  namefields: {
    height: 50,
    flex: 1,
    padding: 5,
    width: "60%",
    borderColor: "grey",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginBtn: {
    width: "80%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  nameouttercontainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  outterdiv: {
    backgroundColor: "#FCF1FB`",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    fontWeight: "bold",
  },
  box: {
    backgroundColor: "#b3b3b350",
    borderRadius: 15,
    height: "75%",
    margin: 20,
    marginTop: "5%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
  },
});
