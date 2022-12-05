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
import DropDownPicker from "react-native-dropdown-picker";
import EEGData from "../assets/images/EEGdata.png";
import Background from "../assets/images/background.png";
import Done from "../assets/images/done.png";
import graph from "../../../backend/graph.png";
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph,
//   StackedBarChart,
// } from "react-native-chart-kit";
// import { Dimensions } from "react-native";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default function App({ navigation }) {
  const [data, setdata] = useState({});
  const [firstarr, setfirstarr] = useState([]);
  const [x, setx] = useState([]);
  const [y, sety] = useState([]);
  const [secondarr, setsecondarr] = useState([]);
  const [loading, setisloading] = useState(true);
  const [arr, setarr] = useState([1, 2, 3]);
  let eegdata =[];

  useEffect(()=>{

  },[])

  const onAnalyze = () => {
    navigation.navigate("Classify");
  };
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "CSV", value: "csv" },
    { label: "TXT", value: "txt" },
  ]);

  const view = async () => {
    try {
      const response = await fetch("http://192.168.0.103:4000/view", {
        method: "GET",
      });
      const resp = await response.json();
      console.log(resp);
      setdata(resp);
      setfirstarr(resp.arr1);
      console.log(firstarr);
      setsecondarr(resp.arr2);
      console.log(secondarr);

    } catch (error) {
    } finally {
      if(firstarr.length>0 && secondarr.length>0){

        loaddata();
      }
      setisloading(false);
    }
  };
  
  const cl = async ()=>{
    try{

      const response = await fetch("http://127.0.0.1:4000/load", {
        method: "GET",
      });
      const resp = await response.json();
      console.log("helloooooo11");
      console.log(resp);

    }catch (error) {

    }
  }

  const test1 = [['data1','data2'],['data3','data4'],['data5','data6']];
  const test2 = [1,2]
  const loaddata = ()=>{
    let index_num=0;
    for(let i=0;i<firstarr.length;i++){
      var one_channel =[];
      for(let j=0;j<firstarr[i].length;j++){
        one_channel[j]={'data':firstarr[i][j]/Math.pow(10, -11),'time':secondarr[j]}
        index_num++;
      }
      eegdata.push(one_channel);
    }
    // firstarr.map(function(element,index){
    //   element.forEach((el,index1) => {
    //       eegdata[index1]= {
    //       'data': el,
    //       'time' : secondarr[index1]
    //     };
    //   });
    // });
    console.log("eegd"+eegdata[0][0].time+" "+eegdata[0][0].data);
    console.table(eegdata);
  };
  return (
    <View style={Styles.container}>
      
      {/* <View style={Styles.eegimgdiv}>

      <Image source={graph}></Image>
      </View> */}
     
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={Styles.image}
      >
        <View style={Styles.eegimgdiv}>
          <Image style={Styles.eegdataimg} source={graph}></Image>
        </View>

        <View style={Styles.innerContainer}>
          <View style={Styles.statusContainer}>
            <Text style={Styles.uploadtxt}>Status:</Text>
          </View>
          <View style={Styles.statusUploadContainer}>
            <Image source={Done} style={Styles.doneimg}></Image>
            <Text style={Styles.uploadtxt}>EEG Data Analyzed</Text>
          </View>
          <View style={Styles.analyzebtn}>
            <TouchableOpacity style={Styles.loginBtn} onPress={onAnalyze}>
              <Text style={Styles.loginText}>Classify EEG Data</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

{/* ----------------graph using line chart----------------------------------------------------------- */}
      {/* <Button title="show eeg signals" onPress={() => view()} />

      {!loading &&
      secondarr != null &&
      firstarr != null &&
      x != null &&
      y != null ? (
        <LineChart
          data={{
            labels: firstarr.map((element) => Math.round(element * 100) / 100),
            datasets: [
              {
                data: secondarr.map((element) => element / Math.pow(10, -11)),
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={500}
          chartConfig={{
            backgroundColor: "#F6DDCC",
            backgroundGradientFrom: "#E74C3C  ",
            backgroundGradientTo: "#EC7063",
            //decimalPlaces: 1, // optional, defaults to 2dp
            withDots: false,
            strokeWidth: 2,
            withInnerLines: false,
            withOuterLines: false,
            xLabelsOffset: 10,
            withVerticalLines: false,
            withHorizontalLines: false,
            horizontalLabelRotation: 30,
            verticalLabelRotation: 30,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            margin: 20,
            marginVertical: 8,
            borderRadius: 16,
            flex: 1,
          }}
          
        />
      ) : (
        <Text>loading data....</Text>
      )} */}
{/* ---------------------------------------------------------------------------------------------------- */}
<Button title="show eeg signals" onPress={() => view()} />
{/* {!loading &&
secondarr != null &&
firstarr != null 
?(
<LineChart
      width={1000}
      height={500}
      data={
      eegdata[0]
    }
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line data={eegdata[0]} type="monotone" dataKey="data" stroke="#C13324" />
      
      {eegdata.map(function(element,index){
        return <Line data={element} key={index} type="monotone" dataKey="data" stroke="#C13324" activeDot={{ r: 8 }} />
      })}
    </LineChart>):(
      <Text>loading data....</Text>
    )
} */}
  
    
      <TouchableOpacity style={Styles.loginBtn} onPress={()=>cl()}>
              <Text style={Styles.loginText}>Classify EEG Data</Text>
      </TouchableOpacity>
    </View>
  );
}
const Styles = StyleSheet.create({
  loginBtn: {
    width: "80%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
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
  
  uploadtxt: {
    color: "#FFFFFF",
    fontSize: 17,

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

  eegdataimg: { width: "100%", height: "300%", marginTop: "24%" },
  eegimgdiv: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  selectfiles: {
    borderBottomWidth: 2,
  },
});
