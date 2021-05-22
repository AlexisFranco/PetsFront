import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getPets } from '../store/petsReducer';
import { FontAwesome5 } from '@expo/vector-icons';

import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { ListItemPet } from '../components/ListItemPet';

function Client() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { loading, pets } = useSelector(({ usersReducer, petsReducer }) => ({
    pets: petsReducer.pets,
    loading: usersReducer.loading,
  }));

  useEffect(() => {
    dispatch(getPets());
  }, [pets.length]);

  if (loading) return <ActivityIndicator />;
  return (
    !!pets && (
      <SafeAreaView style={styles.container}>
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
        <FontAwesome5
          name="plus"
          size={24}
          color="black"
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
