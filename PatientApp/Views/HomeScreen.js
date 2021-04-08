import * as React from 'react';
import {View} from 'react-native';
import {
  Avatar,
  Header,
  Icon,
  SearchBar,
  Text,
  Button,
  ListItem,
} from 'react-native-elements';
import { getInitials } from '../shared/common';

const list = [
  {
    name: 'Dr. Rajesh',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Pediatrician',
  },
  {
    name: 'Dr. Sadique Basha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Pediatrician',
  },
];

class HomeScreen extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({search});
  };

  

  render() {
    const {search} = this.state;

    return (
      <>
        <Header
          leftComponent={
            <Icon
              name="menu"
              type="material"
              onPress={() => this.props.navigation.toggleDrawer()}
            />
          }
          centerComponent={{text: 'Patient Log', style: {color: '#fff'}}}
          rightComponent={{icon: 'home', color: '#fff'}}
        />
        <View style={{margin: 5}}>
          <Text h3>Find Your Doctor</Text>
          <Text h6>Book and appointment for consulation</Text>
          <SearchBar
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
            platform="android"
          />
        </View>
        {search != '' && (
          <View style={{padding: 3, paddingLeft: 20}}>
            <Text>Search results for {search}</Text>
          </View>
        )}
        <View>
          {list.map((l, i) => (
            <ListItem key={i} bottomDivider>
              <Avatar
                rounded
                title={getInitials(l.name)}
                source={{uri: l.avatar_url}}
              />
              <ListItem.Content>
                <ListItem.Title>{l.name}</ListItem.Title>
                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </>
    );
  }
}

export default HomeScreen;
