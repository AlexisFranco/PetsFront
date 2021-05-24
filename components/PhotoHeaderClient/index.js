import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
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
    <TouchableOpacity onPress={() => navigation.navigate('Información')}>
      <Image
        style={styles.image}
        source={
          !!client.photo
            ? { uri: client.photo }
            : require('../../assets/photo-person.png')
        }
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginRight: 15,
  },
});

export default PhotoHeaderClient;
