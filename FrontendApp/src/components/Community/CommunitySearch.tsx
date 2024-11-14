import React from 'react';
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const CommunitySearch = () => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="검색" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

export default CommunitySearch;
