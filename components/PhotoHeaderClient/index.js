import React from 'react';
import { useSelector } from 'react-redux';
import { Image, StyleSheet, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PhotoHeaderClient = () => {
  const navigation = useNavigation();

  const { client } = useSelector(({ usersReducer }) => ({
    client: usersReducer.client,
  }));

  return (
    <TouchableHighlight onPress={() => navigation.navigate('Información')}>
      <Image
        style={styles.image}
        source={
          !!client.photo
            ? { uri: client.photo }
            : require('../../assets/photo-person.png')
        }
      />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
  },
});

export default PhotoHeaderClient;
