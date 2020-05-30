import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Drawer, DrawerItem, IndexPath} from '@ui-kitten/components';
import {HomeScreen, ListRecordsScreen} from '../screens';

const {Navigator, Screen} = createDrawerNavigator();

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="Home">
    <HomeStack.Screen name="Home" component={HomeScreen} />
    <HomeStack.Screen name="ListRecords" component={ListRecordsScreen} />
  </HomeStack.Navigator>
);

const DrawerContent = ({navigation, state}) => (
  <Drawer
    selectedIndex={new IndexPath(state.index)}
    onSelect={(index) => navigation.navigate(state.routeNames[index.row])}>
    <DrawerItem title="Inicio" />
    <DrawerItem title="Orders" />
  </Drawer>
);

const DashboardDrawNav = () => (
  <Navigator
    drawerContent={(props) => <DrawerContent {...props} />}
    initialRouteName="HomeStack">
    <Screen name="HomeStack" component={HomeStackScreen} />
  </Navigator>
);

export default DashboardDrawNav;
