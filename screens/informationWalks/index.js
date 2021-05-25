import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  MaterialCommunityIcons,
  Entypo,
  Fontisto,
  Ionicons,
} from '@expo/vector-icons';
import { getServices} from '../../store/servicesReducer';
import styles from './styles';

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
              <View style={styles.infoService}>
                <View style={styles.infoColumn}>
                  <View style={styles.eachItem}>
                    <MaterialCommunityIcons
                      name="walk"
                      size={20}
                      color="#438E92"
                    />
                    <Text style={styles.text}>{item.walkerID.name}</Text>
                  </View>
                  <View style={styles.eachItem}>
                    <Entypo name="home" size={18} color="#438E92" />
                    <Text style={styles.text}>{item.initLoc}</Text>
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
                </View>
                <View style={styles.infoColumn}>
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
                </View>
              </View>
            )
          }
          keyExtractor={(item) => item._id}
        />
      )}
    </SafeAreaView>
  );
}

export default InformationWalks;
