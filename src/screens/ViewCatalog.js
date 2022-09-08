
import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable, Modal, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import * as React from 'react';
import {useState, useEffect} from 'react';

const ViewCatalog = ({navigation}) => {
    useEffect(() => {
        //call this function when enter the page
        getPokemon(0,10);
    }, [])
    const [pokemonList, setPokemonList] = useState(false);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);

    //get list of pokemon
    const getPokemon = (getoffset,getlimit) => {
        setPokemonList(false);
        fetch('https://pokeapi.co/api/v2/pokemon/?offset='+getoffset+'&limit='+getlimit, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        .then((res) => {
            setPokemonList(res.results)
       })
        .catch((error) => console.error(error));
    }
  
    //item that in flatlist
    const renderItem = ({item}) => {
        return(
            <View style={styles.itemView}>
                <Text style={styles.itemText}>{item.name}
                </Text>
                <Pressable style={[styles.button, styles.buttonOpen]} onPress={() =>
                    navigation.navigate('View Pokemon',{
                    name: item.name,
                    pokemonData: item.url})}>
                    <Text>View</Text>
                </Pressable>
                
            </View>)
    }

    //view catalog main page 
  return (
    <SafeAreaView style={styles.container}>
        {pokemonList == false? (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        ) : (
        <FlatList
            data={pokemonList}
            renderItem={renderItem}
        />  )}
        <View style={styles.footerContainer}>
            <Pressable style={[styles.button, styles.previousButton]} disabled={offset==0?true:false} onPress={()=>{setOffset(offset-limit); getPokemon(offset-limit,limit)}}>
                <Text> {'<'} Previous </Text>
            </Pressable>
            <Pressable style={[styles.button, styles.nextButton]} onPress={()=>{setOffset(offset+limit); getPokemon(offset+limit,limit)}}>
                <Text> Next {'>'} </Text>
            </Pressable>
        </View>
    </SafeAreaView>
  );
};

export default ViewCatalog;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
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
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
       
    },
    buttonOpen: {
        backgroundColor: "#ADDFFF",
        alignSelf:'flex-end',
    },
    buttonClose: {
        backgroundColor: "#FD1C03",
    },
    itemView: {
        backgroundColor:'#F0FFFF',
        justifyContent:'space-between',
        alignSelf:'center',
        alignItems: 'flex-start',
        width: '90%',
        height: 60,
        display: 'flex',
        margin:10,
        flexDirection:'row',
        flexWrap: 'wrap',
        padding:10
    },
    itemText: {
        margin :10,
        elevation: 10,
        width:'50%'
    },
    footerContainer: {
        height:60,
        justifyContent:'space-between',
        flexDirection:'row',
        flexWrap: 'wrap',
        padding:10
    },
    nextButton:{
        backgroundColor:'#f9c2ff',
        alignSelf: 'flex-end'
    },
    previousButton:{
        backgroundColor:'#f9c2ff',
    }
  });


