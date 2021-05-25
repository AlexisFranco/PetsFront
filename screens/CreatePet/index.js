import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createPet } from '../../store/petsReducer';
import { Fontisto } from '@expo/vector-icons';
import styles from './styles'

import {
  Text,
  View,
  Image,
  Keyboard,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

function CreatePet() {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [weight, setWeight] = useState('');
  const [whatPet, setWhatPet] = useState('');
  const [dateBirth, setDateBirth] = useState('');
  const [idealWeight, setIdealWeight] = useState('');
  const date = new Date();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateBirth;
    setShow(Platform.OS === 'ios');
    const dateFormat = format(currentDate, 'P', { locale: es });
    setDateBirth(dateFormat);
  };

  const showDatepicker = () => {
    setShow((prevShow) => !prevShow);
    setMode('date');
  };

  function handleSubmit() {
    dispatch(
      createPet(
        name,
        whatPet,
        dateBirth,
        weight,
        idealWeight,
        breed,
        navigation
      )
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss;
        setShow(false);
      }}
      accesible={false}
    >
      <SafeAreaView style={styles.container}>
        <Image source={require('../../assets/pets.png')} style={styles.image} />
        <TextInput
          style={styles.textInput}
          placeholder="Nombre de tu mascota"
          onChangeText={(text) => setName(text)}
          value={name}
          autoCapitalize="none"
        />
        <RNPickerSelect
          style={pickerWhatPet}
          onValueChange={(value) => setWhatPet(value)}
          placeholder={{
            label: 'Selecciona que tipo de mascota tienes',
            value: null,
          }}
          items={[
            { label: 'Perro/a', value: 'Dog' },
            { label: 'Gato/a', value: 'Cat' },
          ]}
        />
        <View style={styles.viewDate}>
          <TextInput
            style={styles.textInput}
            placeholder="Fecha de nacimiento de tu mascota"
            value={dateBirth}
            editable={false}
          />
          <Fontisto
            style={styles.iconDate}
            name="date"
            size={24}
            color="#438E92"
            onPress={showDatepicker}
          />
        </View>
        {show && (
          <DateTimePicker
            style={{
              width: 400,
              left: 135,
              marginBottom: 36,
            }}
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <TextInput
          style={styles.textInput}
          placeholder="Peso actual de tu mascota"
          onChangeText={(text) => setWeight(text)}
          value={weight}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Peso ideal de tu mascota"
          onChangeText={(text) => setIdealWeight(text)}
          value={idealWeight}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Raza de tu mascota"
          onChangeText={(text) => setBreed(text)}
          value={breed}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={{ color: 'white' }}>Crea tu mascota</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const pickerWhatPet = StyleSheet.create({
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

export default CreatePet;
