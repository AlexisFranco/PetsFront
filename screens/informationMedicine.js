import React from 'react';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, Text, StyleSheet, FlatList, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function InformationMedicine() {
  const route = useRoute();
  const medicines = route.params.infoPet.medicineIDs;
  const idPet = route.params.infoPet._id;
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={medicines}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.dose}</Text>
            <Text>{item.whatMedicine}</Text>
            <Text>{item.repetition}</Text>
            <Text>
              {item.initHour} / {item.initDate}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
      <Button
        title="Agregar medicina"
        onPress={() => navigation.navigate('Crear Medicina', { idPet })}
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

export default InformationMedicine;
