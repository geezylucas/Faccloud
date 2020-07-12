import React, {useEffect, Fragment, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Layout, Text, ListItem, Divider} from '@ui-kitten/components';
import {basicStyles} from 'faccloud/src/styles/basicStyles';
import {TopNavGoBack} from 'faccloud/src/components';
import axios from 'axios';
import {connect} from 'react-redux';
import {logout} from 'faccloud/src/redux/reducers/rootReducer';

const DetailRequestScreen = ({route, navigation, token, logOut}) => {
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
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
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
        setRequest(
          Object.assign({}, request, {
            ...response.data.data,
            typerequest,
            status: response.data.data.status ? 'Descargado' : 'Pendiente',
            datedownload:
              'datedownload' in response.data.data
                ? new Date(response.data.data.datedownload.$date).toISOString()
                : null,
          }),
        );
      } catch (error) {
        switch (error.response.status) {
          case 401:
            logOut();
            break;
          default:
            break;
        }
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <TopNavGoBack
        title="Detalles solicitud"
        goBack={() => navigation.goBack()}
      />
      <Layout style={basicStyles.container} level="2">
        <ScrollView>
          <View style={basicStyles.cardHeader}>
            <Text category="h5">{request._id}</Text>
          </View>
          <ListItem
            title={`${request.numcfdis}`}
            description="Número de XML descargados"
          />
          <Divider />
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
            description="Rango de inicio"
          />
          <Divider />
          <ListItem
            title={`${new Date(request.dateend.$date).toISOString()}`}
            description="Rango de fin"
          />
          <Divider />
          <ListItem title={request.status} description="Estatus" />
          <Divider />
          <ListItem
            title={request.datedownload}
            description="Fecha de descarga"
          />
        </ScrollView>
      </Layout>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  const {userdata} = state;

  return {
    token: userdata.userConfig.token,
  };
};

const mapDispatch = {logOut: logout};

export default connect(mapStateToProps, mapDispatch)(DetailRequestScreen);
