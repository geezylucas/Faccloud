import React from 'react';
import {
  Icon,
  Divider,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const TopNavGoBack = ({navigation, title}) => {
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );

  return (
    <>
      <TopNavigation accessoryLeft={BackAction} title={title} />
      <Divider />
    </>
  );
};

export default TopNavGoBack;
