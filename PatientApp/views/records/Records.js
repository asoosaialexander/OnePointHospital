import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PrescriptionScreen from './Prescription';
import HealthRecordsScreen from './HealthRecords';

const Stack = createStackNavigator();

class RecordsScreen extends React.Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Health Records">
        <Stack.Screen name="Prescription" component={PrescriptionScreen} />
        <Stack.Screen name="Health Records" component={HealthRecordsScreen} />
      </Stack.Navigator>
    );
  }
}

export default RecordsScreen;
