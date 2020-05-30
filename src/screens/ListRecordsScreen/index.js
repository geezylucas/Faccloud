import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Layout,
  IndexPath,
  Divider,
  Card,
} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import TopNavGoBack from '../../components/TopNavGoBack';
import SearchRecords from '../../components/SearchRecords';
import {basicStyles} from '../../styles/basicStyles';

const dataSelect = [
  'Ninguno',
  'Adquisición de mercancias',
  'Devoluciones, descuentos o bonificaciones',
  'Gastos en general',
];

const SearchIcon = (style) => <Icon {...style} name="search" />;
const BackIcon = (props) => <Icon {...props} name="arrow-ios-back" />;
const NextIcon = (props) => <Icon {...props} name="arrow-ios-forward" />;

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
  const [data, setData] = useState([]);

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
            style={styles.buttonTable}
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              props.navigation.navigate('Details', {
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
                <Text category="s2" appearance="hint">
                  Monto
                </Text>
                <Text category="h6">${monto}</Text>
              </Card>
            </Layout>
          </>
        }
        ListFooterComponent={
          <Layout level="2">
            <View style={styles.layoutTotalRecords}>
              <Text category="s2">Total de registros: {fieldsmatched}</Text>
            </View>
            <Divider />
            <View style={styles.layoutPagination}>
              <Button
                size="small"
                disabled={searchPage.page === 1 ? true : false}
                style={styles.button}
                appearance="ghost"
                accessoryLeft={BackIcon}
                onPress={() =>
                  setSearchPage({
                    page: searchPage.page - 1,
                    search: !searchPage.search,
                  })
                }
              />
              <Text>
                {searchPage.page} - {pages}
              </Text>
              <Button
                size="small"
                disabled={searchPage.page === pages ? true : false}
                style={styles.button}
                appearance="ghost"
                accessoryLeft={NextIcon}
                onPress={() =>
                  setSearchPage({
                    page: searchPage.page + 1,
                    search: !searchPage.search,
                  })
                }
              />
            </View>
          </Layout>
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
  layoutTotalRecords: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  cardTotal: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layoutPagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 4,
  },
  buttonTable: {
    marginRight: 8,
  },
});

export default ListRecordsScreen;
