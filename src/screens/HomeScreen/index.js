import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView, View} from 'react-native';
import {Layout, Button, Text} from '@ui-kitten/components';
import {save_user} from '../../redux/actions/userAction';
import {connect} from 'react-redux';
import {basicStyles} from '../../styles/basicStyles';

const HomeScreen = (props) => {
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

  return (
    <SafeAreaView style={basicStyles.safeareaview}>
      <ScrollView>
        <Layout style={basicStyles.container} level="2">
          <View style={styles.cardHeader}>
            <Text category="h4">!Buen día! ☀️</Text>
            <Text category="s2">Úlimo registro: -</Text>
          </View>
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
  cardHeader: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default connect(null, {save_user})(HomeScreen);
