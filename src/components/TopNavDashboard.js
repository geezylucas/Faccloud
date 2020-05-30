import React from 'react';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  Divider,
} from '@ui-kitten/components';

const MenuIcon = (props) => <Icon {...props} name="menu" />;

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
