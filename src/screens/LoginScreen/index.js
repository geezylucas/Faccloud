import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {save_user} from '../../redux/actions/userAction';
import {
  Card,
  Input,
  Layout,
  Button,
  Text,
  Icon,
  Spinner,
} from '@ui-kitten/components';
import {basicStyles} from '../../styles/basicStyles';

const LoginScreen = (props) => {
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
      id: '5eb5b46608ac8bb57f1b72ea',
      username: username,
      password: password,
    };
    let token = 'ezxsdsadasd';

    props.save_user({token, user: JSON.stringify(user), isLogged: true});
  };
  /* END FUNCTIONS */

  return (
    <SafeAreaView style={basicStyles.safeareaview}>
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
    </SafeAreaView>
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

export default connect(null, {save_user})(LoginScreen);
