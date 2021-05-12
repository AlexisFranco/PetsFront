import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, Text, StyleSheet, FlatList, View } from 'react-native';

function InformationWalker() {
  const [walkers, setWalkers] = useState([])
  useEffect(() => {
    axios({
      method: 'GET',
      baseURL: 'http://192.168.10.12:8000',
      url: '/walkers',
    })
      .then(({ data: {walkers} }) => setWalkers(walkers))
      .catch((error) => console.log(error));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={walkers}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>{item.phoneNum}</Text>
            <Text>{item.cost}</Text>
            <Text>{item.zone}</Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    fontSize: 12,
    alignItems: 'center',
  },
});

export default InformationWalker;
