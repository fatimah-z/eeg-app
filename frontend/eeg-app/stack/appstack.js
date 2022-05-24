import { createStackNavigator } from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import Login from '../screens/login';
import Signup from  '../screens/signup';
import DataImport from'../screens/dataimportoptions';
import Headset from '../screens/connectheadset';
import Import from '../screens/importeegdata';
import Upload from '../screens/uploadeeg';
import Analyze from '../screens/analyze';
//import Classify from '../screens/classify';
// import PatientHistory from '../screens/patienthistory';
// import ReportGeneration from '../screens/reportgeneration';
const screens={
    Signup: {
        screen: Signup
    },
    Login :{
        screen:Login
    },
    DataImport :{
        screen:DataImport
    },
    Headset :{
        screen: Headset
    },
    Import :{
        screen: Import
    },
    Upload :{
        screen: Upload
    },
    Analyze:{
        screen: Analyze
    },
    // Classify:{
    //     screen: Classify
    // },
    // PatientHistory:{
    //     screen : PatientHistory
    // },
    // ReportGeneration:{
    //     screen: ReportGeneration
    // }
}
const Stack = createStackNavigator(screens);
export default createAppContainer(Stack);