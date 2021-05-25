import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Entypo, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { getWalkers } from '../../store/usersReducer';
import styles from './styles';

function InformationWalker() {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { walkers } = useSelector(({ usersReducer }) => ({
    walkers: usersReducer.walkers,
  }));
  useEffect(() => {
    dispatch(getWalkers());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={walkers}
        renderItem={({ item }) => (
          <View style={styles.infoWalker}>
            <View style={styles.info}>
              <Image
                style={styles.image}
                source={
                  !!item.photo
                    ? { uri: item.photo }
                    : require('../../assets/photo-person.png')
                }
              />
              <Text style={styles.text}>{item.name}</Text>
            </View>
            <View style={styles.options}>
              <View style={styles.eachItem}>
                <Entypo name="phone" size={18} color="#438E92" />
                <Text style={styles.text}>{item.phoneNum}</Text>
              </View>
              {!!item.description && (
                <View style={styles.eachItem}>
                  <Ionicons name="reader" size={18} color="#438E92" />
                  <Text style={styles.text}>{item.description}</Text>
                </View>
              )}
              {!!item.workingHours && (
                <View style={styles.eachItem}>
                  <Ionicons name="time-outline" size={20} color="#438E92" />
                  <Text style={styles.text}>Horario: {item.workingHours}</Text>
                </View>
              )}
              {!!item.cost && (
                <View style={styles.eachItem}>
                  <FontAwesome5 name="money-bill" size={15} color="#438E92" />
                  <Text style={styles.text}>{item.cost / 1000}.000 COP</Text>
                </View>
              )}
              {!!item.zone && (
                <View style={styles.eachItem}>
                  <Entypo name="location-pin" size={18} color="#438E92" />
                  <Text style={styles.text}>{item.zone}</Text>
                </View>
              )}
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate('Crear Paseo', {
                    petID: route.params.infoPet._id,
                    walkerID: item._id,
                    cost: item.cost,
                  })
                }
              >
                <Text style={{ color: 'white' }}>Solicita un paseo</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
}

export default InformationWalker;
