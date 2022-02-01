import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConsultScreen from './screens/consult/ConsultScreen';
import TapNavigator from './screens/TapNavigator'
import EditScreen from './screens/edit/EditScreen';

const StackMainNavigator = createNativeStackNavigator();

const navOptionHandler = ()=>({
  headerShown: false
})

export default function App() {
  return (
    <NavigationContainer>
      <StackMainNavigator.Navigator>
        <StackMainNavigator.Screen name="HomeTap" component={TapNavigator} options={navOptionHandler}  />
        <StackMainNavigator.Screen name="Consult" component={ConsultScreen}   /> 
        <StackMainNavigator.Screen name="Edit" component={EditScreen}   /> 
      </StackMainNavigator.Navigator>
    </NavigationContainer>
  );
}

