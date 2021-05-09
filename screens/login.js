import React, { useState } from 'react';
import {
  View,
  Button,
  TextInput,
} from 'react-native';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    alert(`${email} ${password}`)
  }

  return (
    <View>
      <TextInput
        placeholder="Ingresa tu correo electrónico"
        onChangeText={(text) => setEmail(text)}
        value={email}
        textAlign="center"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
      />
      <TextInput
        placeholder="Ingresa tu contraseña"
        onChangeText={(text) => setPassword(text)}
        value={password}
        textAlign="center"
        textContentType="password"
        secureTextEntry
      />
      <Button title="Ingresar" onPress={handleSubmit} />
    </View>
  );
}

export default Login;
