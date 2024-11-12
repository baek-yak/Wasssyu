import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StyleSheet,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../../router/Navigator';
import ReRenderDayItem from './ReRenderDayItem';
import {updateSchedule} from '../../api/itinerary';

const {width} = Dimensions.get('window');
type DetailedInquiryNavigationProp = StackNavigationProp<RootStackParamList, 'TravelItinerary'>;

type Place = {
  id: string;
  name: string;
  address: string;
};

type Day = {
  id: string;
  day: string;
  date: string;
  places: Place[];
};

const DetailedInquiry = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'DetailedInquiry'>>();
  console.log('Route Params:', route.params);

  const {itinerary = null, dayId, selectedPlace} = route.params || {};
  const [scheduleId, setScheduleId] = useState<number | null>(itinerary?.scheduleId ?? null);
  const navigation = useNavigation<DetailedInquiryNavigationProp>();

  const [tripName, setTripName] = useState(itinerary?.title || '여행 이름');
  const [isEditing, setIsEditing] = useState(false);
  const [dailyPlans, setDailyPlans] = useState<Day[]>([]);
  const [startDate] = useState(itinerary?.startDate || '');
  const [endDate] = useState(itinerary?.endDate || '');

  useEffect(() => {
    if (itinerary && itinerary.scheduleId) {
      setScheduleId(itinerary.scheduleId);
    }
  }, [itinerary]);

  // 날짜 차이를 계산하여 "Day X"로 업데이트하는 함수
  const updateDaysBasedOnStartDate = (plans: Day[]) => {
    const start = new Date(startDate);
    return plans.map((plan, _index) => {
      const current = new Date(plan.date);
      const diffInDays = Math.floor((current.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return {
        ...plan,
        day: `Day ${diffInDays + 1}`, // startDate 기준으로 1일부터 시작
      };
    });
  };

  useEffect(() => {
    if (itinerary) {
      const plans = itinerary.dailyPlans.map(plan => ({
        id: plan.planId.toString(),
        day: `Day ${plan.planId}`, // 초기 "Day X" 값 설정
        date: plan.date,
        places: plan.touristSpots.map(spot => ({
          id: spot.spotId.toString(),
          name: spot.spotName,
          address: spot.spotAddress,
        })),
      }));

      const updatedPlans = updateDaysBasedOnStartDate(plans);

      if (selectedPlace && dayId) {
        const updatedWithSelectedPlace = updatedPlans.map(day => {
          if (day.id === dayId) {
            return {
              ...day,
              places: [...day.places, selectedPlace],
            };
          }
          return day;
        });

        setDailyPlans(updatedWithSelectedPlace);
        console.log(
          'Updated dailyPlans with selectedPlace:',
          JSON.stringify(updatedWithSelectedPlace, null, 2),
        );
      } else {
        setDailyPlans(updatedPlans);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itinerary, selectedPlace, dayId]);

  useEffect(() => {
    console.log('Current scheduleId:', scheduleId);
  }, [scheduleId, dailyPlans, selectedPlace, dayId, tripName, isEditing]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleTextChange = (text: string) => {
    setTripName(text);
  };

  const handleDragEnd = (data: Place[], dayId: string) => {
    setDailyPlans(prevPlans =>
      prevPlans.map(day => (day.id === dayId ? {...day, places: data} : day)),
    );
  };

  const handleUpdateSchedule = async () => {
    if (!scheduleId) {
      Alert.alert('오류!', '유효한 일정 ID가 없습니다.');
      return;
    }

    const formattedPlans = dailyPlans.map(day => ({
      date: day.date,
      spotIds: day.places.map(place => place.id),
    }));

    const requestData = {
      scheduleId,
      title: tripName,
      startDate,
      endDate,
      dailyPlans: formattedPlans,
    };

    try {
      const response = await updateSchedule(scheduleId, requestData);
      if (response) {
        Alert.alert('수정 완료', '일정이 성공적으로 수정되었습니다.');
        navigation.navigate('TravelItinerary'); // 수정 후 여행 일정 화면으로 이동
      }
    } catch (error) {
      Alert.alert('오류', '일정 수정 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  const renderFooter = () => (
    <TouchableOpacity style={styles.updateButton} onPress={handleUpdateSchedule}>
      <Text style={styles.updateButtonText}>수정하기</Text>
    </TouchableOpacity>
  );

  const renderDaySection = ({item}: {item: Day}) => (
    <View style={styles.daySection}>
      <View style={styles.Divider} />
      <ReRenderDayItem item={item} handleDragEnd={handleDragEnd} />
    </View>
  );

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.topDivider} />

        <View style={styles.content}>
          <View style={styles.header}>
            {isEditing ? (
              <>
                <TextInput
                  value={tripName}
                  onChangeText={handleTextChange}
                  style={styles.tripNameInput}
                  autoFocus
                />
                <TouchableOpacity onPress={handleEditToggle}>
                  <Text style={styles.confirmText}>완료</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.tripName}>{tripName}</Text>
                <TouchableOpacity onPress={handleEditToggle}>
                  <Image
                    source={require('../../assets/imgs/pencil.png')}
                    style={styles.pencilIcon}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>

          <Text style={styles.dateRange}>
            {startDate} - {endDate}
          </Text>

          <FlatList
            data={dailyPlans}
            keyExtractor={item => item.id}
            renderItem={renderDaySection}
            ListFooterComponent={renderFooter}
            contentContainerStyle={styles.listContent}
            extraData={dailyPlans}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: width * 0.06,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  topDivider: {
    width: width,
    height: 2,
    backgroundColor: 'rgba(51, 51, 51, 0.2)',
    marginBottom: 30,
    marginTop: 60,
  },
  tripNameInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  tripName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    flex: 1,
  },
  confirmText: {
    fontSize: 16,
    color: '#418663',
    marginLeft: 8,
    fontFamily: 'Pretendard-SemiBold',
  },
  pencilIcon: {
    width: 20,
    height: 20,
  },
  dateRange: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 16,
  },
  Divider: {
    width: width * 0.9,
    height: 1,
    backgroundColor: 'rgba(51, 51, 51, 0.2)',
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  daySection: {
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  updateButton: {
    backgroundColor: '#418663',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: width * 0.1,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailedInquiry;
