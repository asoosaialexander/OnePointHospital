import {Link} from '@react-navigation/native';
import * as React from 'react';
import {View} from 'react-native';
import {
  Avatar,
  Icon,
  Text,
  ListItem,
  Button,
  ButtonGroup,
} from 'react-native-elements';
import {getDateList, getInitials} from '../../shared/common';

const doctor = {
  name: 'Dr. Rajesh',
  avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  subtitle: 'Pediatrician',
};

class ScheduleAppointmentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({selectedIndex});
  }

  render() {
    const {selectedIndex} = this.state;

    const calendar = () => (
      <Icon
        name="calendar-today"
        type="material"
        onPress={() => console.log('calendar')}
      />
    );

    const buttons = [...getDateList(5), {element: calendar}];

    return (
      <>
        <View style={{paddingTop: 25, padding: 10}}>
          <Text h4>Book an Appointment</Text>
          <ListItem bottomDivider>
            <Avatar
              rounded
              title={getInitials(doctor.name)}
              source={{uri: doctor.avatar_url}}
            />
            <ListItem.Content>
              <ListItem.Title style={{fontWeight: 'bold'}}>
                {doctor.name}
              </ListItem.Title>
              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 0.8}}>
                  <Text>{doctor.subtitle}</Text>
                </View>
                <View style={{flex: 0.3}}>
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
        {getAppointmentLinks(this.props.navigation)}
      </>
    );
  }
}

const getAppointmentLinks = navigation => {
  const time = [
    '02:00 PM',
    '02:05 PM',
    '02:10 PM',
    '02:35 PM',
    '09:30 PM',
    '09:35 PM',
    '02:05 PM',
    '02:10 PM',
    '02:35 PM',
    '09:30 PM',
    '09:35 PM',
  ];
  const appointments = [];

  let rows = Math.floor(time.length / 4) + 1;
  let i = 0;
  while (i < rows) {
    const items = [];
    let j = 0;
    while (j < 4) {
      if (time[i * 4 + j] !== undefined) {
        items.push(
          <Button
            title={time[i * 4 + j]}
            type="outline"
            onPress={() => {
              navigation.navigate('Appointment Summary');
            }}
          />,
        );
      }
      j++;
    }
    appointments.push(
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          paddingBottom: 0,
          justifyContent: 'space-evenly',
        }}>
        {items}
      </View>,
    );
    i++;
  }
  return (
    <View>
      <View>
        <Text
          style={{
            fontSize: 18,
            paddingLeft: 10,
            paddingTop: 10,
            fontWeight: 'bold',
          }}>
          Evening, Memorial Hospital
        </Text>
      </View>
      {appointments}
    </View>
  );
};

export default ScheduleAppointmentScreen;
