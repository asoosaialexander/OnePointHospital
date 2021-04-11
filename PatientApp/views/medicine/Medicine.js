import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ListItem, Icon } from 'react-native-elements'
import SearchMedicineScreen from './SearchMedicine';
import { View } from 'react-native';

const Stack = createStackNavigator();
const list = [
    {
        title: 'Search Medicine',
        icon: 'av-timer'
    },
    {
        title: 'My Medicine',
        icon: 'flight-takeoff'
    },
    {
        title: 'Medicine Cost',
        icon: 'flight-takeoff'
    },
    {
        title: 'Health Tips',
        icon: 'av-timer'
    },
    {
        title: 'Medicine Alarm',
        icon: 'flight-takeoff'
    },
    
    {
        title: 'Charts and Calculator',
        icon: 'av-timer'
    },
    {
        title: 'Disease & Symptoms',
        icon: 'flight-takeoff'
    },
    {
        title: 'Food List',
        icon: 'av-timer'
    },
    {
        title: 'Vaccination List',
        icon: 'flight-takeoff'
    }
]

const Medicine = ({ navigation }) => {
    return (
        <View>
            {
                list.map((item, i) => (
                    <ListItem key={i} bottomDivider 
                    onPress={()=>{navigation.navigate("Search Medicine")}}>
                        <Icon name={item.icon} />
                        <ListItem.Content>
                            <ListItem.Title>{item.title}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                ))
            }
        </View>
    );
}

class MedicineScreen extends React.Component {
    render() {
        return (
            <Stack.Navigator initialRouteName="Medicine">
                <Stack.Screen name="Medicine" component={Medicine} />
                <Stack.Screen name="Search Medicine" component={SearchMedicineScreen} />
            </Stack.Navigator>
        );
    }
}

export default MedicineScreen;