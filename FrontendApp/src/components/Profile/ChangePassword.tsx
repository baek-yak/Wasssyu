import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const ChangePassword = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButtonPlaceholder} />
        <Text style={styles.headerTitle}>비밀번호 변경</Text>
        <TouchableOpacity>
          <Text style={styles.headerButton}>완료</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>현재 비밀번호</Text>
        <TextInput style={styles.input} secureTextEntry placeholder="" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>새 비밀번호</Text>
        <TextInput style={styles.input} secureTextEntry placeholder="" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>새 비밀번호 확인</Text>
        <TextInput style={styles.input} secureTextEntry placeholder="" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: width * 0.06,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
    color: '#333333',
    textAlign: 'center',
  },
  headerButton: {
    fontSize: 16,
    color: '#418663',
  },
  headerButtonPlaceholder: {
    width: 50, // 완료 버튼의 공간만큼 차지하도록 설정
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    color: '#333333',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    fontSize: 16,
    color: '#333333',
  },
});

export default ChangePassword;