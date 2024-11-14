import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../router/Navigator';

const {width} = Dimensions.get('window');

type CommunityNavigationProp = StackNavigationProp<RootStackParamList>;

const Community = () => {
  const navigation = useNavigation<CommunityNavigationProp>();

  const goToWriting = () => {
    navigation.navigate('Writing');
  };

  const goToCommunitySearch = () => {
    navigation.navigate('CommunitySearch');
  };

  return (
    <View style={styles.container}>
      <Text>여행기</Text>
      <TouchableOpacity onPress={goToCommunitySearch}>
        <Text>검색</Text>
      </TouchableOpacity>
      <Button title="글작성" onPress={goToWriting} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
});

export default Community;
