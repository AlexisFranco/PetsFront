import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createMedicine } from '../../store/medicinesReducer';
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
import { Fontisto, Ionicons } from '@expo/vector-icons';
import styles from './styles';

function CreateMedicine() {
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [initDate, setInitDate] = useState('');
  const [initHour, setInitHour] = useState('');
  const [date, setDate] = useState(new Date());
  const [repetition, setRepetition] = useState('');
  const [whatMedicine, setWhatMedicine] = useState('');
  const route = useRoute();
  const dispatch = useDispatch();
  const petID = route.params.idPet;
  const navigation = useNavigation();

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
    dispatch(
      createMedicine(
        name,
        whatMedicine,
        dose,
        initHour,
        initDate,
        repetition,
        petID,
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
          <Fontisto
            style={styles.iconPills}
            name="pills"
            size={70}
            color="#438E92"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Nombre del medicamento"
            onChangeText={(text) => setName(text)}
            value={name}
            autoCapitalize="none"
          />
          <RNPickerSelect
            style={picker}
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
          <TextInput
            style={styles.textInput}
            placeholder="Repetition"
            onChangeText={(text) => setRepetition(text)}
            value={repetition}
            autoCapitalize="none"
          />
          <View style={styles.viewDate}>
            <TextInput
              style={styles.textInput}
              placeholder="Fecha de la primera dosis"
              value={initDate}
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
              placeholder="Hora de la primera dosis"
              value={initHour}
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
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={{ color: 'white' }}>Agrega la medicina</Text>
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

export default CreateMedicine;
