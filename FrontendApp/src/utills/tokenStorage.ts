import AsyncStorage from '@react-native-async-storage/async-storage';

interface Tokens {
  accessToken: string | null;
  refreshToken: string | null;
}

// 토큰 저장 함수
export const saveTokens = async (
  accessToken: string | null,
  refreshToken: string | null,
): Promise<void> => {
  try {
    // 값이 유효할 때만 저장
    if (accessToken) {
      await AsyncStorage.setItem('accessToken', accessToken);
    } else {
      await AsyncStorage.removeItem('accessToken');
    }

    if (refreshToken) {
      await AsyncStorage.setItem('refreshToken', refreshToken);
    } else {
      await AsyncStorage.removeItem('refreshToken');
    }
  } catch (error) {
    console.error('Failed to save tokens:', error);
  }
};

// 토큰 불러오기 함수
export const getTokens = async (): Promise<Tokens> => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    return {accessToken, refreshToken};
  } catch (error) {
    console.error('Failed to load tokens:', error);
    return {accessToken: null, refreshToken: null};
  }
};

// 토큰 삭제 함수
export const removeTokens = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
  } catch (error) {
    console.error('Failed to remove tokens:', error);
  }
};
