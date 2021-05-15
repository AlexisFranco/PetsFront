import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
} from 'react-native';
import { ListItemPet } from '../components/ListItemPet';

function Client() {
  const [token, setToken] = useState('');
  const [client, setClient] = useState({})
  const [ownPets, setOwnPets] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('token').then((token) => {
      setToken(token);

      axios({
        method: 'GET',
        baseURL: 'http://192.168.10.12:8000',
        url: '/clients',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(({ data: {client} }) => {
          setClient(client)
          setOwnPets(client.petIDs)
        })
        .catch((error) => console.log(error));
    });
  }, []);

  return (
    !!ownPets && (
      <SafeAreaView style={styles.container}>
        <Pressable
          style={styles.item}
          onPress={() => navigation.navigate('Información', { client })}
        >
          <Text>Información</Text>
        </Pressable>
        <FlatList
          data={ownPets}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <ListItemPet infoPet={item} />
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
        <Button
          title="Agregar mascota"
          onPress={() => navigation.navigate('Crear Mascota')}
        />
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});

export default Client;
