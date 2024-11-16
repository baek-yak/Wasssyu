import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../../router/Navigator';
import BreadIcon from '../../assets/imgs/bread.svg';
import {getUserChallenges} from '../../api/recommended';

type ChallengeCourseNavigationProp = StackNavigationProp<RootStackParamList>;
const {width} = Dimensions.get('window');
interface Course {
  id: number;
  course_name: string;
  description: string;
  image_url: string;
}

interface Challenge {
  course: Course;
  course_details: any[]; // 필요한 경우, 더 구체적인 타입으로 설정 가능
}
const ChallengeCourse = () => {
  const navigation = useNavigation<ChallengeCourseNavigationProp>();
  const [inProgressChallenges, setInProgressChallenges] = useState<Challenge[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<Challenge[]>([]);
  useEffect(() => {
    const fetchChallenges = async () => {
      const data = await getUserChallenges();
      if (data) {
        setInProgressChallenges(data.in_progress);
        setCompletedChallenges(data.completed);
      }
    };
    fetchChallenges();
  }, []);
  const handleNavigateToChallenge = () => {
    navigation.navigate('TravelChallenge');
  };

  const handleNavigateToOngoingChallenge = () => {
    navigation.navigate('OngoingChallenge');
  };
  const handleNavigateToCompletedChallenge = () => {
    navigation.navigate('CompletedChallenge');
  };
  const goToChallengeDetail = (courseId: number) => {
    navigation.navigate('ChallengeDetail', {id: courseId});
  };
  return (
    <View style={styles.container}>
      {/* 챌린지 참여하러 가기 버튼 */}
      <TouchableOpacity style={styles.addButton} onPress={handleNavigateToChallenge}>
        <Image source={require('../../assets/imgs/run.png')} style={styles.runIcon} />
        <View style={styles.textContainer}>
          <Text style={styles.addButtonText}>챌린지 참여하러 가기</Text>
          <Text style={styles.addButtonSubtitle}>대전 왓슈의 많은 챌린지를 도전하세요.</Text>
        </View>
      </TouchableOpacity>

      {/* 진행중인 챌린지 타이틀과 전체 보기 */}
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>진행중인 챌린지</Text>
        <TouchableOpacity onPress={handleNavigateToOngoingChallenge}>
          <Text style={styles.viewAllButton}>전체 보기 &gt;</Text>
        </TouchableOpacity>
      </View>

      {inProgressChallenges.map(challenge => (
        <TouchableOpacity
          key={challenge.course.id}
          style={styles.card}
          onPress={() => goToChallengeDetail(challenge.course.id)}>
          <BreadIcon width={100} height={100} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{challenge.course.course_name}</Text>
            <Text style={styles.cardDescription}>{challenge.course.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
      {/* 완료한 챌린지 타이틀과 전체 보기 */}
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>완료한 챌린지</Text>
        <TouchableOpacity onPress={handleNavigateToCompletedChallenge}>
          <Text style={styles.viewAllButton}>전체 보기 &gt;</Text>
        </TouchableOpacity>
      </View>

      {completedChallenges.map(challenge => (
        <TouchableOpacity
          key={challenge.course.id}
          style={styles.card}
          onPress={() => goToChallengeDetail(challenge.course.id)}>
          <BreadIcon width={100} height={100} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{challenge.course.course_name}</Text>
            <Text style={styles.cardDescription}>{challenge.course.description}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  runIcon: {
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
    color: 'rgba(51, 51, 51, 0.8)',
    marginTop: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width * 0.9,
    marginVertical: 20,
  },
  mainTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: '#333333',
  },
  viewAllButton: {
    fontSize: 12,
    fontFamily: 'Pretendard-SemiBold',
    color: '#999999',
    marginTop: 10,
  },
  challengeCard: {
    flexDirection: 'row',
    width: width * 0.9,
    height: 80,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  challengeImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  challengeTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  challengeTitle: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: '#333333',
  },
  challengeDescription: {
    fontSize: 10,
    fontFamily: 'Pretendard-Regular',
    color: '#666666',
    marginTop: 5,
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
});

export default ChallengeCourse;
