import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import GroupIcon from '@mui/icons-material/Group';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { Box } from '@mui/material';
import { useNavigate } from "react-router-dom";


const Sidebar = () => {

  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const sidebarWidth = expanded ? 240 : 56; 

  return (
    <Box >
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          transition: 'width 0.3s', 
          marginTop: '70px'
        },
      }}
    >
       <MenuIcon color="inherit"
            onClick={toggleSidebar}
            fontSize='large'
            sx={{alignSelf: "center",  color: "rgba(0, 0, 0, 0.54)",
            ...(expanded && { display: 'none' }),}}/>
      <MenuOpenIcon color="inherit"
            fontSize='large'
            onClick={toggleSidebar}
            sx={{alignSelf: "center",  color: "rgba(0, 0, 0, 0.54)",
            ...(!expanded && { display: 'none' }),}}/>
      <List>
        <ListItem button onClick={() => navigate("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Početna" sx={{margin:0}} />}
        </ListItem>
        <ListItem button onClick={() => navigate("/zaposleni")}>
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Zaposleni" sx={{margin:0}} />}
        </ListItem>
        <ListItem button onClick={() => navigate("/pacijenti")}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Pacijenti" sx={{margin:0}} />}
        </ListItem>
        <ListItem button onClick={() => navigate("/vlasnici")}>
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Vlasnici" sx={{margin:0}} />}
        </ListItem>
        <ListItem button onClick={() => navigate("/kartoni")}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Kartoni" sx={{margin:0}} />}
        </ListItem>
        <ListItem button onClick={() => navigate("/usluge")}>
          <ListItemIcon>
            <LocalHospitalIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Usluge" sx={{margin:0}} />}
        </ListItem>
        <ListItem button onClick={() => navigate("/artikli")}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Artikli" sx={{margin:0}} />}
        </ListItem>
        <ListItem button onClick={() => navigate("/dobavljaci")}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Dobavljači" sx={{margin:0}} />}
        </ListItem>
        <ListItem button onClick={() => navigate("/kontakti")}>
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Kontakti" sx={{margin:0}} />}
        </ListItem>
      </List>
    </Drawer>
  
    </Box>
  );
};

export default Sidebar;
