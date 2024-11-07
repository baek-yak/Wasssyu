import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';

interface DeleteConfirmationModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  visible,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.modalText}>
              일정을 삭제하시겠습니까?{'\n'}모든 일정 속 내용들이 삭제됩니다.
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.modalButtons}>
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
    height: 180,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  textContainer: {
    height: 130,
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
  modalButtons: {
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
    color: '#999999',
    fontSize: 16,
  },
  confirmButtonText: {
    color: '#418663',
    fontSize: 16,
  },
});

export default DeleteConfirmationModal;
