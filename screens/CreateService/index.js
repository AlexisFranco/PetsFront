import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { MaterialCommunityIcons, Fontisto, Ionicons } from '@expo/vector-icons';
import { createService } from '../../store/servicesReducer';
import styles from './styles'

import {
  Text,
  View,
  Button,
  Keyboard,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

function CreateService() {
  const [date, setDate] = useState('');
  const [hour, setHour] = useState('');
  const [time, setTime] = useState('');
  const [cost, setCost] = useState('');
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [initLoc, setInitLoc] = useState('');
  const route = useRoute();
  const dateTime = new Date();
  const petID = route.params.petID;
  const costHour = route.params.cost;
  const walkerID = route.params.walkerID;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || initDate;
    setShow(Platform.OS === 'ios');
    const dateFormat = format(currentDate, 'P', { locale: es });
    const min = currentDate.getMinutes();
    let hour;
    if (min.toString().length === 1) {
      const num = '0' + min;
      hour = currentDate.getHours() + ':' + num;
    } else {
      hour = currentDate.getHours() + ':' + currentDate.getMinutes();
    }
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
    dispatch(
      createService(
        initLoc,
        time,
        cost,
        hour,
        date,
        petID,
        walkerID,
        navigation
      )
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accesible={false}>
        <SafeAreaView style={styles.area}>
          <MaterialCommunityIcons
            style={styles.iconWalk}
            name="dog-service"
            size={80}
            color="#438E92"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Dirección donde inicia el paseo"
            onChangeText={(text) => setInitLoc(text)}
            value={initLoc}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Tiempo de paseo (En horas)"
            onChangeText={(text) => {
              setTime(text);
              setCost(text * costHour);
            }}
            value={time}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.textInput}
            value={`Costo del paseo por hora: ${costHour / 1000}.000 COP`}
            editable={false}
          />
          {!!time && (
            <TextInput
              style={styles.textInput}
              value={`El costo del paseo es: ${cost / 1000}.000 COP`}
              editable={false}
            />
          )}
          <View style={styles.viewDate}>
            <TextInput
              style={styles.textInput}
              placeholder="Fecha del paseo"
              value={date}
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
          <View style={styles.viewDate}>
            <TextInput
              style={styles.textInput}
              placeholder="Hora del paseo"
              value={hour}
              editable={false}
            />
            <Ionicons
              style={styles.iconDate}
              name="time-outline"
              size={24}
              color="#438E92"
              onPress={showTimepicker}
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
              value={dateTime}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={{ color: 'white' }}>Solicita el paseo</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

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

export default CreateService;
