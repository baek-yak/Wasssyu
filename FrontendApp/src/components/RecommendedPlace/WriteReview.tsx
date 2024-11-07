import React, {useState} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const WriteReview = () => {
  const navigation = useNavigation();
  const [content, setContent] = useState('');
  const [image] = useState<string | null>(null);

  const pickImage = async () => {};

  const handleRegister = () => {
    console.log('리뷰 등록:', {content, image});
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
        <Text style={styles.registerButtonText}>등록</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {image ? (
          <Image source={{uri: image}} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>이미지 추가</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>내용</Text>
        <TextInput
          style={styles.input}
          placeholder="내용"
          value={content}
          onChangeText={setContent}
          multiline
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  registerButton: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  registerButtonText: {
    color: '#418663',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Pretendard-Bold',
  },
  imageContainer: {
    width: width * 0.5,
    height: width * 0.5,
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  imagePlaceholderText: {
    color: '#aaa',
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    fontSize: 16,
    paddingVertical: 5,
    color: '#333',
  },
});

export default WriteReview;
