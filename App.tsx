import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {CommonNavigator} from "./routes/CommonNavigator";

export default function App() {
  return (
      <NavigationContainer>
        <CommonNavigator></CommonNavigator>
      </NavigationContainer>
  );
}
