import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Text,
  View,
  Pressable,
  StyleSheet,
} from 'react-native';

export function ListItemPet(infoPet) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.item}
        onPress={() =>
          navigation.navigate('Mascota', { infoPet: infoPet })
        }
      >
        <MaterialIcons name="pets" size={24} color="#438E92" />
        <Text>Mascota</Text>
        <MaterialIcons name="arrow-forward-ios" size={24} color="#438E92" />
      </Pressable>

      <Pressable
        style={styles.item}
        onPress={() =>
          navigation.navigate('Medicinas', { infoPet: infoPet.infoPet })
        }
      >
        <MaterialIcons name="medical-services" size={24} color="#438E92" />
        <Text>Medicinas</Text>
        <MaterialIcons name="arrow-forward-ios" size={24} color="#438E92" />
      </Pressable>

      {infoPet.infoPet.whatPet !== 'Cat' && (
        <Pressable
          style={styles.item}
          onPress={() =>
            navigation.navigate('Paseadores', { infoPet: infoPet.infoPet })
          }
        >
          <MaterialCommunityIcons name="walk" size={24} color="#438E92" />
          <Text>Paseadores</Text>
          <MaterialIcons name="arrow-forward-ios" size={24} color="#438E92" />
        </Pressable>
      )}

      {infoPet.infoPet.whatPet !== 'Cat' && (
        <Pressable
          style={styles.item}
          onPress={() =>
            navigation.navigate('Paseos', { infoPet: infoPet.infoPet })
          }
        >
          <MaterialCommunityIcons name="dog-service" size={24} color="#438E92" />
          <Text>Paseos</Text>
          <MaterialIcons name="arrow-forward-ios" size={24} color="#438E92" />
        </Pressable>
      )}

      <View style={styles.linedivider}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  item: {
    flex: 1,
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  linedivider: {
    width: '95%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    margin: 10,
  },
});
