import React, {useEffect, Fragment} from 'react';
import {ScrollView, View} from 'react-native';
import {Layout, Button, Text} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {logout} from 'faccloud/src/redux/reducers/rootReducer';
import {getUserFetch} from 'faccloud/src/redux/actions/userActions';
import {basicStyles} from 'faccloud/src/styles/basicStyles';
import {TopNavDashboard, Loading} from 'faccloud/src/components';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

const HomeScreen = ({navigation, name, token, loading, logOut, getUser}) => {
  const onDisplayNotification = async (title, body) => {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
      },
    });
  };

  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const fcmToken = await messaging().getToken();
        getUser(token, fcmToken);
      }
    };

    requestUserPermission();

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      onDisplayNotification(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <TopNavDashboard
        title="Inicio"
        openDrawer={() => navigation.openDrawer()}
      />
      <Layout style={basicStyles.container} level="2">
        <ScrollView>
          <View style={basicStyles.layoutHeader}>
            <Text category="h5">!Buen día {name}!</Text>
          </View>
          <Button style={basicStyles.button} onPress={() => logOut()}>
            Salir
          </Button>
        </ScrollView>
      </Layout>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  const {userdata} = state;

  return {
    name: userdata.userData.name,
    token: userdata.userConfig.token,
    loading: userdata.loading,
  };
};

const mapDispatch = {
  logOut: logout,
  getUser: getUserFetch,
};

export default connect(mapStateToProps, mapDispatch)(HomeScreen);
