import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Button, List, ListItem, Text, Layout} from '@ui-kitten/components';
import {TopNavDashboard, FooterListScreens} from 'faccloud/src/components';
import SearchRequests from './SearchRequests';
import {
  SearchIcon,
  EmitidoIcon,
  RecibidoIcon,
  RefreshIcon,
} from 'faccloud/src/styles/icons';
import {connect} from 'react-redux';
import {getRequestsFetch} from 'faccloud/src/redux/actions/requestsActions';
import {basicStyles} from 'faccloud/src/styles/basicStyles';

const RequestsScreen = ({
  navigation,
  listRequests,
  dataPagination,
  getRequests,
  idUser,
}) => {
  const [form, setForm] = useState({
    dateIni: new Date(),
    dateFin: new Date(),
  });

  const [searchPage, setSearchPage] = useState({search: false, page: 1});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getRequests({
      idUser,
      pageSize: 10,
      pageNum: searchPage.page,
      filters: visible ? form : null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPage]);

  const renderItem = ({item, index}) => {
    return (
      <ListItem
        title={(evaProps) => (
          <View>
            <Text {...evaProps}>{item._id}</Text>
            <Text {...evaProps}>CFDIS Descargados: {item.numcfdis}</Text>
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
        accessoryRight={(style) => (
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
        )}
      />
    );
  };

  return (
    <List
      data={listRequests}
      renderItem={renderItem}
      ListHeaderComponent={(style) => (
        <View {...style}>
          <TopNavDashboard
            title="Solicitudes automáticas"
            navigation={navigation}
          />
          <Layout level="2">
            <View style={basicStyles.layoutHeader}>
              <Text category="h4">Solicitudes</Text>
              <Button
                size="small"
                accessoryLeft={SearchIcon}
                appearance="outline"
                onPress={() => setVisible(!visible)}>
                Filtrar
              </Button>
            </View>
            {visible ? (
              <SearchRequests
                form={form}
                setForm={setForm}
                filterData={() =>
                  setSearchPage({page: 1, search: !searchPage.search})
                }
              />
            ) : (
              <Button
                style={basicStyles.button}
                status="success"
                size="small"
                accessoryLeft={RefreshIcon}
                onPress={() =>
                  setSearchPage({page: 1, search: !searchPage.search})
                }>
                Refrescar
              </Button>
            )}
          </Layout>
        </View>
      )}
      ListFooterComponent={(style) => (
        <FooterListScreens
          style={style}
          fieldsmatched={dataPagination.fieldsmatched}
          searchPage={searchPage}
          setSearchPage={setSearchPage}
          pages={dataPagination.pages}
        />
      )}
    />
  );
};

const mapStateToProps = (state) => {
  const {requestsdata, userdata} = state;

  // TODO: Cuando este el registro, no nandar idUser
  return {
    dataPagination: requestsdata.dataPagination,
    listRequests: requestsdata.requests,
    idUser: userdata.user.id,
  };
};

const mapDispatch = {getRequests: getRequestsFetch};

export default connect(mapStateToProps, mapDispatch)(RequestsScreen);
