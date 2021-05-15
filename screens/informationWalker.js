import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, Text, StyleSheet, FlatList, View, Button } from 'react-native';

function InformationWalker() {
  const route = useRoute();
  const [walkers, setWalkers] = useState([]);
  const navigation = useNavigation();

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
            <Button
              title="Solicita un paseo para tu mascota"
              onPress={() => navigation.navigate('Crear Paseo', {
                petID: route.params.infoPet._id,
                walkerID: item._id,
                cost: item.cost
              })}
            />
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
