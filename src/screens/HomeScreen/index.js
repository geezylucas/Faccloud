import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView, View} from 'react-native';
import {Layout, Button, Text} from '@ui-kitten/components';
import {save_user} from '../../redux/actions/userAction';
import {connect} from 'react-redux';
import {basicStyles} from '../../styles/basicStyles';
import TopNavDashboard from '../../components/TopNavDashboard';
import HomeMenus from './HomeMenus';

const HomeScreen = (props) => {
  const emitidos = {_id: 'e', totalNumCfdis: 0};
  const recibidos = {_id: 'r', totalNumCfdis: 0};

  /* FUNCTIONS */
  const signOut = () => {
    // Aquí vamos a llamar a la API para solicitar el token y el user
    let user = {
      id: '',
      username: '',
      password: '',
    };
    let token = '';

    props.save_user({token, user: JSON.stringify(user), isLogged: false});
  };
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
          <Button style={styles.buttonSignOut} onPress={signOut}>
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

export default connect(null, {save_user})(HomeScreen);
