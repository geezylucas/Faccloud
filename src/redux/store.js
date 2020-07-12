import {createStore, compose, applyMiddleware} from 'redux';
import {persistStore, persistReducer, createMigrate} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import {createBlacklistFilter} from 'redux-persist-transform-filter';

const migrations = {};
const saveSubsetUserFilter = createBlacklistFilter('userdata', ['error']);
const saveSubsetHomeFilter = createBlacklistFilter('homedata', [
  'datalistxmls',
]);

const persistConfig = {
  key: 'root',
  version: -1,
  storage: AsyncStorage,
  whitelist: ['userdata'],
  blacklist: ['requestsdata'],
  transforms: [saveSubsetUserFilter],
  timeout: null,
  debug: true,
  migrate: createMigrate(migrations, {debug: true}),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(
    persistedReducer,
    compose(applyMiddleware(ReduxThunk)),
  );
  const persistor = persistStore(store);
  return {store, persistor};
};
