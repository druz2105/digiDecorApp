import React, {useEffect} from 'react'
import {Image, SafeAreaView, StyleSheet, Text} from "react-native"
import {CompositeScreenProps} from "@react-navigation/core/src/types";
import {authStore} from "../store/authStore";
import {deleteSecureStorageData} from "../../utils/secureStorage";

function HomeScreen({navigation}: CompositeScreenProps<any, any>){
    const {setIsAuthenticated} = authStore();

    useEffect(() => {
        // const authenticate = async () => {
        //     const authenticated = await authenticateUser();
        //     setIsAuthenticated(authenticated)
        //     if(!authenticated){
        //         navigation.navigate('Login');
        //         alert("User Authentication Expired Login Again")
        //     }
        // };
        // if(!isAuthenticated){
        //     authenticate();
        // }
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.background} source={require('../assets/images/adaptive-icon.png')}></Image>
            <Text style={styles.text}>Logged In to Digi Decor!</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        width: 200, // Adjust the width as needed
        height: 200, // Adjust the height as needed
        borderRadius: 70
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24, // Adjust the font size as needed
        marginTop: 20, // Adjust the margin top as needed
    },
})

export default HomeScreen;