import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, FlatList, View, Text, StyleSheet } from 'react-native';

function InformationClient() {
  const route = useRoute();
  const client = route.params.client

  return (
    !!client && (
      <SafeAreaView style={styles.container}>
        <Text>{client.name}</Text>
        <Text>{client.address}</Text>
        <Text>{client.email}</Text>
        <Text>{client.phoneNum}</Text>
        <Text>Mascotas</Text>
        <FlatList
          data={client.petIDs}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
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

export default InformationClient;
