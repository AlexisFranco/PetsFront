import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, TouchableHighlight } from 'react-native';
import { getClient } from '../../store/usersReducer';

const PhotoHeaderClient = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { client } = useSelector(({ usersReducer }) => ({
    client: usersReducer.client,
  }));

  useEffect(() => {
    dispatch(getClient());
  }, []);

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
