import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PrescriptionScreen from './PrescriptionScreen';
import PastAppointmentsScreen from './PastAppointmentsScreen';

const Stack = createStackNavigator();

class RecordScreen extends React.Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="PastAppointments">
                <Stack.Screen name="Prescription" component={PrescriptionScreen} />
                <Stack.Screen name="PastAppointments" component={PastAppointmentsScreen} />
            </Stack.Navigator>
        );
    }
}

export default RecordScreen;