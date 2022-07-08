import React from 'react';
import Input from '../components/Input';
import GroceryList from '../components/GroceryList';
import { connect } from 'react-redux';
import * as groceryActions from '../actions/groceryActions'
import * as recipeActions from '../actions/recipeActions'
import { Button } from '@mui/material';

const mapStateToProps = state => ({
  groceryList: state.grocery.list,
})

const mapDispatchToProps = dispatch => ({
  listAdd: (ingredient) => dispatch(groceryActions.listAdd(ingredient)),
  listRemove: (ID) => dispatch(groceryActions.listRemove(ID)),
  toggleDone: (ID) => dispatch(groceryActions.toggleDone(ID)),
  fetchRecipes: (ingredients) => dispatch(recipeActions.fetchRecipes(ingredients))
})

function DrawerSection(props){
  const getRecipes = () => {
    const ingredients = props.groceryList.map(element => element.name);
    props.fetchRecipes(ingredients);
  }
  return(
    <div className="side-container">
      <Input listAdd={props.listAdd} />
        <GroceryList
          groceryList={props.groceryList}
          toggleDone={props.toggleDone}
          listRemove={props.listRemove}
        />
      <div className="button-group">
        <Button variant="contained" className="save-list btn" onClick={getRecipes}>Save List</Button>
        <Button variant="contained" className="get-recipes btn" onClick={getRecipes}>Get Recipes</Button>
      </div>
    </div>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(DrawerSection);