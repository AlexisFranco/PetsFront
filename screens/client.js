import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { ListItemPet } from '../components/ListItemPet';

function Client() {
  const [token, setToken] = useState('');
  const [ownPets, setOwnPets] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('token').then((token) => {
      setToken(token);

      axios({
        method: 'GET',
        baseURL: 'http://192.168.10.12:8000',
        url: '/pets',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(({ data: { pets } }) => {
          setOwnPets(pets)
        })
        .catch((error) => console.log(error));
    });
  }, [token]);

  return !!ownPets && (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={ownPets}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <ListItemPet item={item}/>
          </View>
        )}
        keyExtractor={(item) => item._rid}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default Client;
