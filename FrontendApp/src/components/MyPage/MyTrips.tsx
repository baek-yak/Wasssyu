import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import DeleteConfirmationModal from '../MyPage/DeleteConfirmationModal';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../../router/Navigator';

type MyTripsNavigationProp = StackNavigationProp<RootStackParamList, 'TravelItinerary'>;

interface TripItem {
  id: string;
  title: string;
  date: string;
  places: string;
}

const {width} = Dimensions.get('window');

const MyTrips = () => {
  const navigation = useNavigation<MyTripsNavigationProp>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleNavigateToItinerary = () => {
    navigation.navigate('TravelItinerary');
  };

  const handleTrashPress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const renderTripItem = ({item}: {item: TripItem}) => (
    <View style={styles.tripContainer}>
      <View>
        <Text style={styles.tripTitle}>{item.title}</Text>
        <Text style={styles.tripDate}>{item.date}</Text>
        <Text style={styles.tripPlaces}>{item.places}</Text>
      </View>
      <Image source={require('../../assets/imgs/travel1.png')} style={styles.tripImage} />
      <TouchableOpacity style={styles.trashButton} onPress={handleTrashPress}>
        <Image source={require('../../assets/imgs/trash.png')} style={styles.trashIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* 일정 추가하기 버튼 */}
      <TouchableOpacity style={styles.addButton} onPress={handleNavigateToItinerary}>
        <Image source={require('../../assets/imgs/plus.png')} style={styles.plusIcon} />
        <View style={styles.textContainer}>
          <Text style={styles.addButtonText}>대전 여행 일정 추가하기</Text>
          <Text style={styles.addButtonSubtitle}>대전와슈와 대전 여행을 함께하세요</Text>
        </View>
      </TouchableOpacity>

      {/* 다가오는 여행 */}
      <Text style={styles.sectionTitle}>다가오는 여행</Text>
      <FlatList
        data={[
          {
            id: '1',
            title: '현수의 대전 나들이',
            date: '2024.10.24 ~ 2024.10.26',
            places: '4개 관광지',
          },
        ]}
        renderItem={renderTripItem}
        keyExtractor={item => item.id}
        style={styles.tripList}
        scrollEnabled={false} // FlatList 내부 스크롤을 비활성화
      />

      {/* 지난 여행 */}
      <Text style={styles.sectionTitle}>지난 여행</Text>
      <FlatList
        data={[
          {
            id: '2',
            title: '현수의 지난 여행',
            date: '2024.10.20 ~ 2024.10.21',
            places: '3개 관광지',
          },
        ]}
        renderItem={renderTripItem}
        keyExtractor={item => item.id}
        style={styles.tripList}
        scrollEnabled={false} // FlatList 내부 스크롤을 비활성화
      />

      {/* 삭제 확인 모달 */}
      <DeleteConfirmationModal
        visible={isModalVisible}
        onCancel={closeModal}
        onConfirm={closeModal}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  addButton: {
    width: width * 0.9,
    height: 80,
    backgroundColor: 'rgba(153, 153, 153, 0.05)',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 0.06 * width,
  },
  plusIcon: {
    width: 33,
    height: 33,
    marginBottom: 5,
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
    color: 'rgba(51, 51, 51, 0.8)', // 80% 투명도 적용
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 20,
  },
  tripList: {},
  tripContainer: {
    width: '100%',
    height: 110,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'space-between',
  },
  tripTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  tripDate: {
    fontSize: 12,
    color: '#999999',
    marginTop: 15,
  },
  tripPlaces: {
    fontSize: 12,
    color: '#999999',
  },
  tripImage: {
    width: 60,
    height: 60,
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
});

export default MyTrips;
