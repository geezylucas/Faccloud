import React, {memo} from 'react';
import {View} from 'react-native';
import {MenuItem, Card, Text} from '@ui-kitten/components';
import {basicStyles} from 'faccloud/src/styles/basicStyles';
import {FileIcon} from 'faccloud/src/styles/icons';

const HomeMenus = memo(({navigate, XMLSection, lastRecord}) => {
  const {Fecha} = lastRecord || '';

  const dataTitles = ['Facturas', 'Pagos', 'Nominas', 'Retenciones'];

  let titleNav;
  switch (XMLSection) {
    case 'r':
      titleNav = 'XML Recibidos';
      break;
    case 'e':
      titleNav = 'XML Emitidos';
      break;
    default:
      titleNav = '';
  }

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
                  typeRequest: XMLSection,
                });
              }}
            />
          </View>
        );
      })}
    </Card>
  );
});

export default HomeMenus;
