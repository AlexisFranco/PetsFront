import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getClient } from '../../store/usersReducer';

function EditClient() {
  const dispatch = useDispatch();

  const { client } = useSelector(({ usersReducer }) => ({
      photoClient: usersReducer.client.photo,
      client: usersReducer.client,
    })
  );

  useEffect(() => {
    dispatch(getClient());
  }, []);

  const [name, setName] = useState(client.name);
  const [phoneNum, setPhoneNum] = useState(client.phoneNum);
  const [address, setAddress] = useState(client.address);

  function handleChange() {
    console.log(name, phoneNum, address)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accesible={false}>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setName(text)}
          value={name}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setPhoneNum(text)}
          value={phoneNum}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setAddress(text)}
          value={address}
          editable={false}
          autoCapitalize="none"
        />
        <Button title="Pick Image" onPress={handleChange} />
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

export default EditClient;
