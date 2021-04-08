import * as React from 'react';
import { View, Text } from 'react-native';

class PrescriptionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Rx', 'Name', 'Frequency', 'Duration', 'Notes'],
            tableData: [
            ]
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/prescriptions')
            .then((response) => response.json())
            .then((json) => {
                this.setState({ data: json.movies });
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }

    render() {
        return (
            <View style={{
                paddingTop: 40,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                margin: 5,
                borderStyle: "solid",
                borderColor: "grey",
                borderWidth: 1
            }}>
                <View style={{ flexDirection: "row", margin: 5 }}>
                    <View style={{ flex: 0.8 }}>
                        <Text>Child Health Clinic</Text>
                        <Text>Vijaya Nagar, Velachery</Text>
                        <Text>Chennai - 600042</Text>
                    </View>
                    <View style={{ flex: 0.3, alignItems: 'flex-end' }}>
                        <Text style={{ fontWeight: "bold" }}>Dr. Rajesh M</Text>
                    </View>
                    <View>

                    </View>
                </View>
            </View>
        );
    }
}

export default PrescriptionScreen;