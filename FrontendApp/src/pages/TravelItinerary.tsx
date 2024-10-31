import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../router/Navigator';

type TravelItineraryNavigationProp = StackNavigationProp<RootStackParamList>;

const TravelItinerary = () => {
  const navigation = useNavigation<TravelItineraryNavigationProp>();

  const goToRecommend = () => {
    navigation.navigate('RecommendedPlace');
  };

  const goToCreateSchedule = () => {
    navigation.navigate('CreateSchedule');
  };

  const goToTravelChallenge = () => {
    navigation.navigate('TravelChallenge');
  };

  return (
    <View>
      <Text>대전, 여행왔슈?</Text>

      <TouchableOpacity onPress={goToRecommend}>
        <Text>대전관광지</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToCreateSchedule}>
        <Text>일정추가</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goToTravelChallenge}>
        <Text>추천코스</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TravelItinerary;
