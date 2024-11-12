import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import DraggableFlatList, {RenderItemParams} from 'react-native-draggable-flatlist';
import ReRenderPlaceItem from './ReRenderPlaceItem';
import {Day, Place} from '../../types';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../../router/Navigator';

const {width} = Dimensions.get('window');

type DetailsNavigationProp = StackNavigationProp<RootStackParamList, 'TravelItinerary'>;

interface ReRenderDayItemProps {
  item: Day;
  handleDragEnd: (data: Place[], dayId: string) => void;
}

const ReRenderDayItem = ({item, handleDragEnd}: ReRenderDayItemProps) => {
  const springConfig = {
    damping: 20,
    stiffness: 100,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
  };

  const navigation = useNavigation<DetailsNavigationProp>();

  const gotoItinerary = () => {
    navigation.navigate('ReItinerary', {dayId: item.id});
  };

  const handleDeletePlace = (placeId: string) => {
    const updatedPlaces = item.places.filter(place => place.id !== placeId);
    handleDragEnd(updatedPlaces, item.id);
  };

  return (
    <View style={styles.dayContainer}>
      <View style={styles.dayHeader}>
        <Image source={require('../../assets/imgs/calendar.png')} style={styles.calendarIcon} />
        <Text style={styles.dayText}>{item.day}</Text>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <DraggableFlatList
        data={item.places || []}
        renderItem={(params: RenderItemParams<Place>) => (
          <ReRenderPlaceItem {...params} onDelete={handleDeletePlace} />
        )}
        keyExtractor={(place: Place) => place.id}
        onDragEnd={({data}) => handleDragEnd(data, item.id)}
        ListEmptyComponent={<View />}
        activationDistance={10}
        animationConfig={springConfig}
      />
      <TouchableOpacity style={styles.addButton} onPress={gotoItinerary}>
        <Text style={styles.addButtonText}>장소 추가</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  dayContainer: {
    padding: 12,
    borderRadius: 8,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  calendarIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  dateText: {
    fontSize: 14,
    color: '#999999',
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: '#fff',
    borderColor: '#418663',
    borderWidth: 1,
    width: (width * 6) / 18,
    padding: 5,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    alignSelf: 'flex-end',
  },
  addButtonText: {
    color: '#418663',
    fontWeight: 'bold',
  },
});

export default ReRenderDayItem;
