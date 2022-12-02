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
import Background from "../assets/login.jpg";
import axios from "axios";
const patientData = () => {
  const eegFilesRef = firebase.firestore().collection("eegFiles");
  const [files, setFiles] = useState(null);
  const [donwloading, setDownloading] = useState(false);
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    eegFilesRef.get().then((result) => {
      const allFiles = [];
      result.forEach((file) => {
        allFiles.push(file.data());
      });
      setFiles(allFiles);
    });
  }, []);
  const onSelect = () => {};

  const handleFile = (url, name) => {
    setDownloading(true);
    axios
      .get(url, { responseType: "blob" })
      .then((res) => {
        setDownloading(false);
        const downloadedFile = new File([res.data], name);
        // console.log(url);
        // const formData = new FormData();
        // formData.append("file", downloadedFile);

        axios({
          method: "POST",
          url: `http://192.168.0.104:4000/uploadFile`,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: downloadedFile,
        })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });

        // axios
        //   .post("http://192.168.0.104:4000/uploadFile", formData)
        //   .then((res) => {
        //     alert(res);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      })
      .catch((err) => {
        setDownloading(false);
        alert(err);
      });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleFile(item.fileDownloadURL, item.name)}
    >
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <View>
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
          keyExtractor={(item, index) => index}
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
                <Text>{item.name}</Text>
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
                  onPress={() => handleFile(item.fileDownloadURL, item.name)}
                >
                  <Text style={{ color: "grey" }}>Select</Text>
                </Pressable>
              </View>
            </View>
          )}
        ></FlatList>
      </ImageBackground>
    </View>
    // <View style={{ alignItems: "center", justifyContent: "center" }}>
    //   <FlatList data={files} renderItem={renderItem}></FlatList>
    //   <Button title="Upload" onPress={onSelect}></Button>
    //   {donwloading ? <Text>Downloading</Text> : null}
    // </View>
  );
};
export default patientData;
