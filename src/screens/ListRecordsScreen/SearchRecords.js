import React from 'react';
import {View} from 'react-native';
import {
  Card,
  Input,
  Button,
  Datepicker,
  Select,
  SelectItem,
} from '@ui-kitten/components';
import {basicStyles} from 'faccloud/src/styles/basicStyles';
import {CalendarIcon, SearchIcon} from 'faccloud/src/styles/icons';

const renderOption = (title, index) => <SelectItem key={index} title={title} />;

const SearchRecords = ({dataSelect, form, setForm, filterData}) => {
  const displayValue = dataSelect[form.indexcfdi.row];

  return (
    <Card style={basicStyles.card}>
      <View style={basicStyles.layoutInputs}>
        <Input
          size="small"
          label="RFC"
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
          label="Uso del XML"
          selectedIndex={form.indexcfdi}
          value={displayValue}
          onSelect={(index) =>
            setForm({
              ...form,
              indexcfdi: index,
              usocfdi: dataSelect[index.row],
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
export default SearchRecords;
