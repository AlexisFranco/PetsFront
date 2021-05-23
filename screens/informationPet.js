import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { getPet, updatePet } from '../store/petsReducer';

function InformationPet() {
  const [cameraRollPermission, setCameraRollPermission] = useState('denied');
  const route = useRoute();
  const petID = route.params.infoPet.infoPet._id;
  const index = route.params.infoPet.index;
  const dispatch = useDispatch();

  const { pet } = useSelector(({ petsReducer }) => ({
    pet: petsReducer.pet,
  }));

  useEffect(() => {
    ImagePicker.requestMediaLibraryPermissionsAsync().then(({ status }) =>
      setCameraRollPermission(status)
    );
    dispatch(getPet(petID));
  }, []);

  if (cameraRollPermission === 'denied') {
    return (
      <View style={styles.container}>
        <Text>You need camera roll permissions to use this app</Text>
      </View>
    );
  }

  async function handlePickImage() {
    try {
      const dataImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (dataImage.cancelled === false) {
        const data = new FormData();
        data.append('petID', petID);
        data.append('photo', {
          ...dataImage,
          name: `photo_${Math.ceil(Math.random() * 10000)}.jpg`,
        });
        dispatch(updatePet(data, index));
      }
    } catch (err) {
      console.dir(err);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {pet.whatPet === 'Dog' && (
        <Image
          style={styles.image}
          source={
            !!pet.photo ? { uri: pet.photo } : require('../assets/photo-dog.png')
          }
        />
      )}
      {pet.whatPet === 'Cat' && (
        <Image
          style={styles.image}
          source={
            !!pet.photo ? { uri: pet.photo } : require('../assets/photo-cat.png')
          }
        />
      )}
      <Text>{pet.name}</Text>
      <Text>{pet.dateBirth}</Text>
      <Text>
        {pet.weight}/{pet.idealWeight}
      </Text>
      <Text>{pet.breed}</Text>
      <Text>{pet.whatPet}</Text>
      <Ionicons
        name="ios-camera"
        size={24}
        color="black"
        onPress={handlePickImage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    fontSize: 12,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default InformationPet;
