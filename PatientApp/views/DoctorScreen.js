import * as React from 'react';

const doctor = {
    name: 'Dr. Rajesh',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Pediatrician',
  };

class DoctorScreen extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <>
                <ListItem>
                    <Avatar
                        rounded
                        title={getInitials(doctor.name)}
                        source={{ uri: doctor.avatar_url }}
                    />
                    <ListItem.Content>
                        <ListItem.Title>{doctor.name}</ListItem.Title>
                        <ListItem.Subtitle>{doctor.subtitle}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </>
        );
    }
}

export default DoctorScreen;