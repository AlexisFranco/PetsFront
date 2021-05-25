import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getPets } from '../../store/petsReducer';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from './styles';

import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  ActivityIndicator,
  Image,
} from 'react-native';
import { ListItemPet } from '../../components/ListItemPet';

function Client() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { loading, pets, pet, services } = useSelector(
    ({ usersReducer, petsReducer, servicesReducer }) => ({
      pets: petsReducer.pets,
      pet: petsReducer.pet,
      services: servicesReducer.services,
      loading: usersReducer.loading,
    })
  );

  useEffect(() => {
    dispatch(getPets());
  }, [pets.length, pet, services.length]);

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
                        : require('../../assets/photo-dog.png')
                    }
                  />
                )}
                {item.whatPet === 'Cat' && (
                  <Image
                    style={styles.image}
                    source={
                      !!item.photo
                        ? { uri: item.photo }
                        : require('../../assets/photo-cat.png')
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

export default Client;
