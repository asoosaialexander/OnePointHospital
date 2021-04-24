import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PastAppointmentsScreen from './PastAppointments';
import ScheduleAppointmentScreen from './ScheduleAppointment';
import AppointmentDetailsScreen from './AppointmentDetails';
import AppointmentSummaryScreen from './AppointmentSummary';

const Stack = createStackNavigator();

class AppointmentsScreen extends React.Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Past Appointments">
        <Stack.Screen
          name="Past Appointments"
          component={PastAppointmentsScreen}
        />
        <Stack.Screen
          name="Appointment Details"
          component={AppointmentDetailsScreen}
        />
        <Stack.Screen
          name="Appointment Summary"
          component={AppointmentSummaryScreen}
        />
        <Stack.Screen
          name="Book an Appointment"
          component={ScheduleAppointmentScreen}
        />
      </Stack.Navigator>
    );
  }
}

export default AppointmentsScreen;
