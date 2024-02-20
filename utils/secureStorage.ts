import * as SecureStore from 'expo-secure-store';

export async function setSecureStorageData(key: string, value: string) {
    console.log(key, value, "setSecureStorageData>>>>>>>>>")
    await SecureStore.setItemAsync(key, value);
}

export async function getSecureStorageData(key: string) {
    return  await SecureStore.getItemAsync(key)
}

export async function deleteSecureStorageData(key: string) {
    await SecureStore.deleteItemAsync(key)
}
