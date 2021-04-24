import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { Button } from 'react-native-elements';

function LoginScreen(props) {
    const { navigation } = props;
    const [phoneNumber, changePhoneNumber] = useState("+91 - ");
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
                    value={phoneNumber} />
                <Button title="Continue" type="solid" onPress={()=> navigation.navigate("Verify")} />
                <Text>By continuing you agree to our Terms of Use and our Privacy Policy</Text>
            </View>
        </>
    );
};

export default LoginScreen;
