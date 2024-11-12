import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {TouristSpot} from '../../types'; // 공통 타입 가져오기
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../../router/Navigator';
import {getSpots} from '../../api/itinerary';

const {width} = Dimensions.get('window');

type REItineraryNavigationProp = StackNavigationProp<RootStackParamList>;

const ReItinerary = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ReItinerary'>>();
  const navigation = useNavigation<REItineraryNavigationProp>();
  const [searchText, setSearchText] = useState('');
  const [itineraryResults, setItineraryResults] = useState<TouristSpot[]>([]);
  const [loading, setLoading] = useState(false);
  const dayId = route.params?.dayId; // 전달된 dayId

  const handleSearch = useCallback(async () => {
    setLoading(true);
    const results = await getSpots(searchText);
    if (results) {
      setItineraryResults(results);
    } else {
      setItineraryResults([]);
    }
    setLoading(false);
  }, [searchText]);

  useEffect(() => {
    if (searchText.length > 0) {
      handleSearch();
    } else {
      setItineraryResults([]);
    }
  }, [searchText, handleSearch]);

  const handleSelectPlace = (place: TouristSpot) => {
    navigation.navigate('DetailedInquiry', {
      dayId: dayId,
      selectedPlace: {
        id: place.id,
        name: place.spotName,
        address: place.spotAddress,
      },
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Image source={require('../../assets/imgs/search.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="관광지를 검색하세요"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {loading && <ActivityIndicator size="large" color="#418663" />}

      <FlatList
        data={itineraryResults}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.resultItem}
            onPress={() => {
              console.log('Place clicked:', item); // 클릭 이벤트 확인용 로그
              handleSelectPlace(item);
            }}>
            <Image
              source={
                item.images[0]?.image
                  ? {uri: item.images[0].image}
                  : require('../../assets/imgs/locationss.png')
              }
              style={styles.resultImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.resultTitle}>{item.spotName}</Text>
              <Text style={styles.resultLocation}>{item.spotAddress || '주소 정보 없음'}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>검색 결과가 없습니다</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F7FB',
    borderRadius: 10,
    padding: 10,
    marginVertical: 15,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  resultImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  resultLocation: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default ReItinerary;
