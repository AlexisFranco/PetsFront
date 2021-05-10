import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Client() {
  const [token, setToken] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('token')
    .then((token) => {
      setToken(token);
    });
  }, []);

  return (
    <SafeAreaView>
      <Text>Hola Cliente</Text>
      <Text>${token}</Text>
    </SafeAreaView>
  )
}

export default Client;
