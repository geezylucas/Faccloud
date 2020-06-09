import React from 'react';
import {View} from 'react-native';
import {
  TopNavigation,
  TopNavigationAction,
  Divider,
} from '@ui-kitten/components';
import {MenuIcon} from 'faccloud/src/styles/icons';

const TopNavDashboard = ({openDrawer, title}) => {
  const MenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={openDrawer} />
  );

  return (
    <View>
      <TopNavigation accessoryLeft={MenuAction} title={title} />
      <Divider />
    </View>
  );
};

export default React.memo(TopNavDashboard);
