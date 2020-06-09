import React from 'react';
import {View} from 'react-native';
import {Card, Button, Datepicker} from '@ui-kitten/components';
import {basicStyles} from 'faccloud/src/styles/basicStyles';
import {CalendarIcon, SearchIcon, RefreshIcon} from 'faccloud/src/styles/icons';

const SearchRequests = ({form, setForm, filterData, visible}) => {
  if (!visible) {
    return (
      <Button
        style={basicStyles.button}
        status="success"
        size="small"
        accessoryLeft={RefreshIcon}
        onPress={filterData}>
        Refrescar
      </Button>
    );
  } else {
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
  }
};

export default React.memo(SearchRequests);
