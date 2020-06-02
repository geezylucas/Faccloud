import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView, View} from 'react-native';
import {Layout, Button, Text} from '@ui-kitten/components';
import {connect} from 'react-redux';
import {logout} from '../../redux/reducers/rootReducer';
import {basicStyles} from '../../styles/basicStyles';
import {TopNavDashboard} from '../../components';
import HomeMenus from './HomeMenus';

const HomeScreen = (props) => {
  const emitidos = {_id: 'e', totalNumCfdis: 0};
  const recibidos = {_id: 'r', totalNumCfdis: 0};

  /* FUNCTIONS */
  /* END FUNCTIONS */

  return (
    <SafeAreaView style={basicStyles.safeareaview}>
      <ScrollView>
        <TopNavDashboard title="Inicio" navigation={props.navigation} />
        <Layout style={basicStyles.container} level="2">
          <View style={basicStyles.card}>
            <Text category="h4">!Buen día! ☀️</Text>
            <Text category="s2">Úlimo registro: -</Text>
          </View>
          <HomeMenus
            navigate={props.navigation.navigate}
            typeXMLSection={recibidos}
          />
          <HomeMenus
            navigate={props.navigation.navigate}
            typeXMLSection={emitidos}
          />
          <Button style={styles.buttonSignOut} onPress={() => props.logout()}>
            Salir
          </Button>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonSignOut: {
    marginTop: 20,
    margin: 8,
  },
});

export default connect(null, {logout})(HomeScreen);
