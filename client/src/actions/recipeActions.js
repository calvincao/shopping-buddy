import * as types from './constants.js';
import axios from 'axios';

export const fetchRecipesRequest = () => ({
  type: types.FETCH_RECIPES_REQUEST,
});

export const fetchRecipesSuccess = (users) => ({
  type: types.FETCH_RECIPES_SUCCESS,
  payload: users,
});

export const fetchRecipesFailure = (error) => ({
  type: types.FETCH_RECIPES_FAILURE,
  payload: error,
});

export const fetchRecipes = (ingredients) => {
  return (dispatch) => {
    dispatch(fetchRecipesRequest());
    axios
      .post('http://localhost:8080/recipes', {
        ingredients: ingredients,
      })
      .then((res) => {
        const recipes = res.data.recipes;
        dispatch(fetchRecipesSuccess(recipes));
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(fetchRecipesFailure(errMsg));
      });
  };
};
