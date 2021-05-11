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


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const SERVER_URL = REACT_NATIVE_SERVER_URL;
  const navigation = useNavigation();

  function handleSubmit() {
    axios({
      method: 'POST',
      baseURL: SERVER_URL,
      url: '/users/signin',
      data: {
        email,
        password,
      },
    })
      .then(({ data: { token, userType } }) => {
        if (userType === 'client') {
          AsyncStorage.setItem('token', token);
          navigation.navigate('Inicio');
        } else {
          alert('Es un paseador');
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accesible={false}>
      <SafeAreaView style={styles.container}>
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
        <Button title="Ingresar" onPress={handleSubmit} />
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

export default Login;
