import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import { createUser } from '../../store/usersReducer';
import styles from './styles';

import {
  Text,
  Image,
  Keyboard,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [selectedTypeUser, setSelectedTypeUser] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function handleSubmit() {
    dispatch(
      createUser(name, email, password, phoneNum, selectedTypeUser, navigation)
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accesible={false}>
        <SafeAreaView style={styles.area}>
          <Image
            source={require('../../assets/pets.png')}
            style={styles.image}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Nombre Completo"
            onChangeText={(text) => setName(text)}
            value={name}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Correo electrónico"
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Contraseña"
            onChangeText={(text) => setPassword(text)}
            value={password}
            textContentType="password"
            secureTextEntry
          />
          <TextInput
            style={styles.textInput}
            placeholder="Teléfono"
            onChangeText={(text) => setPhoneNum(text)}
            value={phoneNum}
            keyboardType="numeric"
          />
          <RNPickerSelect
            style={picker}
            onValueChange={(value) => setSelectedTypeUser(value)}
            placeholder={{
              label: 'Selecciona tu usuario',
              value: null,
            }}
            items={[
              { label: 'Usuario', value: 'clients' },
              { label: 'Paseador', value: 'walkers' },
            ]}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text>Registrarse</Text>
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

export default Register;
