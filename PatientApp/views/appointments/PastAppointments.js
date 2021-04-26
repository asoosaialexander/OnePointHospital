import axios from 'axios';
import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { getDateComponents } from './../../shared/common';

class PastAppointmentsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: []
    }
  }

  componentDidMount() {
    axios
      .get('http://192.168.0.12:5000/api/Appointments/past?patientId=4')
      .then(res => {
        this.setState({ appointments: res.data })
        console.log(JSON.stringify(res.data));
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }

  render() {
    return (
      <>
        {this.state.appointments.map((item, key) => (
          < View style={{ flex: 1, flexDirection: 'row', maxHeight: 140 }}>
            <View
              style={styles.container}>
              <View
                style={styles.date}>
                <Text h2>{getDateComponents(item.date)?.day}</Text>
                <Text h5>{getDateComponents(item.date)?.month}-{getDateComponents(item.date)?.year}</Text>
              </View>
              <View
                style={styles.detail}>
                <Text>
                  <Text style={styles.title}>
                    {item.doctorName}
                  </Text>
                  <Text> ({item.doctorSpeciality})</Text>
                </Text>
                <Text>Patient - {item.patientName}</Text>
                <View
                  style={styles.row}>
                  <View style={{ marginRight: 5 }}>
                    <Button
                      title="View Details"
                      type="outline"
                      onPress={() => {
                        this.props.navigation.navigate({
                          name: 'Appointment Details',
                          params: {
                            appointmentId: item.id
                          }
                        });
                      }}
                    />
                  </View>
                  <View>
                    <Button
                      title="Book Follow-Up"
                      onPress={() => {
                        this.props.navigation.navigate({
                          name: 'Book an Appointment',
                          params: { doctorId: 2 }
                        });
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View >
        ))}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderStyle: 'solid',
    borderColor: 'grey',
    borderWidth: 1,
    margin: 20,
    marginBottom: 0,
    borderRadius: 10,
  },
  date: {
    flex: 0.2,
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: 'grey',
    borderWidth: 1,
    margin: 5,
    marginRight: 0,
    borderRadius: 10,
    justifyContent: 'center',
  },
  detail: {
    flex: 0.8,
    margin: 5,
    maxHeight: 110,
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 3,
    justifyContent: 'flex-start',
  },
  title: { fontWeight: 'bold', fontSize: 16 }
});

export default PastAppointmentsScreen;

