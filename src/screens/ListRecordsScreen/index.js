import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
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
import {basicStyles} from '../../styles/basicStyles';
import {SearchIcon} from '../../styles/icons';
import {FooterListScreens, TopNavGoBack} from '../../components';
import {connect} from 'react-redux';
import {getRecords} from '../../redux/actions/homeActions';

const dataSelect = [
  'Ninguno',
  'Adquisición de mercancias',
  'Devoluciones, descuentos o bonificaciones',
  'Gastos en general',
];

const ListRecordsScreen = (props) => {
  const [form, setForm] = useState({
    rfc: '',
    dateIni: new Date(),
    dateFin: new Date(),
    indexcfdi: new IndexPath(0),
    usocfdi: '',
  });

  const [searchPage, setSearchPage] = useState({
    search: false,
    page: 1,
  });

  const [visible, setVisible] = useState(false);

  const {typeXML, titleNav, typeRequest} = props.route.params;
  const {id, getRecordsFetch, totalRecords, listRecords} = props;

  useEffect(() => {
    getRecordsFetch({
      id,
      pageSize: 10,
      pageNum: searchPage.page,
      typeComprobante: typeXML,
      typeRequest,
    });
    console.log('beep');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchPage]);

  const renderItem = ({item, index}) => (
    <ListItem
      title={`${item.Rfc} - $${item.Total}`}
      description={`${item.Fecha}`}
      accessoryRight={(style) => (
        <Button
          size="tiny"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            props.navigation.navigate('DetailRecord', {
              itemId: item._id.$oid,
            });
          }}>
          Detalles
        </Button>
      )}
    />
  );

  return (
    <SafeAreaView style={basicStyles.safeareaview}>
      <List
        data={listRecords}
        renderItem={renderItem}
        ListHeaderComponent={
          <>
            <TopNavGoBack title={titleNav} navigation={props.navigation} />
            <Layout level="2">
              <View style={styles.layoutHeader}>
                <Text category="h4">{typeXML}</Text>
                <Button
                  size="small"
                  accessoryLeft={SearchIcon}
                  appearance="outline"
                  onPress={() => setVisible(!visible)}>
                  Filtrar
                </Button>
              </View>
              {visible && (
                <SearchRecords
                  style={basicStyles.card}
                  form={form}
                  setForm={setForm}
                  dataSelect={dataSelect}
                  filterData={() =>
                    setSearchPage({page: 1, search: !searchPage.search})
                  }
                />
              )}
              <Card style={styles.cardTotal}>
                <View style={styles.headerCard}>
                  <Text category="c1" appearance="hint">
                    Monto
                  </Text>
                  <Text category="h6">
                    ${totalRecords.totalMonto.$numberDecimal}
                  </Text>
                </View>
              </Card>
            </Layout>
          </>
        }
        ListFooterComponent={
          <FooterListScreens
            fieldsmatched={totalRecords.fieldsmatched}
            searchPage={searchPage}
            setSearchPage={setSearchPage}
            pages={totalRecords.pages}
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layoutHeader: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTotal: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  const {homedata, userdata} = state;

  return {
    listRecords: homedata.dataRecords.cfdis,
    totalRecords: homedata.dataRecords.totalRecords[0],
    id: userdata.user.id,
  };
};

const mapDispatch = {getRecordsFetch: getRecords};

export default connect(mapStateToProps, mapDispatch)(ListRecordsScreen);
