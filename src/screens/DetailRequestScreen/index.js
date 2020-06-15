import React, {useEffect, Fragment, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Layout, Text, ListItem, Divider, Button} from '@ui-kitten/components';
import {basicStyles} from 'faccloud/src/styles/basicStyles';
import {TopNavGoBack} from 'faccloud/src/components';
import {connect} from 'react-redux';
import axios from 'axios';

const DetailRequestScreen = ({route, navigation, infoId}) => {
  const [request, setRequest] = useState({
    typerequest: null,
    status: null,
    numcfdis: null,
    datestart: {$date: 0},
    daterequest: {$date: 0},
    dateend: {$date: 0},
    datedownload: null,
    request: '',
    _id: '',
  });

  const {itemId} = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://192.168.100.31:5000/api/requestscfdis/${itemId}`,
        );

        let typerequest;
        switch (response.data.data.typerequest) {
          case 'r':
            typerequest = 'Recibido';
            break;
          case 'e':
            typerequest = 'Emitido';
            break;
          default:
            typerequest = '';
        }
        setRequest({
          ...response.data.data,
          typerequest,
          status: response.data.data.status ? 'Descargado' : 'Pendiente',
          datedownload:
            'datedownload' in response.data.data
              ? new Date(response.data.data.datedownload.$date).toISOString()
              : null,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [itemId]);

  const requestFunc = async () => {
    try {
      await axios.post('http://192.168.100.31:5000/api/cfdis', {
        infoId: infoId,
        requestId: request._id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <TopNavGoBack
        title="Detalles solicitud"
        goBack={() => navigation.goBack()}
      />
      <ScrollView>
        <Layout level="2">
          <View style={basicStyles.cardHeader}>
            <Text category="h5">{request._id}</Text>
          </View>
          <ListItem
            title={request.typerequest}
            description="Tipo de solicitud"
          />
          <Divider />
          <ListItem
            title={`${new Date(request.daterequest.$date).toISOString()}`}
            description="Fecha de solicitud"
          />
          <Divider />
          <ListItem
            title={`${new Date(request.datestart.$date).toISOString()}`}
            description="Fecha inicio de solicitud"
          />
          <Divider />
          <ListItem
            title={`${new Date(request.dateend.$date).toISOString()}`}
            description="Fecha fin de solicitud"
          />
          <Divider />
          <ListItem title={request.status} description="Estatus" />
          <Divider />
          <ListItem
            title={request.datedownload}
            description="Fecha de descarga"
          />
          <Divider />
          <ListItem
            title={request.numcfdis}
            description="Número de XML descargados"
          />
        </Layout>

        {request.request === 'm' && (
          <Fragment>
            <Button
              style={basicStyles.button}
              disabled={request.status === 'Descargado' ? true : false}
              onPress={requestFunc}>
              Solicitar
            </Button>
          </Fragment>
        )}
      </ScrollView>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  const {userdata} = state;

  return {
    infoId: userdata.satinformation._id.$oid,
  };
};

export default connect(mapStateToProps, null)(DetailRequestScreen);
