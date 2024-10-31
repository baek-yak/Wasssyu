import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const SignUp = (): React.JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState<string | null>(null);
  const [birthYear, setBirthYear] = useState('');
  const [nickname, setNickname] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSignUp = () => {};

  const handleEmailVerification = () => {};

  return (
    <View style={styles.container}>
      <Text style={[styles.label, focusedField === 'email' && styles.focusedLabel]}>이메일</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, styles.emailInput, focusedField === 'email' && styles.focusedInput]}
          placeholder="이메일"
          placeholderTextColor="#F1F1F1"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
        />
        <TouchableOpacity style={styles.verifyButton} onPress={handleEmailVerification}>
          <Text style={styles.verifyButtonText}>인증하기</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.label, focusedField === 'password' && styles.focusedLabel]}>
        비밀번호
      </Text>
      <TextInput
        style={[styles.input, focusedField === 'password' && styles.focusedInput]}
        placeholder="비밀번호"
        placeholderTextColor="#F1F1F1"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        onFocus={() => setFocusedField('password')}
        onBlur={() => setFocusedField(null)}
      />

      <Text style={styles.label}>성별</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderOption, gender === 'male' && styles.genderSelected]}
          onPress={() => setGender('male')}>
          <Text style={styles.genderText}>남</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderOption, gender === 'female' && styles.genderSelected]}
          onPress={() => setGender('female')}>
          <Text style={styles.genderText}>여</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.label, focusedField === 'birthYear' && styles.focusedLabel]}>
        출생년도
      </Text>
      <TextInput
        style={[styles.input, focusedField === 'birthYear' && styles.focusedInput]}
        placeholder="YYYY"
        placeholderTextColor="#F1F1F1"
        value={birthYear}
        onChangeText={setBirthYear}
        keyboardType="numeric"
        onFocus={() => setFocusedField('birthYear')}
        onBlur={() => setFocusedField(null)}
      />

      <Text style={[styles.label, focusedField === 'nickname' && styles.focusedLabel]}>닉네임</Text>
      <TextInput
        style={[styles.input, focusedField === 'nickname' && styles.focusedInput]}
        placeholder="닉네임"
        placeholderTextColor="#F1F1F1"
        value={nickname}
        onChangeText={setNickname}
        onFocus={() => setFocusedField('nickname')}
        onBlur={() => setFocusedField(null)}
      />

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>회원가입</Text>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    marginBottom: 4,
  },
  focusedLabel: {
    color: '#418663',
  },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#F1F1F1',
    paddingVertical: 5,
    fontSize: 20,
    color: '#333',
  },
  emailInput: {
    width: '75%',
  },
  focusedInput: {
    borderBottomColor: '#418663',
  },
  verifyButton: {
    width: '20%',
    position: 'absolute',
    right: 0,
    backgroundColor: '#C8DECB',
    paddingVertical: 10,
    borderRadius: 8,
  },
  verifyButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 500,
    textAlign: 'center',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  genderOption: {
    width: 50,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#418663',
    alignItems: 'center',
  },
  genderSelected: {
    backgroundColor: '#C8DECB',
  },
  genderText: {
    color: '#333',
  },
  signUpButton: {
    backgroundColor: '#C8DECB',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '65%',
    alignSelf: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SignUp;
