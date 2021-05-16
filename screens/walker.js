import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, FlatList, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getWalker } from '../store/usersReducer';

function Walker() {
  const route = useRoute();
  const idWalker = route.params.id;
  const dispatch = useDispatch()

  const { loading, walker } = useSelector(
    ({ usersReducer }) => ({
      walker: usersReducer.walker,
      loading: usersReducer.loading,
    })
  );

  useEffect(() => {
    dispatch(getWalker(idWalker))
  }, []);

  if (loading) return <ActivityIndicator />;
  return (
    !!walker && (
      <SafeAreaView style={styles.container}>
        <Text>{walker.name}</Text>
        <Text>{walker.email}</Text>
        <Text>{walker.phoneNum}</Text>
        <Text>{walker.zone}</Text>
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});

export default Walker;
