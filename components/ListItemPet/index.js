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
        <MaterialIcons style={styles.iconLeft} name="pets" size={24} color="#438E92" />
        <Text style={styles.text}>Mascota</Text>
        <MaterialIcons style={styles.iconRight} name="arrow-forward-ios" size={24} color="#438E92" />
      </Pressable>

      <Pressable
        style={styles.item}
        onPress={() =>
          navigation.navigate('Medicinas', { infoPet: infoPet.infoPet })
        }
      >
        <MaterialIcons style={styles.iconLeft} name="medical-services" size={24} color="#438E92" />
        <Text style={styles.text}>Medicinas</Text>
        <MaterialIcons style={styles.iconRight} name="arrow-forward-ios" size={24} color="#438E92" />
      </Pressable>

      {infoPet.infoPet.whatPet !== 'Cat' && (
        <Pressable
          style={styles.item}
          onPress={() =>
            navigation.navigate('Paseadores', { infoPet: infoPet.infoPet })
          }
        >
          <MaterialCommunityIcons style={styles.iconLeft} name="walk" size={24} color="#438E92" />
          <Text style={styles.text}>Paseadores</Text>
          <MaterialIcons style={styles.iconRight} name="arrow-forward-ios" size={24} color="#438E92" />
        </Pressable>
      )}

      {infoPet.infoPet.whatPet !== 'Cat' && (
        <Pressable
          style={styles.item}
          onPress={() =>
            navigation.navigate('Paseos', { infoPet: infoPet.infoPet })
          }
        >
          <MaterialCommunityIcons style={styles.iconLeft} name="dog-service" size={24} color="#438E92" />
          <Text style={styles.text}>Paseos</Text>
          <MaterialIcons style={styles.iconRight} name="arrow-forward-ios" size={24} color="#438E92" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    paddingLeft: 5,
  },
  text: {
    flex: 5,
    textAlign: 'center',
  },
  iconLeft: {
    flex: 1,
    paddingLeft: 10,
  },
  iconRight: {
    flex:1,
  },
});
