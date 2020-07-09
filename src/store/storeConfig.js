import {
  createStore, 
  combineReducers,
  compose,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import useReducer from './reducers/user';
import postsReducer from './reducers/posts'

const reducers = combineReducers({
  user: useReducer,
  posts: postsReducer
})

const storeConfig = () => {
  return createStore(reducers,compose(applyMiddleware(thunk)))
}

export default storeConfig