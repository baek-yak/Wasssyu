import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../../router/Navigator';
import CategoryList from '../../components/RecommendedPlace/CategoryList';

type DaejeonStampNavigationProp = StackNavigationProp<RootStackParamList, 'RecommendedPlace'>;
const {width} = Dimensions.get('window');

const DaejeonStamp = () => {
  const navigation = useNavigation<DaejeonStampNavigationProp>();

  const handleNavigateToRecommended = () => {
    navigation.navigate('RecommendedPlace');
  };

  // 임시 도장 데이터
  const stamps = [
    {id: '1', name: '성심당', image: require('../../assets/imgs/Breadstamp.png')},
    {id: '2', name: '하레하레', image: require('../../assets/imgs/Breadstamp.png')},
    {id: '3', name: '정인구 팥빵', image: require('../../assets/imgs/Breadstamp.png')},
    {id: '4', name: '빵집 A', image: require('../../assets/imgs/Breadstamp.png')},
    {id: '5', name: '빵집 B', image: require('../../assets/imgs/Breadstamp.png')},
    {id: '5', name: '빵집 B', image: require('../../assets/imgs/Breadstamp.png')},
    {id: '5', name: '빵집 B', image: require('../../assets/imgs/Breadstamp.png')},
    {id: '5', name: '빵집 B', image: require('../../assets/imgs/Breadstamp.png')},
    {id: '5', name: '빵집 B', image: require('../../assets/imgs/Breadstamp.png')},
    {id: '5', name: '빵집 B', image: require('../../assets/imgs/Breadstamp.png')},
    {id: '5', name: '빵집 B', image: require('../../assets/imgs/Breadstamp.png')},
  ];

  return (
    <View style={styles.container}>
      {/* 일정 추가하기 버튼 */}
      <TouchableOpacity style={styles.addButton} onPress={handleNavigateToRecommended}>
        <Image source={require('../../assets/imgs/enter.png')} style={styles.plusIcon} />
        <View style={styles.textContainer}>
          <Text style={styles.addButtonText}>다른 관광지 찾아보기</Text>
          <Text style={styles.addButtonSubtitle}>다른 관광지에 또 방문해 스탬프를 찍어보세요</Text>
        </View>
      </TouchableOpacity>
      {/* 대전 관광지 스탬프 타이틀과 필터 텍스트 */}
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>대전 관광지 스탬프</Text>
        <Text style={styles.filterText}>모두</Text>
        <Text style={styles.filterTextHighlight}>찍어보슈</Text>
      </View>
      {/* 가로 스크롤이 가능한 CategoryList */}
      <View style={styles.categoryIcon}>
        <CategoryList />
      </View>
      <View>
        <Text style={styles.stampTitle}>전체 스탬프</Text>
      </View>

      {/* 도장 리스트 */}
      <FlatList
        data={stamps}
        keyExtractor={item => item.id}
        numColumns={3} // 한 줄에 3개씩 배치
        renderItem={({item}) => (
          <View style={styles.stampContainer}>
            <Image source={item.image} style={styles.stampImage} />
            <Text style={styles.stampName}>{item.name}</Text>
          </View>
        )}
        contentContainerStyle={styles.stampList}
      />
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
    color: 'rgba(51, 51, 51, 0.8)',
    marginTop: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9,
    marginVertical: 10,
  },
  mainTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: '#333333',
    marginRight: 10, // 제목과 필터 텍스트 간격
  },
  stampTitle: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    color: '#333333',
    marginVertical: 10,
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: '#333333',
    marginRight: 5,
    marginTop: 5,
    textShadowColor: '#5ECB8A', // 그림자 색상
    textShadowOffset: {width: 0, height: 4}, // 그림자 오프셋 (x, y)
    textShadowRadius: 4,
  },
  filterTextHighlight: {
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    color: '#333333',
    marginTop: 7,
    textShadowColor: '#5ECB8A', // 그림자 색상
    textShadowOffset: {width: 0, height: 4}, // 그림자 오프셋 (x, y)
    textShadowRadius: 4,
  },
  categoryIcon: {
    marginBottom: 20,
    marginTop: 5,
    alignItems: 'center',
  },
  stampList: {
    alignItems: 'flex-start', // 왼쪽 정렬
    justifyContent: 'flex-start', // 위쪽 정렬
    paddingHorizontal: 10,
  },
  stampContainer: {
    width: 100,
    alignItems: 'center',
    marginRight: 10,
  },
  stampImage: {
    width: 100,
    height: 100,
  },
  stampName: {
    fontSize: 12,
    fontFamily: 'Pretendard-SemiBold',
    color: '#333333',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default DaejeonStamp;
