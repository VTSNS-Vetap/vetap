import React ,{useEffect, useState} from "react";
import { Box,Button,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,Paper } from '@mui/material';

const OwnerPage = () => {
  const [owners,setOwner]=useState();


    useEffect(() => {
      setOwner([        
        {
          id:1,
          name:"Milan",
          surname:"Test",
          jmbg:"1212122222"
        },
        {
          id:2,
          name:"Ivan",
          surname:"Test",
          jmbg:"12121212123"
        },
        {
          id:3,
          name:"Boško",
          surname:"Test",
          jmbg:"12121212123"
        },
        {
          id:4,
          name:"Nebojša",
          surname:"Test",
          jmbg:"12121212123"
        }
        ])
    }, [])
    
  const add = () => {alert('Dodavanje vlasnika')}
  const edit = () => {alert('Izmena vlasnika')}
  const erase = () => {alert('Brisanje vlasnika')}
  return (
    <Box sx={{ margin: '30px'}}>            
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">
          Vlasnici
        </Typography>      
        <Button variant="contained" color="primary" sx={{margin:'10px;'}} onClick={add}>
          Dodaj
        </Button>
      </Box>
      <hr></hr>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Redni broj</TableCell>
              <TableCell>Ime</TableCell>
              <TableCell>Prezime</TableCell>
              <TableCell>Jmbg</TableCell>
              <TableCell style={{ width: '180px' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {owners && owners.map((owner,index) => (
              <TableRow key={owner.id}>
                <TableCell>{index+1}.</TableCell>
                <TableCell>{owner.name}</TableCell>
                <TableCell>{owner.surname}</TableCell>
                <TableCell>{owner.jmbg}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" color="warning" onClick={edit}>
                      Izmeni
                    </Button>
                    <Button variant="contained" color="error" onClick={erase}>
                      Obriši
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> 
    </Box>
  )
};

export default OwnerPage;
