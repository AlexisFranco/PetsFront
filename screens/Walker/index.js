import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { updateWalker } from '../../store/usersReducer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

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

  return (
    !!walker && (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.image}
          source={
            !!photo ? { uri: photo } : require('../../assets/photo-person.png')
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
          placeholder="Costo de la caminata por hora"
          onChangeText={(text) => setCost(text)}
          value={cost}
          keyboardType="numeric"
          editable={edit}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Horario de caminata (8-17)"
          onChangeText={(text) => setWorkingHours(text)}
          value={workingHours}
          editable={edit}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Una breve descripción de ti"
          onChangeText={(text) => setDescription(text)}
          value={description}
          editable={edit}
        />
        { edit === false && (
          <Text>{zone}</Text>
        )}
        { edit === true && (
          <RNPickerSelect
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

export default Walker;
