import React from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';

function Walker() {

  const { loading, walker } = useSelector(
    ({ usersReducer }) => ({
      walker: usersReducer.walker,
      loading: usersReducer.loading,
    })
  );

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
