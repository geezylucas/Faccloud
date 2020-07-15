import React from 'react';
import {View} from 'react-native';
import {MenuItem, Card, Text} from '@ui-kitten/components';
import {basicStyles} from 'faccloud/src/styles/basicStyles';
import {FileIcon} from 'faccloud/src/styles/icons';
import {connect} from 'react-redux';
import {loadingHomeReset} from 'faccloud/src/redux/actions/homeActions';

const XMLMenus = ({navigate, XMLSection, lastRecord, loadingReset}) => {
  const {Fecha} = lastRecord || 'Aún no tiene datos';
  const dataTitles = ['Facturas', 'Retenciones', 'Pagos', 'Nominas'];

  let titleNav;
  switch (XMLSection) {
    case 'r':
      titleNav = 'XML Recibidos';
      break;
    case 'e':
      titleNav = 'XML Emitidos';
      break;
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
                loadingReset();
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
};

const mapDispatch = {
  loadingReset: loadingHomeReset,
};

export default connect(null, mapDispatch)(React.memo(XMLMenus));
