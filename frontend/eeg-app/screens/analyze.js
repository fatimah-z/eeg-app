import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from 'react';
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
import EEGData from "../assets/images/EEGdata.png";
import Background from "../assets/images/background.png";
import Done from "../assets/images/done.png";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'
import { Dimensions } from 'react-native';

export default function App({ navigation }) {
  const[data,setdata] = useState({});
  const[firstarr,setfirstarr] = useState([]);
  const [x,setx] = useState([]);
  const [y,sety] = useState([]);
  const[secondarr,setsecondarr] = useState([]);
  const[loading,setisloading] = useState(true);
  const[arr,setarr]= useState([1,2,3])

  useEffect(()=>{
    
  },[]);
  const onAnalyze = () => {
    navigation.navigate("Analyze");
  };
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "CSV", value: "csv" },
    { label: "TXT", value: "txt" },
  ]);
  const view = async ()=>{
    try{
      const response = await fetch('http://192.168.100.171:3000/view',{method:'GET'});
      const resp = await  response.json();
      setdata(resp);
      setfirstarr(resp[0].arr1);
      console.log(firstarr);
      setsecondarr(resp[1].arr2);
     
      console.log(secondarr); 
      // console.log(resp[0].arr1);
      
    }
    catch(error){

    }
    finally{
     
      setisloading(false);
      
    }
  };
  return (
    <View style={Styles.container}>
      {/* <ImageBackground
        source={Background}
        resizeMode="cover"
        style={Styles.image}
      >
        <View style={Styles.eegimgdiv}>
          <Image style={Styles.eegdataimg} source={EEGData}></Image>
        </View>

       

        <View style={Styles.innerContainer}>
          <View style={Styles.statusContainer}>
            <Text style={Styles.txt}>Status:</Text>
          </View>
          <View style={Styles.statusUploadContainer}>
            <Image source={Done} style={Styles.doneimg}></Image>
            <Text style={Styles.uploadtxt}>EEG Data Analyzed</Text>
          </View>
          <View style={Styles.analyzebtn}>
            <TouchableOpacity style={Styles.loginBtn} onPress={onAnalyze}>
              <Text style={Styles.loginText}>Analyze EEG Data</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground> */}

<Button
      title='show eeg signals'
      onPress={()=>view()}
      />

      { !loading && secondarr!=null && firstarr!=null && x!=null && y!=null? ( 
   
    <LineChart 
    data={{
      labels: firstarr.map(element=>
        Math.round(element*100)/100
      ),
      datasets: [{
        data: secondarr.map(element=>
          element/Math.pow(10,-11)
        )
      }]
    }}
    width={Dimensions.get('window').width} // from react-native
    height={500}
    chartConfig={{
      backgroundColor: '#F6DDCC',
      backgroundGradientFrom: '#E74C3C  ',
      backgroundGradientTo: '#EC7063',
      //decimalPlaces: 1, // optional, defaults to 2dp
      withDots:false,
      strokeWidth:2,
      withInnerLines:false,
      withOuterLines:false,
      xLabelsOffset: 10,
      withVerticalLines:false,
      withHorizontalLines: false,
      horizontalLabelRotation:30,
      verticalLabelRotation:30,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    style={{
      margin:20,
      marginVertical: 8,
      borderRadius: 16,
      flex:1
    }}
  />


      ):<Text>loading data....</Text>}
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
  doneimg: {
    flexDirection: "row",
    alignItems: "center",
    margin: "1%",
    width: "13%",
    height: "180%",
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
    marginTop: "72%",
  },
  txt: {
    color: "#264CE3",
    fontSize: 17,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  uploadtxt: {
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
  statusUploadContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "3%",
  },

  analyzebtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "9%",
  },
  loginText: {
    color: "#FFFFFF",
  },

  eegdataimg: { width: "109%", height: "300%", marginTop: "24%" },
  eegimgdiv: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  selectfiles: {
    borderBottomWidth: 2,
  },
});
