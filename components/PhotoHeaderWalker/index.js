import React from 'react';
import { useSelector } from 'react-redux';
import { Image, StyleSheet, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PhotoHeaderWalker = () => {
  const navigation = useNavigation();

  const { walker } = useSelector(({ usersReducer }) => ({
    walker: usersReducer.walker,
  }));

  return (
    <TouchableHighlight onPress={() => navigation.navigate('Paseador')}>
      <Image
        style={styles.image}
        source={
          !!walker.photo
            ? { uri: walker.photo }
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

export default PhotoHeaderWalker;
