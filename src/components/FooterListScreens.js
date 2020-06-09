import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text, Layout, Divider} from '@ui-kitten/components';
import {BackIcon, NextIcon} from 'faccloud/src/styles/icons';

const FooterListScreens = ({
  props,
  fieldsmatched,
  searchPage,
  setSearchPage,
  pages,
}) => (
  <Layout {...props} level="2">
    <View style={styles.layoutTotalRecords}>
      <Text category="c1" appearance="hint">
        Total de registros: {fieldsmatched}
      </Text>
    </View>
    <Divider />
    <View style={styles.layoutPagination}>
      <Button
        size="small"
        disabled={searchPage.page === 1 ? true : false}
        style={styles.button}
        appearance="ghost"
        accessoryLeft={BackIcon}
        onPress={() => setSearchPage({page: searchPage.page - 1})}
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
        onPress={() => setSearchPage({page: searchPage.page + 1})}
      />
    </View>
  </Layout>
);

const styles = StyleSheet.create({
  layoutTotalRecords: {
    margin: 20,
  },
  layoutPagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 4,
  },
});

export default FooterListScreens;
