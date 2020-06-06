import React from 'react';
import {View} from 'react-native';
import {Card, Button, Datepicker} from '@ui-kitten/components';
import {basicStyles} from '../../styles/basicStyles';
import {CalendarIcon, SearchIcon} from '../../styles/icons';

const SearchRequests = (props) => (
  <Card style={basicStyles.card}>
    <View style={basicStyles.layoutInputs}>
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

export default SearchRequests;
