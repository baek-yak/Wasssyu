import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../../router/Navigator';
import BreadIcon from '../../assets/imgs/bread.svg';
import CompleteIcon from '../../assets/imgs/complete.svg';

const {width} = Dimensions.get('window');

type CourseNavigationProp = StackNavigationProp<RootStackParamList, 'ChallengeDetail'>;

const Course = () => {
  const navigation = useNavigation<CourseNavigationProp>();

  const goToChallengeDetail = () => {
    navigation.navigate('ChallengeDetail');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>대전왔슈 제공</Text>
      <Text style={styles.sectionSubtitle}>대전 여행 챌린지 코스 🔥</Text>

      <TouchableOpacity style={styles.card} onPress={goToChallengeDetail}>
        <BreadIcon width={100} height={100} style={styles.cardImage} />
        <CompleteIcon width={50} height={50} style={styles.completeIcon} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>대전 빵지순례 코스</Text>
          <Text style={styles.cardDescription}>
            대전의 빵집을 구석 구석 찾아드립니다. 다양한 빵집 코스 추천으로 대전 빵지순례를 해보세요
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <BreadIcon width={100} height={100} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>대전 빵지순례 코스</Text>
          <Text style={styles.cardDescription}>
            대전의 빵집을 구석 구석 찾아드립니다. 다양한 빵집 코스 추천으로 대전 빵지순례를 해보세요
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <BreadIcon width={100} height={100} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>대전 빵지순례 코스</Text>
          <Text style={styles.cardDescription}>
            대전의 빵집을 구석 구석 찾아드립니다. 다양한 빵집 코스 추천으로 대전 빵지순례를 해보세요
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: width * 0.06,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#333',
    fontFamily: 'Pretendard-Bold',
    fontWeight: 'bold',
    marginRight: 10,
  },
  sectionSubtitle: {
    fontSize: 20,
    color: '#333',
    fontFamily: 'Pretendard-Bold',
    fontWeight: 'bold',
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
    position: 'relative',
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
  completeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
});
export default Course;
