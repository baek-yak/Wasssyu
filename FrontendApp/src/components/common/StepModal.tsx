import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

interface StepModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  footerButtonText?: string;
}

const {width} = Dimensions.get('window');

const StepModal: React.FC<StepModalProps> = ({
  visible,
  onClose,
  title,
  content,
  footerButtonText = '확인',
}) => {
  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <View style={styles.contentContainer}>{content}</View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>{footerButtonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width * 0.8,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  contentContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#418663',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default StepModal;
