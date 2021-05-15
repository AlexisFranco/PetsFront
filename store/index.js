import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { usersReducer } from './usersReducer';
import { petsReducer } from './petsReducer';

const middleware = [
  thunk
]

const rootReducer = combineReducers({
  usersReducer,
  petsReducer,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(...middleware),
);
