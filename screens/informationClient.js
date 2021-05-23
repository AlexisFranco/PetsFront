import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { getClient, updateClient } from '../store/usersReducer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

function InformationClient() {

  const { client, photoClient } = useSelector(({ usersReducer }) => ({
    photoClient: usersReducer.client.photo,
    client: usersReducer.client,
  }));

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [address, setAddress] = useState(client.address);
  const [phoneNum, setPhoneNum] = useState(client.phoneNum);
  const [changePhoto, setChangePhoto] = useState(false);
  const [photo, setPhoto] = useState(client.photo);
  const [image, setImage] = useState({});
  const [cameraRollPermission, setCameraRollPermission] = useState('denied');
  const dispatch = useDispatch();

  useEffect(() => {
    ImagePicker.requestMediaLibraryPermissionsAsync().then(({ status }) =>
      setCameraRollPermission(status)
    );
    dispatch(getClient());
  }, [photoClient]);

  if (cameraRollPermission === 'denied') {
    return (
      <View style={styles.container}>
        <Text>You need camera roll permissions to use this app</Text>
      </View>
    );
  }

  async function handleSave() {
    setEdit(false);
    const data = new FormData();
    data.append('name', name);
    client.email !== email && (data.append('email', email));
    client.phoneNum !== phoneNum && (data.append('phoneNum', phoneNum));
    client.address !== address && (data.append('address', address));
    changePhoto === true && (
      data.append('photo', {
        ...image,
        name: `photo_${Math.ceil(Math.random() * 10000)}.jpg`,
      }));
    dispatch(updateClient(data));
    setChangePhoto(false);
  }

  async function handleCancel() {
    setEdit(false);
    setChangePhoto(false);
    setName(client.name);
    setEmail(client.email);
    setPhoneNum(client.phoneNum);
    setAddress(client.address);
    setPhoto(client.photo);
  }

  async function handlePickImage() {
    try {
      const dataImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
      });
      if(dataImage.cancelled === false) {
        setImage(dataImage);
        setPhoto(dataImage.uri);
        setChangePhoto(true);
      } else {
        setPhoto(client.photo);
      }
    } catch (err) {
      console.dir(err)
    }
  }

  return (
    !!client && (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.image}
          source={
            !!photo ? { uri: photo } : require('../assets/photo-person.png')
          }
        />
        <TextInput
          style={styles.textInput}
          placeholder="Nombre Completo"
          onChangeText={(text) => setName(text)}
          value={name}
          autoCapitalize="none"
          editable={edit}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Correo electrónico"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          editable={edit}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Teléfono"
          onChangeText={(text) => setPhoneNum(text)}
          value={phoneNum}
          keyboardType="numeric"
          editable={edit}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Dirección"
          onChangeText={(text) => setAddress(text)}
          value={address}
          editable={edit}
        />
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
        { edit === true && (
          <View>
            <Ionicons
              name="ios-camera"
              size={24}
              color="black"
              onPress={handlePickImage}
            />
            <TouchableOpacity onPress={handleSave}>
              <Text>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
        { edit === false && (
          <MaterialCommunityIcons
            name="pencil-outline"
            size={24}
            color="black"
            onPress={() => setEdit(true)}
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
  image: {
    width: 300,
    height: 300,
  },
});

export default InformationClient;
