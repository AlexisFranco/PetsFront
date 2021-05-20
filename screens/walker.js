import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, FlatList, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getWalkers } from '../store/usersReducer';
import { getServices, updateService } from '../store/servicesReducer';

function Walker() {
  const route = useRoute();
  const idWalker = route.params.id;
  const dispatch = useDispatch()

  const { loading, walker, services } = useSelector(({ usersReducer, servicesReducer }) => ({
      walker: usersReducer.walker,
      loading: usersReducer.loading,
      services: servicesReducer.services,
    })
  );

  useEffect(() => {
    dispatch(getWalkers(`_id=${idWalker}`))
    dispatch(getServices(`walkerID=${idWalker}`));
  }, [services.length]);

  function handleChange(_id, status, index){
    status === 'Solicitado' ?
      dispatch(updateService({ status: 'Aceptado' }, _id, index))
      :
      dispatch(updateService({ status: 'Terminado' }, _id, index));
  }

  function handleCancel(_id, index) {
    const status = { status: 'Cancelado' };
    dispatch(updateService(status, _id, index));
  }

  if (loading) return <ActivityIndicator />;
  return (
    !!walker && (
      <SafeAreaView style={styles.container}>
        <Text>{walker.name}</Text>
        <Text>{walker.email}</Text>
        <Text>{walker.phoneNum}</Text>
        <Text>{walker.zone}</Text>
        {!!services && (
          <FlatList
            data={services}
            renderItem={({ item, index }) =>
              item.status !== 'Cancelado' && (
                <View>
                  <Text>Nombre mascota: {item.petID.name}</Text>
                  <Text>Dirección: {item.initLoc}</Text>
                  <Text>Fecha: {item.date}</Text>
                  <Text>Hora de paseo: {item.hour}</Text>
                  <Text>Tiempo de paseo: {item.time}</Text>
                  <Text>Estado del paseo: {item.status}</Text>
                  {item.status !== 'Terminado' && (
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          handleChange(item._id, item.status, index)
                        }
                      >
                        {item.status === 'Solicitado' ? (
                          <Text>Aceptar paseo</Text>
                        ) : (
                          <Text>Indica que terminó el paseo</Text>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleCancel(item._id, index)}
                      >
                        <Text>Cancelar paseo</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  <View style={styles.linedivider}></View>
                </View>
              )
            }
            keyExtractor={(item) => item._id}
          />
        )}
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
  linedivider: {
    width: '85%',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  }
});

export default Walker;
