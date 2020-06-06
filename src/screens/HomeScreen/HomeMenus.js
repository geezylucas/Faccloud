import React from 'react';
import {View, StyleSheet} from 'react-native';
import {MenuItem, Card, Text} from '@ui-kitten/components';
import {basicStyles} from '../../styles/basicStyles';
import {FileIcon} from '../../styles/icons';

const HomeMenus = ({navigate, XMLSection, lastRecord}) => {
  const {_id, totalCfdis} = XMLSection;
  const {Fecha} = lastRecord || '';

  const dataTitles = ['Facturas', 'Pagos', 'Nominas', 'Retenciones'];

  let titleNav = '';

  switch (_id) {
    case 'r':
      titleNav = 'XML Recibidos';
      break;
    case 'e':
      titleNav = 'XML Emitidos';
      break;
    default:
      titleNav = '';
  }

  const Footer = (props) => {
    if (totalCfdis !== null) {
      return (
        <View {...props} style={props.style}>
          <View style={styles.footer}>
            <Text category="c1" appearance="hint">
              Número de registros: {totalCfdis}
            </Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <Card
      style={basicStyles.card}
      header={(props) => (
        <View {...props}>
          <Text category="h6">{titleNav}</Text>
          <Text category="c1" appearance="hint">
            Ultimo registro: {Fecha}
          </Text>
        </View>
      )}
      footer={Footer}
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
