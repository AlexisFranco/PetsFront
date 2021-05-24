import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, FlatList, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getWalkers } from '../store/usersReducer';
import { getServices, updateService } from '../store/servicesReducer';
import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

function ServiceWalker() {
  const route = useRoute();
  const idWalker = route.params.id;
  const dispatch = useDispatch()

  const { loading, services } = useSelector(({ usersReducer, servicesReducer }) => ({
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
    !!services && (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={services}
          renderItem={({ item, index }) =>
            item.status !== 'Cancelado' && (
              <View style={styles.infoService}>
                <View style={styles.infoPet}>
                  {item.petID.whatPet === 'Dog' && (
                    <View>
                      <Image
                        style={styles.image}
                        source={
                          !!item.petID.photo
                            ? { uri: item.petID.photo }
                            : require('../assets/photo-dog.png')
                        }
                      />
                    </View>
                  )}
                  {item.petID.whatPet === 'Cat' && (
                    <Image
                      style={styles.image}
                      source={
                        !!item.petID.photo
                          ? { uri: item.petID.photo }
                          : require('../assets/photo-cat.png')
                      }
                    />
                  )}
                  <Text style={styles.textPet}>{item.petID.name}</Text>
                </View>
                <View style={styles.options}>
                  <View style={styles.eachItem}>
                    <Entypo name="home" size={18} color="#438E92" />
                    <Text style={styles.text}>{item.initLoc}</Text>
                  </View>
                  <View style={styles.eachItem}>
                    <Fontisto name="date" size={18} color="#438E92" />
                    <Text style={styles.text}>{item.date}</Text>
                  </View>
                  <View style={styles.eachItem}>
                    <Ionicons name="time-outline" size={18} color="#438E92" />
                    <Text style={styles.text}>{item.hour}</Text>
                  </View>
                  <View style={styles.eachItem}>
                    <Ionicons name="timer-outline" size={18} color="#438E92" />
                    <Text style={styles.text}>
                      {item.time} hora{item.time === '1' ? '' : 's'}
                    </Text>
                  </View>
                  {item.status === 'Solicitado' && (
                    <View style={styles.eachItem}>
                      <Entypo name="progress-one" size={18} color="#438E92" />
                      <Text style={styles.text}>{item.status}</Text>
                    </View>
                  )}
                  {item.status === 'Aceptado' && (
                    <View style={styles.eachItem}>
                      <Entypo name="progress-two" size={18} color="#438E92" />
                      <Text style={styles.text}>{item.status}</Text>
                    </View>
                  )}
                  {item.status === 'Terminado' && (
                    <View style={styles.eachItem}>
                      <Entypo name="progress-full" size={18} color="#438E92" />
                      <Text style={styles.text}>{item.status}</Text>
                    </View>
                  )}
                  {item.status !== 'Terminado' && (
                    <View style={styles.button}>
                      <TouchableOpacity
                        style={styles.buttonProcess}
                        onPress={() =>
                          handleChange(item._id, item.status, index)
                        }
                      >
                        {item.status === 'Solicitado' ? (
                          <Text style={styles.textButton}>Aceptar</Text>
                        ) : (
                          <Text style={styles.textButton}>Terminado</Text>
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.buttonCancel}
                        onPress={() => handleCancel(item._id, index)}
                      >
                        <Text style={styles.textButton}>Cancelar</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            )
          }
          keyExtractor={(item) => item._id}
        />
      </SafeAreaView>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F2DC',
    justifyContent: 'center',
  },
  infoService: {
    flex: 1,
    width: '95%',
    backgroundColor: '#FAF9F0',
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    borderColor: '#438E92',
    borderWidth: 0.5,
  },
  infoPet: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 40,
    marginLeft: 10,
  },
  options: {
    flex: 3,
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderColor: '#438E92',
    borderWidth: 0.5,
  },
  eachItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 5
  },
  text: {
    marginLeft: 10,
  },
  textPet: {
    fontSize: 15,
    fontWeight: '500',
  },
  buttonProcess: {
    backgroundColor: '#438E92',
    marginTop: 5,
    marginRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
  },
  buttonCancel: {
    backgroundColor: '#FC1B3A',
    marginTop: 5,
    marginLeft: 10,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
  },
  textButton: {
    color: '#FAF9F0',
    fontWeight: 'bold',
  },
});

export default ServiceWalker;
