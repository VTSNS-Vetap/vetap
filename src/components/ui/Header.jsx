import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import PetsIcon from '@mui/icons-material/Pets';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <PetsIcon />
          <span style={{ marginLeft: '5px' }}>VETAP</span>
        </IconButton>
        <div style={{ flexGrow: 1 }} />
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
        <Button color="inherit">Prijavi se</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;


