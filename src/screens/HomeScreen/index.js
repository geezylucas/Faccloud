import React, {useEffect, Fragment} from 'react';
import {ScrollView, View} from 'react-native';
import {Layout, Button, Text} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {logout} from 'faccloud/src/redux/reducers/rootReducer';
import {countByXMLType} from 'faccloud/src/redux/actions/homeActions';
import {basicStyles} from 'faccloud/src/styles/basicStyles';
import {TopNavDashboard} from 'faccloud/src/components';
import HomeMenus from './HomeMenus';

const HomeScreen = ({
  getCountByXMLType,
  lastEmisorXML,
  lastReceptorXML,
  totalByXMLType,
  navigation,
  logOut,
}) => {
  useEffect(() => {
    getCountByXMLType();
  }, [getCountByXMLType]);

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
            XMLSection={totalByXMLType.find((element) => element._id === 'r')}
            lastRecord={lastReceptorXML}
          />
          <HomeMenus
            navigate={navigation.navigate}
            XMLSection={totalByXMLType.find((element) => element._id === 'e')}
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
  const {homedata} = state;

  return {
    totalByXMLType: homedata.totalByXMLType,
    lastReceptorXML: homedata.lastReceptorXML,
    lastEmisorXML: homedata.lastEmisorXML,
  };
};

const mapDispatch = {logOut: logout, getCountByXMLType: countByXMLType};

export default connect(mapStateToProps, mapDispatch)(HomeScreen);
