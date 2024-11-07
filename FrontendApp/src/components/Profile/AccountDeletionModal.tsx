import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';

// const { width } = Dimensions.get('window');

interface AccountDeletionModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const AccountDeletionModal: React.FC<AccountDeletionModalProps> = ({
  visible,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.modalText}>계정을 탈퇴 하시겠습니까?</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.modalActions}>
            <TouchableOpacity onPress={onCancel} style={styles.button}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
            <View style={styles.verticalDivider} />
            <TouchableOpacity onPress={onConfirm} style={styles.button}>
              <Text style={styles.confirmButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: 280,
    height: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalText: {
    fontSize: 14,
    fontFamily: 'Pretendard Variable',
    fontWeight: '400',
    color: '#333333',
    textAlign: 'center',
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
  },
  modalActions: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    height: '100%',
  },
  cancelButtonText: {
    color: '#333333',
    fontSize: 12,
    fontFamily: 'Pretendard-SemiBold',
  },
  confirmButtonText: {
    color: '#418663',
    fontSize: 12,
    fontFamily: 'Pretendard-SemiBold',
  },
});

export default AccountDeletionModal;
