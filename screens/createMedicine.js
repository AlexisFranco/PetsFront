import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { REACT_NATIVE_SERVER_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useRoute } from '@react-navigation/native';

import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Button,
  Text,
} from 'react-native';

function CreateMedicine() {
  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [whatMedicine, setWhatMedicine] = useState('');
  const [dose, setDose] = useState('');
  const [initDate, setInitDate] = useState('');
  const [initHour, setInitHour] = useState('');
  const [date, setDate] = useState(new Date());
  const [repetition, setRepetition] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const route = useRoute();
  const petID = route.params.idPet;

  const SERVER_URL = REACT_NATIVE_SERVER_URL;
  const navigation = useNavigation();

  useEffect(() => {
    AsyncStorage.getItem('token').then((token) => {
      setToken(token);
    });
  }, [token]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || initDate;
    setShow(Platform.OS === 'ios');
    const dateFormat = format(currentDate, 'P', { locale: es });
    const hour = currentDate.getHours() + ':' + currentDate.getMinutes();
    mode === 'date' ? setInitDate(dateFormat) : setInitHour(hour);
  };

  const showMode = (currentMode) => {
    setShow((prevShow) => !prevShow);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  function handleSubmit() {
    console.log(name, whatMedicine, dose, initDate, initHour, repetition, petID);
    axios({
      method: 'POST',
      baseURL: SERVER_URL,
      url: 'medicines',
      data: {
        name,
        whatMedicine,
        dose,
        initHour,
        initDate,
        repetition,
        petID,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => console.dir(error));
  }

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss} accesible={false} >
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Nombre del medicamento"
          onChangeText={(text) => setName(text)}
          value={name}
          autoCapitalize="none"
        />
        <RNPickerSelect
          onValueChange={(value) => setWhatMedicine(value)}
          placeholder={{
            label: 'Selecciona el tipo de medicina',
            value: null,
          }}
          items={[
            { label: 'Vacuna', value: 'Vacuna' },
            { label: 'Desparasitante', value: 'Desparasitante' },
            { label: 'Medicina', value: 'Medicina' },
          ]}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Dosis (2 tabletas / 10 mg)"
          onChangeText={(text) => setDose(text)}
          value={dose}
          autoCapitalize="none"
        />
        <Button onPress={showDatepicker} title="Fecha de inicio" />
        <Button onPress={showTimepicker} title="Hora de la primera dosis" />
        <Text>{initDate}</Text>
        <Text>{initHour}</Text>
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
          placeholder="Repetition"
          onChangeText={(text) => setRepetition(text)}
          value={repetition}
          autoCapitalize="none"
        />
        <Button title="Agregar medicina" onPress={handleSubmit} />
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

export default CreateMedicine;
