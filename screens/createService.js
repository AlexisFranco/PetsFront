import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { REACT_NATIVE_SERVER_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Button,
  Text,
} from 'react-native';

function CreateService() {
  const [token, setToken] = useState('');
  const [initLoc, setInitLoc] = useState('');
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [time, setTime] = useState('');
  const [cost, setCost] = useState('');
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const dateTime = new Date();
  const route = useRoute();
  const petID = route.params.petID;
  const walkerID = route.params.walkerID;
  const costHour = route.params.cost;
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
      mode === 'date' ? setDate(dateFormat) : setHour(hour);
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
    console.log(time*costHour)
    console.log(initLoc, time, hour, date, petID, walkerID)
    axios({
      method: 'POST',
      baseURL: SERVER_URL,
      url: 'services',
      data: {
        initLoc,
        time,
        cost,
        hour,
        date,
        petID,
        walkerID,
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accesible={false}>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Inicio de paseo"
          onChangeText={(text) => setInitLoc(text)}
          value={initLoc}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Tiempo de paseo (En horas)"
          onChangeText={(text) => {
            setTime(text);
            setCost(text*costHour );
          }}
          value={time}
          keyboardType="numeric"
        />
        <Text>Costo del paseo por hora: {costHour}</Text>
        {!!time && (<Text>El costo del paseo es: {cost}</Text>)}
        <Text>{hour}</Text>
        <Text>{date}</Text>
        <Button onPress={showDatepicker} title="Fecha del paseo" />
        <Button onPress={showTimepicker} title="Hora del paseo" />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={dateTime}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <Button title="Solicita el paseo" onPress={handleSubmit} />
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

export default CreateService;
