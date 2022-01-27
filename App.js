import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TapNavigator from './screens/TapNavigator'

const StackMainNavigator = createNativeStackNavigator();

const navOptionHandler = ()=>({
  headerShown: false
})

export default function App() {
  return (
    <NavigationContainer>
      <StackMainNavigator.Navigator>
        <StackMainNavigator.Screen name="HomeTap" component={TapNavigator} options={navOptionHandler}  />
      </StackMainNavigator.Navigator>
    </NavigationContainer>
  );
}

