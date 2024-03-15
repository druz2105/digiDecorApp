import {createNativeStackNavigator} from "@react-navigation/native-stack"
import WelcomeScreen from "../app/screens/WelcomeScreen";
import RegisterScreen from "../app/screens/RegisterScreen";
import LoginScreen from "../app/screens/LoginScreen";
import UserProfileScreen from "../app/screens/UserProfileScreen";
import HomeScreen from "../app/screens/HomeScreen";
import {authStore} from "../app/store/authStore";
import React, {useEffect, useState} from "react";
import {ActivityIndicator, TouchableOpacity, View} from "react-native";
import {UserProfileHeaderButton} from "../app/common/UserProfileHeaderIcon";
import ProductListScreen from "../app/screens/Product.List.Screen";
import {CommonNavigatorParamList} from "../services/interfaces/common-screens";
import ProductDetailScreen from "../app/screens/Product.Detail.Screen";
import {HeaderBackButton} from "@react-navigation/elements";


const Stack = createNativeStackNavigator<CommonNavigatorParamList>();

export function CommonNavigator() {
    const {isAuthenticated, authenticateUser} = authStore();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const authenticate = async () => {
            setIsLoading(true)
            await authenticateUser()
            setTimeout(()=>{}, 10000)
            setIsLoading(false)
        }
        if(!isAuthenticated){
            authenticate()
        }
    }, []);
    if(isLoading){
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
    return (
        <Stack.Navigator initialRouteName={!isAuthenticated ? "Welcome": "Home"}>
            {!isAuthenticated
                ?
                <>
                    <Stack.Screen
                        name="Welcome"
                        component={WelcomeScreen}
                        options={{ headerBackVisible: false }}
                    />
                    <Stack.Screen
                        name="Register"
                        component={RegisterScreen}
                        options={{ headerBackVisible: false }}
                    />
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerBackVisible: false }}
                    />
                </>
                :
                <>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={({ navigation }) => ({
                            headerBackVisible: false,
                            headerRight: () => (
                                <UserProfileHeaderButton navigation={navigation} />
                            ),
                        })}
                    />
                    <Stack.Screen
                        name="UserProfile"
                        component={UserProfileScreen}
                    />
                    <Stack.Screen name="ProductListScreen" component={ProductListScreen} options={(navigation) => ({
                        headerBackVisible: false,
                    })}/>
                    <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} options={(navigation) => ({
                        headerBackVisible: false,
                    })}/>
                </>
            }
        </Stack.Navigator>
    );
}
