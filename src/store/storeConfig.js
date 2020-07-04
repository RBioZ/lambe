import {createStore, combineReducers} from 'redux';
import useReducer from './reducers/user';

const reducers = combineReducers({
  user: useReducer,
})

const storeConfig = () => {
  return createStore(reducers)
}

export default storeConfig