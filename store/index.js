import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { petsReducer } from './petsReducer';
import { usersReducer } from './usersReducer';
import { medicinesReducer } from './medicinesReducer';

const middleware = [
  thunk
]

const rootReducer = combineReducers({
  usersReducer,
  petsReducer,
  medicinesReducer,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(...middleware),
);
