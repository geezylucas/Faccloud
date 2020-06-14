import React, {useEffect, Fragment, useState} from 'react';
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
import axios from 'axios';

const DetailRecordScreen = ({route, navigation}) => {
  const [record, setRecord] = useState({
    Emisor: {
      Nombre: '',
      Rfc: '',
    },
    Receptor: {
      Nombre: '',
      Rfc: '',
      UsoCFDI: '',
    },
    SubTotal: {$numberDecimal: 0},
    Descuento: {$numberDecimal: 0},
    Total: {$numberDecimal: 0},
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

  const {itemId} = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.100.31:5000/api/cfdis/${itemId}`,
        );
        setRecord(Object.assign({}, record, response.data.data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId]);

  const renderItemHeader = (headerProps, descripcion) => (
    <View {...headerProps}>
      <Text category="s1">{descripcion.trim()}</Text>
    </View>
  );

  const renderItem = (info) => (
    <Card
      style={basicStyles.card}
      status="basic"
      header={(headerProps) =>
        renderItemHeader(headerProps, info.item.Descripcion)
      }>
      <ListItem title={info.item.Cantidad} description="Cantidad" />
      <Divider />
      <ListItem title={info.item.ValorUnitario} description="Valor unitario" />
      <Divider />
      <ListItem title={info.item.Importe} description="Importe" />
    </Card>
  );

  return (
    <Fragment>
      <TopNavGoBack title="Detalles XML" goBack={() => navigation.goBack()} />
      <List
        data={record.Conceptos}
        renderItem={renderItem}
        ListHeaderComponent={
          <View>
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
              <ListItem
                title={record.Receptor.Rfc}
                description="Receptor RFC"
              />
              <Divider />
              <ListItem
                title={record.SubTotal.$numberDecimal}
                description="SubTotal"
              />
              <Divider />
              <ListItem
                title={record.Descuento.$numberDecimal}
                description="Descuento"
              />
              <Divider />
              <ListItem
                title={record.Total.$numberDecimal}
                description="Total"
              />
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
        }
        ListFooterComponent={
          <View>
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
        }
      />
    </Fragment>
  );
};

export default DetailRecordScreen;
