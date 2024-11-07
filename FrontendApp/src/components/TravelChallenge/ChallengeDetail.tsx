import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
} from 'react-native';
import Header from '../common/Header';
import FlameIcon from '../../assets/imgs/flame.svg';
import BreadIcon from '../../assets/imgs/breadB.svg';
import RunIcon from '../../assets/imgs/run.svg';
import MonIcon from '../../assets/imgs/mon1.svg';
import MononeIcon from '../../assets/imgs/mon2.svg';
import MontwoIcon from '../../assets/imgs/mon3.svg';
import PlayIcon from '../../assets/imgs/play.svg';
import CalendarIcon from '../../assets/imgs/calendar.svg';

const {width} = Dimensions.get('window');

const ChallengeDetail = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    require('../../assets/imgs/breadFull.png'),
    require('../../assets/imgs/hotLong.png'),
  ];

  const hashtags = [
    {id: '1', icon: <FlameIcon width={25} height={25} />, text: '# 대전핫플'},
    {id: '2', icon: <BreadIcon width={25} height={25} />, text: '# 빵덕후'},
    {id: '3', icon: <RunIcon width={25} height={25} />, text: '# 부지런한여행'},
  ];

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.floor(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slide);
  };

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
            style={styles.imageContainer}>
            {images.map((image, index) => (
              <ImageBackground key={index} source={image} style={styles.image} resizeMode="cover" />
            ))}
          </ScrollView>
          <View style={styles.pagination}>
            {images.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, activeIndex === index ? styles.activeDot : styles.inactiveDot]}
              />
            ))}
          </View>
        </View>

        <View style={styles.containerT}>
          <Text style={styles.title}>대전 빵지순례 투어</Text>

          <View style={styles.hashtagContainer}>
            {hashtags.map(hashtag => (
              <TouchableOpacity>
                <View key={hashtag.id} style={styles.hashtagButton}>
                  {hashtag.icon}
                  <Text style={styles.hashtagText}>{hashtag.text}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View>
            <Text style={styles.title}>코스 소개</Text>

            <View style={styles.courseItem}>
              <View style={styles.numberContainer}>
                <Text style={styles.numberText}>1</Text>
              </View>

              <View style={styles.courseDetails}>
                <Text style={styles.courseTitle}>성심당</Text>
                <Text style={styles.courseAddress}>대전광역시 대흥동 xxx-xx</Text>
                <View style={styles.tagContainer}>
                  <TouchableOpacity style={styles.tag}>
                    <Text style={styles.tagText}># 문화</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.tag}>
                    <Text style={styles.tagText}># 인기</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <MonIcon width={75} height={75} style={styles.courseIcon} />
            </View>

            <View style={styles.courseItem}>
              <View style={styles.numberContainer}>
                <Text style={styles.numberText}>2</Text>
              </View>
              <View style={styles.courseDetails}>
                <Text style={styles.courseTitle}>하레하레</Text>
                <Text style={styles.courseAddress}>대전광역시 대흥동 xxx-xx</Text>
                <View style={styles.tagContainer}>
                  <TouchableOpacity style={styles.tag}>
                    <Text style={styles.tagText}># 문화</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.tag}>
                    <Text style={styles.tagText}># 인기</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <MontwoIcon width={75} height={75} style={styles.courseIcon} />
            </View>

            <View>
              <Text style={styles.title2}>등장 왔슈몬</Text>
              <View style={styles.monContainer}>
                <View style={styles.monItem}>
                  <MonIcon width={75} height={75} />
                  <Text style={styles.monText}>단팥몬</Text>
                </View>
                <View style={styles.monItem}>
                  <MononeIcon width={75} height={75} />
                  <Text style={styles.monText}>소보루몬</Text>
                </View>
                <View style={styles.monItem}>
                  <MontwoIcon width={75} height={75} />
                  <Text style={styles.monText}>바게트몬</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.challengeButton}>
              <PlayIcon width={20} height={20} style={styles.buttonIcon} />
              <Text style={styles.challengeButtonText}>챌린지 시작</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.challengeButton}>
              <CalendarIcon width={20} height={20} style={styles.buttonIcon} />
              <Text style={styles.challengeButtonText}>일정에 코스 담기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    width: width,
  },
  image: {
    width: width,
    aspectRatio: 2.5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#418663',
  },
  inactiveDot: {
    backgroundColor: '#C8DECB',
  },
  containerT: {
    paddingHorizontal: width * 0.06,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Pretendard-Bold',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  hashtagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  hashtagButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderColor: 'rgba(153, 153, 153, 0.5)',
  },
  hashtagText: {
    fontSize: 16,
    color: '#999999',
    marginLeft: 5,
    fontFamily: 'Pretendard-Regular',
  },
  courseContainer: {
    marginTop: 20,
  },
  courseItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    position: 'relative',
    elevation: 4,
    shadowColor: '#333',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  numberContainer: {
    position: 'absolute',
    top: 12,
    left: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#418663',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
  },
  courseIcon: {
    alignSelf: 'center',
  },
  courseDetails: {
    flex: 1,
    marginLeft: 30,
  },
  courseTitle: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  courseAddress: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: '#rgba(51, 51, 51, 0.6)',
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  tag: {
    backgroundColor: '#C8DECB',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 12,
    color: '#418663',
    fontFamily: 'Pretendard-SemiBold',
  },
  title2: {
    color: '#418663',
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    fontWeight: 'bold',
    marginVertical: 20,
  },
  monContainer: {
    backgroundColor: '#418663',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  monItem: {
    alignItems: 'center',
  },
  monText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Pretendard-Bold',
  },
  challengeButton: {
    width: width * 0.8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#418663',
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
  challengeButtonText: {
    color: '#418663',
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    fontWeight: 'bold',
  },
});

export default ChallengeDetail;
