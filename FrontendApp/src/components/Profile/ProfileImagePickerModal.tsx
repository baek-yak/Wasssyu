import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

interface ProfileImagePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectImage: () => void;
  onResetImage: () => void;
}

const ProfileImagePickerModal: React.FC<ProfileImagePickerModalProps> = ({
  visible,
  onClose,
  onSelectImage,
  onResetImage,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={onSelectImage} style={styles.modalOption}>
            <Text style={styles.optionText}>앨범에서 선택</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onResetImage} style={styles.modalOption}>
            <Text style={styles.optionText}>기본 이미지로 변경</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
  },
  modalOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
  },
  closeButton: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  closeButtonText: {
    color: '#418663',
    fontSize: 16,
  },
});

export default ProfileImagePickerModal;
