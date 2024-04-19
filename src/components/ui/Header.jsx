import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import PetsIcon from '@mui/icons-material/Pets';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { userService } from '../../services/user.service';

const Header = () => {
  const navigate = useNavigate();
  const user = userService.user();  

  const logoutHandler = () => {
    userService.logout();
    navigate("/prijava")
  }
  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'grey' }}> {/* Postavljanje pozadine na sivu boju */}
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => navigate("/")}>
          <PetsIcon />
          <span style={{ marginLeft: '5px' }}>VETAP</span>
        </IconButton>
        <div style={{ flexGrow: 1 }} />
        <IconButton color="inherit">
          {user && <span style={{marginRight: '5px', fontSize: '15pt'}}>{user.ime} </span>}
          <AccountCircleIcon />
        </IconButton>
        {!user && <Button color="inherit" onClick={() => navigate("/prijava")}>Prijavi se</Button>}
        {user && <Button color="inherit" onClick={logoutHandler}>Odjavi se</Button>}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
