import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Layout, Text, ListItem, List, Card} from '@ui-kitten/components';
import {basicStyles} from '../../styles/basicStyles';
import {TopNavGoBack} from '../../components';
import {connect} from 'react-redux';
import {
  getRecordFetch,
  removeRecordToStore,
} from '../../redux/actions/homeActions';

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
    return () => {
      removeRecord({
        Emisor: {
          Nombre: '',
          Rfc: '',
        },
        Receptor: {
          Nombre: '',
          Rfc: '',
          UsoCFDI: '',
        },
        SubTotal: 0,
        Descuento: 0,
        Total: 0,
        Fecha: '',
        TipoDeComprobante: '',
        Conceptos: [
          {
            Cantidad: 0,
            Descripcion: '',
            Importe: 0,
            ValorUnitario: 0,
          },
        ],
        Impuestos: {
          TotalImpuestosTrasladados: 0,
          TotalImpuestosRetenidos: 0,
        },
      });
    };
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
      <ListItem title={info.item.ValorUnitario} description="Valor unitario" />
      <ListItem title={info.item.Importe} description="Importe" />
    </Card>
  );

  return (
    <List
      data={record.Conceptos}
      renderItem={renderItem}
      ListHeaderComponent={
        <>
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
            <ListItem title={record.Receptor.Rfc} description="Receptor RFC" />
            <ListItem title={record.SubTotal} description="SubTotal" />
            <ListItem title={record.Descuento} description="Descuento" />
            <ListItem title={record.Total} description="Total" />
            <ListItem title={record.Fecha} description="Fecha" />
            <ListItem
              title={record.TipoDeComprobante}
              description="TipoDeComprobante"
            />
            <View style={basicStyles.cardHeader}>
              <Text category="h6">Conceptos</Text>
            </View>
          </Layout>
        </>
      }
      ListFooterComponent={
        <>
          <View style={basicStyles.cardHeader}>
            <Text category="h6">Impuestos</Text>
          </View>
          <ListItem
            title={record.Impuestos.TotalImpuestosTrasladados}
            description="Total de impuestos trasladados"
          />
          <ListItem
            title={record.Impuestos.TotalImpuestosRetenidos}
            description="Total de impuestos retenidos"
          />
        </>
      }
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
