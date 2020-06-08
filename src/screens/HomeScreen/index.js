import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Layout, Button, Text, Toggle} from '@ui-kitten/components';
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
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getCountByXMLType({
      idInfo: user.idInfo,
      typeUser: user.typeUser,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCountByXMLType]);

  /* FUNCTIONS */
  const onCheckedChange = (isChecked) => {
    setChecked(isChecked);
  };
  /* END FUNCTIONS */

  return (
    <ScrollView>
      <TopNavDashboard title="Inicio" navigation={navigation} />
      <Layout style={basicStyles.container} level="2">
        <View style={basicStyles.layoutHeader}>
          <Text category="h4">!Buen día! ☀️</Text>
          {user.typeUser !== 'g' && (
            <Toggle checked={checked} onChange={onCheckedChange} />
          )}
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
  );
};

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
