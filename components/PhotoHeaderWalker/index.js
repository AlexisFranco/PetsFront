import React from 'react';
import { useSelector } from 'react-redux';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PhotoHeaderWalker = () => {
  const navigation = useNavigation();

  const { walker } = useSelector(({ usersReducer }) => ({
    walker: usersReducer.walker,
  }));

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Paseador')}>
      <Image
        style={styles.image}
        source={
          !!walker.photo
            ? { uri: walker.photo }
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
    borderColor: '#438E92',
    borderWidth: 0.5,
  },
});

export default PhotoHeaderWalker;
