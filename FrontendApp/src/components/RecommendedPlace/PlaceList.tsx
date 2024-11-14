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
import RecommendedSearchBar from './RecommendedSearchBar';
import CategoryList from './CategoryList';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../../router/Navigator';
import Header from '../common/Header';
import MarkerIcon from '../../assets/imgs/marker.svg';

const {width} = Dimensions.get('window');

type PlaceListNavigationProp = StackNavigationProp<RootStackParamList, 'PlaceDetail'>;

const places = [
  {
    id: '1',
    image: require('../../assets/imgs/hanbat.png'),
    area: '서구',
    tags: '#자연 #포토존',
    address: '대전 서구 둔산대로 169',
    name: '한밭 수목원',
  },
  {
    id: '2',
    image: require('../../assets/imgs/museum.png'),
    area: '서구',
    tags: '#예술 #포토존',
    address: '대전 서구 둔산대로 155 둔산대공원',
    name: '대전시립미술관',
  },
  {
    id: '3',
    image: require('../../assets/imgs/breadFull.png'),
    area: '중구',
    tags: '#맛집 #빵',
    address: '대전 중구 대종로 4801번길 15',
    name: '성심당',
  },
  {
    id: '4',
    image: require('../../assets/imgs/park.png'),
    area: '서구',
    tags: '#자연 #포토존',
    address: '대전 서구 둔산대로 169',
    name: '한밭 수목원',
  },
];

const PlaceList = () => {
  const navigation = useNavigation<PlaceListNavigationProp>();

  const goToPlaceDetail = (name: string) => {
    navigation.navigate('PlaceDetail', {name});
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
            </View>

            <ScrollView nestedScrollEnabled={true}>
              {places.map(item => (
                <TouchableOpacity onPress={() => goToPlaceDetail(item.name)}>
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
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
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
});

export default PlaceList;
