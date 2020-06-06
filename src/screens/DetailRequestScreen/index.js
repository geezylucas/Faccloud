import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Text} from '@ui-kitten/components';
import {TopNavGoBack} from '../../components';

const DetailRequestScreen = ({route, navigation}) => {
  const {itemId} = route.params;

  return (
    <>
      <TopNavGoBack title="Detalles solicitud" navigation={navigation} />
      <Layout style={styles.container}>
        <Layout style={styles.layout} level="4">
          <Text>itemId: {JSON.stringify(itemId)}</Text>
        </Layout>

        <Layout style={styles.layout} level="3">
          <Text>3</Text>
        </Layout>

        <Layout style={styles.layout} level="2">
          <Text>2</Text>
        </Layout>

        <Layout style={styles.layout} level="1">
          <Text>1</Text>
        </Layout>
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailRequestScreen;
