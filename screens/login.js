import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../store/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  Text,
  View,
  Image,
  Keyboard,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accesible={false}>
        <SafeAreaView style={styles.area}>
          <Image source={require('../assets/pets.png')} style={styles.image} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  area: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ECEAD2',
    justifyContent: 'center',
  },
  textInput: {
    width: '85%',
    height: 40,
    borderColor: '#D9D4DC',
    borderBottomWidth: 1,
    marginBottom: 36,
    marginLeft: 15,
    marginRight: 15,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 100,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#438E92',
    marginTop: 20,
    padding: 10,
    width: '85%',
  },
  register: {
    marginTop: 100,
    flexDirection: 'row',
  },
  textRegister: {
    fontWeight: 'bold',
  },
});

export default Login;
