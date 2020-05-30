/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the UI Kitten template
 * https://github.com/akveo/react-native-ui-kitten
 *
 * Documentation: https://akveo.github.io/react-native-ui-kitten/docs
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './src/redux/store';

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */

const {store, persistor} = configureStore();

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <NavigationContainer>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <AppNavigation />
        </ApplicationProvider>
      </NavigationContainer>
    </PersistGate>
  </Provider>
);
