import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { updateWalker, logUserOut } from '../../store/usersReducer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Walker() {

  const { walker, photoWalker } = useSelector(({ usersReducer }) => ({
    photoWalker: usersReducer.walker.photo,
    walker: usersReducer.walker,
  }));

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(walker.name);
  const [email, setEmail] = useState(walker.email);
  const [phoneNum, setPhoneNum] = useState(walker.phoneNum);
  const [zone, setZone] = useState(walker.zone);
  const [description, setDescription] = useState(walker.description);
  const [cost, setCost] = useState(walker.cost);
  const [workingHours, setWorkingHours] = useState(walker.workingHours);
  const [changePhoto, setChangePhoto] = useState(false);
  const [photo, setPhoto] = useState(walker.photo);
  const [image, setImage] = useState({});
  const [cameraRollPermission, setCameraRollPermission] = useState('denied');
  const navigation = useNavigation();
  const dispatch = useDispatch();


  useEffect(() => {
    ImagePicker.requestMediaLibraryPermissionsAsync().then(({ status }) =>
      setCameraRollPermission(status)
    );
  }, [photoWalker]);

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
    walker.email !== email && (data.append('email', email));
    walker.phoneNum !== phoneNum && (data.append('phoneNum', phoneNum));
    walker.zone !== zone && data.append('zone', zone);
    walker.description !== description && data.append('description', description);
    walker.cost !== cost && data.append('cost', cost);
    walker.workingHours !== workingHours && data.append('workingHours', workingHours);
    changePhoto === true && (
      data.append('photo', {
        ...image,
        name: `photo_${Math.ceil(Math.random() * 10000)}.jpg`,
      }));
    dispatch(updateWalker(data));
    setChangePhoto(false);
  }

  async function handleCancel() {
    setEdit(false);
    setChangePhoto(false);
    setName(walker.name);
    setEmail(walker.email);
    setPhoneNum(walker.phoneNum);
    setZone(walker.zone);
    setDescription(walker.description);
    setCost(walker.cost);
    setWorkingHours(walker.workingHours);
    setPhoto(walker.photo);
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
        setPhoto(walker.photo);
      }
    } catch (err) {
      console.dir(err)
    }
  }

  async function logOut() {
    AsyncStorage.removeItem('token');
    dispatch(logUserOut());
    navigation.navigate('Ingreso');
  }

  return (
    !!walker && (
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
          placeholder="Costo de la caminata por hora"
          onChangeText={(text) => setCost(text)}
          value={cost}
          keyboardType="numeric"
          editable={edit}
        />
        <TextInput
          style={edit ? styles.textInput : input.textInput}
          placeholder="Horario de caminata (8-17)"
          onChangeText={(text) => setWorkingHours(text)}
          value={workingHours}
          editable={edit}
        />
        <TextInput
          style={edit ? styles.textInput : input.textInput}
          placeholder="Una breve descripción de ti"
          onChangeText={(text) => setDescription(text)}
          value={description}
          editable={edit}
        />
        {edit === false && <Text style={{ marginTop: 10 }}>{zone}</Text>}
        {edit === true && (
          <RNPickerSelect
            style={picker}
            onValueChange={(value) => setZone(value)}
            placeholder={{
              label: 'Selecciona la zona de caminata',
              value: zone,
            }}
            disabled={!edit}
            items={[
              { label: 'Laureles', value: 'Laureles' },
              { label: 'Poblado', value: 'Poblado' },
              { label: 'Envigado', value: 'Envigado' },
            ]}
          />
        )}
        {edit === true && (
          <View style={styles.button}>
            <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
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

const picker = StyleSheet.create({
  inputIOS: {
    width: '85%',
    height: 40,
    backgroundColor: '#FAF9F0',
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 36,
    marginLeft: 32,
    marginRight: 15,
  },
  inputAndroid: {
    width: '85%',
    height: 40,
    backgroundColor: '#FAF9F0',
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 36,
    marginLeft: 32,
    marginRight: 15,
  },
});

export default Walker;
