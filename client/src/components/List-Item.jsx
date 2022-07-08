import React from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ListItem = (props) => {
  function removeItem(e){
    const targetID = e.target.parentElement.parentElement.id;
    props.listRemove(targetID);
  }
  function toggleItem(e){
    const targetID = e.target.id;
    props.toggleDone(targetID);
  }
  const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
  width: 400
}));
  return (
    <Box
      sx={{p: 1, display: "grid", gap: 2}}
    >
      <Item elevation={3} onClick={toggleItem} id={props.ID}>
        {props.done?<s>{props.name}</s>:<>{props.name}</>}
        <IconButton  aria-label="delete" onClick={removeItem}>
          <DeleteOutlineIcon/>
        </IconButton>
      </Item>
    </Box>
  )
}

export default ListItem;