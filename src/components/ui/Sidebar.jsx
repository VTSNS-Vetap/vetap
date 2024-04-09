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
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const sidebarWidth = expanded ? 240 : 56; 

  return (
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
      <List>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Zaposleni" sx={{margin:0}} onClick={() => navigate("/zaposleni")}/>}
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Pacijenti" sx={{margin:0}} onClick={() => navigate("/pacijenti")}/>}
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Vlasnici" sx={{margin:0}} onClick={() => navigate("/vlasnici")}/>}
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Kartoni" sx={{margin:0}} onClick={() => navigate("/kartoni")}/>}
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <LocalHospitalIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Usluge" sx={{margin:0}} onClick={() => navigate("/usluge")}/>}
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Artikli" sx={{margin:0}} onClick={() => navigate("/artikli")}/>}
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Dobavljači" sx={{margin:0}} onClick={() => navigate("/dobavljaci")}/>}
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Kontakti" sx={{margin:0}} onClick={() => navigate("/kontakti")}/>}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
