import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../../router/Navigator';

type HeaderNavigationProp = StackNavigationProp<RootStackParamList>;

const Header = () => {
  const navigation = useNavigation<HeaderNavigationProp>();

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const goToMyPage = () => {
    navigation.navigate('MyPage');
  };
  const goToArPage = () => {
    navigation.navigate('Ar');
  };

  return (
    <View style={styles.container}>
      <Text>로고</Text>
      <TouchableOpacity style={styles.loginButton} onPress={goToLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.myButton} onPress={goToMyPage}>
        <Text style={styles.myButtonText}>마이페이지</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.myButton} onPress={goToArPage}>
        <Text style={styles.myButtonText}>Ar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  loginButton: {
    backgroundColor: '#418663',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  myButton: {
    backgroundColor: '#418663',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  myButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Header;
