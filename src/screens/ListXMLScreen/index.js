import React, {useEffect, useCallback, Fragment} from 'react';
import {ScrollView, View, RefreshControl} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {getCountByXMLTypeFetch} from 'faccloud/src/redux/actions/homeActions';
import {basicStyles} from 'faccloud/src/styles/basicStyles';
import {TopNavDashboard} from 'faccloud/src/components';
import XMLMenus from './XMLMenus';

const ListXMLScreen = ({
  navigation,
  rfc,
  token,
  lastEmisorXML,
  lastReceptorXML,
  getCountByXMLType,
  loading,
}) => {
  useEffect(() => {
    getCountByXMLType(rfc, token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = useCallback(() => {
    getCountByXMLType(rfc, token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <TopNavDashboard
        title="Menú de XML"
        openDrawer={() => navigation.openDrawer()}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
        <Layout style={basicStyles.container} level="2">
          <View style={basicStyles.layoutHeader}>
            <Text category="h5">Secciones de XML</Text>
          </View>
          <XMLMenus
            navigate={navigation.navigate}
            XMLSection="r"
            lastRecord={lastReceptorXML}
          />
          <XMLMenus
            navigate={navigation.navigate}
            XMLSection="e"
            lastRecord={lastEmisorXML}
          />
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
    rfc: userdata.userData.satInfo.rfc,
    token: userdata.userConfig.token,
    loading: homedata.loading,
  };
};

const mapDispatch = {
  getCountByXMLType: getCountByXMLTypeFetch,
};

export default connect(mapStateToProps, mapDispatch)(ListXMLScreen);
