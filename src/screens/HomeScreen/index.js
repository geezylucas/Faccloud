import React, {useEffect} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {Layout, Button, Text} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {logout} from '../../redux/reducers/rootReducer';
import {countByXMLType} from '../../redux/actions/homeActions';
import {basicStyles} from '../../styles/basicStyles';
import {TopNavDashboard} from '../../components';
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
  }, []);
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
          typeXMLSection={
            Object.keys(totalByXMLType).length !== 0
              ? totalByXMLType.find((element) => element._id === 'r')
              : undefined
          }
          lastRecord={lastReceptorXML}
        />
        <HomeMenus
          navigate={navigation.navigate}
          typeXMLSection={
            Object.keys(totalByXMLType).length !== 0
              ? totalByXMLType.find((element) => element._id === 'e')
              : undefined
          }
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

  return {
    totalByXMLType: homedata.totalByXMLType,
    lastReceptorXML: homedata.lastReceptorXML,
    lastEmisorXML: homedata.lastEmisorXML,
    user: userdata.user,
  };
};

const mapDispatch = {logOut: logout, getCountByXMLType: countByXMLType};

export default connect(mapStateToProps, mapDispatch)(HomeScreen);
