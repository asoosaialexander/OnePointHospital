import React from 'react';
import {View} from 'react-native';
import {
  Avatar,
  Header,
  Icon,
  SearchBar,
  Text,
  ListItem,
} from 'react-native-elements';
import {getInitials} from '../shared/common';
import Timeline from 'react-native-timeline-flatlist';

class ActivityScreen extends React.Component {
  constructor() {
    super();
    this.data = [
      {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
      {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
      {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
      {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
      {time: '16:30', title: 'Event 5', description: 'Event 5 Description'},
    ];
  }

  render() {
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
          centerComponent={{
            text: 'Activity Log',
            style: {fontSize: 16, color: '#fff'},
          }}
          rightComponent={{icon: 'home', color: '#fff'}}
        />
        <Timeline style={{margin: 20, marginTop: 30}} data={this.data} />
      </>
    );
  }
}

export default ActivityScreen;
