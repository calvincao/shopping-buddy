import * as types from '../actions/constants.js';

const initialState = {
  list: [
    {
      id: 643829,
      title: 'Fried Wonton',
      image: 'https://spoonacular.com/recipeImages/643829-312x231.jpg',
      imageType: 'jpg',
      usedIngredientCount: 2,
      missedIngredientCount: 2,
      missedIngredients: [
        {
          id: 11590,
          amount: 2,
          unit: 'cups',
          unitLong: 'cups',
          unitShort: 'cup',
          aisle: 'Canned and Jarred;Ethnic Foods',
          name: 'water chestnuts',
          original: '2 cups chopped water chestnuts',
          originalName: 'chopped water chestnuts',
          meta: ['chopped'],
          image: 'https://spoonacular.com/cdn/ingredients_100x100/water-chestnuts.png',
        },
        {
          id: 10018368,
          amount: 1,
          unit: 'pkg',
          unitLong: 'package',
          unitShort: 'pkg',
          aisle: 'Ethnic Foods',
          name: 'wonton wrappers',
          original: '1 pkg. Wonton wrappers',
          originalName: 'Wonton wrappers',
          meta: [],
          image: 'https://spoonacular.com/cdn/ingredients_100x100/wonton-wrappers.jpg',
        },
      ],
      usedIngredients: [
        {
          id: 10219,
          amount: 0.5,
          unit: 'pound',
          unitLong: 'pounds',
          unitShort: 'lb',
          aisle: 'Meat',
          name: 'ground pork',
          original: '1/2 pound ground beef/pork',
          originalName: 'ground beef/pork',
          meta: [],
          image: 'https://spoonacular.com/cdn/ingredients_100x100/meat-ground.jpg',
        },
        {
          id: 11109,
          amount: 2,
          unit: 'cups',
          unitLong: 'cups',
          unitShort: 'cup',
          aisle: 'Produce',
          name: 'cabbage',
          original: '2 cups chopped cabbage',
          originalName: 'chopped cabbage',
          meta: ['chopped'],
          image: 'https://spoonacular.com/cdn/ingredients_100x100/cabbage.jpg',
        },
      ],
      unusedIngredients: [],
      likes: 1,
    },
  ],
  loading: false,
  error: null,
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_RECIPES_REQUEST: {
      return {
        ...state,
        error: null,
        loading: true,
      };
    }

    case types.FETCH_RECIPES_SUCCESS: {
      const updatedList = [...action.payload];
      return {
        ...state,
        loading: false,
        error: null,
        list: updatedList,
      };
    }

    case types.FETCH_RECIPES_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default recipeReducer;
