import React from 'react';
import { Typography } from '@mui/material'; 



const UnauthorizedPage = () => {


  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80vh',
    }}>
      <Typography variant="h4">
        Neautorizovan pristup
      </Typography>
      <Typography variant="body1" >
        Nemaš dozvoljen pristup ovoj stranici
      </Typography>
    </div>
  );
};

export default UnauthorizedPage;
