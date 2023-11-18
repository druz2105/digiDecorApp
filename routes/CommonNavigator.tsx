import {createNativeStackNavigator} from "@react-navigation/native-stack"
import WelcomeScreen from "../app/screens/WelcomeScreen";
import RegisterScreen from "../app/screens/RegisterScreen";
import LoginScreen from "../app/screens/LoginScreen";

type CommonNavigatorParamList = {
    Welcome: undefined;
    Register: undefined;
    Login: undefined;
};

const Stack = createNativeStackNavigator<CommonNavigatorParamList>();

export function CommonNavigator() {
    return (
    <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerBackVisible: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerBackVisible: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerBackVisible: false }}/>
    </Stack.Navigator>
    );
}