import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Drawer, DrawerItem, IndexPath} from '@ui-kitten/components';
import {
  HomeScreen,
  ListRecordsScreen,
  DetailRecordScreen,
  ListRequestsScreen,
  DetailRequestScreen,
  RequestFormScreen,
  SettingsScreen,
  ListXMLScreen,
} from 'faccloud/src/screens';

const {Navigator, Screen} = createDrawerNavigator();

const ListXMLStack = createStackNavigator();
const ListRequestsStack = createStackNavigator();

const ListXMLStackScreen = () => (
  <ListXMLStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="ListXML">
    <ListXMLStack.Screen name="ListXML" component={ListXMLScreen} />
    <ListXMLStack.Screen name="ListRecords" component={ListRecordsScreen} />
    <ListXMLStack.Screen name="DetailRecord" component={DetailRecordScreen} />
  </ListXMLStack.Navigator>
);

const ListRequestsStackScreen = () => (
  <ListRequestsStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="ListRequests">
    <ListRequestsStack.Screen
      name="ListRequests"
      component={ListRequestsScreen}
    />
    <ListRequestsStack.Screen
      name="DetailRequest"
      component={DetailRequestScreen}
    />
  </ListRequestsStack.Navigator>
);

const DashboardDrawNav = ({route}) => {
  const {typeuser} = route.params;

  const DrawerContent = ({navigation, state}) => {
    if (typeuser !== 'g') {
      return (
        <Drawer
          selectedIndex={new IndexPath(state.index)}
          onSelect={(index) =>
            navigation.navigate(state.routeNames[index.row])
          }>
          <DrawerItem title="Inicio" />
          <DrawerItem title="Menú de XML" />
          <DrawerItem title="Historial de solicitudes al SAT" />
          <DrawerItem title="Solicitar paquete de XML al SAT" />
          <DrawerItem title="Mi cuenta" />
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
          <DrawerItem title="Menú de XML" />
          <DrawerItem title="Mi cuenta" />
        </Drawer>
      );
    }
  };

  if (typeuser !== 'g') {
    return (
      <Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName="Home">
        <Screen name="Home" component={HomeScreen} />
        <Screen name="ListXMLStack" component={ListXMLStackScreen} />
        <Screen name="ListRequestsStack" component={ListRequestsStackScreen} />
        <Screen name="RequestForm" component={RequestFormScreen} />
        <Screen name="Settings" component={SettingsScreen} />
      </Navigator>
    );
  } else {
    return (
      <Navigator
        drawerContent={(props) => <DrawerContent {...props} />}
        initialRouteName="Home">
        <Screen name="Home" component={HomeScreen} />
        <Screen name="ListXMLStack" component={ListXMLStackScreen} />
        <Screen name="Settings" component={SettingsScreen} />
      </Navigator>
    );
  }
};

export default DashboardDrawNav;
