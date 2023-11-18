import AsyncStorage from '@react-native-async-storage/async-storage';


export const setStorageData = async (key: string, token: string) => {
    try {
        await AsyncStorage.setItem(key, token);
    } catch (error) {
        console.error('Error storing token:', error);
    }
};

export const getStorageData = async (key: string) => {
    try {
        await AsyncStorage.getItem(key);
    } catch (error) {
        console.error('Error storing token:', error);
    }
};