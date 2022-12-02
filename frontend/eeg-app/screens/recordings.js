// import { ref } from "firebase/storage";
import React, { useState, useEffect } from "react";
import { View,Text,StyleSheet ,TouchableOpacity,FlatList,Button,ImageBackground} from "react-native";
import { db, storage } from "../config";
import {firebase} from "../firebase";
import { getStorage, ref, listAll } from "firebase/storage";
import Background from "../assets/background.jpg";

export default function App({navigation,route}){
  
  const DATA = [
    {
      id:'1',
      title:'rawdata.csv'
    },
    {
      id:'2',
      title:'patient1.csv'
    },
    {
      id:'3',
      title:'patient2.csv'
    }
  ]
  
  const Item = ({ title }) => (
    <TouchableOpacity>
      <Text>{title}</Text>
      <Button title="Generate Report"
      //  onPress={onAnalyze}
       />
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
    const[items,setitems]= useState();
    const [data, setData] = useState();
    const onAnalyze = async () => {
      // setloading(true);
      try {
        const response = await fetch("http://192.168.43.137:4000/rawDataModel", {
          method: "GET",
        });
        const resp = await response.json();
        console.log(resp.data);
        setData(resp.data);
        console.log(data);
      } catch (error) {
      } finally {
        // if(data){
        // setloading(false);
        // navigation.navigate('ViewAnalysis',{resp_data:data});
        // }
      }
    };
    const getFiles=()=>{
        const storageref= ref(storage,'recordedFiles/')
        listAll(storageref)
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
    });
    res.items.forEach((itemRef) => {
      // All the items under listRef.
    });
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });
        
    }
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
            <View style={Styles.box}>
            <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
          </View>
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
})