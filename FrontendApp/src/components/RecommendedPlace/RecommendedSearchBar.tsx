import React from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';
import SearchIcon from '../../assets/imgs/search.svg';

const {width} = Dimensions.get('window');

const RecommendedSearchBar = () => {
  return (
    <View style={styles.centerContainer}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          autoCorrect={false}
          autoCapitalize="none"
          maxLength={100}
        />
        <SearchIcon width={20} height={20} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 40,
    borderWidth: 1.5,
    borderColor: 'rgba(153, 153, 153, 0.5)',
    width: width * 0.75,
    alignSelf: 'center',
  },
  searchInput: {
    flex: 1,
    color: '#333',
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
  },
});

export default RecommendedSearchBar;
