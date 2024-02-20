// UserProfileForm.tsx
import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Button,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {userProfileStore} from "../store/userProfileStore";
import {colorSchemes} from "../styles/themes";
import {CompositeScreenProps} from "@react-navigation/core/src/types";
import {authStore} from "../store/authStore";
import {deleteSecureStorageData} from "../../utils/secureStorage";
import Toast from "react-native-toast-message";

interface UserProfileState {
    errors: Record<string, string>
}

const UserProfileScreen = ({navigation}: CompositeScreenProps<any, any>) => {
    const { user, getUser, updateUserField, updateUser } = userProfileStore();
    const {isAuthenticated, setIsAuthenticated, authenticateUser} = authStore();
    const [isLoading, setIsLoading] = useState(false)

    const [state, updateState] = useState({errors: {}} as UserProfileState)
    // **** use effect

    useEffect(() => {
        return navigation.addListener('focus', () => {
            updateState({errors: {}})
            const fetchData = async () => {
                setIsLoading(true)
                try {
                    await getUser();
                    setIsLoading(false)
                } catch (err: any) {
                    alert(err.message || "something went wrong")
                    setIsAuthenticated(false)
                    await deleteSecureStorageData("userAuthKey")
                    setIsLoading(false)
                }
            }
            fetchData()
        });
    }, []);

    // ***** Start Field Validation
    const isValidEmail = (value: string) => {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return emailRegex.test(value);
    };

    const getErrorMessage = (field: string): Record<string, string> => {
        switch (field){
            case 'email':
                return {emailError: "Email address is required"}
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
        const checkEmail = text || user.email
        let isValid = true;
        if (!isValidEmail(checkEmail || '')) {
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
    const dataValidation = () => {
        return emailValidation() && isFieldValid('firstName', user.firstName || '') && isFieldValid('lastName', user.lastName || '')
    }

    // **** start handles

    const handleSubmit = async () => {
        setIsLoading(true)
        if(!dataValidation()){
            updateState((prevState)=>{
                return {
                    ...prevState,
                    errors: { ...prevState.errors ,generalError: "Field validation failed"}
                }
            })
            return
        }
        try {
            await updateUser();
            Toast.show({
                type: 'success',
                props: { text1: 'User Updated successfully!' }
            });
            setIsLoading(false)
        } catch (err: any) {
            alert(err.message || "something went wrong")
            setIsLoading(false)
        }
    };

    const handleLogout = async () => {
        await deleteSecureStorageData('userAuthToken');
        setIsAuthenticated(false)
    };

    if (!isAuthenticated) {
        return (
            <View>
                <Text>You are not authenticated.</Text>
                <Button title="Login" onPress={() => navigation.replace('Login')} />
            </View>
        );
    }

    if(isLoading){
        return (
            <View
                style={styles.container}
            >
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

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
                    updateUserField('email', text)
                }}
                value={user.email || ''}
            />
            {state.errors.emailError && <Text style={styles.errorText}>{state.errors.emailError}</Text>}
            <TextInput
                style={[styles.input, state.errors.firstNameError ? styles.inputError : {}]}
                placeholder="First Name"
                onChangeText={(text) => {
                    if(isFieldValid('firstName', text)){
                        updateUserField('firstName', text)
                        delete state.errors.firstNameError;
                        updateState((prevState)=> {
                            return {
                                ...prevState,
                                errors: state.errors
                            }
                        })
                    } else {
                        updateUserField('firstName', text)
                    }
                }}
                value={user.firstName || ''}
            />
            {state.errors.firstNameError && <Text style={styles.errorText}>{state.errors.firstNameError}</Text>}
            <TextInput
                style={[styles.input, state.errors.lastNameError ? styles.inputError : {}]}
                placeholder="Last Name"
                onChangeText={(text) => {
                    if(isFieldValid('lastName', text)){
                        updateUserField('lastName', text)
                        delete state.errors.lastNameError;
                        updateState((prevState)=> {
                            return {
                                ...prevState,
                                errors: state.errors
                            }
                        })
                    } else {
                        updateUserField('lastName', text)
                    }
                }}
                value={user.lastName || ''}
            />
            {state.errors.lastNameError && <Text style={styles.errorText}>{state.errors.lastNameError}</Text>}
            {state.errors.generalError && <Text style={styles.errorText}>{state.errors.generalError}</Text>}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.updateProfileButton} onPress={handleSubmit}>
                    <Text style={{ color: colorSchemes.textColors.lightText }}>Update Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logOutButton} onPress={handleLogout}>
                    <Text style={{ color: colorSchemes.textColors.lightText }}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        width: 125
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
    updateProfileButton: {
        backgroundColor: colorSchemes.ButtonColor.successButton,
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        width: '100%',
    },
    logOutButton: {
        backgroundColor: colorSchemes.ButtonColor.dangerButton,
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        width: '100%',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 5,
    },
})

export default UserProfileScreen;
