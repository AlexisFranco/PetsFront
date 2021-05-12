import React from 'react';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

function InformationPet() {
  const route = useRoute();
  const pet = route.params.infoPet;
  console.log(pet)
  return (
    <SafeAreaView style={styles.container}>
      <Text>{pet.name}</Text>
      <Text>{pet.dateBirth}</Text>
      <Text>{pet.weight}/{pet.idealWeight}</Text>
      <Text>{pet.breed}</Text>
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


export default InformationPet;
