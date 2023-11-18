import React, {useEffect} from 'react'
import {Image, StyleSheet, Text, View} from "react-native"
import {CompositeScreenProps} from "@react-navigation/core/src/types";

interface WelcomeScreenProps{
    navigation: any
}
function WelcomeScreen({navigation}: CompositeScreenProps<any, any>){
    useEffect(() => {
        // Simulate a delay or perform any async tasks (e.g., data loading)
        const fetchData = async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
            navigation.navigate('Register');
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <Image style={styles.background} source={require('../assets/images/background.jpeg')}></Image>
            <Text style={styles.text}>Welcome to Digi Decor!</Text>
        </View>
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

export default WelcomeScreen;