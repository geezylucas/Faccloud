import React, {useEffect} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Layout, Button, Text} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {logout} from 'faccloud/src/redux/reducers/rootReducer';
import {countByXMLType} from 'faccloud/src/redux/actions/homeActions';
import {basicStyles} from 'faccloud/src/styles/basicStyles';
import {TopNavDashboard} from 'faccloud/src/components';
import HomeMenus from './HomeMenus';

const HomeScreen = ({
  user,
  getCountByXMLType,
  lastEmisorXML,
  lastReceptorXML,
  totalByXMLType,
  navigation,
  logOut,
}) => {
  useEffect(() => {
    getCountByXMLType({
      idUser: user.id,
      typeUser: user.typeUser,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCountByXMLType]);

  /* FUNCTIONS */
  /* END FUNCTIONS */

  return (
    <ScrollView>
      <TopNavDashboard title="Inicio" navigation={navigation} />
      <Layout style={basicStyles.container} level="2">
        <View style={basicStyles.cardHeader}>
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
        <Button style={styles.buttonSignOut} onPress={() => logOut()}>
          Salir
        </Button>
      </Layout>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonSignOut: {
    marginTop: 20,
    margin: 8,
  },
});

const mapStateToProps = (state) => {
  const {homedata, userdata} = state;

  // TODO: con token ya no traer del store el user
  return {
    totalByXMLType: homedata.totalByXMLType,
    lastReceptorXML: homedata.lastReceptorXML,
    lastEmisorXML: homedata.lastEmisorXML,
    user: userdata.user,
  };
};

const mapDispatch = {logOut: logout, getCountByXMLType: countByXMLType};

export default connect(mapStateToProps, mapDispatch)(HomeScreen);
