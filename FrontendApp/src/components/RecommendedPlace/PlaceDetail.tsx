import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Header from '../common/Header';
import MarkerIcon from '../../assets/imgs/markerB.svg';
import HearthIcon from '../../assets/imgs/hearth.svg';
import CalendarIcon from '../../assets/imgs/calendarplus.svg';
import StarIcon from '../../assets/imgs/star.svg';
import StempIcon from '../../assets/imgs/stemp.svg';
import ClockIcon from '../../assets/imgs/clock.svg';
import PhoneIcon from '../../assets/imgs/phone.svg';
import CompassIcon from '../../assets/imgs/compass.svg';
import EditIcon from '../../assets/imgs/edit.svg';
import CustomModal from '../common/CustomModal';
import StepModal from '../common/StepModal';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../../router/Navigator';

type PlaceDetailScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const {width} = Dimensions.get('window');

type PlaceDetailRouteProp = {
  name: string;
};
const scheduleData = [
  {
    id: '1',
    title: '현수의 대전 나들이',
    date: '2024.10.24 ~ 2024.10.26',
    image: require('../../assets/imgs/department.png'),
  },
  {
    id: '2',
    title: '현수 코스프레 대회',
    date: '2024.10.20 ~ 2024.10.21',
    image: require('../../assets/imgs/Gapcheon.png'),
  },
  {
    id: '3',
    title: '현수 코스프레 여행',
    date: '2024.10.20 ~ 2024.10.21',
    image: require('../../assets/imgs/department.png'),
  },
];

const review = [
  {
    id: '1',
    nickName: '지날존두',
    userImg: require('../../assets/imgs/hanbat.png'),
    time: '2024.08.24',
    reviewText:
      '이번에 100 기념으로 대전 여행 와서 한밭 수목원 들렸는데 힐링되고 너무 좋네요~ 정말 다양한 식물이 있어요. 사람 많은거 싫은 사람 추천이요. 다들 놀러 오세요.',
    placeImgs: [],
  },
  {
    id: '2',
    nickName: '노은 호카게',
    userImg: require('../../assets/imgs/hanbat.png'),
    time: '2024.06.04',
    reviewText: '혼자 산책하기 좋음. 추천.',
    placeImgs: [
      require('../../assets/imgs/hanbat.png'),
      require('../../assets/imgs/breadLong.png'),
      require('../../assets/imgs/breadLong.png'),
    ],
  },
  {
    id: '3',
    nickName: '노은 호카게',
    userImg: require('../../assets/imgs/hanbat.png'),
    time: '2024.06.04',
    reviewText: '혼자 산책하기 좋음. 추천.',
    placeImgs: [
      require('../../assets/imgs/hanbat.png'),
      require('../../assets/imgs/breadLong.png'),
      require('../../assets/imgs/breadLong.png'),
      require('../../assets/imgs/breadLong.png'),
    ],
  },
];

