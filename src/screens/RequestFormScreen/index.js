import React, {useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
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
import {TopNavDashboard} from 'faccloud/src/components';
import {connect} from 'react-redux';
import {
  sendRequestFetch,
  removeIdRequestToState,
} from 'faccloud/src/redux/actions/requestsActions';
import {Loading} from 'faccloud/src/components';

const renderOption = (title, index) => <SelectItem key={index} title={title} />;

const RequestFormScreen = ({
  navigation,
  removeIdRequest,
  sendRequest,
  dataSendRequest,
  idInfo,
}) => {
  const [form, setForm] = useState({
    dateIni: new Date(),
    dateFin: new Date(),
    indexRequest: new IndexPath(0),
    typeRequest: '',
  });

  const [visible, setVisible] = useState(false);

  const dataSelect = ['Emitidos', 'Recibidos'];
  const displayValue = dataSelect[form.indexRequest.row];

  /* FUNCTIONS */
  const removeId = () => {
    removeIdRequest();
    setVisible(false);
  };

  const sendRequestFunc = () => {
    setVisible(true);
    sendRequest({
      idInfo,
      filters: form,
    });
  };
  /* END FUNCTIONS */

  if (visible && dataSendRequest.message === null) {
    return <Loading />;
  } else {
    return (
      <ScrollView>
        <TopNavDashboard
          title="Solicitar paquete de XML"
          navigation={navigation}
        />
        <Layout level="2">
          <View style={basicStyles.cardHeader}>
            <Text category="h4">Formulario</Text>
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
              onPress={sendRequestFunc}
              disabled={visible}
              accessoryLeft={SearchIcon}>
              Buscar
            </Button>
          </Card>
          <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={removeId}>
            <Card disabled={true}>
              <Text>
                {dataSendRequest._id !== null
                  ? '!Solicitud generada con éxito! 😻'
                  : 'Ocurrió un error, verificar datos'}
              </Text>
            </Card>
          </Modal>
        </Layout>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

const mapStateToProps = (state) => {
  const {requestsdata, userdata} = state;
  return {
    dataSendRequest: requestsdata.dataSendRequest,
    idInfo: userdata.user.idInfo,
  };
};

const mapDispatch = {
  sendRequest: sendRequestFetch,
  removeIdRequest: removeIdRequestToState,
};

export default connect(mapStateToProps, mapDispatch)(RequestFormScreen);
