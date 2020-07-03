import React, {Fragment} from 'react';
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
} from '@ui-kitten/components';
import {TopNavDashboard, Loading} from 'faccloud/src/components';
import {basicStyles} from 'faccloud/src/styles/basicStyles';
import {SaveIcon, renderOption} from 'faccloud/src/styles/icons';
import {connect} from 'react-redux';
import {getSatInformationFetch} from 'faccloud/src/redux/actions/userActions';
import axios from 'axios';

const dataDays = [2, 3, 4, 5, 6, 7];
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
    'Intereses reales efectivamente pagados por créditos hipotecarios (casa...',
    'Aportaciones voluntarias al SAR.',
    'Primas por seguros de gastos médicos.',
    'Gastos de transportación escolar obligatoria.',
    'Depósitos en cuentas para el ahorro, primas que tengan como base plane...',
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
  usoCfdis,
  timeRequest,
  timerAutomatic,
  getSatInformation,
  infoId,
  typeUser,
}) => {
  const [checked, setChecked] = React.useState(false);
  const [selectedIndexDays, setSelectedIndexDays] = React.useState(
    new IndexPath(0),
  );

  const [multiSelectedIndex, setMultiSelectedIndex] = React.useState([
    new IndexPath(0, 0),
  ]);

  const [loading, setLoading] = React.useState(false);

  const displayValueDays = dataDays[selectedIndexDays.row];
  const groupDisplayValues = multiSelectedIndex.map((index) => {
    const groupTitle = Object.keys(dataUsoXML)[index.section];
    return dataUsoXML[groupTitle][index.row];
  });

  React.useEffect(() => {
    let usosXML = Object.keys(usoCfdis)
      .filter((key) => key.startsWith('G'))
      .map((key) => usoCfdis[key])
      .map((key) => new IndexPath(dataUsoXML['Sección G'].indexOf(key), 0));

    usosXML.push(
      ...Object.keys(usoCfdis)
        .filter((key) => key.startsWith('I'))
        .map((key) => usoCfdis[key])
        .map((key) => new IndexPath(dataUsoXML['Sección I'].indexOf(key), 1)),
    );
    usosXML.push(
      ...Object.keys(usoCfdis)
        .filter((key) => key.startsWith('D'))
        .map((key) => usoCfdis[key])
        .map((key) => new IndexPath(dataUsoXML['Sección D'].indexOf(key), 2)),
    );
    usosXML.push(
      ...Object.keys(usoCfdis)
        .filter((key) => key.startsWith('P'))
        .map((key) => usoCfdis[key])
        .map((key) => new IndexPath(dataUsoXML['Sección P'].indexOf(key), 3)),
    );

    setMultiSelectedIndex(usosXML);
    setChecked(timerAutomatic);
    setSelectedIndexDays(new IndexPath(dataDays.indexOf(timeRequest)));
  }, [timeRequest, timerAutomatic, usoCfdis]);

  const updateUser = async () => {
    setLoading(true);
    try {
      await axios.patch(
        `http://192.168.100.31:5000/api/satinformations/updatesettings/${infoId}`,
        {
          timerautomatic: checked,
          usocfdis: multiSelectedIndex.map((index) => {
            switch (index.section) {
              case 0:
                return 'G0' + (parseInt(index.row, 10) + 1);
              case 1:
                return 'I0' + (parseInt(index.row, 10) + 1);
              case 2:
                return 'D0' + (parseInt(index.row, 10) + 1);
              case 3:
                return 'P0' + (parseInt(index.row, 10) + 1);
            }
          }),
          timerequest: displayValueDays !== undefined ? displayValueDays : 0,
        },
      );
    } catch (error) {
      console.error(error);
    }

    getSatInformation(infoId);
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <Fragment>
        <TopNavDashboard
          title="Mi cuenta"
          openDrawer={() => navigation.openDrawer()}
        />
        <ScrollView>
          <Layout style={basicStyles.container} level="2">
            <View style={basicStyles.layoutHeader}>
              <Text category="h5">Configuración de la cuenta</Text>
            </View>
            {typeUser !== 'g' && (
              <Fragment>
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
              header={(headerProps) => (
                <Text {...headerProps}>Uso del XML</Text>
              )}>
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
                Guardar
              </Button>
            </View>
          </Layout>
        </ScrollView>
      </Fragment>
    );
  }
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
  getSatInformation: getSatInformationFetch,
};

const mapStateToProps = (state) => {
  const {userdata} = state;
  return {
    infoId: userdata.satinformation._id.$oid,
    typeUser: userdata.user.typeuser,
    usoCfdis: userdata.satinformation.settingsrfc.usocfdis,
    timeRequest: userdata.satinformation.settingsrfc.timerequest,
    timerAutomatic: userdata.satinformation.settingsrfc.timerautomatic,
  };
};

export default connect(mapStateToProps, mapDispatch)(SettingsScreen);
