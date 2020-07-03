import React, {useEffect, Fragment} from 'react';
import {ScrollView, View, Alert} from 'react-native';
import {Layout, Button, Text} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {logout} from 'faccloud/src/redux/reducers/rootReducer';
import {getcountByXMLTypeFetch} from 'faccloud/src/redux/actions/homeActions';
import {basicStyles} from 'faccloud/src/styles/basicStyles';
import {TopNavDashboard} from 'faccloud/src/components';
import HomeMenus from './HomeMenus';
import messaging from '@react-native-firebase/messaging';

const HomeScreen = ({
  rfc,
  name,
  getCountByXMLType,
  lastEmisorXML,
  lastReceptorXML,
  navigation,
  logOut,
}) => {
  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        getFcmToken();
        console.log('Authorization status:', authStatus);
      }
    };

    requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (rfc !== '') {
      getCountByXMLType(rfc);
    }
  }, [getCountByXMLType, rfc]);

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  };

  return (
    <Fragment>
      <TopNavDashboard
        title="Inicio"
        openDrawer={() => navigation.openDrawer()}
      />
      <ScrollView>
        <Layout style={basicStyles.container} level="2">
          <View style={basicStyles.layoutHeader}>
            <Text category="h5">!Buen día {name}! ☀️</Text>
          </View>
          <HomeMenus
            navigate={navigation.navigate}
            XMLSection="r"
            lastRecord={lastReceptorXML}
          />
          <HomeMenus
            navigate={navigation.navigate}
            XMLSection="e"
            lastRecord={lastEmisorXML}
          />
          <Button style={basicStyles.button} onPress={() => logOut()}>
            Salir
          </Button>
        </Layout>
      </ScrollView>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  const {homedata, userdata} = state;

  return {
    lastReceptorXML: homedata.lastreceptorxml,
    lastEmisorXML: homedata.lastemisorxml,
    rfc: userdata.satinformation.rfc,
    name: userdata.user.name,
  };
};

const mapDispatch = {logOut: logout, getCountByXMLType: getcountByXMLTypeFetch};

export default connect(mapStateToProps, mapDispatch)(HomeScreen);
