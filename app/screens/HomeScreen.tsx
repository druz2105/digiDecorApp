import React, {useEffect, useState} from 'react'
import {ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CompositeScreenProps} from "@react-navigation/core/src/types";
import {useProductStore} from "../store/productStore";
import {asn1} from "node-forge";

function HomeScreen({navigation}: CompositeScreenProps<any, any>) {
    const {categories, fetchCategories} = useProductStore();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            await fetchCategories()
            setIsLoading(false);
        }
        getData();
    }, []);

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
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Furniture Categories</Text>
            <View style={styles.dashboard}>
                {categories.map(item => (
                    <TouchableOpacity
                        key={item.name}
                        style={styles.categoryItem}
                    >
                        <Image
                            style={styles.categoryImage}
                            source={{ uri: item.imageURL }}
                        />
                        <Text style={styles.categoryTitle}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    dashboard: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    categoryItem: {
        width: '48%', // Adjust for 2 columns
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 15,
        alignItems: 'center'
    },
    categoryImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover', // Or 'contain' depending on your preference
        marginBottom: 10
    },
    categoryTitle: {
        fontSize: 16
    }
})

export default HomeScreen;