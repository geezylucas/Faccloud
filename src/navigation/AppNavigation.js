import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens';
import DashboardDrawNav from './DashboardDrawNav';
import {basicStyles} from '../styles/basicStyles';
import Loading from '../components/Loading';

const Stack = createStackNavigator();

const AppNavigation = ({isLogged}) => {
  const [logged, setLogged] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {
    const isUserLogged = () => {
      setLogged(isLogged);
      setIsLoading(true);
    };

    isUserLogged();
  }, [isLogged]);

  if (!isloading) {
    return (
      <SafeAreaView style={basicStyles.safeareaview}>
        <Loading />
      </SafeAreaView>
    );
  } else {
    return (
      <>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {!logged ? (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Dashboard" component={DashboardDrawNav} />
            </>
          )}
        </Stack.Navigator>
      </>
    );
  }
};

const mapStateToProps = (state) => {
  const {userdata} = state;
  return {isLogged: userdata.isLogged};
};

export default connect(mapStateToProps, null)(AppNavigation);
