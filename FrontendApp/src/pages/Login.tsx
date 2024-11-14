import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../router/Navigator';
import {login} from '../api/user';

const {width} = Dimensions.get('window');

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const Login = (): React.JSX.Element => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const emailLabelStyle = isEmailFocused ? styles.focusedLabel : styles.defaultLabel;
  const passwordLabelStyle = isPasswordFocused ? styles.focusedLabel : styles.defaultLabel;

  const emailInputStyle = [
    styles.defaultInput,
    isEmailFocused && styles.focusedInput,
    email ? styles.textWithValue : styles.placeholderText,
  ];

  const passwordInputStyle = [
    styles.defaultInput,
    isPasswordFocused && styles.focusedInput,
    password ? styles.textWithValue : styles.placeholderText,
  ];

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('이메일과 비밀번호를 입력해 주세요.');
      return;
    }

    try {
      const response = await login(email, password);
      if (response && response.status === 200) {
        Alert.alert('로그인 성공!', '메인 화면으로 이동합니다.');
        navigation.navigate('Main');
      } else {
        console.log(response?.status);
        Alert.alert('로그인 실패', '이메일 또는 비밀번호를 확인해 주세요.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('로그인 오류', '다시 시도해 주세요.');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  const handleForgotPassword = () => {
    navigation.navigate('FindPassword');
  };

  return (
    <View style={styles.container}>
      <Text style={emailLabelStyle}>이메일</Text>
      <TextInput
        style={emailInputStyle}
        placeholder="이메일"
        placeholderTextColor="#F1F1F1"
        value={email}
        onChangeText={setEmail}
        onFocus={() => setIsEmailFocused(true)}
        onBlur={() => setIsEmailFocused(false)}
      />

      <Text style={passwordLabelStyle}>비밀번호</Text>
      <TextInput
        style={passwordInputStyle}
        placeholder="비밀번호"
        placeholderTextColor="#F1F1F1"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        onFocus={() => setIsPasswordFocused(true)}
        onBlur={() => setIsPasswordFocused(false)}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>비밀번호를 잊어버렸어요</Text>
      </TouchableOpacity>
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
  defaultLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  focusedLabel: {
    fontSize: 14,
    color: '#418663',
    marginBottom: 4,
  },
  defaultInput: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#F1F1F1',
    paddingVertical: 5,
    fontSize: 20,
    marginBottom: 20,
    color: '#F1F1F1',
  },
  focusedInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#418663',
    paddingVertical: 8,
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
  },
  loginButton: {
    backgroundColor: 'rgba(65, 134, 99, 0.6)',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    width: '65%',
    alignSelf: 'center',
  },
  signUpButton: {
    backgroundColor: '#C8DECB',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    width: '65%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPasswordText: {
    color: 'rgba(51, 51, 51, 0.5)',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  placeholderText: {
    color: '#F1F1F1', // 회색 (입력값이 없는 경우)
  },
  textWithValue: {
    color: '#333', // 진한 회색 (입력값이 있는 경우)
  },
});

export default Login;
