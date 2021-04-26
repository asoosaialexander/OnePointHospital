import * as React from 'react';
import { View, TouchableNativeFeedback } from 'react-native';
import {
  Avatar,
  Header,
  Icon,
  SearchBar,
  Text,
  ListItem,
} from 'react-native-elements';
import { getInitials } from '../shared/common';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class HomeScreen extends React.Component {
  state = {
    search: '',
    list: [],
    filteredList: [],
  };

  componentDidMount() {
    AsyncStorage.getItem('userToken').then(value =>
      //AsyncStorage returns a promise so adding a callback to get the value
      console.log("alex", value)
      //Setting the value in Text
    );


    axios
      .get('http://192.168.0.12:5000/api/doctors')
      .then(res => {
        this.setState({ list: res.data, filteredList: res.data });
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  }

  updateSearch = search => {
    this.setState({ search });
    if (search) {
      const data = this.state.list.filter(l => {
        return (
          l.firstName.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          l.lastName.toLowerCase().indexOf(search.toLowerCase()) > -1 ||
          l.speciality.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
      });
      this.setState({ filteredList: data });
    } else {
      this.setState({ filteredList: this.state.list });
    }
  };

  render() {
    const { search, filteredList } = this.state;
    const { navigation } = this.props;

    return (
      <>
        {/* <Header
          leftComponent={
            <Icon
              name="menu"
              type="material"
              onPress={() => this.props.navigation.toggleDrawer()}
            />
          }
          centerComponent={{ text: 'Patient Log', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        /> */}
        <View style={{ margin: 5 }}>
          {/* <Text h3>Find Your Doctor</Text> */}
          <Text h6>Book and appointment for consulation</Text>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
            platform="android"
          />
        </View>
        {search != '' && (
          <View style={{ padding: 3, paddingLeft: 20 }}>
            <Text>Search results for {search}</Text>
          </View>
        )}
        <View>
          {filteredList.map((l, i) => (
            <TouchableNativeFeedback
              onPress={() => {
                this.props.navigation.navigate({
                  name: 'Book an Appointment',
                  params: {
                    doctorId: l.id
                  }
                });
              }}>
              <ListItem key={i} bottomDivider>
                <Avatar
                  rounded
                  title={getInitials(`${l.firstName} ${l.lastName}`)}
                  source={{ uri: 'https://urlsource/' }}
                />
                <ListItem.Content>
                  <ListItem.Title>
                    {l.firstName} {l.lastName}
                  </ListItem.Title>
                  <ListItem.Subtitle>{l.speciality}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </TouchableNativeFeedback>
          ))}
        </View>
      </>
    );
  }
}

export default HomeScreen;
