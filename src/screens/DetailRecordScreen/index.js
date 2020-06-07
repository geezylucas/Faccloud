import React, {useEffect} from 'react';
import {View} from 'react-native';
import {
  Layout,
  Text,
  ListItem,
  List,
  Card,
  Divider,
} from '@ui-kitten/components';
import {basicStyles} from 'faccloud/src/styles/basicStyles';
import {TopNavGoBack} from 'faccloud/src/components';
import {connect} from 'react-redux';
import {
  getRecordFetch,
  removeRecordToStore,
} from 'faccloud/src/redux/actions/homeActions';

const DetailRecordScreen = ({
  route,
  navigation,
  record,
  getRecord,
  removeRecord,
}) => {
  const {itemId} = route.params;

  useEffect(() => {
    getRecord(itemId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRecord]);

  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps}>
      <Text category="s1">{info.Descripcion.trim()}</Text>
    </View>
  );

  const renderItem = (info) => (
    <Card
      style={basicStyles.card}
      status="basic"
      header={(headerProps) => renderItemHeader(headerProps, info.item)}>
      <ListItem title={info.item.Cantidad} description="Cantidad" />
      <Divider />
      <ListItem title={info.item.ValorUnitario} description="Valor unitario" />
      <Divider />
      <ListItem title={info.item.Importe} description="Importe" />
    </Card>
  );

  return (
    <List
      data={record.Conceptos}
      renderItem={renderItem}
      ListHeaderComponent={(style) => (
        <View {...style}>
          <TopNavGoBack title="Detalles XML" navigation={navigation} />
          <Layout level="2">
            <View style={basicStyles.cardHeader}>
              <Text category="h4">{record.Emisor.Nombre.trim()}</Text>
              <Text category="s1" appearance="hint">
                {record.Emisor.Rfc}
              </Text>
            </View>
            <ListItem
              title={record.Receptor.Nombre}
              description="Receptor Nombre"
            />
            <Divider />
            <ListItem title={record.Receptor.Rfc} description="Receptor RFC" />
            <Divider />
            <ListItem title={record.SubTotal} description="SubTotal" />
            <Divider />
            <ListItem title={record.Descuento} description="Descuento" />
            <Divider />
            <ListItem title={record.Total} description="Total" />
            <Divider />
            <ListItem title={record.Fecha} description="Fecha" />
            <Divider />
            <ListItem
              title={record.TipoDeComprobante}
              description="TipoDeComprobante"
            />
            <Divider />
            <View style={basicStyles.cardHeader}>
              <Text category="h6">Conceptos</Text>
            </View>
          </Layout>
        </View>
      )}
      ListFooterComponent={(style) => (
        <View {...style}>
          <View style={basicStyles.card}>
            <Text category="h6">Impuestos</Text>
          </View>
          <ListItem
            title={record.Impuestos.TotalImpuestosTrasladados}
            description="Total de impuestos trasladados"
          />
          <Divider />
          <ListItem
            title={record.Impuestos.TotalImpuestosRetenidos}
            description="Total de impuestos retenidos"
          />
        </View>
      )}
    />
  );
};

const mapStateToProps = (state) => {
  const {homedata} = state;

  return {record: homedata.record};
};

const mapDispatch = {
  getRecord: getRecordFetch,
  removeRecord: removeRecordToStore,
};

export default connect(mapStateToProps, mapDispatch)(DetailRecordScreen);
