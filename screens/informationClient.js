import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, View, Text, StyleSheet, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { getClient, updateClient } from '../store/usersReducer';

function InformationClient() {
  const [cameraRollPermission, setCameraRollPermission] = useState('denied');
  const dispatch = useDispatch();

  const { client, photoClient } = useSelector(({ usersReducer }) => ({
      photoClient: usersReducer.client.photo,
      client: usersReducer.client,
    })
  );

  useEffect(() => {
    ImagePicker.requestMediaLibraryPermissionsAsync().then(({ status }) =>
      setCameraRollPermission(status)
    );
    dispatch(getClient());
  }, [photoClient]);

  async function handlePickImage() {
    try {
      const dataImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
      });

      const photo = new FormData();
      photo.append('photo', {
        ...dataImage,
        name: `photo_${Math.ceil(Math.random() * 10000)}.jpg`,
      })
      dispatch(updateClient(photo))
    } catch (err) {
      console.dir(err)
    }
  }

  if (cameraRollPermission === 'denied') {
    return (
      <View style={styles.container}>
        <Text>You need camera roll permissions to use this app</Text>
      </View>
    );
  }

  return (
    !!client && (
      <SafeAreaView style={styles.container}>
        <Image style={styles.image} source={{ uri: client.photo }} />
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
        <Button title="Pick Image" onPress={handlePickImage} />
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
  image: {
    width: 300,
    height: 300,
  },
});

export default InformationClient;
