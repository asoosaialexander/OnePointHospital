import axios from 'axios';
import * as React from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import { Text, Divider } from 'react-native-elements';

class PastAppointmentsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pres: []
        }
    }

    componentDidMount() {
        axios.get('http://10.0.2.2:3001/prescriptions')
            .then(res => {
                var pres = res.data;


            }).catch(err => {
                console.log(JSON.stringify(err));
            });
    }

    render() {
        return (
            <View style={{ flex: 1, margin: 10 }}>
                <Text>2021</Text>
                <View style={{ flex: 1, flexDirection: "row", maxHeight: 150 }}>
                    <TouchableNativeFeedback
                        onPress={() => { this.props.navigation.navigate('Prescription') }}>
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
                                margin: 10,
                                borderRadius: 10
                            }}>
                                <Text h2>01</Text>
                                <Text h5>Mar</Text>
                            </View>
                            <View style={{
                                flex: 0.8,
                                margin: 10
                            }}>
                                <Text style={{ paddingTop: 10, paddingBottom: 10 }}>1:37 PM</Text>
                                <Text style={{ fontWeight: "bold", fontSize: 16 }}>Brad John's Prescription</Text>
                                <Text>Consulated Dr.Rajesh S</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        );
    }
}

export default PastAppointmentsScreen;
