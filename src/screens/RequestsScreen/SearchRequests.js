import React from 'react';
import {View} from 'react-native';
import {Card, Button, Datepicker, Select} from '@ui-kitten/components';
import {basicStyles} from 'faccloud/src/styles/basicStyles';
import {
  CalendarIcon,
  SearchIcon,
  renderOption,
} from 'faccloud/src/styles/icons';

const SearchRequests = ({form, setForm, filterData}) => {
  const dataSelect = ['Todos', 'Descargado', 'Pendiente'];
  const displayValue = dataSelect[form.indexStatus.row];

  return (
    <Card style={basicStyles.card}>
      <View style={basicStyles.layoutInputs}>
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
          label="Estatus de la solicitud"
          selectedIndex={form.indexStatus}
          value={displayValue}
          onSelect={(index) =>
            setForm({
              ...form,
              indexStatus: index,
              status: dataSelect[index.row],
            })
          }
          size="small">
          {dataSelect.map(renderOption)}
        </Select>
      </View>
      <Button
        status="success"
        accessoryLeft={SearchIcon}
        size="small"
        onPress={filterData}>
        Buscar
      </Button>
    </Card>
  );
};

export default React.memo(SearchRequests);
