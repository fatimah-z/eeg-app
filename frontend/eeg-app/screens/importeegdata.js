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
import Tile from "../components/Tile";
import { AntDesign } from "@expo/vector-icons";

const ImportData = ({ route, navigation }) => {
  const email = firebase.auth().currentUser.email;
  const [selectedImage, setselectedImage] = useState(false);
  const [selectedFileName, setselectedFileName] = useState("");
  const [blobFile, setBlobFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setuploaded] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const [data, setData] = useState();
  useEffect(() => {
    setInterval(() => {
      setVisible(!visible);
    }, 2000);
    if (data) {
      setloading(false);
      navigation.navigate("ViewAnalysis", { resp_data: data });
    }
  }, [data]);

  const onAnalyze = async () => {
    setloading(true);
    try {
      const response = await fetch("http://192.168.43.137:4000/load", {
        method: "GET",
      });
      const resp = await response.json();
      console.log(resp.data);
      setData(resp.data);

      // await response.json().then((resp)=>{
      //   console.log(resp.data);
      //   setData(resp.data);
      // });
      console.log(data);
    } catch (error) {
    } finally {
      // if(data){
      // setloading(false);
      // navigation.navigate('ViewAnalysis',{resp_data:data});
      // }
    }
  };

  const openGallery = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (!result.cancelled) {
      setselectedImage(true);
      setselectedFileName(result.name);
      const r = await fetch(result.uri);
      r.blob().then((b) => {
        setBlobFile(b);
      });
    }
  };
  const uploadFile = () => {
    setUploading(true);
    if (!blobFile) return;

    const sotrageRef = ref(storage, `testFiles/${selectedFileName}`);

    uploadBytesResumable(sotrageRef, blobFile).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((downloadURL) => {
          console.log("step3");
          setDoc(doc(db, "eegFiles", selectedFileName), {
            fileDownloadURL: downloadURL,
            name: selectedFileName,
            uploadedAt: Timestamp.fromDate(new Date()),
            useremail: email,
            patientData: {
              name: route.params.name,
              contact: route.params.contact,
            },
          })
            .then(() => {
              console.log("step4");
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
        <View style={Styles.header}>
          <Text style={{ fontSize: 20 }}>Upload Data</Text>
        </View>
        <View style={Styles.box}>
          {/* <View style={Styles.uploadimgdiv}>
          <Image style={Styles.uploadimg} source={Upload}></Image>
        </View> */}

          {/* Cetered this.. */}

          <View style={Styles.galleryContainer}>
            <Text style={{ marginBottom: 10 }}>Pick your file to upload</Text>

            <Tile
              onPress={openGallery}
              text="Open Gallery"
              icon={<AntDesign name="addfile" size={24} color="black" />}
            />

            {selectedImage ? (
              <View style={{ ...Styles.row, marginTop: 10 }}>
                <Text style={Styles.txt}>{selectedFileName}</Text>
              </View>
            ) : null}
          </View>
          <TouchableOpacity
            style={{ ...Styles.loginBtn, marginTop: 20 }}
            onPress={uploadFile}
          >
            <Text style={Styles.loginText}>Upload</Text>
          </TouchableOpacity>

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
          <View>
            {loading ? (
              <View>
                <AnimatedLoader
                  visible={visible}
                  overlayColor="rgba(255,255,255,0.75)"
                  animationStyle={Styles.lottie}
                  speed={1}
                >
                  <Text style={Styles.txt}>Loading</Text>
                </AnimatedLoader>
              </View>
            ) : (
              <TouchableOpacity style={Styles.loginBtn} onPress={onAnalyze}>
                <Text style={Styles.loginText}>View Analysis</Text>
              </TouchableOpacity>
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
  loadingimg: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginText: {
    color: "#000000",
    fontWeight: "bold",
  },
  loginBtn: {
    width: 200,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
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
    backgroundColor: "#b3b3b350",
    borderRadius: 15,
    height: "70%",
    margin: 20,
    marginTop: "5%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
  },
  header: {
    marginTop: 100,
    marginHorizontal: 20,
    height: "10%",
    backgroundColor: "#b3b3b350",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  appnametxt: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: "25%",
    width: 400,
    color: "#000000",
    marginLeft: -16,
  },
  uploadbtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "6%",
    marginBottom: "5%",
  },
  galleryContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  uploadContainer: {
    marginTop: 10,
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
