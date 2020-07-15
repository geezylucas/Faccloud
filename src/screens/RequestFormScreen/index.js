import React, {useState, Fragment} from 'react';
import {View, Alert} from 'react-native';
import {
  Card,
  Button,
  Datepicker,
  IndexPath,
  Select,
  SelectItem,
  Layout,
  Text,
} from '@ui-kitten/components';
import {basicStyles} from 'faccloud/src/styles/basicStyles';
import {CalendarIcon, SearchIcon} from 'faccloud/src/styles/icons';
import {TopNavDashboard, Loading} from 'faccloud/src/components';
import {connect} from 'react-redux';
import axios from 'axios';
import Moment from 'moment';
import {logout} from 'faccloud/src/redux/reducers/rootReducer';

const renderOption = (title, index) => <SelectItem key={index} title={title} />;

const RequestFormScreen = ({navigation, token, logOut}) => {
  const [form, setForm] = useState({
    dateIni: new Date(),
    dateFin: new Date(),
    indexRequest: new IndexPath(0),
    typeRequest: '',
  });
  const [loading, setLoading] = useState(false);

  const dataSelect = ['Emitidos', 'Recibidos'];
  const displayValue = dataSelect[form.indexRequest.row];
  const now = new Date();

  /* FUNCTIONS */
  const sendRequest = async () => {
    setLoading(true);
    try {
      await axios.post(
        'http://192.168.100.31:5000/api/requestscfdis',
        {
          dateIni: Moment(form.dateIni).format('YYYY-MM-DD'),
          dateFin: Moment(form.dateFin).format('YYYY-MM-DD'),
          typeRequest:
            form.usoCfdi !== ''
              ? 'e'
              : form.typeRequest.substring(0, 1).toLowerCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // TODO: si se pide, agregar boton con el id para mostrar detalles
      Alert.alert(
        'Solicitud generada con éxito',
        'Se descargará en 5 minutos, verificar en la pestaña - Historial de solicitudes al SAT',
      );
    } catch (error) {
      switch (error.response.status) {
        case 401:
          logOut();
          break;
        default:
          Alert.alert(
            'Error al pedir la solicitud',
            error.response.data.message,
          );
          break;
      }
    } finally {
      setLoading(false);
    }
  };
  /* END FUNCTIONS */

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <TopNavDashboard
        title="Solicitar paquete de XML al SAT"
        openDrawer={() => navigation.openDrawer()}
      />
      <Layout level="2" style={basicStyles.container}>
        <View style={basicStyles.cardHeader}>
          <Text category="h5">Rango de solicitud de XML</Text>
        </View>
        <Card style={basicStyles.card}>
          <View style={basicStyles.layoutInputs}>
            <Select
              label="Tipo de solicitud:"
              selectedIndex={form.indexRequest}
              value={displayValue}
              onSelect={(index) =>
                setForm({
                  ...form,
                  indexRequest: index,
                  typeRequest: dataSelect[index.row],
                })
              }
              size="small">
              {dataSelect.map(renderOption)}
            </Select>
            <Datepicker
              label="Fecha inicio:"
              max={new Date(now.getFullYear(), now.getMonth(), now.getDate())}
              min={
                new Date(now.getFullYear() - 5, now.getMonth(), now.getDate())
              }
              date={form.dateIni}
              onSelect={(nextDate) => setForm({...form, dateIni: nextDate})}
              accessoryRight={CalendarIcon}
              size="small"
            />
            <Datepicker
              label="Fecha fin:"
              max={new Date(now.getFullYear(), now.getMonth(), now.getDate())}
              min={
                new Date(now.getFullYear() - 5, now.getMonth(), now.getDate())
              }
              date={form.dateFin}
              onSelect={(nextDate) => setForm({...form, dateFin: nextDate})}
              accessoryRight={CalendarIcon}
              size="small"
            />
          </View>
          <Button
            status="success"
            size="small"
            onPress={sendRequest}
            accessoryLeft={SearchIcon}>
            Solicitar
          </Button>
        </Card>
      </Layout>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  const {userdata} = state;
  return {token: userdata.userConfig.token};
};

const mapDispatch = {logOut: logout};

export default connect(mapStateToProps, mapDispatch)(RequestFormScreen);
