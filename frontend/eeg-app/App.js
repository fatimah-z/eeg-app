import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
import { firebase } from "./configauth";
import Login from "./screens/login";
import Signup from "./screens/signup";
import Import from "./screens/importeegdata";
import ImportData from "./screens/importeegdata";
import PatientHistory from "./screens/patienthistory";
import Profile from "./screens/profile";
import SelectAnalysis from './screens/selectAnalyze';
import viewAnalysis from './screens/visualAnalysis'
import viewReport from './screens/Report';

import connect from "./screens/connectheadset";
import chatBot from "./screens/chatBot";
import Icon from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const LoggedOutStack = createStackNavigator();

function App() {
  const [Initializing, setInitializing] = useState(true);
  const [User, setUser] = useState();
  // function Home() {
  //   return (
  //     <Tab.Navigator
  //       screenOptions={{
  //         tabBarActiveTintColor: "#FFFFFF",
  //         tabBarStyle: {
  //           backgroundColor: "#BB005E",
  //           paddingBottom: 3,
  //         },
  //       }}
  //     >
  //       <Tab.Screen
  //         name="ImportData"
  //         options={{
  //           headerTitle: "Import Data",
  //           headerStyle: {
  //             backgroundColor: "#FFFFFF",
  //           },
  //         }}
  //         component={ImportData}
  //       />
  //     </Tab.Navigator>
  //   );
  // }
  function LoggedOutScreens() {
    return (
      <LoggedOutStack.Navigator>
        <LoggedOutStack.Screen
          name="loginScreen"
          component={Login}
          options={{ headerStyle: { height: 0 } }}
        />
        <LoggedOutStack.Screen
          name="signupScreen"
          component={Signup}
          options={{ headerStyle: { height: 0 } }}
        />
      </LoggedOutStack.Navigator>
    );
  }
  function ProfileStackScreens() {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name="profileScreen"
          component={Profile}
          options={{ headerStyle: { height: 0 } }}
        />
        <ProfileStack.Screen
          name="patientHistoryScreen"
          component={PatientHistory}
          options={{ headerStyle: { height: 0 } }}
        />
        <ProfileStack.Screen
          name="importDataScreen"
          component={ImportData}
          options={{ headerStyle: { height: 0 } }}
        />
      </ProfileStack.Navigator>
    );
  }

  function onAuthStateChange(user) {
    setUser(user);
    if (Initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChange);
    return subscriber;
  }, []);

  return (
    <>
      {User ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Profile"
            component={ProfileStackScreens}
            options={{
              headerStyle: { height: 0 },
              tabBarIcon: () => (
                <Icon name="person-circle-sharp" size={30} color="#81E3CD" />
              ),
            }}
          />
          <Tab.Screen
            name="ChatBot"
            component={chatBot}
            options={{
              headerStyle: { height: 0 },
              tabBarIcon: () => (
                <Icon name="chatbubbles-sharp" size={30} color="#81E3CD" />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <LoggedOutScreens />
      )}
    </>
  );
}
function Temp (){
  return(
    <Stack.Navigator>
      <Stack.Screen
          name="SelectAnalysis"
          component={SelectAnalysis}
          options={{
            headerTitle: "Select",
            headerStyle: {
              backgroundColor: "#DAF3F2",
              height: 0,
            },
          }}
        ></Stack.Screen>
      <Stack.Screen
          name="ViewAnalysis"
          component={viewAnalysis}
          options={{
            headerTitle: "Select",
            headerStyle: {
              backgroundColor: "#DAF3F2",
              height: 0,
            },
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="ViewReport"
          component={viewReport}
          options={{
            headerTitle: "Select",
            headerStyle: {
              backgroundColor: "#DAF3F2",
              height: 0,
            },
          }}
        ></Stack.Screen>
    </Stack.Navigator>
  );
}
export default () => {
  return (
    <NavigationContainer>
      {/* <App /> */}
      <Temp />
    </NavigationContainer>
  );
};
