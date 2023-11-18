import React from 'react'
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native"
import {CompositeScreenProps} from "@react-navigation/core/src/types";
import {useLoginStore} from "../store/loginStore";
import {colorSchemes} from "../styles/themes";

function LoginScreen({navigation}: CompositeScreenProps<any, any>){
    const {email, password, setField, login} = useLoginStore();

    const handleRedirectRegister = () => {
        navigation.navigate('Register');
    }

    return (
        <View
            style={styles.container}
        >
            <Image source={require('../assets/images/profile-image.png')} style={styles.profileLogo} />
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(text) => setField('email', text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setField('password', text)}
                value={password}
            />
            <TouchableOpacity style={styles.button} onPress={()=>{}}>
                <Text style={{ color: colorSchemes.textColors.lightText }}>Login</Text>
            </TouchableOpacity>
            <Text>
                Are you existing user?
            </Text>
            <TouchableWithoutFeedback onPress={handleRedirectRegister}>
                <Text style={{ color: colorSchemes.textColors.urlText }}>Create Account</Text>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileLogo: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: colorSchemes.NATURE_INSPIRED.primary,
        borderRadius: 4,
    },
    button: {
        backgroundColor: colorSchemes.ButtonColor.primaryButton,
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
})

export default LoginScreen;