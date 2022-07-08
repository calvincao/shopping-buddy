import React from "react";
import { ListItem } from "@mui/material";
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';


const GroceryList = ({groceryList, toggleDone, listRemove}) => {
  function removeItem(e){
    let target = e.target;
    while (target.dataset.itemId === undefined){
      target = target.parentElement;
    }
    const targetID = target.dataset.itemId;
    listRemove(targetID);
  }
  function toggleItem(e){
    let target = e.target;
    while (target.dataset.itemId === undefined){
      target = target.parentElement;
    }
    const targetID = target.dataset.itemId;
    toggleDone(targetID);
  }

  const ingredientsList = [];
  for (let i = 0; i < groceryList.length; i++){
    ingredientsList.push(
      <ListItem key={i} data-item-id={groceryList[i].ID} onClick={toggleItem}>
        <ListItemButton >
          <ListItemText className={groceryList[i].done ? 'done' : null}>{groceryList[i].name}</ListItemText>
          <IconButton onClick={removeItem}><DeleteOutlineIcon/></IconButton>
        </ListItemButton>
      </ListItem>
    )
  }
  return (
    <div className="grocery-list">
      <List item xs={6}>
        {ingredientsList}
      </List>
    </div>
  )
}

export default GroceryList;