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

const Item = ({title}) => <Text>{title}</Text>;

const doctor = {
  name: 'Dr. Rajesh Mahesh',
  avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  subtitle: 'Pediatrician',
};

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title:
      'You can cancel the appointment before 30 minutes from the appointment time & get 100% refund',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'In case of cancellation by doctor you get 100% refund',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'You can reschedule the appointment free of cose',
  },
];

class AppointmentSummaryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      toggle: false,
      overlayToggle: false,
      genderIndex: 0,
      name: '',
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({selectedIndex});
  }

  render() {
    const renderItem = ({item}) => <Item title={`\u2022 ${item.title}`} />;

    const toggleOverlay = () => {
      this.setState({overlayToggle: !this.state.overlayToggle});
    };

    const buttons = ['Male', 'Female'];
    const {selectedIndex} = this.state;

    return (
      <View>
        <View style={{padding: 10}}>
          <Text>Consulation With</Text>
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
        <Divider style={{height: 6, marginTop: 5, marginBottom: 5}} />
        <View style={{padding: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text>Appointment Date</Text>
              <Text style={{fontWeight: 'bold'}}>APR 11 | SUN | 08:20 PM</Text>
            </View>
            <View>
              <Button type="clear" title="Change date" onPress={()=>this.props.navigation.navigate("Book an Appointment")} />
            </View>
          </View>
        </View>
        <Divider style={{height: 6, marginTop: 5, marginBottom: 5}} />
        <View style={{padding: 10}}>
          <Text>Whom is this appointment for?</Text>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 7,
              justifyContent: 'space-between',
            }}>
            <View style={{marginRight: 5}} style={{}}>
              <Button
                type={this.state.toggle ? 'solid' : 'outline'}
                title="Brad John"
                onPress={() => {
                  this.setState({toggle: !this.state.toggle});
                }}
              />
            </View>
            <View style={{alignItems: 'baseline'}}>
              <Button
                type="clear"
                title="Change Patient"
                onPress={toggleOverlay}
              />
            </View>
          </View>
        </View>
        <Divider style={{height: 6, marginTop: 5, marginBottom: 5}} />
        <View style={{flexDirection: 'row', padding: 10}}>
          <View style={{flex: 0.8}}>
            <Text style={{fontWeight: 'bold'}}>Video Consulatation Fee</Text>
          </View>
          <View style={{flex: 0.2}}>
            <Text style={{fontWeight: 'bold'}}>₹500</Text>
          </View>
        </View>
        <Divider style={{height: 6, marginTop: 5, marginBottom: 5}} />
        <View style={{padding: 10}}>
          <Text style={{fontWeight: 'bold'}}>Note:</Text>
          <FlatList
            style={{paddingLeft: 10, paddingTop: 5}}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
        <Divider style={{height: 6, marginTop: 5, marginBottom: 5}} />
        <View style={{padding: 10}}>
          <Button type="solid" title="Confirm and Pay ₹500" />
        </View>
        <Overlay
          isVisible={this.state.overlayToggle}
          onBackdropPress={toggleOverlay}>
          <View style={{flex: 1, maxHeight: 400, width: 300}}>
            <Input
              placeholder="First Name"
              onChangeText={value => this.setState({name: value})}
            />
            <Input
              placeholder="First Name"
              onChangeText={value => this.setState({name: value})}
            />
            <Input
              placeholder="Date Of Birth"
              onChangeText={value => this.setState({name: value})}
            />
            <Text style={{fontSize: 18, paddingLeft: 10, color: 'grey'}}>
              Gender
            </Text>
            <ButtonGroup
              onPress={this.updateIndex}
              selectedIndex={selectedIndex}
              buttons={buttons}
            />
            <View style={{margin: 20}}>
              <Button type="solid" title="Add Patient" />
            </View>
          </View>
        </Overlay>
      </View>
    );
  }
}

export default AppointmentSummaryScreen;
