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
import connect from "./screens/connectheadset";
import chatBot from "./screens/chatBot";

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
        <LoggedOutStack.Screen name="loginScreen" component={Login} />
        <LoggedOutStack.Screen name="signupScreen" component={Signup} />
      </LoggedOutStack.Navigator>
    );
  }
  function ProfileStackScreens() {
    return (
      <ProfileStack.Navigator>
        <ProfileStack.Screen
          name="profileScreen"
          component={Profile}
          options={{ tabBarLabel: "Connect!" }}
        />
        <ProfileStack.Screen
          name="patientHistoryScreen"
          component={PatientHistory}
        />
        <ProfileStack.Screen name="importDataScreen" component={ImportData} />
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
  // if (Initializing) return null;
  // if (!User) {
  //   return (
  //     <Stack.Navigator>
  //       <Stack.Screen
  //         name="chatBot"
  //         component={chatBot}
  //         options={{
  //           headerTitle: "chatBot",
  //           headerStyle: {
  //             backgroundColor: "#DAF3F2",
  //             height: 0,
  //           },
  //           headerTitleStyle: {
  //             color: "#000000",
  //           },
  //         }}
  //       />
  //       <Stack.Screen
  //         name="Login"
  //         component={Login}
  //         options={{
  //           headerTitle: "Login",
  //           headerStyle: {
  //             backgroundColor: "#DAF3F2",
  //             height: 0,
  //           },
  //           headerTitleStyle: {
  //             color: "#000000",
  //           },
  //         }}
  //       />
  //       <Stack.Screen
  //         name="Registeration"
  //         component={Registeration}
  //         options={{
  //           headerTitle: "Registeration",
  //           headerStyle: {
  //             backgroundColor: "#3EB489",
  //             height: 0,
  //           },
  //         }}
  //       />
  //     </Stack.Navigator>
  //   );
  // }
  return (
    // <Stack.Navigator>
    //   <Stack.Screen
    //     name="Login"
    //     component={Login}
    //     options={{
    //       headerTitle: "Login",
    //       headerStyle: {
    //         backgroundColor: "#3EB489",
    //       },
    //     }}
    //   />
    //   <Stack.Screen
    //     name="Profile"
    //     component={Profile}
    //     options={{
    //       headerTitle: "Profile",
    //       headerStyle: {
    //         backgroundColor: "#DAF3F2",
    //         height: 0,
    //       },
    //     }}
    //   ></Stack.Screen>
    //   <Stack.Screen
    //     name="PatientHistory"
    //     component={PatientHistory}
    //     options={{
    //       headerTitle: "PatientHistory",
    //       headerStyle: {
    //         backgroundColor: "#DAF3F2",
    //         height: 0,
    //       },
    //     }}
    //   ></Stack.Screen>
    //   <Stack.Screen
    //     name="ImportData"
    //     component={ImportData}
    //     options={{
    //       headerTitle: "ImportData",
    //       headerStyle: {
    //         backgroundColor: "#DAF3F2",
    //         height: 0,
    //       },
    //     }}
    //   ></Stack.Screen>
    //   {/* <Stack.Screen
    //     name="Home"
    //     component={Home}
    //     options={{
    //       headerShown: false,
    //     }}
    //   /> */}
    // </Stack.Navigator>
    <>
      {User ? (
        <Tab.Navigator>
          <Tab.Screen name="Connect" component={ProfileStackScreens} />
          <Tab.Screen name="ChatBot" component={chatBot} />
        </Tab.Navigator>
      ) : (
        <LoggedOutScreens />
      )}
    </>
  );
}
export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
