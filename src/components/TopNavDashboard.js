import React from 'react';
import {
  TopNavigation,
  TopNavigationAction,
  Divider,
} from '@ui-kitten/components';
import {MenuIcon} from '../styles/icons';

const TopNavDashboard = ({navigation, title}) => {
  const MenuAction = () => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={() => navigation.openDrawer()}
    />
  );

  return (
    <>
      <TopNavigation accessoryLeft={MenuAction} title={title} />
      <Divider />
    </>
  );
};

export default TopNavDashboard;
