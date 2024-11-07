import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../../router/Navigator';

const {width} = Dimensions.get('window');

type DetailsNavigationProp = StackNavigationProp<RootStackParamList, 'TravelChallenge'>;

const Details = () => {
  const navigation = useNavigation<DetailsNavigationProp>();

  const goToTravelChallenge = () => {
    navigation.navigate('TravelChallenge');
  };

  return (
    <View style={styles.container}>
      <Text>현수의 대전 여행</Text>
      <TouchableOpacity style={styles.button} onPress={goToTravelChallenge}>
        <Text style={styles.buttonText}>추천 코스로 이동</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    paddingHorizontal: width * 0.06,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#418663',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Details;
