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
  Image,
} from 'react-native';
import { ListItemPet } from '../components/ListItemPet';

function Client() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { loading, pets, pet } = useSelector(({ usersReducer, petsReducer }) => ({
    pets: petsReducer.pets,
    pet: petsReducer.pet,
    loading: usersReducer.loading,
  }));

  useEffect(() => {
    dispatch(getPets());
  }, [pets.length, pet]);

  if (loading) return <ActivityIndicator />;
  return (
    !!pets && (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={pets}
          renderItem={({ item, index }) => (
            <View style={styles.onePet}>
              <View style={styles.infoPet}>
                {item.whatPet === 'Dog' && (
                  <Image
                    style={styles.image}
                    source={
                      !!item.photo
                        ? { uri: item.photo }
                        : require('../assets/photo-dog.png')
                    }
                  />
                )}
                {item.whatPet === 'Cat' && (
                  <Image
                    style={styles.image}
                    source={
                      !!item.photo
                        ? { uri: item.photo }
                        : require('../assets/photo-cat.png')
                    }
                  />
                )}
                <Text style={styles.text}>{item.name}</Text>
              </View>
              <View style={styles.options}>
                <ListItemPet infoPet={item} index={index} />
              </View>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
        <View style={styles.plus}>
          <FontAwesome5
            name="plus"
            size={20}
            color="white"
            onPress={() => navigation.navigate('Crear Mascota')}
          />
        </View>
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2DC',
    justifyContent: 'center',
  },
  onePet: {
    flex: 1,
    flexDirection: 'row',
    width: '95%',
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'rgba(250,249,240, 0.8)',
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    borderColor: '#438E92',
    borderWidth: 0.5,
  },
  infoPet: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
  },
  options: {
    flex: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderColor: '#438E92',
    borderWidth: 0.5,
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
  },
  plus: {
    backgroundColor: '#85C7B5',
    width: 45,
    height: 45,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    position: 'absolute',
    bottom: 40,
    right: 15,
  },
});

export default Client;
