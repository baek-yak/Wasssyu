import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
  ImageBackground,
} from 'react-native';
import DeleteConfirmationModal from '../components/MyPage/DeleteConfirmationModal';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../router/Navigator';
import {deleteSchedule, getMySchedules, getScheduleDetails} from '../api/itinerary';

type TravelItineraryNavigationProp = StackNavigationProp<RootStackParamList>;
const {width} = Dimensions.get('window');

interface TripItem {
  id: string;
  title: string;
  date: string;
  places: string;
}
const TravelItinerary = () => {
  const navigation = useNavigation<TravelItineraryNavigationProp>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);
  const [onGoingSchedules, setOnGoingSchedules] = useState<TripItem | null>(null);
  const [upcomingSchedules, setUpcomingSchedules] = useState<TripItem[]>([]);
  const [pastSchedules, setPastSchedules] = useState<TripItem[]>([]);

  const fetchSchedules = async () => {
    const schedules = await getMySchedules();
    if (schedules) {
      const ongoingSchedule: TripItem | null = schedules.onGoingSchedules
        ? {
            id: schedules.onGoingSchedules.scheduleId.toString(),
            title: schedules.onGoingSchedules.title,
            date: `${schedules.onGoingSchedules.startDate} ~ ${schedules.onGoingSchedules.endDate}`,
            places: `${schedules.onGoingSchedules.spotCount}개 관광지`,
          }
        : null;

      const upcoming = schedules.upcomingSchedules.map(schedule => ({
        id: schedule.scheduleId.toString(),
        title: schedule.title,
        date: `${schedule.startDate} ~ ${schedule.endDate}`,
        places: `${schedule.spotCount}개 관광지`,
      }));

      const past = schedules.pastSchedules.map(schedule => ({
        id: schedule.scheduleId.toString(),
        title: schedule.title,
        date: `${schedule.startDate} ~ ${schedule.endDate}`,
        places: `${schedule.spotCount}개 관광지`,
      }));

      setOnGoingSchedules(ongoingSchedule);
      setUpcomingSchedules(upcoming);
      setPastSchedules(past);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchSchedules();
    }, []),
  );

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleSchedulePress = async (scheduleId: string) => {
    try {
      const scheduleDetails = await getScheduleDetails(scheduleId);
      if (scheduleDetails) {
        navigation.navigate('DetailedInquiry', {itinerary: scheduleDetails});
      }
    } catch (error) {
      console.error('Failed to fetch schedule details:', error);
    }
  };

  const goToRecommend = () => {
    navigation.navigate('RecommendedPlace');
  };

  const goToCreateSchedule = () => {
    navigation.navigate('CreateSchedule');
  };

  const goToTravelChallenge = () => {
    navigation.navigate('TravelChallenge');
  };

  const handleTrashPress = (scheduleId: string) => {
    setSelectedScheduleId(scheduleId);
    setIsModalVisible(true);
  };

  const confirmDelete = () => {
    if (selectedScheduleId) {
      handleDelete(selectedScheduleId);
    }
  };

  const handleDelete = async (scheduleId: string) => {
    const isDeleted = await deleteSchedule(scheduleId);
    if (isDeleted) {
      console.log('삭제 성공');
      await fetchSchedules(); // 일정 목록을 새로 로드
      setIsModalVisible(false);
    } else {
      console.error('일정 삭제 실패');
    }
  };

  const renderOngoingTripItem = ({item}: {item: TripItem}) => (
    <TouchableOpacity onPress={() => handleSchedulePress(item.id)}>
      <View style={[styles.tripContainer, styles.onGoingTripContainer]}>
        <View>
          <Text style={styles.tripTitle}>{item.title}</Text>
          <Text style={styles.tripDate}>{item.date}</Text>
          <Text style={styles.tripPlaces}>{item.places}</Text>
        </View>
        <Image source={require('../assets/imgs/travel1.png')} style={styles.tripImage} />
        <TouchableOpacity style={styles.trashButton} onPress={() => handleTrashPress(item.id)}>
          <Image source={require('../assets/imgs/trash.png')} style={styles.trashIcon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderTripItem = ({item}: {item: TripItem}) => (
    <TouchableOpacity onPress={() => handleSchedulePress(item.id)}>
      <View style={styles.tripContainer}>
        <View>
          <Text style={styles.tripTitle}>{item.title}</Text>
          <Text style={styles.tripDate}>{item.date}</Text>
          <Text style={styles.tripPlaces}>{item.places}</Text>
        </View>
        <Image source={require('../assets/imgs/travel1.png')} style={styles.tripImage} />
        <TouchableOpacity style={styles.trashButton} onPress={() => handleTrashPress(item.id)}>
          <Image source={require('../assets/imgs/trash.png')} style={styles.trashIcon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>대전,{'\n'}여행왔슈?</Text>
          <Image source={require('../assets/imgs/Group500.png')} style={styles.logo} />
        </View>
        <TouchableOpacity style={styles.headerButton} onPress={goToRecommend}>
          <Image source={require('../assets/imgs/list.png')} style={styles.buttonIcon} />
          <Text style={styles.headerButtonText}>대전 관광지 보기</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={goToCreateSchedule}>
        <Image source={require('../assets/imgs/plus.png')} style={styles.plusIcon} />
        <View style={styles.textContainer}>
          <Text style={styles.addButtonText}>대전 여행 일정 추가하기</Text>
          <Text style={styles.addButtonSubtitle}>대전와슈와 대전 여행을 함께하세요</Text>
        </View>
      </TouchableOpacity>

      {/* 대전와슈 추천 코스 보기 */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>대전와슈 추천 코스 보기</Text>
        <Image source={require('../assets/imgs/recommend.png')} style={styles.icon} />
        <TouchableOpacity onPress={goToTravelChallenge}>
          <Text style={styles.viewAllText}>전체 코스 보기</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <ImageBackground source={require('../assets/imgs/hotLong.png')} style={styles.image}>
            <View style={styles.overlay}>
              <Text style={styles.overlayTitle}>대전 핫스팟 투어</Text>
              <Text style={styles.overlayDescription}>사람들이 많이 찾는 대전 핫플레이스</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.imageWrapper}>
          <ImageBackground
            source={require('../assets/imgs/Rectangle74067.png')}
            style={styles.image}>
            <View style={styles.overlay}>
              <Text style={styles.overlayTitle}>대전 빵지순례</Text>
              <Text style={styles.overlayDescription}>대전의 다양한 빵집을 소개합니다</Text>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>

      {/* 진행중인 여행 */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>진행중인 여행</Text>
        <Image source={require('../assets/imgs/trtr.png')} style={styles.icon} />
      </View>
      {onGoingSchedules ? (
        <FlatList
          data={[onGoingSchedules]}
          renderItem={renderOngoingTripItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      ) : (
        <Text style={styles.noDataText}>진행 중인 여행이 없습니다</Text>
      )}

      {/* 다가오는 여행 */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>다가오는 여행</Text>
        <Image source={require('../assets/imgs/commingsoon.png')} style={styles.icon} />
      </View>
      {upcomingSchedules.length > 0 ? (
        <FlatList
          data={upcomingSchedules}
          renderItem={renderTripItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      ) : (
        <Text style={styles.noDataText}>다가오는 여행이 없습니다</Text>
      )}

      {/* 지난 여행 */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>지난 여행</Text>
        <Image source={require('../assets/imgs/past.png')} style={styles.icon} />
      </View>
      {pastSchedules.length > 0 ? (
        <FlatList
          data={pastSchedules}
          renderItem={renderTripItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      ) : (
        <Text style={styles.noDataText}>지난 여행이 없습니다</Text>
      )}

      <DeleteConfirmationModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onConfirm={confirmDelete}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#418663',
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Pretendard-Bold',
    lineHeight: 30,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    backgroundColor: '#2F5A50',
    paddingVertical: 4,
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
  },
  addButton: {
    width: width * 0.9,
    height: 80,
    backgroundColor: 'rgba(153, 153, 153, 0.05)',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    alignSelf: 'center',
    borderColor: '#f1f1f1',
    borderWidth: 2,
  },
  plusIcon: {
    width: 33,
    height: 33,
  },
  textContainer: {
    flexDirection: 'column',
    marginLeft: 20,
  },
  addButtonText: {
    fontSize: 12,
    fontFamily: 'Pretendard-SemiBold',
    color: '#333333',
  },
  addButtonSubtitle: {
    fontSize: 10,
    fontFamily: 'Pretendard-Regular',
    color: 'rgba(51, 51, 51, 0.8)',
    marginTop: 5,
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: '#333',
  },
  viewAllText: {
    fontSize: 12,
    fontFamily: 'Pretendard-SemiBold',
    color: '#999999',
    marginTop: 20,
    marginLeft: 20,
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 10,
    marginTop: 5,
  },
  imageContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  imageWrapper: {
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: 260,
    height: 120,
    justifyContent: 'flex-start',
  },
  overlay: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  overlayTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Pretendard-SemiBold',
    marginBottom: 5,
  },
  overlayDescription: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: 'Pretendard-Regular',
  },
  tripContainer: {
    width: '85%',
    height: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tripTitle: {
    fontSize: 14,
    color: '#333333',
    fontFamily: 'Pretendard-Bold',
  },
  tripDate: {
    fontSize: 12,
    color: '#999999',
    marginTop: 15,
    fontFamily: 'Pretendard-Regular',
  },
  tripPlaces: {
    fontSize: 12,
    color: '#999999',
    fontFamily: 'Pretendard-Regular',
  },
  tripImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginLeft: 50,
  },
  trashButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5,
    marginBottom: 50,
  },
  trashIcon: {
    width: 24,
    height: 24,
  },
  noDataText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
  },
  onGoingTripContainer: {
    borderColor: '#418663',
    borderWidth: 2,
    backgroundColor: '#E6F4EC',
  },
});

export default TravelItinerary;
