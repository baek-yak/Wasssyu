import axios from 'axios';
import {api, Authapi} from './core';
import {saveTokens, getTokens, removeTokens} from '../utills/tokenStorage';

//회원가입 이메일 인증
export async function sendVerificationCode(email: string) {
  try {
    const response = await api.post('/auth/send-verification-code', null, {
      params: {email: email},
    });
    return response;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      if (!err.response) {
        console.error('No response from server.');
        return undefined;
      } else {
        console.error('Error response:', err.response);
        return err.response;
      }
    } else {
      console.error('Unknown error:', err);
      return undefined;
    }
  }
}

// 로그인
export async function login(email: string, password: string) {
  try {
    const response = await api.post('/auth/login', {email, password});

    if (response && response.data) {
      const {access: accessToken, refresh: refreshToken} = response.data;

      if (accessToken && refreshToken) {
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);
        await saveTokens(accessToken, refreshToken);
      } else {
        console.error('Login error: Access token or refresh token is missing.');
      }
    } else {
      console.error('Login error: No response data.');
    }

    return response;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('Login error (Axios):', err.response);
      return err.response;
    } else {
      console.error('Unexpected error:', err);
      return undefined;
    }
  }
}

//로그아웃
export async function logout() {
  try {
    const {accessToken} = await getTokens();

    if (!accessToken) {
      console.error('Logout error: No access token available.');
      return;
    }
    const response = await Authapi.post('/auth/logout', null);

    if (response.status === 200) {
      console.log('Logout successful.');

      await removeTokens();
    } else {
      console.error('Logout failed:', response.status);
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('Logout error (Axios):', err.response);
    } else {
      console.error('Unexpected error during logout:', err);
    }
  }
}

// 코드 인증 요청
export async function verifyCode(email: string, code: string) {
  try {
    const response = await api.post('/auth/verify-code', null, {
      params: {email, code},
    });

    if (response && response.status === 200 && response.data.status === 'success') {
      console.log('Code verification successful.');
      return true;
    } else {
      console.error('Code verification failed:', response.data);
      return false;
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('Code verification error (Axios):', err.response);
      return false;
    } else {
      console.error('Unexpected error during code verification:', err);
      return false;
    }
  }
}
