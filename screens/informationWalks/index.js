import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../../store/servicesReducer';

function InformationWalks() {
  const route = useRoute();
  const petID = route.params.infoPet._id;
  const dispatch = useDispatch();

  const { services } = useSelector(({ servicesReducer }) => ({
      loading: servicesReducer.loading,
      services: servicesReducer.services,
    })
  );

  useEffect(() => {
    dispatch(getServices(`petID=${petID}`));
  }, [services.length]);

  return (
    <SafeAreaView style={styles.container}>
      {!!services && (
        <FlatList
          data={services}
          renderItem={({ item }) =>
            item.status !== 'Cancelado' && (
              <View>
                <Text>Nombre paseador: {item.walkerID.name}</Text>
                <Text>Dirección: {item.initLoc}</Text>
                <Text>Fecha: {item.date}</Text>
                <Text>Hora de paseo: {item.hour}</Text>
                <Text>Tiempo de paseo: {item.time}</Text>
                <Text>Estado del paseo: {item.status}</Text>
                <View style={styles.linedivider}></View>
              </View>
            )
          }
          keyExtractor={(item) => item._id}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    fontSize: 12,
    alignItems: 'center',
  },
  linedivider: {
    width: '85%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  },
});

export default InformationWalks;
