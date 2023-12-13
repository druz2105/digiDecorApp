import React, {useEffect, useState} from 'react'
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native"
import {CompositeScreenProps} from "@react-navigation/core/src/types";
import {useRegistrationStore} from "../store/registerStore";
import {colorSchemes} from "../styles/themes";

interface RegistrationState {
    errors: Record<string, string>
}

function RegisterScreen({navigation}: CompositeScreenProps<any, any>){

    const {email, firstName, lastName, password, confirmPassword, resetRegistrationStore, setField, registerUser} = useRegistrationStore();
    const [state, updateState] = useState({errors: {}} as RegistrationState)

    useEffect(() => {
        return navigation.addListener('focus', () => {
            resetRegistrationStore()
            updateState({errors: {}})
        });
    }, [navigation]);

    // ***** Start Field Validation
    const isValidEmail = (value: string) => {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailRegex.test(value);
    };

    const isValidPassword = (value: string) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,20}$/;
        return passwordRegex.test(value);
    };

    const getErrorMessage = (field: string): Record<string, string> => {
        switch (field){
            case 'email':
                return {emailError: "Email address is required"}
            case 'password':
                return {passwordError: "Password is required"}
            case 'firstName':
                return {firstNameError: "First Name is required"}
            case 'lastName':
                return {lastNameError: "Last Name is required"}
            default:
                return {generalError: "Field is required"}
        }
    }


    const isFieldValid = (field: string,  value: string) => {
        const errorMessage = getErrorMessage(field)
        let isValid = true;
        if (value.length === 0) {
            updateState((prevState)=> {
                return {
                    ...prevState,
                    errors: errorMessage
                }
            })
            isValid = false;
        }
        return isValid
    }

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

    const passwordValidation = (text? : string) => {
        const checkPassword = text || password
        let isValid = true;
        if (!isValidPassword(checkPassword))  {
            updateState((prevState)=> {
                return {
                    ...prevState,
                    errors: {...state.errors, passwordError: "Password must be 8 to 20 characters long and contain at least one character and one number"}
                }
            })
            isValid = false;
        } else {
            const stateError = state.errors;
            delete stateError.passwordError
            updateState((prevState)=> {
                return {
                    ...prevState,
                    errors: stateError
                }
            })
        }
        return isValid
    }

    const confirmPasswordValidation = (text? : string) => {
        const checkConfirmPassword = text || password
        let isValid = true
        if (checkConfirmPassword !== password) {
            updateState((prevState)=> {
                return {
                    ...prevState,
                    errors: {...state.errors, cPasswordError: "Passwords do not match"}
                }
            })
            isValid = false;
        } else {
            const stateError = state.errors;
            delete stateError.cPasswordError
            updateState((prevState)=> {
                return {
                    ...prevState,
                    errors: stateError
                }
            })
        }
        return isValid
    }

    const dataValidation = () => {
        return emailValidation() && passwordValidation() && isFieldValid('firstName', firstName) && isFieldValid('lastName', lastName) && confirmPasswordValidation()
    }

    // ***** Field Validation End

    // ***** Start Handle Events
    const handleRedirectLogin = () => {
        navigation.navigate('Login');
    }

    const handleRegister = () => {
        if(dataValidation()){
            updateState((prevState)=>{
                return {
                    ...prevState,
                    errors: {}
                }
            })
            registerUser().then((r)=>{
                navigation.navigate('Login')
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

    // ***** Handle Events End


    // ***** Start Screen UI view

    return (
        <SafeAreaView
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
                style={[styles.input, state.errors.firstNameError ? styles.inputError : {}]}
                placeholder="First Name"
                onChangeText={(text) => {
                    if(isFieldValid('firstName', text)){
                        setField('firstName', text)
                        delete state.errors.firstNameError;
                        updateState((prevState)=> {
                            return {
                                ...prevState,
                                errors: state.errors
                            }
                        })
                    } else {
                        setField('firstName', text)
                    }
                }}
                value={firstName}
            />
            {state.errors.firstNameError && <Text style={styles.errorText}>{state.errors.firstNameError}</Text>}
            <TextInput
                style={[styles.input, state.errors.lastNameError ? styles.inputError : {}]}
                placeholder="Last Name"
                onChangeText={(text) => {
                    if(isFieldValid('lastName', text)){
                        setField('lastName', text)
                        delete state.errors.lastNameError;
                        updateState((prevState)=> {
                            return {
                                ...prevState,
                                errors: state.errors
                            }
                        })
                    } else {
                        setField('lastName', text)
                    }
                }}
                value={lastName}
            />
            {state.errors.lastNameError && <Text style={styles.errorText}>{state.errors.lastNameError}</Text>}
            <TextInput
                style={[styles.input, state.errors.passwordError ? styles.inputError : {}]}
                placeholder="Password"
                secureTextEntry
                onChangeText={(text) => {
                    passwordValidation(text)
                    setField('password', text)
                }}
                value={password}
            />
            {state.errors.passwordError && <Text style={styles.errorText}>{state.errors.passwordError}</Text>}
            <TextInput
                style={[styles.input, state.errors.cPasswordError ? styles.inputError : {}]}
                placeholder="Confirm Password"
                secureTextEntry
                onChangeText={(text) => {
                    confirmPasswordValidation(text)
                    setField('confirmPassword', text)
                }}
                value={confirmPassword}
            />
            {state.errors.cPasswordError && <Text style={styles.errorText}>{state.errors.cPasswordError}</Text>}
            {state.errors.generalError && <Text style={styles.errorText}>{state.errors.generalError}</Text>}
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={{ color: colorSchemes.textColors.lightText }}>Register</Text>
            </TouchableOpacity>
            <Text>
                Already have an account?
            </Text>
            <TouchableWithoutFeedback onPress={handleRedirectLogin}>
                <Text style={{ color: colorSchemes.textColors.urlText }}>Login here</Text>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );

    // ***** Screen UI view End
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
        borderColor: colorSchemes.NATURE_INSPIRED.TealGreen,
        borderRadius: 4,
    },
    button: {
        backgroundColor: colorSchemes.ButtonColor.successButton,
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

export default RegisterScreen;