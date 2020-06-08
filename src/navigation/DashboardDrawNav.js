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

const premiumUser = ['Inicio', 'Solicitudes', 'Solicitar paquete de XML'];
const normalUser = ['Inicio'];

const DashboardDrawNav = ({typeUser}) => {
  const DrawerContent = ({navigation, state}) => (
    <Drawer
      selectedIndex={new IndexPath(state.index)}
      onSelect={(index) => navigation.navigate(state.routeNames[index.row])}>
      {typeUser !== 'g'
        ? premiumUser.map((title, index) => {
            return <DrawerItem key={index} title={title} />;
          })
        : normalUser.map((title, index) => {
            return <DrawerItem key={index} title={title} />;
          })}
    </Drawer>
  );

  return (
    <Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="HomeStack">
      <Screen name="HomeStack" component={HomeStackScreen} />
      {typeUser !== 'g' && (
        <>
          <Screen name="RequestsStack" component={RequestsStackScreen} />
          <Screen name="RequestForm" component={RequestFormScreen} />
        </>
      )}
    </Navigator>
  );
};

const mapStateToProps = (state) => {
  const {userdata} = state;
  return {typeUser: userdata.user.typeUser};
};

export default connect(mapStateToProps, null)(DashboardDrawNav);
