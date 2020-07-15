import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from 'faccloud/src/screens';
import DashboardDrawNav from './DashboardDrawNav';
import {basicStyles} from 'faccloud/src/styles/basicStyles';

const Stack = createStackNavigator();

const AppNavigation = ({isLogged, typeuser}) => {
  return (
    <SafeAreaView style={basicStyles.safeareaview}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isLogged ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Dashboard"
              component={DashboardDrawNav}
              initialParams={{typeuser}}
            />
          </>
        )}
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const {userdata} = state;
  return {
    isLogged: userdata.userConfig.islogged,
    typeuser: userdata.userConfig.typeuser,
  };
};

export default connect(mapStateToProps, null)(AppNavigation);
