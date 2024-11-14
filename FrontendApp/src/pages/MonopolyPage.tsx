import React from 'react';
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingHorizontal: width * 0.06,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
});

const MonopolyPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>부루마블로 즐기는 대전 여행 🎲</Text>
      <Text style={styles.description}>2팀의 대결 모드도 가능!</Text>
      <Button title="마블와슈 하러가기!" color="#4CAF50" />
    </View>
  );
};

export default MonopolyPage;
