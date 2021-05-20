import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, FlatList, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getWalkers } from '../store/usersReducer';

function Walker() {
  const route = useRoute();
  const idWalker = route.params.id;
  const dispatch = useDispatch()

  const { loading, walker, services } = useSelector(({ usersReducer }) => ({
      walker: usersReducer.walker,
      loading: usersReducer.loading,
      services: usersReducer.walker.serviceIDs,
    })
  );

  useEffect(() => {
    dispatch(getWalkers(`_id=${idWalker}`))
  }, []);

  if (loading) return <ActivityIndicator />;
  return (
    !!walker && (
      <SafeAreaView style={styles.container}>
        <Text>{walker.name}</Text>
        <Text>{walker.email}</Text>
        <Text>{walker.phoneNum}</Text>
        <Text>{walker.zone}</Text>
        {!!services && (
          <FlatList
            data={services}
            renderItem={({ item }) => (
              <View>
                <Text>Nombre mascota: {item.petID.name}</Text>
                <Text>Dirección: {item.initLoc}</Text>
                <Text>Fecha: {item.date}</Text>
                <Text>Hora de paseo: {item.hour}</Text>
                <Text>Tiempo de paseo: {item.time}</Text>
                <Text>Estado del paseo: {item.status}</Text>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />
        )}
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
