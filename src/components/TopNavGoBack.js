import React from 'react';
import {View} from 'react-native';
import {
  Divider,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {BackNavIcon} from 'faccloud/src/styles/icons';

const TopNavGoBack = ({navigation, title}) => {
  const BackAction = () => (
    <TopNavigationAction
      icon={BackNavIcon}
      onPress={() => navigation.goBack()}
    />
  );

  return (
    <View>
      <TopNavigation accessoryLeft={BackAction} title={title} />
      <Divider />
    </View>
  );
};

export default TopNavGoBack;
