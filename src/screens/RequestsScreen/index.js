import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Layout,
} from '@ui-kitten/components';
import {TopNavDashboard, FooterListScreens} from '../../components';
import SearchRequests from './SearchRequests';
import {basicStyles} from '../../styles/basicStyles';
import {SearchIcon} from '../../styles/icons';

const data = new Array(8).fill({
  _id: 'xxx',
  Fecha: 'yyy',
  type: 'Emisor',
});

const renderItemIcon = (props) => <Icon {...props} name="person" />;

const RequestsScreen = (props) => {
  const [form, setForm] = useState({
    dateIni: new Date(),
    dateFin: new Date(),
  });

  const [searchPage, setSearchPage] = useState({
    search: false,
    page: 1,
  });

  const [visible, setVisible] = useState(false);
  //const [data, setData] = useState([]);

  let fieldsmatched = 0;
  let pages = 1;

  const renderItem = ({item, index}) => {
    return (
      <ListItem
        title={`${item._id}`}
        description={`${item.Fecha}`}
        accessoryLeft={renderItemIcon}
        accessoryRight={(style) => (
          <Button
            size="tiny"
            style={styles.buttonTable}
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              props.navigation.navigate('DetailRequest', {
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
            <TopNavDashboard
              title="Solicitudes automáticas"
              navigation={props.navigation}
            />
            <Layout level="2">
              <View style={styles.layoutHeader}>
                <Text category="h4">Solicitudes</Text>
                <Button
                  size="small"
                  accessoryLeft={SearchIcon}
                  appearance="outline"
                  onPress={() => setVisible(!visible)}>
                  Filtrar
                </Button>
              </View>
              {visible && (
                <SearchRequests
                  form={form}
                  setForm={setForm}
                  filterData={() =>
                    setSearchPage({page: 1, search: !searchPage.search})
                  }
                />
              )}
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
  buttonTable: {
    marginRight: 8,
  },
});

export default RequestsScreen;
