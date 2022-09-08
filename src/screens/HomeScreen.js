import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeScreen = ({navigation}) => {
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() =>
        navigation.navigate('Contact Us')
      } >
                  <Text style={styles.buttonText}>Contact Us</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#82CAFF',
    alignItems: 'center',
    color: '#fff',
    height: 40,
    margin:10,
    width:'60%', 
    borderRadius:10

},
buttonText:{
    margin :10,
    elevation: 10,
   
},
});

export default HomeScreen;

