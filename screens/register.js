import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import { createUser } from '../store/usersReducer';

import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Button,
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
      createUser(
        name,
        email,
        password,
        phoneNum,
        selectedTypeUser,
        navigation
      )
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accesible={false}>
      <SafeAreaView style={styles.container}>
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
        <Button title="Registrarse" onPress={handleSubmit} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
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

export default Register;