const PlaceDetail = () => {
  const navigation = useNavigation<PlaceDetailScreenNavigationProp>();
  const route = useRoute();
  const {name} = route.params as PlaceDetailRouteProp;

  const [modalVisible, setModalVisible] = useState(false);
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [stampModalVisible, setStampModalVisible] = useState<any>(null);

  const handleScheduleSelect = (schedule: any) => {
    setSelectedSchedule(schedule);
    setScheduleModalVisible(false);
    setDetailModalVisible(true);
  };

  const gotoWrite = () => {
    navigation.navigate('WriteReview');
  };

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        <View style={styles.headerSection}>
          <Text style={styles.placeName}>{name}</Text>
          <View style={styles.iconsRow}>
            <Text style={styles.heart}>♥️</Text>
            <Text style={styles.likeCount}>999 +</Text>
          </View>
          <View style={styles.iconsRow}>
            <MarkerIcon width={18} height={18} />
            <Text style={styles.areaText}>서구</Text>
          </View>
          <Image source={require('../../assets/imgs/hanbat.png')} style={styles.placeImage} />
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.iconButton}>
            <HearthIcon width={24} height={24} style={styles.icon} />
            <Text style={styles.iconButtonText}>찜하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => setScheduleModalVisible(true)}>
            <CalendarIcon width={24} height={24} style={styles.icon} />
            <Text style={styles.iconButtonText}>일정추가</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={gotoWrite}>
            <StarIcon width={24} height={24} style={styles.icon} />
            <Text style={styles.iconButtonText}>리뷰쓰기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => setStampModalVisible(true)}>
            <StempIcon width={24} height={24} style={styles.icon} />
            <Text style={styles.iconButtonText}>스탬프</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>상세 정보</Text>
          <View style={styles.detailSectionView}>
            <View style={styles.detailItem}>
              <ClockIcon width={20} height={20} />
              <Text style={styles.detailText}>영업시간</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailSubText}>월 : 09:00 ~ 20:00 </Text>
              <Text style={styles.detailSubText}>화 : 휴무</Text>
              <Text style={styles.detailSubText}>수 : 09:00 ~ 20:30</Text>
              <Text style={styles.detailSubText}>목 : 09:00 ~ 20:30</Text>
              <Text style={styles.detailSubText}>금 : 09:00 ~ 20:30</Text>
              <Text style={styles.detailSubText}>토 : 09:00 ~ 21:00</Text>
              <Text style={styles.detailSubText}>일 : 09:00 ~ 21:00</Text>
            </View>

            <View style={styles.detailItem}>
              <PhoneIcon width={20} height={20} />
              <Text style={styles.detailText}>전화번호</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailSubText}>042-270-8452</Text>
            </View>

            <View style={styles.detailItem}>
              <CompassIcon width={20} height={20} />
              <Text style={styles.detailText}>위치</Text>
            </View>
            <Image source={require('../../assets/imgs/maphan.png')} style={styles.mapImage} />
            <View style={styles.addressRow}>
              <Text style={styles.addressText}>대전 서구 둔산대로 169</Text>
              <TouchableOpacity
                style={styles.directionButton}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.directionButtonText}>길찾기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionTitle}>설명</Text>
          <View style={styles.descriptionTextView}>
            <Text style={styles.descriptionText}>
              한밭 수목 원입니다. 이곳은 자연 카테고리에 속하며 모든 사람들이 편안하게 와서
              휴식하다가 가면 되는 대전의 유명 관광 코스 중 하나입니다. 편하게 와서 쉬다가 가면 될
              것 같습니다.한밭 수목원입니다. 이곳은 자연 카테고리에 속하며 모든 사람들이 편안하게
              와서 휴식하다가 가면 되는 대전의 유명 관광 코스 중 하나입니다. 편하게 와서 쉬다가 가면
              될 것 같습니다.
            </Text>
          </View>
        </View>

        <View style={styles.reviewSection}>
          <View style={styles.reviewHeader}>
            <Text style={styles.reviewTitle}>방문 후기 207</Text>
            <TouchableOpacity onPress={gotoWrite}>
              <EditIcon width={20} height={20} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.reviewSectionT} nestedScrollEnabled={true}>
            {review.map(item => (
              <View key={item.id} style={styles.reviewItemContainer}>
                <View style={styles.reviewHeaderRow}>
                  <Image source={item.userImg} style={styles.userImage} />
                  <View style={styles.userInfo}>
                    <Text style={styles.reviewerName}>{item.nickName}</Text>
                    <Text style={styles.reviewDate}>{item.time}</Text>
                  </View>
                </View>
                <Text style={styles.reviewContent}>{item.reviewText}</Text>

                <ScrollView
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.reviewImgContent}>
                  {item.placeImgs.map((img, index) => (
                    <Image key={index} source={img} style={styles.reviewImage} />
                  ))}
                </ScrollView>
              </View>
            ))}
          </ScrollView>
        </View>

        <CustomModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title="차량 길찾기"
          content="거리: 7.8 km \n소요 시간: 17 분"
          imageSource={require('../../assets/imgs/maphan.png')}
          footerButtonText="확인"
        />
        <StepModal
          visible={scheduleModalVisible}
          onClose={() => setScheduleModalVisible(false)}
          title="일정 추가"
          footerButtonText="닫기"
          content={
            <View>
              {scheduleData.map(schedule => (
                <TouchableOpacity key={schedule.id} onPress={() => handleScheduleSelect(schedule)}>
                  <View style={styles.scheduleItem}>
                    <Image source={schedule.image} style={styles.scheduleImage} />
                    <View>
                      <Text style={styles.scheduleTitle}>{schedule.title}</Text>
                      <Text style={styles.scheduleDate}>{schedule.date}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          }
        />

        <StepModal
          visible={detailModalVisible}
          onClose={() => setDetailModalVisible(false)}
          title={selectedSchedule ? selectedSchedule.title : ''}
          footerButtonText="완료"
          content={
            selectedSchedule && (
              <View>
                <Text style={styles.scheduleDetailDate}>{selectedSchedule.date}</Text>
              </View>
            )
          }
        />

        <CustomModal
          visible={stampModalVisible}
          onClose={() => setStampModalVisible(false)}
          title="한밭 수목원"
          content="한밭 수목원에 스탬프 찍기를 \n성공하였습니다!!"
          imageSource={require('../../assets/imgs/preview.png')}
          footerButtonText="확인"
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    backgroundColor: '#fff',
  },
  headerSection: {
    marginBottom: 20,
  },
  placeName: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
    color: '#333',
    marginBottom: 5,
  },
  iconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  heart: {
    fontSize: 13,
  },
  likeCount: {
    fontSize: 10,
    color: '#333',
    marginLeft: 5,
  },
  marker: {
    color: '#333',
  },
  areaText: {
    marginLeft: 5,
    fontSize: 10,
    color: '#333',
    fontFamily: 'Pretendard-Medium',
  },
  placeImage: {
    width: '100%',
    height: 170,
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1.5,
    borderColor: '#ddd',
    paddingBottom: 10,
    marginBottom: 20,
  },
  iconButton: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: 5,
    color: 'rgba(51, 51, 51, 0.5)',
  },
  iconButtonText: {
    fontSize: 10,
    color: 'rgba(51, 51, 51, 0.5)',
    fontFamily: 'Pretendard-Medium',
  },
  detailSection: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 10,
    elevation: 4,
    shadowColor: '#333',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  detailSectionView: {
    width: '90%',
    alignSelf: 'center',
  },
  detailTitle: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: '#418663',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    marginLeft: 5,
    fontSize: 14,
    color: 'rgba(51, 51, 51, 0.5)',
    fontFamily: 'Pretendard-Medium',
  },
  detailRow: {
    paddingLeft: 25,
    marginBottom: 10,
  },
  detailSubText: {
    fontSize: 12,
    color: 'rgba(51, 51, 51, 0.5)',
    fontFamily: 'Pretendard-Medium',
  },
  mapImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginVertical: 10,
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressText: {
    fontSize: 12,
    color: 'rgba(51, 51, 51, 0.5)',
    fontFamily: 'Pretendard-Medium',
  },
  directionButton: {
    backgroundColor: '#rgba(94, 203, 138, 0.6)',
    borderRadius: 5,
    paddingVertical: 1,
    paddingHorizontal: 5,
    marginRight: 5,
  },
  directionButtonText: {
    fontSize: 12,
    color: '#ffffff',
    fontFamily: 'Pretendard-Regular',
  },
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: '#418663',
    marginBottom: 10,
  },
  descriptionTextView: {
    width: '90%',
    alignSelf: 'center',
  },
  descriptionText: {
    fontSize: 13,
    color: 'rgba(51, 51, 51, 0.5)',
    fontFamily: 'Pretendard-Medium',
  },
  reviewSection: {
    maxHeight: 400,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 10,
    elevation: 4,
    shadowColor: '#333',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  reviewTitle: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: '#418663',
  },
  reviewSectionT: {
    padding: 15,
  },
  reviewItemContainer: {
    marginBottom: 20,
  },
  reviewHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  userInfo: {
    flexDirection: 'column',
  },
  reviewerName: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    color: '#333',
  },
  reviewDate: {
    fontSize: 12,
    color: 'rgba(51, 51, 51, 0.5)',
    fontFamily: 'Pretendard-Regular',
  },
  reviewContent: {
    fontSize: 14,
    color: 'rgba(51, 51, 51, 0.5)',
    marginBottom: 5,
  },
  reviewImgContent: {
    flexDirection: 'row',
  },
  reviewImage: {
    width: width * 0.75,
    height: 150,
    resizeMode: 'cover',
    marginRight: 10,
  },
  scheduleItem: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  scheduleImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scheduleDate: {
    fontSize: 14,
    color: '#666',
  },
  scheduleDetailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  scheduleDetailDate: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default PlaceDetail;
