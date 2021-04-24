import * as React from 'react';
import {View, FlatList} from 'react-native';
import {
  Avatar,
  Icon,
  Text,
  ListItem,
  Button,
  ButtonGroup,
  Badge,
  Divider,
  Overlay,
  Input,
} from 'react-native-elements';
import {getInitials} from '../../shared/common';

const doctor = {
  name: 'Dr. Rajesh Mahesh',
  avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  subtitle: 'Pediatrician',
};

class AppointmentDetailsScreen extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <View
          style={{
            margin: 20,
            padding: 20,
            borderRadius: 20,
            borderStyle: 'solid',
            borderColor: 'grey',
            borderWidth: 1,
          }}>
          <View>
            <Text style={{fontWeight: 'bold'}}>
              12:35 PM Monday 1st Mar 2021
            </Text>
            <Text>Child Health Clinic</Text>
          </View>
          <View style={{padding: 10}}>
            <Text style={{fontSize: 16}}>Patient</Text>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 3,
              }}>
              <View style={{marginRight: 5}}>
                <Avatar
                  rounded
                  title={getInitials('Brad John')}
                  source={{uri: doctor.avatar_url}}
                  size="medium"
                />
              </View>
              <View style={{paddingLeft: 10, paddingTop: 5}}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                  Brad John
                </Text>
                <Text>for</Text>
              </View>
            </View>
          </View>
          <View style={{padding: 10, marginBottom: 10}}>
            <Text style={{fontSize: 16}}>Doctor</Text>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 3,
              }}>
              <View style={{marginRight: 5}}>
                <Avatar
                  rounded
                  title={getInitials(doctor.name)}
                  source={{uri: doctor.avatar_url}}
                  size="medium"
                />
              </View>
              <View style={{paddingLeft: 10, paddingTop: 5}}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>
                  {doctor.name}
                </Text>
                <Text>{doctor.subtitle}</Text>
              </View>
            </View>
          </View>
          <Button type="outline" title="View Prescription" />
        </View>
        <View
          style={{
            margin: 20,
            padding: 20,
            marginTop: 0,
            borderRadius: 20,
            borderStyle: 'solid',
            borderColor: 'grey',
            borderWidth: 1,
          }}>
          <Text style={{fontSize: 16}}>
            Children's Hospital, Vijaya Nagar, Velachery, Chennai - 600042
          </Text>
          <Button type="clear" title="Call Clinic" />
        </View>
      </>
    );
  }
}

export default AppointmentDetailsScreen;
