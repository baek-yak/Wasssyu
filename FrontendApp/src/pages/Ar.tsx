import React from 'react';
import {View, Text, Button} from 'react-native';
import {NativeModules} from 'react-native';

const {ArModule} = NativeModules;

const Ar = () => {
  return (
    <View>
      <Text>AR 화면 테스트</Text>
      <Button title="Start AR" onPress={() => ArModule.startArActivity()} />
    </View>
  );
};

export default Ar;
