import React from 'react';
import {View} from 'react-native';
import {Card, Input, Button, Datepicker, Select} from '@ui-kitten/components';
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
  visible,
  usoCfdis,
  loading,
}) => {
  const dataSelect = ['Todos'];
  dataSelect.push(...Object.values(usoCfdis));

  const displayValue = dataSelect[form.indexCfdi.row];

  if (visible) {
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
          accessoryLeft={SearchIcon}
          size="small"
          onPress={filterData}>
          Buscar
        </Button>
      </Card>
    );
  } else {
    return null;
  }
};

export default React.memo(SearchRecords);
