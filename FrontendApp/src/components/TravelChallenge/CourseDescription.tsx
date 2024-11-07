import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../../router/Navigator';
import BreadIcon from '../../assets/imgs/bread.svg';
import MonIcon from '../../assets/imgs/mon1.svg';
import MononeIcon from '../../assets/imgs/mon2.svg';
import MontwoIcon from '../../assets/imgs/mon3.svg';

const {width} = Dimensions.get('window');

type CourseDescriptionNavigationProp = StackNavigationProp<RootStackParamList>;

const CourseDescription = () => {
  const navigation = useNavigation<CourseDescriptionNavigationProp>();

  const goToChallengeDetail = () => {
    navigation.navigate('ChallengeDetail');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>챌린지?</Text>
        <Text style={styles.context}>대전왓슈는 대전 여행객들이 가볼만한 </Text>
        <Text style={styles.context}>대전 여행 코스를 챌린지 식으로 제공합니다.</Text>
        <Text style={styles.context}>대전 왓슈 챌린지와 함께</Text>
        <Text style={styles.context}>언제든 대전 여행을 즐겨보세요!</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <ImageBackground source={require('../../assets/imgs/hotLong.png')} style={styles.image}>
            <View style={styles.overlay}>
              <Text style={styles.overlayTitle}>대전 핫스팟 투어</Text>
              <Text style={styles.overlayDescription}>사람들이 많이 찾는 대전 핫플레이스</Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.imageWrapper}>
          <ImageBackground source={require('../../assets/imgs/breadLong.png')} style={styles.image}>
            <View style={styles.overlay}>
              <Text style={styles.overlayTitle}>대전 빵지순례</Text>
              <Text style={styles.overlayDescription}>대전의 다양한 빵집을 소개합니다</Text>
            </View>
          </ImageBackground>
        </View>
      </ScrollView>

      <View style={styles.middle}>
        <Text style={styles.title}>챌린지 완료 방법?</Text>
        <Text style={styles.context}>각 코스에 있는 관광지에 도착 시</Text>
        <Text style={styles.context}>왓슈몬을 잡는 미션을 진행 할 수 있습니다.</Text>
        <Text style={styles.context}>왓슈몬을 잡아 각 관광지를 모두 등록해</Text>
        <Text style={styles.context}>모든 관광지를 완료하면 챌린지를 완료하게 됩니다.</Text>
      </View>

      <TouchableOpacity style={styles.card} onPress={goToChallengeDetail}>
        <BreadIcon width={100} height={100} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>대전 빵지순례 코스</Text>
          <Text style={styles.cardDescription}>
            대전의 빵집을 구석 구석 찾아드립니다. 다양한 빵집 코스 추천으로 대전 빵지순례를 해보세요
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.end}>
        <Text style={styles.title}>왓슈몬?</Text>
        <Text style={styles.context}>대전왓슈는 관광지 인증 방식을</Text>
        <Text style={styles.context}>AR 모드로 왓슈몬을 잡는 것으로 구현을 했습니다.</Text>
        <Text style={styles.context}>
          각 관광지에 등장하는 왓슈몬을 잡아 챌리지를 완료해보세요.
        </Text>
        <Text style={styles.context}>다양한 왓슈몬을 잡아 도감을 모아보세요.</Text>
      </View>

      <View style={styles.mon}>
        <MonIcon width={75} height={75} />
        <MononeIcon width={75} height={75} />
        <MontwoIcon width={75} height={75} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: width * 0.06,
  },
  header: {
    marginVertical: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: 'Pretendard-Bold',
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  context: {
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
    color: '#999999',
  },
  imageContainer: {
    marginBottom: 20,
    flexDirection: 'row',
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
  middle: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#333',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardImage: {
    marginRight: 10,
    borderRadius: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 12,
    color: 'rgba(51, 51, 51, 0.5)',
    marginTop: 10,
  },
  end: {
    marginBottom: 20,
  },
  mon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CourseDescription;
