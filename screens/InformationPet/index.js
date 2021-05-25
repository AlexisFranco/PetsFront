import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { getPet, updatePet } from '../../store/petsReducer';
import {
  MaterialIcons,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import styles from './styles'

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
            !!pet.photo
              ? { uri: pet.photo }
              : require('../../assets/photo-dog.png')
          }
        />
      )}
      {pet.whatPet === 'Cat' && (
        <Image
          style={styles.image}
          source={
            !!pet.photo
              ? { uri: pet.photo }
              : require('../../assets/photo-cat.png')
          }
        />
      )}
      <View style={styles.eachItem}>
        <MaterialIcons name="pets" size={24} color="#438E92" />
        <Text style={styles.text}>{pet.name}</Text>
      </View>
      <View style={styles.eachItem}>
        <FontAwesome name="birthday-cake" size={24} color="#438E92" />
        <Text style={styles.text}>{pet.dateBirth}</Text>
      </View>
      <View style={styles.eachItem}>
        <FontAwesome5 name="weight" size={24} color="#438E92" />
        <Text style={styles.text}>
          {pet.weight} (actual) / {pet.idealWeight} (ideal)
        </Text>
      </View>
      <View style={styles.eachItem}>
        {pet.whatPet === 'Dog' ? (
          <MaterialCommunityIcons name="dog-side" size={30} color="#438E92" />
        ) : (
          <FontAwesome5 name="cat" size={24} color="#438E92" />
        )}
        <Text style={styles.text}>{pet.breed}</Text>
      </View>
      <Ionicons
        style={styles.iconCamera}
        name="ios-camera"
        size={24}
        color="#438E92"
        onPress={handlePickImage}
      />
    </SafeAreaView>
  );
}

export default InformationPet;
