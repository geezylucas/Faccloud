import React, {useState, useEffect, Fragment} from 'react';
import {View} from 'react-native';
import {
  Button,
  List,
  ListItem,
  Text,
  Layout,
  IndexPath,
} from '@ui-kitten/components';
import {TopNavDashboard, FooterListScreens} from 'faccloud/src/components';
import SearchRequests from './SearchRequests';
import {EmitidoIcon, RecibidoIcon} from 'faccloud/src/styles/icons';
import {connect} from 'react-redux';
import {getRequestsFetch} from 'faccloud/src/redux/actions/requestsActions';
import {basicStyles} from 'faccloud/src/styles/basicStyles';

const RequestsScreen = ({
  navigation,
  listRequests,
  dataPagination,
  getRequests,
  token,
}) => {
  const [form, setForm] = useState({
    dateIni: new Date(),
    dateFin: new Date(),
    indexStatus: new IndexPath(0),
    status: '',
  });
  const [searchPage, setSearchPage] = useState({search: false, page: 1});

  useEffect(() => {
    getRequests({
      pageNum: searchPage.page,
      filters: form,
      token,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPage]);

  const renderItem = ({item, index}) => {
    return (
      <ListItem
        title={(evaProps) => (
          <View>
            <Text {...evaProps}>{item._id}</Text>
            {item.status && (
              <Text {...evaProps} category="label">
                CFDIS Descargados: {item.numcfdis}
              </Text>
            )}
          </View>
        )}
        description={`${new Date(item.daterequest.$date).toISOString()}`}
        accessoryLeft={(style) => {
          switch (item.typerequest) {
            case 'r':
              return RecibidoIcon(style);
            case 'e':
              return EmitidoIcon(style);
          }
        }}
        accessoryRight={(style) => {
          if (item.status) {
            return (
              <Button
                size="tiny"
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  navigation.navigate('DetailRequest', {
                    itemId: item._id,
                  });
                }}>
                Detalles
              </Button>
            );
          } else {
            return (
              <Text status="danger" category="s2">
                Pendiente
              </Text>
            );
          }
        }}
      />
    );
  };

  return (
    <Fragment>
      <TopNavDashboard
        title="Historial de solicitudes al SAT"
        openDrawer={() => navigation.openDrawer()}
      />
      <List
        data={listRequests}
        renderItem={renderItem}
        ListHeaderComponent={
          <Layout level="2">
            <View style={basicStyles.layoutHeader}>
              <Text category="h5">Historico de solicitudes</Text>
            </View>
            <SearchRequests
              form={form}
              setForm={setForm}
              filterData={() =>
                setSearchPage({page: 1, search: !searchPage.search})
              }
            />
          </Layout>
        }
        ListFooterComponent={
          <FooterListScreens
            fieldsmatched={dataPagination.fieldsmatched}
            searchPage={searchPage}
            setSearchPage={setSearchPage}
            pages={dataPagination.pages}
          />
        }
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  const {requestsdata, userdata} = state;

  return {
    dataPagination: requestsdata.dataPagination,
    listRequests: requestsdata.requests,
    token: userdata.userConfig.token,
  };
};

const mapDispatch = {getRequests: getRequestsFetch};

export default connect(mapStateToProps, mapDispatch)(RequestsScreen);
