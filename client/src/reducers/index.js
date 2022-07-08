import { combineReducers } from 'redux';

import groceryReducer from './groceryReducer.js';
import recipeReducer from './recipeReducer.js';
import userReducer from './userReducer.js';

const reducers = combineReducers({
  grocery: groceryReducer,
  recipe: recipeReducer,
  user: userReducer,
});

export default reducers;
