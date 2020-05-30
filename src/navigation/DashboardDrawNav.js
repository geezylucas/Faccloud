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
} from '../screens';

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

const DrawerContent = ({navigation, state}) => (
  <Drawer
    selectedIndex={new IndexPath(state.index)}
    onSelect={(index) => navigation.navigate(state.routeNames[index.row])}>
    <DrawerItem title="Inicio" />
    <DrawerItem title="Solicitudes" />
  </Drawer>
);

const DashboardDrawNav = () => (
  <Navigator
    drawerContent={(props) => <DrawerContent {...props} />}
    initialRouteName="HomeStack">
    <Screen name="HomeStack" component={HomeStackScreen} />
    <Screen name="RequestsStack" component={RequestsStackScreen} />
  </Navigator>
);

export default DashboardDrawNav;
