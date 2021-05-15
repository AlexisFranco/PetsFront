import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../store/usersReducer';
import { getPets } from '../store/petsReducer';

import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
  Pressable,
  Button,
  ActivityIndicator,
} from 'react-native';
import { ListItemPet } from '../components/ListItemPet';

function Client() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { loading, client, pets } = useSelector(({ usersReducer, petsReducer }) => ({
    client: usersReducer.client,
    pets: petsReducer.pets,
    loading: usersReducer.loading,
  }));

  useEffect(() => {
    dispatch(getUser());
    dispatch(getPets());
  }, [pets.length]);

  if (loading) return <ActivityIndicator />;
  return (
    !!pets && (
      <SafeAreaView style={styles.container}>
        <Pressable
          style={styles.item}
          onPress={() => navigation.navigate('Información', { client })}
        >
          <Text>Información</Text>
        </Pressable>
        <FlatList
          data={pets}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name}</Text>
              <ListItemPet infoPet={item} />
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
        <Button
          title="Agregar mascota"
          onPress={() => navigation.navigate('Crear Mascota')}
        />
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});

export default Client;
