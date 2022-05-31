import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Stack } from "react-native";
import { Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import Navigator from "./stack/appstack";
import { accessToken, login, refreshToken } from "./auth/auth";
import "react-native-gesture-handler";
import { isLoggedIn } from "react-native-axios-jwt";
import SignupScreen from "./screens/signup";
import LoginScreen from "./screens/login";
import DataImportScreen from "./screens/dataimportoptions";
import HeadsetScreen from "./screens/connectheadset";
import ImportScreen from "./screens/importeegdata";
import UploadScreen from "./screens/uploadeeg";
import AnalyzeScreen from "./screens/analyze";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "./auth/authContext";

// const show = ()=>{
//   console.log('button clicked');
//   fetch('http://192.168.43.137:3000/view',{method:'GET'})
//   .then((response)=>response.json())
//   .then((response)=>{
//     setdata(response);
//     console.log(data);
//   });
// };
export default function App() {
  const [data, setdata] = useState({});
  const [firstarr, setfirstarr] = useState([]);
  const [x, setx] = useState([]);
  const [y, sety] = useState([]);
  const [secondarr, setsecondarr] = useState([]);
  const [loading, setisloading] = useState(true);
  const [arr, setarr] = useState([1, 2, 3]);
  const Stack = createStackNavigator();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    isLoggedIn().then((status) => {
      setSignedIn(status);
    });
  }, []);
  const show = async () => {
    // console.log('button clicked');
    await fetch("http://192.168.100.171:3000/view", { method: "GET" })
      .then((response) => response.json())
      .then((response) => {
        setdata(response);
        setfirstarr(response[0].arr1);
        console.log(firstarr);
        setsecondarr(response[1].arr2);

        console.log(secondarr);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setisloading(false);
      });
  };
  const view = async () => {
    try {
      const response = await fetch("http://192.168.100.171:3000/view", {
        method: "GET",
      });
      const resp = await response.json();
      setdata(resp);
      setfirstarr(resp[0].arr1);
      console.log(firstarr);
      setsecondarr(resp[1].arr2);

      console.log(secondarr);
      // console.log(resp[0].arr1);
    } catch (error) {
    } finally {
      setisloading(false);
    }
  };

  const refine = async () => {
    var a1 = new Array();
    var a2 = new Array();

    for (var i = 0; i < firstarr.length; i++) {
      // console.log(firstarr[1]);
      a1.push(Math.round((firstarr[i] + Number.EPSILON) * 10000) / 10000);
    }
    setx(a1);
    // console.log(a1);

    for (var i = 0; i < secondarr.length; i++) {
      //secondarr[i]=secondarr[i]/Math.pow(10,-5);
      // a2.push(Math.round((secondarr[i]+Number.EPSILON)*10000)/10000);
      a2.push(secondarr[i] / Math.pow(10, -12));
    }
    sety(a2);
    // console.log(y);
  };

  return (
    <AuthContext.Provider value={{ signedIn, setSignedIn }}>
      <NavigationContainer>
        <Stack.Navigator>
          {signedIn ? (
            <>
              <Stack.Screen name="DataImport" component={DataImportScreen} />
              <Stack.Screen name="Headset" component={HeadsetScreen} />
              <Stack.Screen name="Import" component={ImportScreen} />
              <Stack.Screen name="Upload" component={UploadScreen} />
              <Stack.Screen name="Analyze" component={AnalyzeScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>

    // <Navigator />
    //   <View style={styles.container}>
    //     <Button
    //     title='show eeg signals'
    //     onPress={()=>view()}
    //     />

    //     { !loading && secondarr!=null && firstarr!=null && x!=null && y!=null? (

    //   <LineChart
    //   data={{
    //     labels: firstarr.map(element=>
    //       Math.round(element*100)/100
    //     ),
    //     datasets: [{
    //       data: secondarr.map(element=>
    //         element/Math.pow(10,-11)
    //       )
    //     }]
    //   }}
    //   width={Dimensions.get('window').width} // from react-native
    //   height={500}
    //   chartConfig={{
    //     backgroundColor: '#F6DDCC',
    //     backgroundGradientFrom: '#E74C3C  ',
    //     backgroundGradientTo: '#EC7063',
    //     //decimalPlaces: 1, // optional, defaults to 2dp
    //     withDots:false,
    //     strokeWidth:2,
    //     withInnerLines:false,
    //     withOuterLines:false,
    //     xLabelsOffset: 10,
    //     withVerticalLines:false,
    //     withHorizontalLines: false,
    //     horizontalLabelRotation:30,
    //     verticalLabelRotation:30,
    //     color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    //     style: {
    //       borderRadius: 16
    //     }
    //   }}
    //   style={{
    //     margin:20,
    //     marginVertical: 8,
    //     borderRadius: 16,
    //     flex:1
    //   }}
    // />

    //     ):<Text>loading data....</Text>}

    //   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
