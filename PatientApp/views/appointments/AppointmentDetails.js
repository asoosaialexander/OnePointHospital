import { Link } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import {
    Avatar,
    Icon,
    Text,
    ListItem,
    Button,
    ButtonGroup,
    Badge
} from 'react-native-elements';
import { getDateList, getInitials } from '../../shared/common';

const doctor = {
    name: 'Dr. Rajesh',
    avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Pediatrician',
};

class AppointmentDetailsScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedIndex: 0
        }
    }

    render() {
        return (
            <View>
                <View style={{ paddingTop: 25, padding: 10 }}>
                    <ListItem bottomDivider>
                        <Avatar
                            rounded
                            title={getInitials(doctor.name)}
                            source={{ uri: doctor.avatar_url }}
                        />
                        <ListItem.Content>
                            <ListItem.Title style={{ fontWeight: "bold" }}>{doctor.name}</ListItem.Title>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 0.8 }}>
                                    <Text>{doctor.subtitle}</Text>
                                </View>
                                <View style={{ flex: 0.3 }}>
                                    <Link>View Profile</Link>
                                </View>
                            </View>
                        </ListItem.Content>
                    </ListItem>
                </View>
            </View>
        );
    }
}

export default AppointmentDetailsScreen;