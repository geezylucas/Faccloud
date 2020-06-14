import React, {useEffect, Fragment} from 'react';
import {ScrollView, View} from 'react-native';
import {Layout, Button, Text} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {logout} from 'faccloud/src/redux/reducers/rootReducer';
import {getcountByXMLTypeFetch} from 'faccloud/src/redux/actions/homeActions';
import {basicStyles} from 'faccloud/src/styles/basicStyles';
import {TopNavDashboard} from 'faccloud/src/components';
import HomeMenus from './HomeMenus';

const HomeScreen = ({
  rfc,
  getCountByXMLType,
  lastEmisorXML,
  lastReceptorXML,
  navigation,
  logOut,
}) => {
  useEffect(() => {
    if (rfc !== '') {
      getCountByXMLType(rfc);
    }
  }, [getCountByXMLType, rfc]);

  return (
    <Fragment>
      <TopNavDashboard
        title="Inicio"
        openDrawer={() => navigation.openDrawer()}
      />
      <ScrollView>
        <Layout style={basicStyles.container} level="2">
          <View style={basicStyles.layoutHeader}>
            <Text category="h4">!Buen día! ☀️</Text>
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
  };
};

const mapDispatch = {logOut: logout, getCountByXMLType: getcountByXMLTypeFetch};

export default connect(mapStateToProps, mapDispatch)(HomeScreen);
