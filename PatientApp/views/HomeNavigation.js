import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ScheduleAppointmentScreen from './appointments/ScheduleAppointment';
import AppointmentSummaryScreen from './appointments/AppointmentSummary';

const Stack = createStackNavigator();

class HomeNavigationScreen extends React.Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Search Doctor">
        <Stack.Screen
          name="Find Your Doctor"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Book an Appointment"
          component={ScheduleAppointmentScreen}
        />
        <Stack.Screen 
            name="Appointment Summary"
            component={AppointmentSummaryScreen}
        />
      </Stack.Navigator>
    );
  }
}

export default HomeNavigationScreen;
