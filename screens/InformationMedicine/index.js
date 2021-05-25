import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, Text, FlatList, View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  Fontisto,
  MaterialCommunityIcons,
  FontAwesome5,
  Ionicons,
} from '@expo/vector-icons';
import { getMedicines } from '../../store/medicinesReducer';
import styles from './styles';

function InformationMedicine() {
  const route = useRoute();
  const idPet = route.params.infoPet._id;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { medicines } = useSelector(({ medicinesReducer }) => ({
      medicines: medicinesReducer.medicines,
    })
  );

  useEffect(() => {
    dispatch(getMedicines(`petID=${idPet}`));
  }, [medicines.length]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={medicines}
        renderItem={({ item }) => (
          <View style={styles.infoMedicine}>
            <View style={styles.info}>
              <Fontisto name="pills" size={45} color="#438E92" />
              <Text style={styles.textInfoMed}>{item.name}</Text>
            </View>
            <View style={styles.options}>
              <View style={styles.eachItem}>
                <MaterialCommunityIcons name="pill" size={18} color="#438E92" />
                <Text style={styles.textOptions}>{item.dose}</Text>
              </View>
              <View style={styles.eachItem}>
                <FontAwesome5
                  name="briefcase-medical"
                  size={18}
                  color="#438E92"
                />
                <Text style={styles.textOptions}>{item.whatMedicine}</Text>
              </View>
              <View style={styles.eachItem}>
                <Ionicons name="time-outline" size={18} color="#438E92" />
                <Text style={styles.textOptions}>{item.repetition}</Text>
              </View>
              <View style={styles.eachItem}>
                <Ionicons name="timer-outline" size={18} color="#438E92" />
                <Text style={styles.textOptions}>{item.initHour}</Text>
              </View>
              <View style={styles.eachItem}>
                <Fontisto name="date" size={18} color="#438E92" />
                <Text style={styles.textOptions}>{item.initDate}</Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
      <View style={styles.plus}>
        <FontAwesome5
          name="plus"
          size={20}
          color="white"
          onPress={() => navigation.navigate('Crear Medicina', { idPet })}
        />
      </View>
    </SafeAreaView>
  );
}

export default InformationMedicine;
