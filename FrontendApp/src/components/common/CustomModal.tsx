import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions, Image} from 'react-native';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  content: string;
  imageSource?: any;
  footerButtonText?: string;
}

const {width} = Dimensions.get('window');

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  title,
  content,
  imageSource,
  footerButtonText = '확인',
}) => {
  const contentLines = content.split('\\n').map(line => line.trim());

  return (
    <Modal transparent animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>

          {imageSource && <Image source={imageSource} style={styles.modalImage} />}

          <View style={styles.contentContainer}>
            {contentLines.map((line, index) => (
              <Text key={index} style={styles.modalContent}>
                {line}
              </Text>
            ))}
          </View>

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
  modalImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  contentContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  modalContent: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
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

export default CustomModal;
