import * as React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Divider} from 'react-native-elements';
import {Table, Row, Rows} from 'react-native-table-component';
import axios from 'axios';
import {getAge} from '../../shared/common';

class PrescriptionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      patient: {},
      diagnosis: [],
      vitals: {},
      hospital: {},
      doctor: {},
      dosage: [],
      instructions: [],
      tableHead: ['Name', 'Frequency', 'Duration', 'Notes'],
      tableData: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://10.0.2.2:3001/prescriptions/1')
      .then(res => {
        const {
          patient,
          vitals,
          hospital,
          doctor,
          dosage,
          instructions,
          date,
          diagnosis,
        } = res.data;

        this.setState({
          date: date,
          diagnosis: diagnosis,
          patient: patient,
          vitals: vitals,
          hospital: hospital,
          doctor: doctor,
          dosage: dosage,
          instructions: instructions,
        });
        let tblData = [];
        dosage.forEach(item => {
          let tblRow = [];
          tblRow.push(`${item.name}\n${item.composition}`);
          tblRow.push(
            `${item.frequency.morning || '0'} - ${
              item.frequency.afternoon || '0'
            } - ${item.frequency.evening || '0'}`,
          );
          tblRow.push(item.duration);
          tblRow.push(item.notes);
          tblData.push(tblRow);
        });
        this.setState({tableData: tblData});
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }

  render() {
    const state = this.state;

    return (
      <View
        style={{
          paddingTop: 40,
          flex: 1,
          margin: 5,
          borderStyle: 'solid',
          borderColor: 'grey',
          borderWidth: 1,
          padding: 5,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.8}}>
            <Text style={{fontWeight: 'bold'}}>{state.hospital.name}</Text>
            <Text style={{fontSize: 12}}>
              {state.hospital.addressLine1}, {state.hospital.addressLine2}
            </Text>
            <Text style={{fontSize: 12}}>
              {state.hospital.city} - {state.hospital.postalCode}
            </Text>
          </View>
          <View style={{flex: 0.3, alignItems: 'flex-end'}}>
            <Text style={{fontWeight: 'bold'}}>{state.doctor.name}</Text>
          </View>
        </View>
        <Divider
          style={{
            height: 1,
            backgroundColor: 'grey',
            marginTop: 5,
            marginBottom: 5,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            borderStyle: 'solid',
            borderColor: 'grey',
            borderWidth: 1,
            padding: 5,
          }}>
          <View style={{flex: 0.4}}>
            <Text style={{fontSize: 11}}>
              <Text style={{fontWeight: 'bold'}}>Name: </Text>
              <Text>{state.patient.name}</Text>
            </Text>
            <Text style={{fontSize: 11}}>
              <Text style={{fontWeight: 'bold'}}>Age/Sex: </Text>
              <Text>
                {getAge(state.patient.dateOfBirth)}y/
                {state.patient.gender == 'male' ? 'M' : 'F'}
              </Text>
            </Text>
            <Text style={{fontSize: 11}}>
              <Text style={{fontWeight: 'bold'}}>ID: </Text>
              <Text>{state.patient.id}</Text>
            </Text>
          </View>
          <View style={{flex: 0.3}}>
            <Text style={{fontSize: 11}}>
              <Text style={{fontWeight: 'bold'}}>Weight: </Text>
              <Text>{state.vitals.weight}</Text>
            </Text>
          </View>
          <View style={{flex: 0.3}}>
            <Text style={{fontSize: 11}}>
              <Text style={{fontWeight: 'bold'}}>Date: </Text>
              <Text>{state.date}</Text>
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingTop: 5,
          }}>
          <Text style={{fontSize: 11}}>
            <Text style={{fontWeight: 'bold'}}>Vitals: </Text>
            <Text>{state.vitals.bodyTemperature}</Text>
          </Text>
          <Text style={{fontSize: 11}}>
            <Text style={{fontWeight: 'bold'}}>Diagnosis: </Text>
            <Text>{state.diagnosis.join(', ')}</Text>
          </Text>
        </View>
        <View style={styles.container}>
          <Table borderStyle={{borderWidth: 1, borderColor: 'grey'}}>
            <Row
              data={state.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            <Rows data={state.tableData} textStyle={styles.text} />
          </Table>
        </View>
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 11}}>Instructions:</Text>
          {state.instructions &&
            state.instructions.map(instruction => {
              return (
                <Text style={{paddingLeft: 20, fontSize: 11}}>
                  {instruction}
                </Text>
              );
            })}
        </View>
        <Divider style={{height: 20, backgroundColor: 'inherit'}} />
        <View>
          <Text style={{fontSize: 11}}>
            Received with thanks ₹{state.doctor.consultationFee} for Consulation
          </Text>
          <Image
            source={require('../../images/signature.png')}
            style={{height: 40, width: 50}}
          />
          <Text style={{fontWeight: 'bold', fontSize: 12}}>
            {state.doctor.name}
          </Text>
          <Text style={{fontSize: 11}}>{state.doctor.speciality}</Text>
          <Text style={{fontSize: 11}}>{state.doctor.medicalId}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },
  head: {height: 30},
  text: {margin: 6, fontSize: 10},
});

export default PrescriptionScreen;
