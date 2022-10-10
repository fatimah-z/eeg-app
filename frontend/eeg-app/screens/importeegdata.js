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
import AnimatedLoader from "react-native-animated-loader";
// import DropDownPicker from "react-native-dropdown-picker";
// import Record from "../assets/images/record.png";
import Background from "../assets/background.jpg";
// import Loading from "../assets/images/loading.png";
import * as DocumentPicker from "expo-document-picker";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../config";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { firebase } from "../configauth";

const ImportData = ({ route, navigation }) => {
  const email = firebase.auth().currentUser.email;
  const [selectedImage, setselectedImage] = useState(false);
  const [selectedFileName, setselectedFileName] = useState("");
  const [blobFile, setBlobFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setuploaded] = useState("");
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setInterval(() => {
      setVisible(!visible);
    }, 2000);
  }, []);

  const openGallery = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (!result.cancelled) {
      setselectedImage(true);
      setselectedFileName(result.name);
      const r = await fetch(result.uri);
      const b = await r.blob(); // blob is the format in which we upload files
      setBlobFile(b);
    }
  };
  const uploadFile = (blobFile) => {
    setUploading(true);
    if (!blobFile) return;

    const sotrageRef = ref(storage, `testFiles/${selectedFileName}`); // ye line miss thi

    uploadBytesResumable(sotrageRef, blobFile).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((downloadURL) => {
          setDoc(doc(db, "eegFiles", selectedFileName), {
            fileDownloadURL: downloadURL,
            name: selectedFileName,
            uploadedAt: Timestamp.fromDate(new Date()),
            useremail: email,
            patientData: {
              firstName: route.params.firstName,
              lastName: route.params.lastName,
              contact: route.params.contact,
            },
          })
            .then(() => {
              setUploading(false);
              setuploaded("File Uploaded");
              return downloadURL;
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          setUploading(false);
        });
    });
  };
  return (
    <View style={Styles.container}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={Styles.image}
      >
        <View>
          <Text style={Styles.appnametxt}>Upload Data</Text>
        </View>
        <View style={Styles.box}>
          {/* <View style={Styles.uploadimgdiv}>
          <Image style={Styles.uploadimg} source={Upload}></Image>
        </View> */}

          {/* Cetered this.. */}

          <View style={Styles.galleryContainer}>
            <View style={Styles.row}>
              <Text style={Styles.text}>Pick your file to upload</Text>
            </View>
            <View style={Styles.submitbtndiv}>
              <TouchableOpacity style={Styles.loginBtn} onPress={openGallery}>
                <Text style={Styles.loginText}>Open Gallery</Text>
              </TouchableOpacity>
            </View>

            {selectedImage ? (
              <View style={Styles.row}>
                <Text style={Styles.txt}>{selectedFileName}</Text>
              </View>
            ) : null}
          </View>
          <View style={Styles.uploadContainer}>
            <View style={Styles.row}>
              <Text style={Styles.text}>Upload File</Text>
            </View>
            <View style={Styles.submitbtndiv}>
              <TouchableOpacity style={Styles.loginBtn} onPress={uploadFile}>
                <Text style={Styles.loginText}>Upload</Text>
              </TouchableOpacity>
            </View>

            {uploading ? (
              <View>
                <AnimatedLoader
                  visible={visible}
                  overlayColor="rgba(255,255,255,0.75)"
                  animationStyle={Styles.lottie}
                  speed={1}
                >
                  <Text style={Styles.txt}>File Uploading</Text>
                </AnimatedLoader>
              </View>
            ) : (
              <View style={Styles.row}>
                <Text style={Styles.txt}>{uploaded}</Text>
              </View>
            )}
          </View>
          <StatusBar style="auto" />

          {/* another test line */}
        </View>
      </ImageBackground>
    </View>
  );
};
export default ImportData;
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
