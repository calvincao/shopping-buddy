import * as types from '../actions/constants.js';

const initialState = {
  loggedIn: false,
  username: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default userReducer;
