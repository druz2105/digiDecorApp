import {Text, TouchableOpacity} from "react-native";
import {CompositeScreenProps} from "@react-navigation/core/src/types";
import { Ionicons } from '@expo/vector-icons';

export const UserProfileHeaderButton = ({navigation}: {navigation: any }) => {
    // Implement the button component for the user profile
    // You can use TouchableOpacity or any other component for the button
    return (
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
            <Ionicons name="person" size={24} color="black" />
        </TouchableOpacity>
);
};