import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, FlatList } from 'react-native';

function Client() {
  const navigation = useNavigation();
  const links = [
    {
      'id': 1,
    },
    {
      'id': 2,
    },
    {
      'id': 3,
    },
  ]
  return (
    <SafeAreaView style={styles.container}>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  }
});
export default Client;
