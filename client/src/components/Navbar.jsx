import React from "react";
import { Link } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from "@mui/material";
import './Navbar.css'

const Navbar = (props) => {
  return (
    <AppBar
    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    position='sticky'
    className="navbar"
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Shopping Buddy
        </Typography>
        <Link to='/' style={{textDecoration: "none", color: "white"}}><Button color="inherit">Home</Button></Link>
        <Link to='dashboard' style={{textDecoration: "none", color: "white"}}><Button color="inherit">Dashboard</Button></Link>
        <Link to='login' style={{textDecoration: "none", color: "white"}}><Button color="inherit">Login</Button></Link>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;