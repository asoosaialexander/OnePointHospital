import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppointmentScreen from './views/appointments/Appointment';
import RecordScreen from './views/records/Records';
import HelpScreen from './views/HelpScreen';
import ActivityScreen from './views/Activity';
import RecordsScreen from './views/records/Records';
import MedicineScreen from './views/medicine/Medicine';
import LoginScreen from './views/Login';
import VerifyScreen from './views/Verify';
import AsyncStorage from '@react-native-community/async-storage';
import HomeNavigationScreen from './views/HomeNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './views/HomeScreen';

const Stack = createStackNavigator();

function MyTabs() {
  return (
    // <Tab.Navigator
    //   screenOptions={({ route }) => ({
    //     tabBarIcon: ({ focused, color, size }) => {
    //       let iconName;

    //       switch (route.name) {
    //         case 'Home':
    //           iconName = focused ? 'home' : 'home-outline';
    //           break;
    //         case 'Records':
    //           iconName = focused ? 'reader' : 'reader-outline';
    //           break;
    //         case 'Appointment':
    //           iconName = focused ? 'reader' : 'reader-outline';
    //           break;
    //         case 'Help':
    //           iconName = focused ? 'help-circle' : 'help-circle-outline';
    //           break;
    //         default:
    //           iconName = focused ? 'reader' : 'reader-outline';
    //       }
    //       return <Ionicons name={iconName} size={25} color={color} />;
    //     },
    //   })}
    //   tabBarOptions={{
    //     activeTintColor: 'tomato',
    //     inactiveTintColor: 'grey',
    //   }}>
    //   <Tab.Screen name="Activity" component={ActivityScreen} />
    //   <Tab.Screen name="Medicine" component={MedicineScreen} />
    //   <Tab.Screen name="Directory" component={RecordScreen} />
    //   <Tab.Screen name="Symptoms" component={AppointmentScreen} />
    //   <Tab.Screen name="Inbox" component={HelpScreen} />
    // </Tab.Navigator>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login" component={LoginScreen}
      />
      <Stack.Screen
        name="Verify" component={VerifyScreen}
      /><Stack.Screen
        name="Home" component={HomeNavigationScreen}
      />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [isSignedIn, toggleSignedIn] = useState(true);

  // useEffect(() => {
  //   AsyncStorage.getItem("userToken").then(value => {
  //     console.log("User Token Exists");
  //     if(value){
  //       toggleSignedIn(false);
  //     }
  //   });
  // }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          {/* {isSignedIn ? ( 
            <>*/}
          <Drawer.Screen name="Home" component={HomeNavigationScreen} />
          <Drawer.Screen name="Get Appointment" component={HomeScreen} />
          <Drawer.Screen
            name="Past Appointments"
            component={AppointmentScreen}
          />
          <Drawer.Screen name="Medical Records" component={RecordsScreen} />
          {/* </>
           ) : (
            <>
              <Drawer.Screen name="Login" component={LoginScreen} />
              <Drawer.Screen name="Verify" component={VerifyScreen} />
            </>
          )} */}
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
