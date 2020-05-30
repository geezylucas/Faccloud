import React from 'react';
import {
  Divider,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {BackNavIcon} from '../styles/icons';

const TopNavGoBack = ({navigation, title}) => {
  const BackAction = () => (
    <TopNavigationAction
      icon={BackNavIcon}
      onPress={() => navigation.goBack()}
    />
  );

  return (
    <>
      <TopNavigation accessoryLeft={BackAction} title={title} />
      <Divider />
    </>
  );
};

export default TopNavGoBack;
