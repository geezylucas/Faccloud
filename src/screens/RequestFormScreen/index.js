import React, {useState, Fragment} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Card,
  Button,
  Datepicker,
  IndexPath,
  Select,
  SelectItem,
  Layout,
  Text,
  Modal,
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
  const [visible, setVisible] = useState(false);
  const [textMessage, setTextMessage] = useState('');

  const dataSelect = ['Emitidos', 'Recibidos'];
  const displayValue = dataSelect[form.indexRequest.row];

  /* FUNCTIONS */
  const sendRequest = async () => {
    setLoading(true);
    setVisible(true);

    try {
      const response = await axios.post(
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
      if (response.data.data.message === 'OK') {
        setTextMessage('!Solicitud generada con éxito!');
      } else {
        setTextMessage('Ocurrió un error, verificar datos');
      }

      setLoading(false);
    } catch (error) {
      switch (error.response.status) {
        case 401:
          logOut();
          break;
        default:
          setTextMessage(error.response.data.message);
          break;
      }
    }
  };
  /* END FUNCTIONS */

  if (loading) {
    return <Loading />;
  } else {
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
                date={form.dateIni}
                onSelect={(nextDate) => setForm({...form, dateIni: nextDate})}
                accessoryRight={CalendarIcon}
                size="small"
              />
              <Datepicker
                label="Fecha fin:"
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
              disabled={visible}
              accessoryLeft={SearchIcon}>
              Solicitar
            </Button>
          </Card>
          <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}>
            <Card disabled={true}>
              <Text>{textMessage}</Text>
            </Card>
          </Modal>
        </Layout>
      </Fragment>
    );
  }
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

const mapStateToProps = (state) => {
  const {userdata} = state;

  return {token: userdata.userConfig.token};
};

const mapDispatch = {logOut: logout};

export default connect(mapStateToProps, mapDispatch)(RequestFormScreen);
