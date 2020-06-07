import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from 'faccloud/src/screens';
import DashboardDrawNav from './DashboardDrawNav';
import {basicStyles} from 'faccloud/src/styles/basicStyles';
import {Loading} from 'faccloud/src/components';

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
      <SafeAreaView style={basicStyles.safeareaview}>
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
      </SafeAreaView>
    );
  }
};

const mapStateToProps = (state) => {
  const {userdata} = state;
  return {isLogged: userdata.isLogged};
};

export default connect(mapStateToProps, null)(AppNavigation);
