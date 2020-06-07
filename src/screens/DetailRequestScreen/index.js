import React, {useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {Layout, Text, ListItem, Divider} from '@ui-kitten/components';
import {basicStyles} from 'faccloud/src/styles/basicStyles';
import {TopNavGoBack} from 'faccloud/src/components';
import {connect} from 'react-redux';
import {getRequestFetch} from 'faccloud/src/redux/actions/requestsActions';

const DetailRequestScreen = ({route, navigation, request, getRequest}) => {
  const {itemId} = route.params;

  useEffect(() => {
    getRequest(itemId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRequest]);

  let typerequest;
  switch (request.typerequest) {
    case 'r':
      typerequest = 'Recibido';
      break;
    case 'e':
      typerequest = 'Emitido';
      break;
    default:
      typerequest = '';
  }

  return (
    <ScrollView>
      <TopNavGoBack title="Detalles solicitud" navigation={navigation} />
      <Layout level="2">
        <View style={basicStyles.cardHeader}>
          <Text category="h4">{request._id}</Text>
        </View>
        <ListItem title={typerequest} description="Tipo de solicitud" />
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
        <ListItem
          title={request.status ? 'Descargado' : 'Pendiente'}
          description="Estatus"
        />
        <Divider />
        <ListItem
          title={`${new Date(request.datedownload.$date).toISOString()}`}
          description="Fecha de descarga"
        />
        <Divider />
        <ListItem
          title={request.numcfdis}
          description="Número de XML descargados"
        />
      </Layout>
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  const {requestsdata} = state;

  return {request: requestsdata.request};
};

const mapDispatch = {getRequest: getRequestFetch};

export default connect(mapStateToProps, mapDispatch)(DetailRequestScreen);
