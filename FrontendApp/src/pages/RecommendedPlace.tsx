import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';
import RecommendedSearchBar from '../components/RecommendedPlace/RecommendedSearchBar';
import CategoryList from '../components/RecommendedPlace/CategoryList';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../router/Navigator';
import Header from '../components/common/Header';
import MarkerIcon from '../assets/imgs/marker.svg';

const {width} = Dimensions.get('window');

type RecommendedPlaceNavigationProp = StackNavigationProp<RootStackParamList, 'PlaceList'>;

const places = [
  {
    id: '1',
    image: require('../assets/imgs/hanbat.png'),
    area: '서구',
    tags: '#자연 #포토존',
    address: '대전 서구 둔산대로 169',
    name: '한밭 수목원',
  },
  {
    id: '2',
    image: require('../assets/imgs/museum.png'),
    area: '서구',
    tags: '#예술 #포토존',
    address: '대전 서구 둔산대로 155 둔산대공원',
    name: '대전시립미술관',
  },
  {
    id: '3',
    image: require('../assets/imgs/breadFull.png'),
    area: '중구',
    tags: '#맛집 #빵',
    address: '대전 중구 대종로 4801번길 15',
    name: '성심당',
  },
  {
    id: '4',
    image: require('../assets/imgs/park.png'),
    area: '서구',
    tags: '#자연 #포토존',
    address: '대전 서구 둔산대로 169',
    name: '한밭 수목원',
  },
];

const cardplaces = [
  {
    id: '1',
    image: require('../assets/imgs/department.png'),
    name: '대전 신세계',
  },
  {
    id: '2',
    image: require('../assets/imgs/Gapcheon.png'),
    name: '갑천',
  },
  {
    id: '3',
    image: require('../assets/imgs/Galma.png'),
    name: '갈마 살롱',
  },
  {
    id: '4',
    image: require('../assets/imgs/breadFull.png'),
    name: '성심당',
  },
];

const RecommendedPlace = () => {
  const navigation = useNavigation<RecommendedPlaceNavigationProp>();

  const goToPlaceList = () => {
    navigation.navigate('PlaceList');
  };

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        <View style={styles.search}>
          <RecommendedSearchBar />
        </View>

        <View style={styles.categoryIcon}>
          <CategoryList />
        </View>

        <View style={styles.cardSection}>
          <View style={styles.cardContainer}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderText}>전체 관광지</Text>
              <TouchableOpacity onPress={goToPlaceList}>
                <Text style={styles.cardHeaderButton}>전체 보기 &gt;</Text>
              </TouchableOpacity>
            </View>

            <ScrollView nestedScrollEnabled={true}>
              {places.map(item => (
                <View key={item.id} style={styles.card}>
                  <View style={styles.imageWrapper}>
                    <ImageBackground source={item.image} style={styles.image}>
                      <View style={styles.overlay}>
                        <View style={styles.leftOverlay}>
                          <MarkerIcon width={20} height={20} />
                          <Text style={styles.areaText}>{item.area}</Text>
                        </View>
                        <Text style={styles.tagsText}>{item.tags}</Text>
                      </View>
                    </ImageBackground>
                  </View>
                  <Text style={styles.addressText}>{item.address}</Text>
                  <Text style={styles.nameText}>{item.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.cardNSection}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>전체 관광지 추천</Text>
            <TouchableOpacity onPress={goToPlaceList}>
              <Text style={styles.cardHeaderButtonT}>&gt;</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.horizontalScroll}>
              {cardplaces.map(item => (
                <View key={item.id} style={styles.horizontalCard}>
                  <ImageBackground
                    source={item.image}
                    style={styles.cardImage}
                    imageStyle={styles.cardImageStyle}>
                    <View style={styles.cardOverlay}>
                      <Text style={styles.cardName}>{item.name}</Text>
                    </View>
                  </ImageBackground>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
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
  search: {
    marginVertical: 20,
  },
  categoryIcon: {
    marginBottom: 20,
    alignItems: 'center',
  },
  cardSection: {
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  cardHeaderText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Bold',
    color: '#333',
    paddingLeft: 10,
  },
  cardHeaderButton: {
    fontSize: 10,
    color: 'rgba(153, 153, 153, 0.5)',
    fontFamily: 'Pretendard-Regular',
    paddingRight: 10,
  },
  cardContainer: {
    maxHeight: 600,
    overflow: 'hidden',
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 10,
    elevation: 4,
    shadowColor: '#333',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
  },
  imageWrapper: {
    width: '100%',
    height: 150,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  leftOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  areaText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Pretendard-Medium',
    marginLeft: 5,
  },
  tagsText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Pretendard-Medium',
  },
  addressText: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'Pretendard-Medium',
  },
  nameText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
  },
  cardHeaderButtonT: {
    fontSize: 20,
    marginRight: 10,
    color: 'rgba(153, 153, 153, 0.5)',
  },
  horizontalScroll: {
    flexDirection: 'row',
    marginTop: 10,
  },
  horizontalCard: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginRight: 15,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  cardOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 10,
  },
  cardName: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Pretendard-Medium',
  },
  cardImageStyle: {
    borderRadius: 20,
  },
  cardNSection: {
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
});

export default RecommendedPlace;
