import * as React from 'react';
import { View } from 'react-native';
import {
    Text,
    Button
} from 'react-native-elements';

const list = [
    {
        id: 1,
        name: 'Dr. Rajesh',
        avatar_url:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'Pediatrician',
    },
    {
        id: 2,
        name: 'Dr. Sadique Basha',
        avatar_url:
            'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Pediatrician',
    }
];


class PastAppointmentsScreen extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: "row", maxHeight: 140 }}>
                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    borderStyle: "solid",
                    borderColor: "grey",
                    borderWidth: 1,
                    margin: 20,
                    borderRadius: 10
                }}>
                    <View style={{
                        flex: 0.2,
                        alignItems: "center",
                        borderStyle: "solid",
                        borderColor: "grey",
                        borderWidth: 1,
                        margin: 5,
                        marginRight: 0,
                        borderRadius: 10,
                        justifyContent: "center"
                    }}>
                        <Text h2>01</Text>
                        <Text h5>Mar-21</Text>
                    </View>
                    <View style={{
                        flex: 0.8,
                        margin: 5,
                        maxHeight: 110,
                        padding: 10,
                        paddingTop: 0,
                        paddingBottom: 0
                    }}>
                        <Text>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Dr.Rajesh S</Text>
                            <Text>  (Pediatrician)</Text>
                        </Text>
                        <Text >Patient - John Doe</Text>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            paddingTop: 3,
                            justifyContent: "flex-start",
                        }}>
                            <View style={{ marginRight: 5 }}>
                                <Button title="View Details" type="outline"
                                    onPress={() => { this.props.navigation.navigate('Appointment Details') }} />
                            </View>
                            <View>
                                <Button title="Book Follow-Up"  
                                onPress={() => { this.props.navigation.navigate('Book an Appointment') }} />
                            </View>
                        </View>
                    </View>
                </View>
            </View>


        );
    }
}

export default PastAppointmentsScreen;