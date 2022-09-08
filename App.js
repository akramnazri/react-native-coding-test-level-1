import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import ContactUs from './src/screens/ContactUs';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Welcome' }}
          />
        <Stack.Screen
            name="Contact Us"
            component={ContactUs}
            options={{ title: 'Contact Us' }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


