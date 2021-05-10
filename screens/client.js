import React from 'react';
import { SafeAreaView, FlatList, Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { links } from '../linksClient';

function Client() {

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={links}
        renderItem={({ item }) => (
          <Pressable
            style={styles.item}
            onPress={() => alert(item.name)}
            >
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
  }
});
export default Client;
