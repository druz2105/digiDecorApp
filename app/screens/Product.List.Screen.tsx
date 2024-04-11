import React, {useCallback, useEffect, useState} from 'react'
import {
    ActivityIndicator,
    Image, RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {useProductStore} from "../store/productStore";
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CommonNavigatorParamList} from "../../services/interfaces/common-screens";

interface ProductListProps {
    navigation: StackNavigationProp<CommonNavigatorParamList, 'ProductListScreen'>;
    route: RouteProp<CommonNavigatorParamList, 'ProductListScreen'>;
}

function ProductListScreen({navigation, route}: ProductListProps) {
    const {products, fetchProductByCategory} = useProductStore();
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const { categoryId, categoryName } = route.params;

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchProductByCategory(categoryId);
        setRefreshing(false);
    }, []);

    useEffect(() => {
        const getData = async () => {
            await fetchProductByCategory(categoryId)
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
            <Text style={styles.title}>{categoryName}</Text>
            <ScrollView contentContainerStyle={styles.dashboard} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                {products.map(item => (
                    <TouchableOpacity
                        key={item.name}
                        style={styles.categoryItem}
                        onPress={()=>{
                            navigation.navigate('ProductDetailScreen', { id: item.id });
                        }}
                    >
                        {item.modelURL && <Text>3D Available</Text>}
                        <Image
                            style={styles.categoryImage}
                            source={{ uri: item.imageURL }}
                        />
                        <Text style={styles.categoryTitle}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
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

export default ProductListScreen;