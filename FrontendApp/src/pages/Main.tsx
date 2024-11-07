import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import SearchBar from '../components/Main/SearchBar';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../router/Navigator';
import LogoIcon from '../assets/imgs/Logo2.svg';
import GroupIcon from '../assets/imgs/Group.svg';
import FoodIcon from '../assets/imgs/food.svg';
import HomeIcon from '../assets/imgs/home.svg';
import RainIcon from '../assets/imgs/rain.svg';
import SportIcon from '../assets/imgs/sport.svg';
import ArtIcon from '../assets/imgs/art.svg';
import BreadIcon from '../assets/imgs/breadB.svg';
import FlameIcon from '../assets/imgs/flame.svg';
import NatureIcon from '../assets/imgs/na.svg';
import ScienceIcon from '../assets/imgs/sei.svg';
import CalendarIcon from '../assets/imgs/calendar.svg';
import MonopolyIcon from '../assets/imgs/monopoly.svg';

const {width} = Dimensions.get('window');

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList>;

type Category = {
  id: string;
  name: string;
  icon: any;
};

type Review = {
  id: string;
  nickname: string;
  userimg: any;
  title: string;
  context: string;
};

const categories: Category[] = [
  {id: '1', name: '전체', icon: <GroupIcon width={40} height={40} />},
  {id: '2', name: '맛집', icon: <FoodIcon width={40} height={40} />},
  {id: '3', name: '숙소', icon: <HomeIcon width={40} height={40} />},
  {id: '4', name: '우천', icon: <RainIcon width={40} height={40} />},
  {id: '5', name: '스포츠', icon: <SportIcon width={40} height={40} />},
  {id: '6', name: '예술', icon: <ArtIcon width={40} height={40} />},
  {id: '7', name: '과학', icon: <ScienceIcon width={40} height={40} />},
  {id: '8', name: '빵', icon: <BreadIcon width={40} height={40} />},
  {id: '9', name: '자연', icon: <NatureIcon width={40} height={40} />},
  {id: '10', name: '인기', icon: <FlameIcon width={40} height={40} />},
];

const review: Review[] = [
  {
    id: '1',
    nickname: '대전의 아들 장현수',
    userimg: require('../assets/imgs/hotLong.png'),
    title: '대전 노잼 아닙니다 놀러오세요',
    context:
      '안녕하세요 대전의 아들 장현수입니다!안녕하세요 대전의 아들 장현수입니다!안녕하세요 대전의 아들 장현수입니다!안녕하세요 대전의 아들 장현수입니다!안녕하세요 대전의 아들 장현수입니다!안녕하세요 대전의 아들 장현수입니다!안녕하세요 대전의 아들 장현수입니다!안녕하세요 대전의 아들 장현수입니다!안녕하세요 대전의 아들 장현수입니다!안녕하세요 대전의 아들 장현수입니다!',
  },
  {
    id: '2',
    nickname: '대전의 아들 장현수',
    userimg: require('../assets/imgs/hotLong.png'),
    title: '대전 노잼 아닙니다 놀러오세요',
    context: '안녕하세요 대전의 아들 장현수입니다!',
  },
];
const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const chunkedArr: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};

