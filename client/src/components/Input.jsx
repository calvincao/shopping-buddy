import React from "react";
import { Button } from "@mui/material";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const Input = (props) => {
  function addItem(){
    let input = document.querySelector('#add-ingredients').value;
    if (!input.length) return;
    props.listAdd(input);
    document.querySelector('#add-ingredients').value = null;
  }
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <InputBase
        id="add-ingredients"
        sx={{ ml: 1, flex: 1 }}
        placeholder="add ingredients to list"
        inputProps={{ 'aria-label': 'add ingredients' }}
        onKeyDown={(e) => {
          if (e.key === 'Enter'){
            e.preventDefault();
            addItem();
          }
        }}
      />
      <IconButton onClick={addItem} sx={{ p: '10px' }} aria-label="search ">
        <AddIcon />
      </IconButton>
    </Paper>
  )
}

export default Input;