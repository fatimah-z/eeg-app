import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
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
import { firebase } from "../configauth";
import db from "../config";
import Background from "../assets/login.jpg";
import axios from "axios";
import { collection, query, where, getDocs } from "firebase/firestore";

const PatientData = ({ route, navigation }) => {
  const eegFilesRef = firebase.firestore();
  const q = query(
    collection(eegFilesRef, "eegFiles"),
    where("patientData.email", "==", route.params.email)
  );
  const [files, setFiles] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const [filename, setfilename] = useState();
  const[data,setData] = useState();
  
  useEffect(() => {
    setInterval(() => {
      setVisible(!visible);
    }, 2000);
    if (data) {
    setloading(false);
    navigation.navigate("ViewAnalysis", {resp_data: data,filename:filename,pname:route.params.name});
    // route.params.name
    }
    async function fetchData() {
      const querySnapshot = await getDocs(q);
      const allFiles = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id);
        allFiles.push(doc.id);
      });
      setFiles(allFiles);
    }
      // setFiles(allFiles);
      fetchData();
    
}, [data]);
  
      // eegFilesRef.get().then((result) => {
      //   const allFiles = [];
      //   result.forEach((file) => {
      //     allFiles.push(file.data());
      //   });
      //   setFiles(allFiles);
      // });
  const onSelect = () => {};

  const handleFile = (name) => {
    setfilename(name)
    console.log(name);
    axios
      // .post(`http://192.168.0.103:4000/uploadFile`, { url, name })
      .post(`http://192.168.133.199:4000/load`,{name:name})
      .then((res) => {
        // setDownloading(false);
        // const downloadedFile = new File([res.data], name);
        // console.log(url);
        // const formData = new FormData();
        // formData.append("file", downloadedFile);

        // axios({
        //   method: "POST",
        //   url: `http://192.168.43.137/uploadFile`,
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        //   data: downloadedFile,
        // })
        //   .then((res) => {
        //     console.log(res.data);
        //     setData(res.data);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });

        // axios
        //   .post("http://192.168.0.104:4000/uploadFile", formData)
        //   .then((res) => {
        //     alert(res);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
        console.log(res.data.data);
        setData(res.data.data)
      })
      .catch((err) => {
        setDownloading(false);
        alert(err);
        console.log(err);
      });
  };

  // const renderItem = ({ item }) => (
  //   <TouchableOpacity
  //     onPress={() => handleFile(item.fileDownloadURL, item.name)}
  //   >
  //     <Text>{item.name}</Text>
  //   </TouchableOpacity>
  // );
  return (
    <View>
      {loading?(
        <View>
        <AnimatedLoader
          source= {require("../assets/96898-loader-animation.json")}
          visible={visible}
          overlayColor="rgba(255,255,255,0.75)"
          animationStyle={Styles.lottie}
          speed={1}
        >
          <Text style={Styles.txt}>Loading</Text>
        </AnimatedLoader>
      </View>
      ):(
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            marginTop: 50,
            marginHorizontal: 20,
            height: "10%",
            backgroundColor: "#b3b3b350",
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>Patient Data</Text>
        </View>
        <FlatList
          style={{ marginTop: 20 }}
          data={files}
          numColumns={1}
          // keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <View
              style={{
                padding: 10,
                backgroundColor: "#c3c3c350",
                marginVertical: 10,
                marginHorizontal: 20,
                borderRadius: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 3 }}>
                <Text>{item}</Text>
                {downloading && <Text>Downloading...</Text>}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Pressable
                  onPress={() => handleFile(item)}
                >
                  <Text style={{ color: "grey" }}>Select</Text>
                </Pressable>
              </View>
            </View>
          )}
        ></FlatList>
      </ImageBackground>
      )}
    </View>
    // <View style={{ alignItems: "center", justifyContent: "center" }}>
    //   <FlatList data={files} renderItem={renderItem}></FlatList>
    //   <Button title="Upload" onPress={onSelect}></Button>
    //   {donwloading ? <Text>Downloading</Text> : null}
    // </View>
  );
};
export default PatientData;

const Styles = StyleSheet.create({
  txt: {
    fontWeight: "bold",
    marginBottom: "3%",
  },
  lottie: {
    width: 100,
    height: 100,
  },
});