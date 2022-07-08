import * as types from '../actions/constants.js';

const initialState = {
  title: 'My shopping lista',
  list: [
    { name: 'ground pork', done: false, ID: 999 },
    { name: 'cabbage', done: false, ID: 998 },
  ],
  lastID: 0,
};

const groceryReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_ADD: {
      console.log(state);
      const updatedList = [...state.list, { name: action.payload, done: false, ID: state.lastID }];
      return {
        ...state,
        lastID: state.lastID + 1,
        list: updatedList,
      };
    }

    case types.LIST_REMOVE: {
      const updatedList = state.list.filter((item) => item.ID !== Number(action.payload));
      return {
        ...state,
        list: updatedList,
      };
    }

    case types.TOGGLE_DONE: {
      const updatedList = state.list.map((item) => {
        if (item.ID === Number(action.payload))
          return {
            ...item,
            done: !item.done,
          };
        else return item;
      });
      return {
        ...state,
        list: updatedList,
      };
    }

    case types.ADD_MISSING: {
      const oldItems = [...state.list];
      let lastID = state.lastID;
      const newItems = action.payload.map((item) => ({
        name: item,
        done: false,
        ID: lastID++,
      }));
      return {
        ...state,
        list: oldItems.concat(newItems),
        lastID: lastID,
      };
    }

    default: {
      return state;
    }
  }
};

export default groceryReducer;
