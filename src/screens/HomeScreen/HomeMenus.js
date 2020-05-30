import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon, MenuItem, Divider, Card, Text} from '@ui-kitten/components';
import {basicStyles} from '../../styles/basicStyles';

const FileIcon = (props) => <Icon {...props} name="file" />;

const HomeMenus = ({navigate, typeXMLSection}) => {
  const {_id, totalNumCfdis} = typeXMLSection;
  let title = '';

  switch (_id) {
    case 'r':
      title = 'XML Recibidos';
      break;
    case 'e':
      title = 'XML Emitidos';
      break;
  }

  return (
    <Card
      style={basicStyles.card}
      header={(style) => (
        <View {...style}>
          <Text category="h6">{title}</Text>
        </View>
      )}
      footer={(style) => (
        <View {...style}>
          <View style={styles.footer}>
            <Text category="c1" appearance="hint">
              Número de registros: {totalNumCfdis}
            </Text>
          </View>
        </View>
      )}
      status="basic">
      <MenuItem
        title="Facturas"
        accessoryLeft={FileIcon}
        onPress={() => {
          /* 1. Navigate to the ListRecords route with params */
          navigate('ListRecords', {
            typeXML: 'Facturas',
            titleNav: title,
            typeRequest: _id,
          });
        }}
      />
      <Divider />
      <MenuItem
        title="Pagos"
        accessoryLeft={FileIcon}
        onPress={() => {
          /* 1. Navigate to the ListRecords route with params */
          navigate('ListRecords', {
            typeXML: 'Pagos',
            titleNav: title,
            typeRequest: _id,
          });
        }}
      />
      <Divider />
      <MenuItem
        title="Nominas"
        accessoryLeft={FileIcon}
        onPress={() => {
          /* 1. Navigate to the ListRecords route with params */
          navigate('ListRecords', {
            typeXML: 'Nominas',
            titleNav: title,
            typeRequest: _id,
          });
        }}
      />
      <Divider />
      <MenuItem
        title="Retenciones"
        accessoryLeft={FileIcon}
        onPress={() => {
          /* 1. Navigate to the ListRecords route with params */
          navigate('ListRecords', {
            typeXML: 'Retenciones',
            titleNav: title,
            typeRequest: _id,
          });
        }}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row-reverse',
  },
});

export default HomeMenus;
