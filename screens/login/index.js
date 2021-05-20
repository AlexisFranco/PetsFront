import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../../store/usersReducer';
import { useDispatch } from 'react-redux';
import {
  Text,
  View,
  Image,
  Keyboard,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './styles';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(loginUser(email, password, navigation));
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accesible={false}>
        <SafeAreaView style={styles.area}>
          <Image source={require('../../assets/pets.png')} style={styles.image} />
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
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text>Ingresar</Text>
          </TouchableOpacity>
          <View style={styles.register}>
            <Text>Aún no tienes una cuenta? </Text>
            <Text
              style={styles.textRegister}
              onPress={() => navigation.navigate('Registro')}
            >
              Registrate!
            </Text>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default Login;
