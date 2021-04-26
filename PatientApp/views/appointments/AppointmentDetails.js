import * as React from 'react';
import { View, FlatList } from 'react-native';
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
import { getInitials } from '../../shared/common';
import axios from 'axios';
import { dateDisplay } from './../../shared/common';

const doctor = {
  name: 'Dr. Rajesh Mahesh',
  avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  subtitle: 'Pediatrician',
};

class AppointmentDetailsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      appointment: {}
    };
  }


  componentDidMount() {
    axios
      .get('http://192.168.0.12:5000/api/Appointments/past?patientId=4')
      .then(res => {
        var data = res.data;
        var filteredData = data.filter(i => i.id == this.props.route.params.appointmentId);
        console.log(filteredData);
        if (filteredData.length > 0) {
          this.setState({ appointment: filteredData[0] })
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
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
            <Text style={{ fontWeight: 'bold' }}>
              12:35 PM Monday 1st Mar 2021
            </Text>
            <Text>{this.state.appointment?.location}</Text>
          </View>
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 16 }}>Patient</Text>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 3,
              }}>
              <View style={{ marginRight: 5 }}>
                <Avatar
                  rounded
                  title={getInitials(this.state.appointment?.patientName || "")}
                  source={{ uri: doctor.avatar_url }}
                  size="medium"
                />
              </View>
              <View style={{ paddingLeft: 10, paddingTop: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {this.state.appointment?.patientName}
                </Text>
                <Text>for</Text>
              </View>
            </View>
          </View>
          <View style={{ padding: 10, marginBottom: 10 }}>
            <Text style={{ fontSize: 16 }}>Doctor</Text>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 3,
              }}>
              <View style={{ marginRight: 5 }}>
                <Avatar
                  rounded
                  title={getInitials(this.state.appointment?.doctorName || "")}
                  source={{ uri: doctor.avatar_url }}
                  size="medium"
                />
              </View>
              <View style={{ paddingLeft: 10, paddingTop: 5 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                  {this.state.appointment?.doctorName}
                </Text>
                <Text>{this.state.appointment?.doctorSpeciality}</Text>
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
          <Text style={{ fontSize: 16 }}>
            Children's Hospital, Vijaya Nagar, Velachery, Chennai - 600042
          </Text>
          <Button type="clear" title="Call Clinic" />
        </View>
      </>
    );
  }
}

export default AppointmentDetailsScreen;
