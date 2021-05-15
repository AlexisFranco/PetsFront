import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createPet } from '../store/petsReducer';

import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Button,
  Text,
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
        navigation,
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
        <TextInput
          style={styles.textInput}
          placeholder="Nombre de tu mascota"
          onChangeText={(text) => setName(text)}
          value={name}
          autoCapitalize="none"
        />
        <RNPickerSelect
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
        <Text>{dateBirth}</Text>
        <Button
          onPress={showDatepicker}
          title="Ingresa la fecha de nacimiento de tu mascota"
        />
        {show && (
          <DateTimePicker
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
        <Button title="Agregar mascosta" onPress={handleSubmit} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  textInput: {
    height: 40,
    borderColor: '#D9D4DC',
    borderBottomWidth: 1,
    marginBottom: 36,
    marginLeft: 15,
    marginRight: 15,
  },
});

export default CreatePet;
