import React, {useEffect, useState} from 'react'
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native"
import {CompositeScreenProps} from "@react-navigation/core/src/types";
import {useLoginStore} from "../store/loginStore";
import {colorSchemes} from "../styles/themes";
import {setStorageData} from "../../utils/asyncStorage";

interface LoginState {
    errors: Record<string, string>
}

function LoginScreen({navigation}: CompositeScreenProps<any, any>){
    const {email, password, setField, resetLoginStore, loginRequest} = useLoginStore();
    const [state, updateState] = useState<LoginState>({errors: {}})
    // **** useEffect to do reset state and store
    useEffect(() => {
        return navigation.addListener('focus', () => {
            resetLoginStore()
        });
    }, [navigation]);


    // **** field validations

    const isValidEmail = (value: string) => {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailRegex.test(value);
    };

    const emailValidation = (text? : string) => {
        const checkEmail = text || email
        let isValid = true;
        if (!isValidEmail(checkEmail)) {
            updateState((prevState)=> {
                return {
                    ...prevState,
                    errors: {...state.errors, emailError: "Enter a valid email address"}
                }
            })
            isValid = false;
        } else {
            const stateError = state.errors;
            delete stateError.emailError
            updateState((prevState)=> {
                return {
                    ...prevState,
                    errors: stateError
                }
            })
        }
        return isValid
    }

    // **** end field validations

    // **** Start handle for any inputs
    const handleRedirectRegister = () => {
        navigation.navigate('Register');
    }

    const handleLogin = async () => {
        if (emailValidation()) {
            loginRequest().then((data)=>{
                console.log(data, "data>>>>>>>>>>>>>>>>>")
                alert("LoggedIn!!!!!!!!!")
                setStorageData('userAuthToken', data.jwtToken)
                updateState((prevState)=>{
                    return {
                        ...prevState,
                        errors: {}
                    }
                })

            }).catch((err)=>{
                const errorCode = err.errorCode as string;
                const stateErrors: Record<string, string> = {};
                stateErrors[errorCode] = err.message;
                updateState((prevState)=>{
                    return {
                        ...prevState,
                        errors: stateErrors
                    }
                })
            })
        } else {
            updateState((prevState)=>{
                return {
                    ...prevState,
                    errors: { ...prevState.errors ,generalError: "Field validation failed"}
                }
            })
        }
    }

    // **** end handle

    // **** handle for any inputs ends

    return (
        <View
            style={styles.container}
        >
            <Image source={require('../assets/images/profile-image.png')} style={styles.profileLogo} />
            <TextInput
                style={[styles.input, state.errors.emailError ? styles.inputError : {}]}
                placeholder="Email"
                onChangeText={(text) => {
                    emailValidation(text)
                    setField('email', text)
                }}
                value={email}
            />
            {state.errors.emailError && <Text style={styles.errorText}>{state.errors.emailError}</Text>}
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => setField('password', text)}
                value={password}
            />
            {state.errors.generalError && <Text style={styles.errorText}>{state.errors.generalError}</Text>}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
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
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 5,
    },
})

export default LoginScreen;