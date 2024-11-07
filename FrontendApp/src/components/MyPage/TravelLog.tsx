import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TravelLog = () => {
  return (
    <View style={styles.container}>
      <Text>여행기</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TravelLog;
