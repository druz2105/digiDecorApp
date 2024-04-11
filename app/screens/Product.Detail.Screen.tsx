import React, {useCallback, useEffect, useState} from 'react'
import {
    ActivityIndicator, Button,
    Image,
    RefreshControl,
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
import {FontAwesome} from '@expo/vector-icons';

interface ProductDetailProps {
    navigation: StackNavigationProp<CommonNavigatorParamList, 'ProductDetailScreen'>;
    route: RouteProp<CommonNavigatorParamList, 'ProductDetailScreen'>;
}

function ProductDetailScreen({navigation, route}: ProductDetailProps) {
    const {product, errorMessage, fetchProductById, likeProduct, unlikeProduct} = useProductStore();
    const [isLoading, setIsLoading] = useState(false);
    const [view3D, setView3D] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const { id } = route.params;

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchProductById(id);
        setRefreshing(false);
    }, []);

    const handleLikeProduct = async (productId: string)=>{
        setIsLoading(true)
        await likeProduct(productId)
        await fetchProductById(productId)
        setIsLoading(false)
    }

    const handleUnLikeProduct = async (productId: string)=>{
        setIsLoading(true)
        await unlikeProduct(productId)
        await fetchProductById(productId)
        setIsLoading(false)
    }

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            await fetchProductById(id)
            setIsLoading(false)
        }
        getData();
    }, []);

    if(isLoading || !product){
        return (
            <View
                style={styles.container}
            >
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
    if (view3D){
        return <View></View>
    }
    return (
            <ScrollView contentContainerStyle={styles.dashboard} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{product.name}</Text>
                    <TouchableOpacity onPress={() => product.likedProduct ? handleUnLikeProduct(product.id) : handleLikeProduct(product.id)}>
                        <FontAwesome name="heart" size={24} color={product.likedProduct ? 'red' : 'gray'} style={styles.button}/>
                    </TouchableOpacity>
                </View>
                {product.imageURLs && product.imageURLs.map((url: string) => (
                    <Image source={{ uri: url }} style={styles.categoryImage} key={url} />
                ))}
                <View style={styles.sectionContainer}>
                    {product.modelURL ?
                    <TouchableOpacity style={styles.bigBlueButton} onPress={()=>{setView3D(true)}}>
                        <Text style={{ color: 'white' }}>View in 3D</Text>
                    </TouchableOpacity> : ''}
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.title}>About Product</Text>
                        <Text style={styles.description}>
                            {product.description}
                        </Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.title}>Dimensions</Text>
                        <Text style={styles.description}>
                            {product.dimensions}
                        </Text>
                    </View>
                </View>
            </ScrollView>
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
        marginTop: 75,
        marginHorizontal: 20
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 10
    },
    descriptionContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
        marginBottom: 50
    },
    text: {
        fontSize: 24, // Adjust the font size as needed
        marginTop: 20, // Adjust the margin top as needed
    },
    button: {
        marginLeft: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'flex-start', // Align to the left
    },
    description: {
        fontSize: 16,
        fontWeight: 'normal',
        alignSelf: 'flex-start', // Align to the left
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
        height: 500,
        resizeMode: 'cover', // Or 'contain' depending on your preference
        marginBottom: 10
    },
    categoryTitle: {
        fontSize: 16
    },
    sectionContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    bigBlueButton: {
        width: '100%',
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center'
    },
})

export default ProductDetailScreen;