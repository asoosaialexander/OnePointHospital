import axios from 'axios';
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { Button } from 'react-native-elements';

function LoginScreen(props) {
    const { navigation } = props;
    const [phoneNumber, changePhoneNumber] = useState("+91");
    const data = {
        mobileNumber: phoneNumber
    }

    function register() {

        
        navigation.navigate({
            name: "Verify",
            params: { phoneNumber }
        })

        // axios.post('http://192.168.0.12:5000/api/Notification/sentOTP', data)
        //     .then(res => {
        //         console.log(res);
        //         console.log("OTP send to ", phoneNumber);
        //         navigation.navigate({
        //             name: "Verify",
        //             params: { phoneNumber }
        //         })
        //     }).catch(err => {
        //         console.log(JSON.stringify(err));
        //     });

        // fetch("http://192.168.0.12:5000/api/Notification/sentOTP", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(data)
        // })
        //     .then(res => {
        //         res.json();
        //         console.log(res);
        //     })
        //     .then(
        //         data => {
        //             console.log("OTP send to ", phoneNumber);
        //             navigation.navigate({
        //                 name: "Verify",
        //                 params: { phoneNumber }
        //             })
        //         }

        //     )  // ur data is here
        //     .catch(err => console.log("api Erorr: ", err));
    }

    return (
        <>
            <View style={{ padding: 20 }}>
                <Input label='Enter Registered Mobile Number'
                    leftIcon={
                        <Icon
                            type="material"
                            name="phone"
                            size={24}
                            color='black'
                        />
                    }
                    value={phoneNumber}
                    onChangeText={changePhoneNumber} />
                <Button title="Continue" type="solid" onPress={register} />
                <Text>By continuing you agree to our Terms of Use and our Privacy Policy</Text>
            </View>
        </>
    );
};

export default LoginScreen;
