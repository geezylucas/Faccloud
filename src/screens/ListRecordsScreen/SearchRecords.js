import React from 'react';
import {View} from 'react-native';
import {
  Card,
  Input,
  Button,
  Datepicker,
  Select,
  Spinner,
} from '@ui-kitten/components';
import {basicStyles} from 'faccloud/src/styles/basicStyles';
import {
  CalendarIcon,
  SearchIcon,
  renderOption,
} from 'faccloud/src/styles/icons';

const SearchRecords = ({
  form,
  setForm,
  filterData,
  usoCfdis,
  loading,
  visible,
}) => {
  /* LOADGING INDICATOR */
  const LoadingIndicator = (propsLoading) => (
    <View style={[propsLoading.style, basicStyles.indicator]}>
      <Spinner size="small" />
    </View>
  );
  /* FIN LOADING INDICADOR */
  const dataSelect = ['Todos'];
  dataSelect.push(...Object.values(usoCfdis));

  const displayValue = dataSelect[form.indexCfdi.row];
  if (!visible) {
    return null;
  }
  return (
    <Card style={basicStyles.card}>
      <View style={basicStyles.layoutInputs}>
        <Input
          size="small"
          label="RFC:"
          placeholder="CUPU800825569"
          value={form.rfc}
          onChangeText={(nextValue) => setForm({...form, rfc: nextValue})}
        />
        <Datepicker
          max={
            new Date(
              form.dateIni.getFullYear(),
              form.dateIni.getMonth(),
              form.dateIni.getDate(),
            )
          }
          min={
            new Date(
              form.dateIni.getFullYear() - 10,
              form.dateIni.getMonth(),
              form.dateIni.getDate(),
            )
          }
          label="Fecha inicio:"
          date={form.dateIni}
          onSelect={(nextDate) => setForm({...form, dateIni: nextDate})}
          accessoryRight={CalendarIcon}
          size="small"
        />
        <Datepicker
          max={
            new Date(
              form.dateFin.getFullYear(),
              form.dateFin.getMonth(),
              form.dateFin.getDate(),
            )
          }
          min={
            new Date(
              form.dateFin.getFullYear() - 10,
              form.dateFin.getMonth(),
              form.dateFin.getDate(),
            )
          }
          label="Fecha fin:"
          date={form.dateFin}
          onSelect={(nextDate) => setForm({...form, dateFin: nextDate})}
          accessoryRight={CalendarIcon}
          size="small"
        />
        <Select
          label="Uso del XML:"
          selectedIndex={form.indexCfdi}
          value={displayValue}
          onSelect={(index) =>
            setForm({
              ...form,
              indexCfdi: index,
              usoCfdi: dataSelect[index.row],
            })
          }
          size="small">
          {dataSelect.map(renderOption)}
        </Select>
      </View>
      <Button
        status="success"
        disabled={loading}
        accessoryLeft={loading ? LoadingIndicator : SearchIcon}
        size="small"
        onPress={filterData}>
        Buscar
      </Button>
    </Card>
  );
};

export default React.memo(SearchRecords);
