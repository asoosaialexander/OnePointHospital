import { Link } from '@react-navigation/native';
import axios from 'axios';
import * as React from 'react';
import { View } from 'react-native';
import {
  Avatar,
  Icon,
  Text,
  ListItem,
  Button,
  ButtonGroup,
} from 'react-native-elements';
import { getDateList, getInitials, formatDate } from '../../shared/common';

class ScheduleAppointmentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      physicalSlots: [],
      videoSlots: [],
      hospitalName: "",
      doctor: {},
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  componentDidMount() {
    let date = new Date();
    axios
      .get("http://192.168.0.12:5000/api/AppointmentSlots/GetDoctorSlotsByDate?doctorId="
        + this.props.route.params.doctorId + "&date=" + formatDate(date))
      .then(res => {
        var data = res.data;
        var physicalSlots = data.filter(item => item.type == "Physical")
        var videoSlots = data.filter(item => item.type == "Video")
        this.setState({ physicalSlots: physicalSlots, videoSlots: videoSlots });

        axios
          .get('http://192.168.0.12:5000/api/doctors/' + this.props.route.params.doctorId)
          .then(res => {
            this.setState({ doctor: res.data })
          })
          .catch(err => {
            console.log(JSON.stringify(err));
          });

        if (physicalSlots.length > 0) {
          axios
            .get('http://192.168.0.12:5000/api/hospitals/' + physicalSlots[0].hospitalId)
            .then(res => {
              this.setState({ hospitalName: res.data.name })
            })
            .catch(err => {
              console.log(JSON.stringify(err));
            });
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
    let date = new Date();
    date.setDate(date.getDate() + selectedIndex);

    axios
      .get("http://192.168.0.12:5000/api/AppointmentSlots/GetDoctorSlotsByDate?doctorId="
        + this.props.route.params.doctorId + "&date=" + formatDate(date))
      .then(res => {
        var data = res.data;
        var physicalSlots = data.filter(item => item.type == "Physical")
        var videoSlots = data.filter(item => item.type == "Video")
        this.setState({ physicalSlots: physicalSlots, videoSlots: videoSlots });

        if (physicalSlots.length > 0) {
          axios
            .get('http://192.168.0.12:5000/api/hospitals/' + physicalSlots[0].hospitalId)
            .then(res => {
              this.setState({ hospitalName: res.data.name })
            })
            .catch(err => {
              console.log(JSON.stringify(err));
            });
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }

  render() {
    const { selectedIndex } = this.state;
    const { route, navigation } = this.props;

    const calendar = () => (
      <Icon
        name="calendar-today"
        type="material"
        onPress={() => console.log('calendar')}
      />
    );

    const buttons = [...getDateList(5), { element: calendar }];

    return (
      <>
        <View style={{ paddingTop: 25, padding: 10 }}>
          <Text h4>Book an Appointment</Text>
          <ListItem bottomDivider>
            <Avatar
              rounded
              title={getInitials(this.state.doctor.firstName + " " + this.state.doctor.lastName)}
              source={{ uri: this.state.avatar_url }}
            />
            <ListItem.Content>
              <ListItem.Title style={{ fontWeight: 'bold' }}>
                {this.state.doctor.firstName + " " + this.state.doctor.lastName}
              </ListItem.Title>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 0.8 }}>
                  <Text>{this.state.doctor.speciality}</Text>
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
        {getAppointmentLinks(this.props.navigation, this.state.physicalSlots, this.state.hospitalName)}
        {getAppointmentLinks(this.props.navigation, this.state.videoSlots, "Virtual")}
        {
          this.state.physicalSlots.length == 0 &&
          this.state.videoSlots.length == 0 &&
          <Text
            style={{
              fontSize: 18,
              paddingLeft: 10,
              paddingTop: 10,
              fontWeight: 'bold',
            }}>
            No slots available
            </Text>
        }
      </>
    );
  }
}

const getHourText = (time) => {
  const hr = parseInt(time.substring(0, 2));
  if (hr <= 12) {
    return time + " AM";
  }
  else {
    return (hr - 12) + time.substring(2) + " PM";
  }
};

const getAppointmentLinks = (navigation, data, location) => {
  const appointments = [];

  let rows = Math.floor(data.length / 4) + 1;
  let i = 0;
  while (i < rows) {
    const items = [];
    let j = 0;
    while (j < 4) {
      if (data[i * 4 + j] !== undefined) {
        items.push(
          <Button
            title={getHourText(data[i * 4 + j].time)}
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
          {data.length > 0 && location}
        </Text>
      </View>
      {appointments}
    </View>
  );
};

export default ScheduleAppointmentScreen;
