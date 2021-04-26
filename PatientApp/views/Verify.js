import AsyncStorage from '@react-native-community/async-storage';
import { Link } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default function VerifyScreen(props) {
    const { route, navigation } = props;

    const [otp, updateOtp] = useState("");
    const [error, toggleError] = useState(false);

    function verifyUser() {
        axios.post('http://192.168.0.12:5000/api/Notification/verifyOTP', {
            phoneNumber: route.params.phoneNumber,
            code: otp
        }).then(res => {
            console.log(res);
            console.log("verified ", phoneNumber);
            AsyncStorage.setItem("userToken", route.params.phoneNumber);
            navigation.navigate("Home")
        }).catch(err => {
            console.log(JSON.stringify(err));
            toggleError(true);
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter OTP</Text>
            <Text>4 digit OTP has been sent to your mobile number</Text>
            <Text style={styles.changeNumber}>
                <Text style={styles.number}>{route.params.phoneNumber}</Text>
                <Link to="/Login" style={styles.changeNumberBtn}> Change Number</Link>
            </Text>
            <Input value={otp} keyboardType="number-pad" onChangeText={updateOtp} maxLength={4} />
            {error && <Text style={styles.error}>Incorrect OTP. Please try again.</Text>}
            <Button title="Continue" type="solid" disabled={(otp.length != 4) ? true : false}
                onPress={verifyUser} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    title: {
        fontSize: 20,
        marginBottom: 5
    },
    changeNumber: {
        marginTop: 10,
    },
    number: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    changeNumberBtn: {
        fontSize: 16,
        color: "#0000EE"
    },
    error: {
        color: "red",
        marginBottom: 10
    }
});

