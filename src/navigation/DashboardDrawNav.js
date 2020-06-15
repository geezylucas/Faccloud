import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Drawer, DrawerItem, IndexPath} from '@ui-kitten/components';
import {
  HomeScreen,
  ListRecordsScreen,
  DetailRecordScreen,
  RequestsScreen,
  DetailRequestScreen,
  RequestFormScreen,
  SettingsScreen,
} from 'faccloud/src/screens';
import {connect} from 'react-redux';

const {Navigator, Screen} = createDrawerNavigator();

const HomeStack = createStackNavigator();
const RequestsStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="Home">
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="ListRecords" component={ListRecordsScreen} />
    <HomeStack.Screen name="DetailRecord" component={DetailRecordScreen} />
  </HomeStack.Navigator>
);

const RequestsStackScreen = () => (
  <RequestsStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="Requests">
    <RequestsStack.Screen name="Requests" component={RequestsScreen} />
    <RequestsStack.Screen
      name="DetailRequest"
      component={DetailRequestScreen}
    />
  </RequestsStack.Navigator>
);

const DashboardDrawNav = ({typeUser}) => {
  const DrawerContent = ({navigation, state}) => {
    if (typeUser !== 'g') {
      return (
        <Drawer
          selectedIndex={new IndexPath(state.index)}
          onSelect={(index) =>
            navigation.navigate(state.routeNames[index.row])
          }>
          <DrawerItem title="Inicio" />
          <DrawerItem title="Solicitudes" />
          <DrawerItem title="Solicitar paquete de XML" />
          <DrawerItem title="Configuración" />
        </Drawer>
      );
    } else {
      return (
        <Drawer
          selectedIndex={new IndexPath(state.index)}
          onSelect={(index) =>
            navigation.navigate(state.routeNames[index.row])
          }>
          <DrawerItem title="Inicio" />
          <DrawerItem title="Configuración" />
        </Drawer>
      );
    }
  };

  if (typeUser !== 'g') {
    return (
      <Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName="HomeStack">
        <Screen name="HomeStack" component={HomeStackScreen} />
        <Screen name="RequestsStack" component={RequestsStackScreen} />
        <Screen name="RequestForm" component={RequestFormScreen} />
        <Screen name="Settings" component={SettingsScreen} />
      </Navigator>
    );
  } else {
    return (
      <Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName="HomeStack">
        <Screen name="HomeStack" component={HomeStackScreen} />
        <Screen name="Settings" component={SettingsScreen} />
      </Navigator>
    );
  }
};

const mapStateToProps = (state) => {
  const {userdata} = state;

  return {typeUser: userdata.user.typeuser};
};

export default connect(mapStateToProps, null)(DashboardDrawNav);
