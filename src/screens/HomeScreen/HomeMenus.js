import React from 'react';
import {View, StyleSheet} from 'react-native';
import {MenuItem, Divider, Card, Text} from '@ui-kitten/components';
import {basicStyles} from '../../styles/basicStyles';
import {FileIcon} from '../../styles/icons';

const HomeMenus = ({navigate, typeXMLSection}) => {
  const {_id, totalNumCfdis} = typeXMLSection;

  let titleNav = '';

  switch (_id) {
    case 'r':
      titleNav = 'XML Recibidos';
      break;
    case 'e':
      titleNav = 'XML Emitidos';
      break;
  }

  const dataTitles = ['Facturas', 'Pagos', 'Nominas', 'Retenciones'];

  return (
    <Card
      style={basicStyles.card}
      header={(style) => (
        <View {...style}>
          <Text category="h6">{titleNav}</Text>
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
      {dataTitles.map((title, index) => {
        return (
          <View key={index}>
            <MenuItem
              title={title}
              accessoryLeft={FileIcon}
              onPress={() => {
                /* 1. Navigate to the ListRecords route with params */
                navigate('ListRecords', {
                  typeXML: title,
                  titleNav,
                  typeRequest: _id,
                });
              }}
            />
          </View>
        );
      })}
    </Card>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row-reverse',
  },
});

export default HomeMenus;
