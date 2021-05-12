import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, FlatList, View, Text, StyleSheet } from 'react-native';

function Walker() {
  const [token, setToken] = useState('');
  const [walker, setWalker] = useState([]);
  const route = useRoute();
  const idWalker = route.params.id;

    useEffect(() => {
      AsyncStorage.getItem('token').then((token) => {
        setToken(token);

        axios({
          method: 'GET',
          baseURL: 'http://192.168.10.12:8000',
          url: `/walkers?_id=${idWalker}`,
        })
          .then(({ data: { walkers } }) => {
            setWalker(walkers);
          })
          .catch((error) => console.log(error));
      });
    }, [token]);

  return (
    !!walker && (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={walker}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.email}</Text>
              <Text>{item.phoneNum}</Text>
              <Text>{item.zone}</Text>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});

export default Walker;
