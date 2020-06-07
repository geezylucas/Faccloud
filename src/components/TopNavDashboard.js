import React from 'react';
import {View} from 'react-native';
import {
  TopNavigation,
  TopNavigationAction,
  Divider,
} from '@ui-kitten/components';
import {MenuIcon} from 'faccloud/src/styles/icons';

const TopNavDashboard = ({navigation, title}) => {
  const MenuAction = () => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={() => navigation.openDrawer()}
    />
  );

  return (
    <View>
      <TopNavigation accessoryLeft={MenuAction} title={title} />
      <Divider />
    </View>
  );
};

export default TopNavDashboard;
