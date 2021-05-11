import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import { links } from '../../linksClient';

export function ListItemPet(item) {
  return (
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
  )
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
