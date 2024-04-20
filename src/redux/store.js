import {
  combineReducers,
  compose,
  legacy_createStore
} from "redux";

import itemReducer from './itemReducer';

// @ts-ignore
const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();


function configureStore() {
  return legacy_createStore(
    combineReducers({
      itemsReducer: itemReducer,
    }),
    undefined,
    compose(
      ReactReduxDevTools,
    )
  );
}

export default configureStore;
