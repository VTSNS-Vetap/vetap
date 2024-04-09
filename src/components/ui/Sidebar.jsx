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

const Sidebar = () => {
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
          {expanded && <ListItemText primary="Zaposleni" />}
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Pacijenti" />}
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <StoreIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Vlasnici" />}
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Kartoni" />}
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <LocalHospitalIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Usluge" />}
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Artikli" />}
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Dobavljači" />}
        </ListItem>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <PhoneIcon />
          </ListItemIcon>
          {expanded && <ListItemText primary="Kontakti" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
