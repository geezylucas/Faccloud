import React, {useState} from 'react';
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

const dataSelect = [
  'Ninguno',
  'Adquisición de mercancias',
  'Devoluciones, descuentos o bonificaciones',
  'Gastos en general',
];

const data = new Array(8).fill({
  Emisor: {
    Rfc: 'xxx',
  },
  Monto: {$numberDecimal: 0},
  Fecha: 'yyy',
});

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
  //const [data, setData] = useState([]);

  const {typeXML, titleNav, typeRequest} = props.route.params;

  let monto = 0;
  let fieldsmatched = 0;
  let pages = 1;

  const renderItem = ({item, index}) => {
    return (
      <ListItem
        title={`${item.Emisor.Rfc} - $${item.Monto.$numberDecimal}`}
        description={`${item.Fecha}`}
        accessoryRight={(style) => (
          <Button
            size="tiny"
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              props.navigation.navigate('DetailRecord', {
                itemId: index + 1,
              });
            }}>
            Detalles
          </Button>
        )}
      />
    );
  };

  return (
    <SafeAreaView style={basicStyles.safeareaview}>
      <List
        data={data}
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
                  <Text category="h6">${monto}</Text>
                </View>
              </Card>
            </Layout>
          </>
        }
        ListFooterComponent={
          <FooterListScreens
            fieldsmatched={fieldsmatched}
            searchPage={searchPage}
            setSearchPage={setSearchPage}
            pages={pages}
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

export default ListRecordsScreen;
