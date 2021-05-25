import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { getClient, updateClient, logUserOut } from '../../store/usersReducer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles'

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
  const navigation = useNavigation();
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
    client.email !== email && data.append('email', email);
    client.phoneNum !== phoneNum && data.append('phoneNum', phoneNum);
    client.address !== address && data.append('address', address);
    changePhoto === true &&
      data.append('photo', {
        ...image,
        name: `photo_${Math.ceil(Math.random() * 10000)}.jpg`,
      });
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

  async function logOut() {
    AsyncStorage.removeItem('token');
    dispatch(logUserOut());
    navigation.navigate('Ingreso');
  }

  async function handlePickImage() {
    try {
      const dataImage = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (dataImage.cancelled === false) {
        setImage(dataImage);
        setPhoto(dataImage.uri);
        setChangePhoto(true);
      } else {
        setPhoto(client.photo);
      }
    } catch (err) {
      console.dir(err);
    }
  }

  return (
    !!client && (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.image}
          source={
            !!photo ? { uri: photo } : require('../../assets/photo-person.png')
          }
        />
        {edit === true && <View style={styles.editPhoto} />}
        {edit === true && (
          <Ionicons
            style={styles.iconCamera}
            name="ios-camera"
            size={32}
            color="black"
            onPress={handlePickImage}
          />
        )}

        <TextInput
          style={edit ? styles.textInput : input.textInput}
          placeholder="Nombre Completo"
          onChangeText={(text) => setName(text)}
          value={name}
          autoCapitalize="none"
          editable={edit}
        />
        <TextInput
          style={edit ? styles.textInput : input.textInput}
          placeholder="Correo electrónico"
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          editable={edit}
        />
        <TextInput
          style={edit ? styles.textInput : input.textInput}
          placeholder="Teléfono"
          onChangeText={(text) => setPhoneNum(text)}
          value={phoneNum}
          keyboardType="numeric"
          editable={edit}
        />
        <TextInput
          style={edit ? styles.textInput : input.textInput}
          placeholder="Dirección"
          onChangeText={(text) => setAddress(text)}
          value={address}
          editable={edit}
        />
        {edit === true && (
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.buttonSave}
              onPress={handleSave}
            >
              <Text style={{ color: 'white' }}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={handleCancel}
            >
              <Text style={{ color: 'white' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}
        {edit === false && (
          <MaterialCommunityIcons
            style={styles.iconEdit}
            name="pencil-outline"
            size={24}
            color="#438E92"
            onPress={() => setEdit(true)}
          />
        )}
        {edit === false && (
          <TouchableOpacity
            style={styles.buttonLogOut}
            onPress={() => logOut()}
          >
            <Text style={{ color: 'white' }}>Cerrar sesión</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    )
  );
}

const input = StyleSheet.create({
  textInput: {
    width: '85%',
    height: 40,
    backgroundColor: '#F3F2DC',
    borderRadius: 10,
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    textAlign: 'center',
    fontSize: 15,
  },
});

export default InformationClient;
