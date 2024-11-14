import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../router/Navigator';
import AccountDeletionModal from '../components/Profile/AccountDeletionModal';
import ProfileImagePickerModal from '../components/Profile/ProfileImagePickerModal';

const {width} = Dimensions.get('window');

type ProfileNavigationProp = StackNavigationProp<RootStackParamList>;

const Profile = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isImagePickerModalVisible, setImagePickerModalVisible] = useState(false);

  const ProfileImage = require('../assets/imgs/basic.png'); // 기본 이미지를 require로 불러오기

  const goToChangePassword = () => {
    navigation.navigate('ChangePassword');
  };

  const goToChangeInfo = () => {
    navigation.navigate('ChangeInfo');
  };

  const openDeleteModal = () => setDeleteModalVisible(true);
  const closeDeleteModal = () => setDeleteModalVisible(false);
  const handleConfirmDelete = () => {
    // 계정 삭제 처리 로직
    closeDeleteModal();
  };

  const openImagePickerModal = () => setImagePickerModalVisible(true);
  const closeImagePickerModal = () => setImagePickerModalVisible(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>프로필</Text>
      <Image source={ProfileImage} style={styles.profileImage} />
      <TouchableOpacity onPress={openImagePickerModal}>
        <Text style={styles.editProfileText}>프로필 사진 바꾸기</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>닉네임</Text>
        <Text style={styles.infoText}>대전의 아들 장현수</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>이메일</Text>
        <Text style={styles.infoText}>JANG@gmail.com</Text>
      </View>

      <View style={styles.actionContainer}>
        <Text style={styles.actionLabel}>닉네임 변경</Text>
        <TouchableOpacity onPress={goToChangeInfo}>
          <Text style={styles.arrow}>〉</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionContainer}>
        <Text style={styles.actionLabel}>비밀번호 변경</Text>
        <TouchableOpacity onPress={goToChangePassword}>
          <Text style={styles.arrow}>〉</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={openDeleteModal}>
        <Text style={styles.deleteAccountText}>계정 삭제</Text>
      </TouchableOpacity>

      {/* 계정 삭제 모달 */}
      <AccountDeletionModal
        visible={isDeleteModalVisible}
        onCancel={closeDeleteModal}
        onConfirm={handleConfirmDelete}
      />

      {/* 프로필 이미지 선택 모달 */}
      <ProfileImagePickerModal
        visible={isImagePickerModalVisible}
        onClose={closeImagePickerModal}
        onSelectImage={() => {
          // 앨범에서 이미지 선택 로직 추가
          closeImagePickerModal();
        }}
        onResetImage={() => {
          // 기본 이미지로 변경 로직 추가
          closeImagePickerModal();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
    color: '#333333',
    marginTop: 50,
  },
  editProfileText: {
    color: '#418663',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 30,
    fontFamily: 'Pretendard-Regular',
  },
  infoContainer: {
    flexDirection: 'row',
    width: width * 0.8,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#333333',
    fontFamily: 'Pretendard-Bold',
  },
  infoText: {
    fontSize: 16,
    color: '#333333',
    fontFamily: 'Pretendard-Regular',
  },
  actionContainer: {
    flexDirection: 'row',
    width: width * 0.8,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderColor: '#E0E0E0',
  },
  actionLabel: {
    fontSize: 16,
    color: '#333333',
    fontFamily: 'Pretendard-Bold',
  },
  arrow: {
    fontSize: 16,
    color: '#333333',
  },
  deleteAccountText: {
    fontSize: 12,
    color: '#999',
    marginTop: 20,
  },
});

export default Profile;
