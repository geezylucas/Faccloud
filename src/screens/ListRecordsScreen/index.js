import React, {useState, useEffect, Fragment} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Button,
  List,
  ListItem,
  Text,
  Layout,
  IndexPath,
  Card,
} from '@ui-kitten/components';
import SearchRecords from './SearchRecords';
import {SearchIcon} from 'faccloud/src/styles/icons';
import {FooterListScreens, TopNavGoBack} from 'faccloud/src/components';
import {connect} from 'react-redux';
import {getXMLSFetch} from 'faccloud/src/redux/actions/homeActions';
import {basicStyles} from 'faccloud/src/styles/basicStyles';

const ListRecordsScreen = ({
  getXMLS,
  dataPagination,
  listRecords,
  route,
  navigation,
  usoCfdis,
}) => {
  const [form, setForm] = useState({
    rfc: '',
    dateIni: new Date(),
    dateFin: new Date(),
    indexCfdi: new IndexPath(0),
    usoCfdi: '',
  });
  const [searchPage, setSearchPage] = useState({search: false, page: 1});
  const [visible, setVisible] = useState(false);

  const {typeXML, titleNav, typeRequest} = route.params;

  let typeXMLToSend;
  if (typeXML === 'Facturas') {
    typeXMLToSend = 'I-E';
  } else {
    typeXMLToSend = typeXML.substring(0, 1);
  }

  useEffect(() => {
    getXMLS({
      pageNum: searchPage.page,
      typeComprobante: typeXMLToSend,
      typeRequest,
      filters: visible ? form : null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPage]);

  const renderItem = ({item, index}) => (
    <ListItem
      title={`${item.Rfc} - $${item.Total.$numberDecimal}`}
      description={`${item.Fecha}`}
      accessoryRight={(style) => (
        <Button
          size="tiny"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate('DetailRecord', {
              itemId: item._id.$oid,
            });
          }}>
          Detalles
        </Button>
      )}
    />
  );

  return (
    <Fragment>
      <TopNavGoBack title={titleNav} goBack={() => navigation.goBack()} />
      <List
        data={listRecords}
        renderItem={renderItem}
        ListHeaderComponent={
          <Layout level="2">
            <View style={basicStyles.layoutHeader}>
              <Text category="h5">{typeXML}</Text>
              <Button
                size="small"
                accessoryLeft={SearchIcon}
                appearance="outline"
                onPress={() => setVisible(!visible)}>
                Filtrar
              </Button>
            </View>
            <Card style={styles.cardTotal}>
              <View style={styles.headerCardTotal}>
                <Text category="c1" appearance="hint">
                  Monto
                </Text>
                <Text category="h6">
                  ${dataPagination.totalMonto.$numberDecimal}
                </Text>
              </View>
            </Card>
            <SearchRecords
              form={form}
              setForm={setForm}
              filterData={() =>
                setSearchPage({page: 1, search: !searchPage.search})
              }
              visible={visible}
              usoCfdis={usoCfdis}
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

const styles = StyleSheet.create({
  cardTotal: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCardTotal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  const {homedata, userdata} = state;
  return {
    usoCfdis: userdata.satinformation.settingsrfc.usocfdis,
    listRecords: homedata.datalistxmls.cfdis,
    dataPagination: homedata.datalistxmls.dataPagination,
  };
};

const mapDispatch = {getXMLS: getXMLSFetch};

export default connect(mapStateToProps, mapDispatch)(ListRecordsScreen);
