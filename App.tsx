import React, {useEffect} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {CommonNavigator} from "./routes/CommonNavigator";
import {authStore} from "./app/store/authStore"
import Toast, {BaseToast, BaseToastProps, ErrorToast} from 'react-native-toast-message';

const toastConfig = {
    success: (props: BaseToastProps) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: 'pink' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400'
            }}
        />
    ),
    error: (props: BaseToastProps) => (
        <ErrorToast
            {...props}
            text1Style={{
                fontSize: 17
            }}
            text2Style={{
                fontSize: 15
            }}
        />
    ),
};

export default function App() {
const { authenticateUser } = authStore();

    useEffect(() => {
        authenticateUser();
    }, []);

  return (
      <NavigationContainer>
          <Toast config={toastConfig} />
          <CommonNavigator></CommonNavigator>
      </NavigationContainer>
  );
}
