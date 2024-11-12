import axios from 'axios';
import {Authapi, api} from './core';

export interface TouristSpot {
  id: string;
  spotName: string;
  spotAddress: string;
  liked: number;
  stamp: number;
  spotDescription: string;
  phoneNumber: string;
  businessHour: string;
  latitude: number;
  longitude: number;
  categories: {category: string}[];
  images: {image: string}[];
}

export interface ScheduleRequest {
  startDate: string;
  endDate: string;
  title: string;
  dailyPlans: {
    date: string;
    spotIds: string[];
  }[];
}

export interface Schedule {
  scheduleId: number;
  title: string;
  startDate: string;
  endDate: string;
  spotCount: number;
}

export interface ScheduleResponse {
  onGoingSchedules: Schedule | null;
  upcomingSchedules: Schedule[];
  pastSchedules: Schedule[];
}

// 관광지 검색
export async function getSpots(searchText: string): Promise<TouristSpot[] | null> {
  try {
    const response = await api.get('/tourist/search', {
      params: {searchText},
    });

    if (response && response.status === 200) {
      return response.data.content as TouristSpot[];
    } else {
      console.error('Error: ', response.data);
      return null;
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('Axios Error: ', err.response);
    } else {
      console.error('Unexpected Error: ', err);
    }
    return null;
  }
}

// 일정 생성
export async function createSchedule(scheduleData: ScheduleRequest): Promise<string | null> {
  try {
    const response = await Authapi.post('/courses', scheduleData);

    if (response && response.status === 200) {
      console.log('Schedule created successfully:', response.data);
      return response.data;
    } else {
      console.error('Error creating schedule:', response.data);
      return null;
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('Axios Error:', err.response);
    } else {
      console.error('Unexpected Error:', err);
    }
    return null;
  }
}

// 일정 조회
export async function getMySchedules(): Promise<ScheduleResponse | null> {
  try {
    const response = await Authapi.get('/courses/my');

    if (response && response.status === 200) {
      console.log('일정 조회 성공:', response.data);
      return {
        onGoingSchedules: response.data.onGoingSchedules ?? null,
        upcomingSchedules: response.data.upcomingSchedules || [],
        pastSchedules: response.data.pastSchedules || [],
      };
    } else {
      console.error('일정 조회 오류:', response.data);
      return null;
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('Axios 오류:', err.response);
    } else {
      console.error('예상치 못한 오류:', err);
    }
    return null;
  }
}

// 전체 일정 삭제
export async function deleteSchedule(scheduleId: string): Promise<boolean> {
  try {
    const response = await Authapi.delete(`/courses/${scheduleId}`);

    if (response && response.status === 200) {
      console.log(response.data);
      return true;
    } else {
      console.error(response.data);
      return false;
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('Axios Error:', err.response);
    } else {
      console.error('Unexpected Error:', err);
    }
    return false;
  }
}

// 일정 수정
export async function updateSchedule(
  coursesId: any,
  scheduleData: ScheduleRequest,
): Promise<boolean> {
  try {
    const response = await Authapi.put(`/courses/${coursesId}`, scheduleData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response && response.status === 200) {
      console.log('일정 수정 성공:', response.data);
      return true;
    } else {
      console.error('일정 수정 실패:', response.data);
      return false;
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error('Axios Error:', err.response);
    } else {
      console.error('Unexpected Error:', err);
    }
    return false;
  }
}

// 일정 상세 조회
export const getScheduleDetails = async (scheduleId: string) => {
  try {
    const response = await Authapi.get(`/courses/${scheduleId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch schedule details:', error);
    throw error;
  }
};
