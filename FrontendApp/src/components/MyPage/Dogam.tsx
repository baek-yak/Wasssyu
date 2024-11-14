import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MonIcon from '../../assets/imgs/mon1.svg';
import MononeIcon from '../../assets/imgs/mon2.svg';
import MontwoIcon from '../../assets/imgs/mon3.svg';
const {width} = Dimensions.get('window');

const Dogam = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 도감</Text>
      <View style={styles.divider} />
      <LinearGradient
        colors={['#rgba(200, 222, 203, 0.5)', '#rgba(65, 134, 99, 0.5)']}
        style={styles.gradientContainer}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        {/* 왓슈몬 캐릭터들이 들어갈 영역 */}
        <View style={styles.monItem}>
          <MonIcon width={75} height={75} />
          <Text style={styles.monText}>단팥몬</Text>
        </View>
        <View style={styles.monItem}>
          <MononeIcon width={75} height={75} />
          <Text style={styles.monText}>소보루몬</Text>
        </View>
        <View style={styles.monItem}>
          <MontwoIcon width={75} height={75} />
          <Text style={styles.monText}>바게트몬</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
    color: '#333',
    marginTop: 20,
    marginBottom: 20,
  },
  divider: {
    height: 2,
    backgroundColor: '#418663',
  },
  gradientContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: width * 0.1,
  },
  monItem: {
    alignItems: 'center',
  },
  monText: {
    fontSize: 16,
    color: '#418663',
    fontFamily: 'Pretendard-Bold',
  },
});

export default Dogam;
