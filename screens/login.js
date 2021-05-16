import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../store/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { loading } = useSelector(({ usersReducer }) => ({
    loading: usersReducer.loading,
  }))

  function handleSubmit() {
    dispatch(loginUser(email, password, navigation));
  }

  if (loading) return <ActivityIndicator />;
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
        <Button
          title="Registrarse"
          onPress={() => navigation.navigate('Registro')}
        />
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
