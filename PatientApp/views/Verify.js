import { Link } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default function VerifyScreen(props) {
    const { navigation } = props;
    const [otp, updateOtp] = useState("");
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter OTP</Text>
            <Text>4 digit OTP has been sent to your mobile number</Text>
            <Text style={styles.changeNumber}>
                <Text style={styles.number}>9876543210</Text>
                <Link to="/Login" style={styles.changeNumberBtn}> Change Number</Link>
            </Text>
            <Input value={otp} keyboardType="number-pad" onChangeText={updateOtp} maxLength={4}/>
            <Button title="Continue" type="solid" disabled={otp.length != 4 ? true : false}
                onPress={() => navigation.navigate("Home")} />
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
    }
});

