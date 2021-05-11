import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  FlatList,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import { links } from '../linksClient';

function Client() {
  const [token, setToken] = useState('');
  const [ownPets, setOwnPets] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('token').then((token) => {
      setToken(token);
      console.log(token);

      axios({
        method: 'GET',
        baseURL: 'http://192.168.10.12:8000',
        url: '/pets',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(({ data: { pets } }) => {
          //setOwnPets(pets)
          console.log(pets)
        })
        .catch((error) => console.log(error));
    });
  }, [token]);


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={links}
        renderItem={({ item }) => (
          <Pressable style={styles.item} onPress={() => alert(item.name)}>
            <Text>
              <Ionicons name={item.icon} size={32} color="black" />
            </Text>
            <Text>{item.name}</Text>
            <Text>
              <Ionicons name="arrow-forward" size={24} color="black" />{' '}
            </Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
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
