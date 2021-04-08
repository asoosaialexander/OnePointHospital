import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PrescriptionScreen from './PrescriptionScreen';

const Stack = createStackNavigator();

class RecordScreen extends React.Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="PastAppointments">
                <Stack.Screen name="Prescription" component={PrescriptionScreen} />
                <Stack.Screen name="PastAppointments" component={PastAppointments} />
            </Stack.Navigator>
        );
    }
}

const PastAppointments = ({navigation}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                title="View Prescription"
                onPress={() => navigation.navigate('Prescription')}
            />
        </View>
    );
}

export default RecordScreen;