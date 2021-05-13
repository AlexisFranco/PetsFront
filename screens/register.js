import axios from 'axios';
import React, { useState } from 'react';
import { REACT_NATIVE_SERVER_URL } from '@env';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [phone, setPhone] = useState(0);
  const SERVER_URL = REACT_NATIVE_SERVER_URL;
  const navigation = useNavigation();

  function handleSubmit() {

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
          onChangeText={(num) => setPhone(num)}
          value={phone}
          keyboardType="numeric"
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
