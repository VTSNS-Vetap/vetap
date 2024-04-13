import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import PetsIcon from '@mui/icons-material/Pets';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'grey' }}> {/* Postavljanje pozadine na sivu boju */}
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => navigate("/")}>
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
