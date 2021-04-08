import { Link } from '@react-navigation/native';
import * as React from 'react';
import { View } from 'react-native';
import {
  Avatar,
  Icon,
  Text,
  ListItem,
  ButtonGroup
} from 'react-native-elements';
import { getDateList, getInitials } from '../shared/common';

const doctor = {
  name: 'Dr. Rajesh',
  avatar_url:
    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  subtitle: 'Pediatrician',
};

class AppointmentScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex })
  }

  render() {
    const { selectedIndex } = this.state;

    const calendar = () => <Icon
      name='calendar-today'
      type='material'
      onPress={() => console.log('calendar')}
    />;
    
    const buttons = [...getDateList(5), { element: calendar }];

    return (
      <>
        <View style={{ paddingTop: 25, padding: 10 }}>
          <Text h4>Book an Appointment</Text>
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
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
        />
      </>
    )
  }
}

export default AppointmentScreen;