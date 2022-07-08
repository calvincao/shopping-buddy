const axios = require('axios');
const recipeController = {};
require('dotenv').config();

const API_KEY = process.env.SPOONACULAR_API_KEY;
const NUM_RECIPES = 10;

recipeController.getRecipes = async (req, res, next) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(750);
  const ingredientsList = req.body.ingredients.join(',');
  let queryURL = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&number=${NUM_RECIPES}&ingredients=${ingredientsList}`;
  try {
    const response = await axios.get(queryURL);
    const data = response.data;
    res.locals.recipes = data;
    next();
  } catch (err) {
    return next({
      log: 'Express error caught in recipeController.getRecipes middleware',
      status: 500,
      message: { err: 'Express error caught in recipeController.getRecipes middleware' },
    });
  }
};

module.exports = recipeController;
