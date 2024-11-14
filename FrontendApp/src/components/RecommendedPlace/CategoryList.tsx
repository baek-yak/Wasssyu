import React from 'react';
import {Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import GroupIcon from '../../assets/imgs/Group.svg';
import FoodIcon from '../../assets/imgs/food.svg';
import HomeIcon from '../../assets/imgs/home.svg';
import RainIcon from '../../assets/imgs/rain.svg';
import SportIcon from '../../assets/imgs/sport.svg';
import ArtIcon from '../../assets/imgs/art.svg';

const categories = [
  {id: '1', name: '전체', icon: <GroupIcon width={30} height={30} />},
  {id: '2', name: '맛집', icon: <FoodIcon width={30} height={30} />},
  {id: '3', name: '숙소', icon: <HomeIcon width={30} height={30} />},
  {id: '4', name: '우천', icon: <RainIcon width={30} height={30} />},
  {id: '5', name: '스포츠', icon: <SportIcon width={30} height={30} />},
  {id: '6', name: '예술', icon: <ArtIcon width={30} height={30} />},
];

const CategoryList = () => {
  const handlePress = (categoryName: string) => {
    console.log(`${categoryName}`);
  };

  return (
    <FlatList
      data={categories}
      horizontal
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => handlePress(item.name)} style={styles.categoryItem}>
          {item.icon}
          <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 10,
    fontFamily: 'Pretendard-Medium',
    color: '#333',
  },
});

export default CategoryList;
