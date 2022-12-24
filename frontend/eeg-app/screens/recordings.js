// import { ref } from "firebase/storage";
import React, { useState, useEffect } from "react";
import { View,Text,StyleSheet ,TouchableOpacity,FlatList,Button,ImageBackground,Pressable} from "react-native";
import { db, storage } from "../config";
import {firebase} from "../firebase";
import { getStorage, ref, listAll,getDownloadURL,getBlob } from "firebase/storage";
import Background from "../assets/background.jpg";
import AnimatedLoader from "react-native-animated-loader";
import axios from "axios";

export default function App({navigation,route}){
  
  const Item = ({ title,url }) => (
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
              <View style={{ flex: 1, padding:5}}>
                <Text style={{fontWeight:"bold" }}>{title}</Text>
              </View>
              <View>
              <Pressable
              onPress={()=>{onAnalyze(title,url)}}
              >
               <Text style={{ color: "#557C74" }}>Generate Report</Text> 
              </Pressable>
              </View>
    {/* <TouchableOpacity>
      <Text style={Styles.Details}>{title}</Text>
      <TouchableOpacity 
        onPress={()=>{onAnalyze(title)}}
        style={Styles.loginBtn}
       >
        <Text>Generate Report</Text>
       </TouchableOpacity>
    </TouchableOpacity> */}
    </View>
  );
  const renderItem = ({ item }) => (
    <Item title={item.title} url={item.url} />
  );
    const[items,setitems]= useState([]);
    const [data, setData] = useState();
    const [visible, setVisible] = useState(false);
    const [loading, setloading] = useState(false);
    const [filename,setfilename] = useState();

    const onAnalyze = async (filename,url) => {
      setloading(true);
      setfilename(filename);
      try {
        const response = await fetch("http://192.168.43.137:4000/rawDataModel", {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({"filename":filename,"url":url})
        });
        const resp = await response.json();
        console.log(resp.data);
        setData(resp.data);
        console.log(data);
      } catch (error) {
        alert(error)
      } finally {
        setloading(false);
        if (data) {
          // setloading(false);
          navigation.navigate("SecondReportScreen", { resp_data:data,filename:filename });
        }
      }
    };
    useEffect(()=>{
      // setloading(true);
      setInterval(() => {
        setVisible(!visible);
      }, 2000);
      const files=[];
      const storageref= ref(storage,'recordedFiles/')
      listAll(storageref)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url)=>{
        // url=url
        // console.log(url)
        files.push({
          id: itemRef.fullPath,
          title: itemRef.name,
          url:url
        });
        });
        setitems(files);
        // if(items){
        //     setloading(false);
        //   }
    });
  });
  },[data]);

    return(
        <View style={Styles.container}>
          <ImageBackground
        source={Background}
        resizeMode="cover"
        style={Styles.image}
      >
            <View style={Styles.header}>
                <Text style={{ fontSize: 20 }}>
                    Recorded Files
                </Text>
            </View>
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

            // <View style={Styles.box}>
            <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
          // </View>
            )}
            </ImageBackground>
          </View>
    )
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        color: "grey",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        borderRadius: 5,
      },
      header: {
        marginTop: 50,
        marginHorizontal: 20,
        height: "10%",
        backgroundColor: "#b3b3b350",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        // width: "80%"
      },
      box: {
        backgroundColor: "#b3b3b350",
        borderRadius: 15,
        height: "70%",
        // width: "80%",
        margin: 20,
        marginTop: "5%",
        alignItems: "center",
        justifyContent: "center",
        overflow: "scroll",
      },
      image: {
        height: "100%",
        width: "100%",
      },
      loginBtn: {
        width: "80%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
      },
      Details:{
        fontWeight:"bold",
        fontSize:15,
        marginTop:15,
      },
      lottie: {
        width: 100,
        height: 100,
      },
})