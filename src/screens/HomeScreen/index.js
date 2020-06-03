import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView, ScrollView, View} from 'react-native';
import {Layout, Button, Text} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {logout} from '../../redux/reducers/rootReducer';
import {countByXMLType} from '../../redux/actions/homeActions';
import {basicStyles} from '../../styles/basicStyles';
import {TopNavDashboard} from '../../components';
import HomeMenus from './HomeMenus';

const HomeScreen = (props) => {
  const {user, getCountByXMLType, lastEmisorXML, lastReceptorXML} = props;

  useEffect(() => {
    getCountByXMLType({
      id: user.id,
      typeUser: user.typeUser,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* FUNCTIONS */

  /* END FUNCTIONS */

  return (
    <SafeAreaView style={basicStyles.safeareaview}>
      <ScrollView>
        <TopNavDashboard title="Inicio" navigation={props.navigation} />
        <Layout style={basicStyles.container} level="2">
          <View style={basicStyles.card}>
            <Text category="h4">!Buen día! ☀️</Text>
          </View>
          <HomeMenus
            navigate={props.navigation.navigate}
            typeXMLSection={
              Object.keys(props.totalByXMLType).length !== 0
                ? props.totalByXMLType.find((element) => element._id === 'r')
                : undefined
            }
            lastRecord={lastReceptorXML}
          />
          <HomeMenus
            navigate={props.navigation.navigate}
            typeXMLSection={
              Object.keys(props.totalByXMLType).length !== 0
                ? props.totalByXMLType.find((element) => element._id === 'e')
                : undefined
            }
            lastRecord={lastEmisorXML}
          />
          <Button style={styles.buttonSignOut} onPress={() => props.logout()}>
            Salir
          </Button>
        </Layout>
      </ScrollView>
    </SafeAreaView>
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

const mapDispatch = {logout, getCountByXMLType: countByXMLType};

export default connect(mapStateToProps, mapDispatch)(HomeScreen);
