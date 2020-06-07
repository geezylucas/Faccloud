import React, {useState} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {saveUserFetch} from 'faccloud/src/redux/actions/userActions';
import {
  Card,
  Input,
  Layout,
  Button,
  Text,
  Icon,
  Spinner,
} from '@ui-kitten/components';
import {basicStyles} from 'faccloud/src/styles/basicStyles';

const LoginScreen = ({saveUser}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginPress, setLoginPress] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  /* PASSWORD */
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (propsIcon) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...propsIcon} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );
  /* END PASSWORD */

  /* LOADGING INDICATOR */
  const LoadingIndicator = (propsLoading) => {
    if (loginPress) {
      return (
        <View style={[propsLoading.style, styles.indicator]}>
          <Spinner size="small" />
        </View>
      );
    } else {
      return null;
    }
  };
  /* FIN LOADING INDICADOR */

  /* FUNCTIONS */
  const signIn = async () => {
    setLoginPress(true);

    // Aquí vamos a llamar a la API para solicitar el token y el user
    let user = {
      id: '5ed5b3831d8da382b4c235a8',
      username: username,
      password: password,
      typeUser: 'p',
    };
    let token = 'ezxsdsadasd';

    saveUser({
      token,
      user,
      isLogged: true,
    });
  };
  /* END FUNCTIONS */

  return (
    <Layout style={styles.container} level="2">
      <Card style={styles.card}>
        <View style={basicStyles.layoutInputs}>
          <Input
            label="Usuario"
            placeholder="john.doe@example.com"
            value={username}
            onChangeText={(nextValue) => setUsername(nextValue)}
          />
          <Input
            value={password}
            label="Contraseña"
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={(nextValue) => setPassword(nextValue)}
          />
        </View>
        <Button
          status="success"
          onPress={signIn}
          disabled={loginPress}
          accessoryLeft={LoadingIndicator}>
          Ingresar
        </Button>
      </Card>
      <Card style={styles.cardRestPassword}>
        <Text>¿Olvidaste tu contraseña?</Text>
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    marginLeft: 20,
    marginRight: 20,
  },
  cardRestPassword: {
    margin: 20,
    alignItems: 'center',
  },
  logo: {
    height: 150,
    width: null,
    marginTop: 40,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapDispatch = {saveUser: saveUserFetch};

export default connect(null, mapDispatch)(LoginScreen);
