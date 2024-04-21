import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WorkIcon from '@mui/icons-material/Work';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PetsIcon from '@mui/icons-material/Pets'
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
        <ListItem name="sideBarHomePage" button onClick={() => navigate("/")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Početna" sx={{margin:0}} />}
        </ListItem>
        <ListItem  name="sideBarEmployees" button onClick={() => navigate("/zaposleni")}>
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Zaposleni" sx={{margin:0}} />}
        </ListItem>
        <ListItem name="sideBarPatients"  button onClick={() => navigate("/pacijenti")}>
          <ListItemIcon>
            <PetsIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Pacijenti" sx={{margin:0}} />}
        </ListItem>
        <ListItem name="sideBarOwners" button onClick={() => navigate("/vlasnici")}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Vlasnici" sx={{margin:0}} />}
        </ListItem>
        <ListItem name="sideBarPatientRecords" button onClick={() => navigate("/kartoni")}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Kartoni" sx={{margin:0}} />}
        </ListItem>
        <ListItem name="sideBarServices" button onClick={() => navigate("/usluge")}>
          <ListItemIcon>
            <LocalHospitalIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Usluge" sx={{margin:0}} />}
        </ListItem>
        <ListItem name="sideBarArticles" button onClick={() => navigate("/artikli")}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Artikli" sx={{margin:0}} />}
        </ListItem>
        <ListItem name="sideBarSuppliers" button onClick={() => navigate("/dobavljaci")}>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Dobavljači" sx={{margin:0}} />}
        </ListItem>
        <ListItem name="sideBarContacts" button onClick={() => navigate("/kontakti")}>
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
