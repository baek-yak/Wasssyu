import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../router/Navigator';

const {width} = Dimensions.get('window');

type FindPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const FindPassword = (): React.JSX.Element => {
  const navigation = useNavigation<FindPasswordScreenNavigationProp>();

  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFindPassword = () => {};

  const handleLoginRedirect = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>비밀번호 찾기</Text>
      <Text style={styles.description}>
        가입 시 입력하신 이메일로{'\n'}새로운 비밀번호를 보내드립니다.
      </Text>

      <Text style={[styles.label, isFocused && styles.focusedLabel]}>이메일</Text>
      <TextInput
        style={[styles.input, isFocused ? styles.focusedInput : styles.defaultInput]}
        placeholder="이메일"
        placeholderTextColor="#F1F1F1"
        value={email}
        onChangeText={setEmail}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <TouchableOpacity style={styles.findPasswordButton} onPress={handleFindPassword}>
        <Text style={styles.buttonText}>비밀번호 찾기</Text>
      </TouchableOpacity>

      <View style={styles.loginRedirectContainer}>
        <Text style={styles.loginRedirectText}>이미 계정이 있다면? </Text>
        <TouchableOpacity onPress={handleLoginRedirect}>
          <Text style={styles.loginLink}>로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.08,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  description: {
    fontSize: 12,
    color: '#333',
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  focusedLabel: {
    color: '#418663',
  },
  input: {
    paddingVertical: 8,
    fontSize: 20,
    color: '#333',
    marginBottom: 30,
  },
  defaultInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#F1F1F1',
  },
  focusedInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#418663',
  },
  findPasswordButton: {
    backgroundColor: '#C8DECB',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '65%',
    alignSelf: 'center',
    marginBottom: 100,
  },
  buttonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
  },
  loginRedirectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginRedirectText: {
    borderBottomColor: 'rgba(51, 51, 51, 0.5)',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: '400',
  },
  loginLink: {
    color: '#418663',
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

export default FindPassword;
