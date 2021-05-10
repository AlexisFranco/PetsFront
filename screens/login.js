import React, { useState } from 'react';
import axios from 'axios';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
} from 'react-native';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    axios({
      method: 'POST',
      baseURL: 'http://localhost:8000',
      url: '/users/signin',
      data: {
        email,
        password,
      },
    })
      .then(({ data }) => alert(data.token))
      .catch(() => alert('Algo salió mal'))
  }

  return (
    <View>
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
      <Button title="Ingresar" onPress={() => handleSubmit()} />
    </View>
  );
}

const styles = StyleSheet.create({
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
