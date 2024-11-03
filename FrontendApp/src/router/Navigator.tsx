import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../pages/Main';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import RecommendedPlace from '../pages/RecommendedPlace';
import TravelChallenge from '../pages/TravelChallenge';
import MonopolyPage from '../pages/MonopolyPage';
import Community from '../pages/Community';
import Ar from '../pages/Ar';
import FindPassword from '../pages/FindPassword';
import MyPage from '../pages/MyPage';
import TravelItinerary from '../pages/TravelItinerary';
import OngoingChallenge from '../components/MyPage/OngoingChallenge';
import CompletedChallenge from '../components/MyPage/CompletedChallenge';
import Profile from '../pages/Profile';
import Dogam from '../components/MyPage/Dogam';
import ChangePassword from '../components/Profile/ChangePassword';
import ChangeInfo from '../components/Profile/ChangeInfo';
import CreateSchedule from '../components/TravelItinerary/CreateSchedule';
import Details from '../components/TravelItinerary/Details';
import Course from '../components/TravelChallenge/Course';
import CourseDescription from '../components/TravelChallenge/CourseDescription';
import ChallengeDetail from '../components/TravelChallenge/ChallengeDetail';
import PlaceList from '../components/RecommendedPlace/PlaceList';
import PlaceDetail from '../components/RecommendedPlace/PlaceDetail';
import Writing from '../components/Community/Writing';
import CommunitySearch from '../components/Community/CommunitySearch';

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  SignUp: undefined;
  RecommendedPlace: undefined;
  TravelChallenge: undefined;
  MonopolyPage: undefined;
  Community: undefined;
  Ar: undefined;
  FindPassword: undefined;
  MyPage: undefined;
  TravelItinerary: undefined;
  OngoingChallenge: undefined;
  CompletedChallenge: undefined;
  Profile: undefined;
  Dogam: undefined;
  ChangePassword: undefined;
  ChangeInfo: undefined;
  CreateSchedule: undefined;
  Details: undefined;
  Course: undefined;
  CourseDescription: undefined;
  ChallengeDetail: undefined;
  PlaceList: undefined;
  PlaceDetail: {name: string};
  Writing: undefined;
  CommunitySearch: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function Navigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
      <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
      <Stack.Screen
        name="RecommendedPlace"
        component={RecommendedPlace}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TravelChallenge"
        component={TravelChallenge}
        options={{headerShown: false}}
      />
      <Stack.Screen name="MonopolyPage" component={MonopolyPage} options={{headerShown: false}} />
      <Stack.Screen name="Community" component={Community} options={{headerShown: false}} />
      <Stack.Screen name="Ar" component={Ar} options={{headerShown: false}} />
      <Stack.Screen name="FindPassword" component={FindPassword} options={{headerShown: false}} />
      <Stack.Screen name="MyPage" component={MyPage} options={{headerShown: false}} />
      <Stack.Screen
        name="TravelItinerary"
        component={TravelItinerary}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OngoingChallenge"
        component={OngoingChallenge}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CompletedChallenge"
        component={CompletedChallenge}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}} />
      <Stack.Screen name="Dogam" component={Dogam} options={{headerShown: false}} />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ChangeInfo" component={ChangeInfo} options={{headerShown: false}} />
      <Stack.Screen
        name="CreateSchedule"
        component={CreateSchedule}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Details" component={Details} options={{headerShown: false}} />
      <Stack.Screen name="Course" component={Course} options={{headerShown: false}} />
      <Stack.Screen
        name="CourseDescription"
        component={CourseDescription}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChallengeDetail"
        component={ChallengeDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen name="PlaceList" component={PlaceList} options={{headerShown: false}} />
      <Stack.Screen name="PlaceDetail" component={PlaceDetail} options={{headerShown: false}} />
      <Stack.Screen name="Writing" component={Writing} options={{headerShown: false}} />
      <Stack.Screen
        name="CommunitySearch"
        component={CommunitySearch}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default Navigator;