const MainPage = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();

  const goToRecommend = () => {
    navigation.navigate('RecommendedPlace');
  };

  const goToTravelChallenge = () => {
    navigation.navigate('TravelChallenge');
  };

  const goToMonopolyPage = () => {
    navigation.navigate('MonopolyPage');
  };

  const goToCommunity = () => {
    navigation.navigate('Community');
  };

  const goToTravelItinerary = () => {
    navigation.navigate('TravelItinerary');
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };
  const goToMap = () => {
    navigation.navigate('Map');
  };

  const insertLineBreak = (text: string, maxChars: number) => {
    const words = text.split(' ');
    let line = '';
    let result = '';

    words.forEach(word => {
      if ((line + word).length > maxChars) {
        result += line.trim() + '\n';
        line = '';
      }
      line += word + ' ';
    });

    result += line.trim();
    return result;
  };

  const recommendData = [
    {
      id: '1',
      title: insertLineBreak('비오는 날에도 즐길 수 있는 실내 대전 여행지, 클릭!', 15),
      image: require('../assets/imgs/museum.png'),
      category: '실내',
    },
    {
      id: '2',
      title: insertLineBreak('대전 야외 명소, 꼭 방문해보세요!', 15),
      image: require('../assets/imgs/breadFull.png'),
      category: '야외',
    },
  ];

  const handlePress = (categoryName: string) => {
    console.log(`${categoryName}`);
  };

  const categoryRows = chunkArray<Category>(categories, 5);

  return (
    <>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <LogoIcon width={50} height={50} />
          <Text style={styles.logoText}>대전왔슈</Text>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={goToLogin}>
          <Text>로그인</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBarContainer}>
        <SearchBar />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.recommendContainer}>
          <FlatList
            data={recommendData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity style={styles.recommendItem} onPress={goToRecommend}>
                <Text style={styles.recommendTitle} numberOfLines={2} ellipsizeMode="tail">
                  {item.title}
                </Text>
                <Image source={item.image} style={styles.recommendImage} />
              </TouchableOpacity>
            )}
          />

          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>
              대전 관광지 <Text style={styles.categorySubtitle}>모두 담아놨슈~</Text>
            </Text>
            <TouchableOpacity>
              <Text style={styles.categoryMore}>&gt;</Text>
            </TouchableOpacity>
          </View>

          {categoryRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.rowContainer}>
              {row.map((item: Category) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.categoryItem}
                  onPress={() => handlePress(item.name)}>
                  {item.icon}
                  <Text style={styles.categoryName}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.challengeContainer}>
          <View style={styles.challengeHeader}>
            <Text style={styles.challengeTitle}>코스를 돌며 왓슈몬을 잡는</Text>

            <View style={styles.challengeSubtitleContainer}>
              <Text style={styles.challengeSubtitle}>대전여행코스 챌린지</Text>
              <FlameIcon width={25} height={25} />

              <TouchableOpacity onPress={goToTravelChallenge} style={styles.viewAllContainer}>
                <Text style={styles.viewAllLink}>전체 코스 보기</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.imageContainer}>
            <View style={styles.imageWrapper}>
              <ImageBackground source={require('../assets/imgs/hotLong.png')} style={styles.image}>
                <View style={styles.overlay}>
                  <Text style={styles.overlayTitle}>대전 핫스팟 투어</Text>
                  <Text style={styles.overlayDescription}>사람들이 많이 찾는 대전 핫플레이스</Text>
                </View>
              </ImageBackground>
            </View>

            <View style={styles.imageWrapper}>
              <ImageBackground
                source={require('../assets/imgs/breadLong.png')}
                style={styles.image}>
                <View style={styles.overlay}>
                  <Text style={styles.overlayTitle}>대전 빵지순례</Text>
                  <Text style={styles.overlayDescription}>대전의 다양한 빵집을 소개합니다</Text>
                </View>
              </ImageBackground>
            </View>
          </ScrollView>

          <View style={styles.scheduleContainer}>
            <View style={styles.scheduleHeader}>
              <Text style={styles.scheduleTitle}>직접 정해보는 대전 여행 일정</Text>
              <CalendarIcon width={24} height={24} />
            </View>
            <View style={styles.imageStyleContainer}>
              <ImageBackground
                source={require('../assets/imgs/Rectangle.png')}
                style={styles.scheduleImageBackground}
                imageStyle={styles.imageStyle}>
                <Text style={styles.scheduleOverlayText}>
                  여행 일정에 맞춰 <Text style={styles.Bolds}>대전</Text>에서 할일을 채워보기
                </Text>
                <TouchableOpacity style={styles.scheduleButton} onPress={goToTravelItinerary}>
                  <Text style={styles.scheduleButtonText}>+ 일정 등록하고 대전 관광지 채우기</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </View>
        </View>

        <View style={styles.monopolyContainer}>
          <View style={styles.monopolyHeader}>
            <Text style={styles.monopolyTitle}>부루마블로 즐기는</Text>
            <View style={styles.monopolySubtitleContainer}>
              <Text style={styles.monopolySubtitle}>대전 여행</Text>
              <MonopolyIcon width={25} height={25} />
            </View>
          </View>

          <Image
            source={require('../assets/imgs/monopoly.png')}
            style={styles.monopolyImage}
            resizeMode="cover"
          />

          <Text style={styles.monopolyDescription}>2팀의 대결모드도 가능!</Text>
          <TouchableOpacity style={styles.monopolyButton} onPress={goToMonopolyPage}>
            <Text style={styles.monopolyButtonText}>마블와슈 하러가기!</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.reviewContainer}>
          <View style={styles.reviewHeader}>
            <View style={styles.reviewM}>
              <Text style={styles.reviewHeaderTitle}>대전와슈 인기 여행기</Text>
              <FlameIcon width={20} height={20} />
            </View>
            <TouchableOpacity style={styles.communityLink} onPress={goToCommunity}>
              <Text style={styles.communityLinkText}>커뮤니티 보기</Text>
            </TouchableOpacity>
          </View>

          {review.map(item => (
            <View key={item.id} style={styles.reviewCard}>
              <View style={styles.userInfo}>
                <Image source={item.userimg} style={styles.userImage} />
                <Text style={styles.nickname}>{item.nickname}</Text>
              </View>

              <Text style={styles.reviewTitle}>{item.title}</Text>
              <Text style={styles.reviewText}>{item.context}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.communityLink} onPress={goToMap}>
          <Text style={styles.communityLinkText}>맵</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F5FB',
  },
  contentContainer: {
    paddingHorizontal: width * 0.06,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#418663',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 30,
    color: '#fff',
    marginLeft: 10,
    fontFamily: 'malssami815',
  },
  loginButton: {
    marginRight: 10,
  },
  searchBarContainer: {
    backgroundColor: '#418663',
    paddingVertical: 10,
  },
  recommendContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    elevation: 4,
    shadowColor: '#333',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  recommendItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginRight: 10,
    width: width * 0.75,
    borderRadius: 8,
  },
  recommendTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: '#333',
    marginBottom: 10,
    lineHeight: 22,
  },
  recommendImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.06,
    paddingVertical: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: '#333',
  },
  categorySubtitle: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: '#418663',
    textShadowColor: 'rgba(65, 134, 99, 0.3)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
  },
  categoryMore: {
    fontSize: 24,
    color: '#333',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 5,
    alignItems: 'center',
  },
  categoryItem: {
    alignItems: 'center',
    width: width * 0.16,
  },
  categoryName: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
    textAlign: 'center',
    fontFamily: 'Pretendard-Regular',
  },
  challengeContainer: {
    marginVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    elevation: 4,
    shadowColor: '#333',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  challengeHeader: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  challengeTextContainer: {
    flexDirection: 'column',
  },
  challengeTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: '#333',
  },
  challengeSubtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeSubtitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: '#333',
    marginRight: 6,
  },
  viewAllContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  viewAllLink: {
    fontSize: 10,
    color: '#999',
    marginRight: 10,
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
  scheduleContainer: {
    marginVertical: 0,
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  scheduleTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: '#333',
    marginRight: 6,
  },
  Bolds: {
    fontSize: 18,
    fontFamily: 'Pretendard-Bold',
  },
  imageStyleContainer: {
    alignSelf: 'center',
  },
  scheduleImageBackground: {
    width: 300,
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    paddingHorizontal: 16,
  },
  imageStyle: {
    borderRadius: 12,
  },
  scheduleOverlayText: {
    fontSize: 14,
    color: '#FFF',
    fontFamily: 'Pretendard-Regular',
    marginBottom: 8,
    marginTop: 10,
  },
  scheduleButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#418663',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  scheduleButtonText: {
    fontSize: 12,
    color: '#FFF',
    fontFamily: 'Pretendard-SemiBold',
  },
  monopolyContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: '#333',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
    alignItems: 'center',
  },
  monopolyHeader: {
    alignItems: 'flex-start',
    marginBottom: 10,
    width: '100%',
  },
  monopolyTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: '#333',
  },
  monopolySubtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  monopolySubtitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: '#333',
    marginRight: 6,
  },
  monopolyImage: {
    width: 200,
    height: 200,
  },
  monopolyDescription: {
    fontSize: 16,
    color: '#418663',
    fontFamily: 'Pretendard-Bold',
    marginVertical: 10,
  },
  monopolyButton: {
    backgroundColor: '#418663',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    width: '75%',
  },
  monopolyButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontFamily: 'Pretendard-Bold',
  },
  reviewContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  reviewM: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewHeaderTitle: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    color: '#333',
    marginRight: 6,
  },
  communityLink: {
    alignItems: 'flex-end',
  },
  communityLinkText: {
    fontSize: 10,
    color: '#999',
    fontFamily: 'Pretendard-Bold',
  },
  reviewCard: {
    padding: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: '#ddd',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  nickname: {
    fontSize: 12,
    fontFamily: 'Pretendard-SemiBold',
    color: '#333',
  },
  reviewTitle: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
    color: '#333',
    marginTop: 5,
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 20,
    fontFamily: 'Pretendard-Regular',
  },
});

export default MainPage;
