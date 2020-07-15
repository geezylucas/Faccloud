import React, {Fragment, useEffect, useState} from 'react';
import Moment from 'moment';
import {ScrollView, View, StyleSheet} from 'react-native';
import {
  Layout,
  Text,
  Toggle,
  Card,
  IndexPath,
  Select,
  Button,
  SelectGroup,
  ListItem,
  Divider,
} from '@ui-kitten/components';
import {TopNavDashboard, Loading} from 'faccloud/src/components';
import {basicStyles} from 'faccloud/src/styles/basicStyles';
import {SaveIcon, renderOption} from 'faccloud/src/styles/icons';
import {connect} from 'react-redux';
import {getUserFetch} from 'faccloud/src/redux/actions/userActions';
import {logout} from 'faccloud/src/redux/reducers/rootReducer';
import axios from 'axios';

const dataUsoXML = {
  'Sección G': [
    'Adquisición de mercancias',
    'Devoluciones, descuentos o bonificaciones',
    'Gastos en general',
  ],
  'Sección I': [
    'Construcciones',
    'Mobilario y equipo de oficina por inversiones',
    'Equipo de transporte',
    'Equipo de computo y accesorios',
    'Dados, troqueles, moldes, matrices y herramental',
    'Comunicaciones telefónicas',
    'Comunicaciones satelitales',
    'Otra maquinaria y equipo',
  ],
  'Sección D': [
    'Honorarios médicos, dentales y gastos hospitalarios.',
    'Gastos médicos por incapacidad o discapacidad',
    'Gastos funerales.',
    'Donativos.',
    'Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación).',
    'Aportaciones voluntarias al SAR.',
    'Primas por seguros de gastos médicos.',
    'Gastos de transportación escolar obligatoria.',
    'Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones.',
    'Pagos por servicios educativos (colegiaturas)',
  ],
  'Sección P': ['Por definir'],
};

const renderGroup = (title, index) => (
  <SelectGroup key={index} title={title}>
    {dataUsoXML[title].map(renderOption)}
  </SelectGroup>
);

const SettingsScreen = ({
  navigation,
  typeUser,
  dataUser,
  token,
  loading,
  getUser,
  logOut,
}) => {
  const [checked, setChecked] = useState(false);
  const [multiSelectedIndex, setMultiSelectedIndex] = useState([
    new IndexPath(0, 0),
  ]);

  const groupDisplayValues = multiSelectedIndex.map((index) => {
    const groupTitle = Object.keys(dataUsoXML)[index.section];
    return dataUsoXML[groupTitle][index.row];
  });

  const {
    satInfo: {
      rfc,
      settingsrfc: {usocfdis, timerautomatic, timerequest},
    },
  } = dataUser;

  useEffect(() => {
    let usosXML = Object.keys(usocfdis)
      .filter((key) => key.startsWith('G'))
      .map((key) => usocfdis[key])
      .map((key) => new IndexPath(dataUsoXML['Sección G'].indexOf(key), 0));

    usosXML.push(
      ...Object.keys(usocfdis)
        .filter((key) => key.startsWith('I'))
        .map((key) => usocfdis[key])
        .map((key) => new IndexPath(dataUsoXML['Sección I'].indexOf(key), 1)),
    );
    usosXML.push(
      ...Object.keys(usocfdis)
        .filter((key) => key.startsWith('D'))
        .map((key) => usocfdis[key])
        .map((key) => new IndexPath(dataUsoXML['Sección D'].indexOf(key), 2)),
    );
    usosXML.push(
      ...Object.keys(usocfdis)
        .filter((key) => key.startsWith('P'))
        .map((key) => usocfdis[key])
        .map((key) => new IndexPath(dataUsoXML['Sección P'].indexOf(key), 3)),
    );

    setMultiSelectedIndex(usosXML);
    setChecked(timerautomatic);
  }, [timerautomatic, usocfdis]);

  const updateUser = () => {
    axios
      .patch(
        'http://192.168.100.31:5000/api/satinformations/updatesettings',
        {
          timerautomatic: checked,
          usocfdis: multiSelectedIndex.map((index) => {
            switch (index.section) {
              case 0:
                return 'G0' + (parseInt(index.row, 10) + 1);
              case 1:
                return 'I0' + (parseInt(index.row, 10) + 1);
              case 2:
                const sectionD = parseInt(index.row, 10) + 1;
                return sectionD < 10 ? 'D0' + sectionD : 'D' + sectionD;
              case 3:
                return 'P0' + (parseInt(index.row, 10) + 1);
            }
          }),
          timerequest,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        getUser(token);
      })
      .catch((error) => {
        switch (error.response.status) {
          case 401:
            logOut();
            break;
          default:
            break;
        }
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <TopNavDashboard
        title="Mi cuenta"
        openDrawer={() => navigation.openDrawer()}
      />
      <ScrollView>
        <Layout style={basicStyles.container} level="2">
          <View style={basicStyles.layoutHeader}>
            <Text category="h5">Detalles de la cuenta</Text>
          </View>
          <ListItem
            title={`${dataUser.name} ${dataUser.lastname}`}
            description="Nombre completo"
          />
          <Divider />
          <ListItem
            title={dataUser.phonenumber}
            description="Número de celular"
          />
          <Divider />
          <ListItem title={dataUser.email} description="Email" />
          <Divider />
          <ListItem title={rfc} description="RFC" />
          <Divider />
          <ListItem
            title={`${timerequest} días`}
            description="Rango de días para solicitar XML al SAT"
          />
          <Divider />
          <ListItem
            title={Moment(dataUser.creationdate.$date).format(
              'YYYY-MM-DD HH:MM:SS',
            )}
            description="Fecha de registro"
          />
          {typeUser !== 'g' && (
            <Fragment>
              <View style={basicStyles.layoutHeader}>
                <Text category="h5">Configuración de la cuenta</Text>
              </View>
              <Card
                style={styles.item}
                status="basic"
                header={(headerProps) => (
                  <Text {...headerProps}>Descarga automática de XML</Text>
                )}>
                <View style={styles.viewComponents}>
                  <Text>
                    {!checked ? 'Habilitar:' : 'Deshabilitar:'}
                    {'   '}
                  </Text>
                  <Toggle
                    checked={checked}
                    onChange={(isChecked) => setChecked(isChecked)}
                  />
                </View>
              </Card>
            </Fragment>
          )}
          <View style={basicStyles.layoutHeader}>
            <Text category="h5">Parámetros de visualización</Text>
          </View>
          <Card
            style={styles.item}
            status="basic"
            header={(headerProps) => <Text {...headerProps}>Uso del XML</Text>}>
            <View>
              <Select
                multiSelect={true}
                value={groupDisplayValues.join(', ')}
                selectedIndex={multiSelectedIndex}
                onSelect={(index) => setMultiSelectedIndex(index)}>
                {Object.keys(dataUsoXML).map(renderGroup)}
              </Select>
            </View>
          </Card>
          <View style={basicStyles.cardHeader}>
            <Button accessoryLeft={SaveIcon} onPress={updateUser}>
              Guardar cambios
            </Button>
          </View>
        </Layout>
      </ScrollView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 4,
  },
  viewComponents: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const mapDispatch = {
  getUser: getUserFetch,
  logOut: logout,
};

const mapStateToProps = (state) => {
  const {userdata} = state;
  return {
    typeUser: userdata.userConfig.typeuser,
    token: userdata.userConfig.token,
    dataUser: userdata.userData,
    loading: userdata.loading,
  };
};

export default connect(mapStateToProps, mapDispatch)(SettingsScreen);
