import React from "react";
import RecipeCard from '../components/RecipeCard.jsx';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import * as groceryActions from '../actions/groceryActions'
import { connect } from "react-redux";

const mapStateToProps = state => ({
  recipeList: state.recipe.list,
  loading: state.recipe.loading,
  error: state.recipe.error
})

const mapDispatchToProps = dispatch => ({
  addMissing: (ingredients) => dispatch(groceryActions.addMissing(ingredients)),
})

const Recipe = (props) => {
  const list = [];
  let i = 0;
  for (const recipe of props.recipeList) {
    const missingIngredients = recipe.missedIngredients.map(ingredient => ingredient.name);
    const usedIngredients = recipe.usedIngredients.map(ingredient => ingredient.name);
    list.push(
      <RecipeCard
        title={recipe.title}
        src={recipe.image}
        usedIngredients={usedIngredients}
        missingIngredients={missingIngredients}
        addMissing={props.addMissing}
        key={i++}
      />
    )
  }
  return (
    <div className="recipe-container">
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {props.loading ? 
        <div className="loading">
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </div>
        :
        props.error ?
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">{props.error}</Alert>
        </Stack>
        :
        (
          <div className="card-container">
            {list}
          </div>
        )}
      </Box>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipe);