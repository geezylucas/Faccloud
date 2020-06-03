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
import {basicStyles} from '../../styles/basicStyles';
import {CalendarIcon, SearchIcon} from '../../styles/icons';

const renderOption = (title, index) => <SelectItem key={index} title={title} />;

const SearchRecords = (props) => {
  const {dataSelect} = props;

  const displayValue = dataSelect[props.form.indexcfdi.row];

  return (
    <Card style={props.style}>
      <View style={basicStyles.layoutInputs}>
        <Input
          size="small"
          label="RFC"
          placeholder="CUPU800825569"
          value={props.form.rfc}
          onChangeText={(nextValue) =>
            props.setForm({...props.form, rfc: nextValue})
          }
        />
        <Datepicker
          label="Fecha inicio:"
          date={props.form.dateIni}
          onSelect={(nextDate) =>
            props.setForm({...props.form, dateIni: nextDate})
          }
          accessoryRight={CalendarIcon}
          size="small"
        />
        <Datepicker
          label="Fecha fin:"
          date={props.form.dateFin}
          onSelect={(nextDate) =>
            props.setForm({...props.form, dateFin: nextDate})
          }
          accessoryRight={CalendarIcon}
          size="small"
        />
        <Select
          label="Uso del XML"
          selectedIndex={props.form.indexcfdi}
          value={displayValue}
          onSelect={(index) =>
            props.setForm({
              ...props.form,
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
        onPress={props.filterData}>
        Buscar
      </Button>
    </Card>
  );
};
export default SearchRecords;
