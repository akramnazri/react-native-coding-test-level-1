import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {useState, useEffect, Component} from 'react';


const ViewPokemon = ({route, navigation}) => {
    const { name,pokemonData } = route.params;
    const [pokemonDetail, setPokemonDetail] = useState(false);
    useEffect(() => {
        //call this function when enter the page
        getPokemonData();
    }, [])

    //get pokemon detail data
    const getPokemonData = () => {
        fetch(pokemonData, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((res) => {
            setPokemonDetail(res)
        })
        .catch((error) => console.error(error));
    }
  
// pokemon detail main page
  return (
    <View style={styles.container}>
        {pokemonDetail == false? (
            <ActivityIndicator size="large" />
        ) : (
            <View >
                <Text>Pokemon Id: {pokemonDetail.id}</Text>
                <Text>Pokemon Name: {name}</Text>
                {pokemonDetail.abilities.map((value,key)=>
                <Text>Ability {key + 1}: {value.ability.name}</Text>)}
                {pokemonDetail.forms.map((value,key)=>
                <Text>Form {key + 1}: {value.name}</Text>)}
                {pokemonDetail.types.map((value,key)=>
                <Text>Type {key + 1}: {value.type.name}</Text>)}
                <Text>Height (cm): {pokemonDetail.height}0</Text>
                <Text>Weight (kg): {pokemonDetail.weight}</Text>

            </View>
        )}
    </View>);
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginTop: '20%',
    alignItems: 'center',
    alignSelf:'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6',
    borderRadius: 10
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

export default ViewPokemon;

