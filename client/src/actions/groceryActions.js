import * as types from './constants.js';

export const listAdd = (ingredient) => ({
  type: types.LIST_ADD,
  payload: ingredient,
});

export const listRemove = (ID) => ({
  type: types.LIST_REMOVE,
  payload: ID,
});

export const toggleDone = (ID) => ({
  type: types.TOGGLE_DONE,
  payload: ID,
});

export const addMissing = (ingredients) => ({
  type: types.ADD_MISSING,
  payload: ingredients,
});
