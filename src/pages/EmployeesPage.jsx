import React ,{useState,useEffect} from "react";
import { Box,Button,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,Paper, Pagination, Modal, Fade, Backdrop, FormControl, TextField } from '@mui/material';
import { db, zaposleniCollectionRef } from '../config/Firebase'
import { getDocs, collection, addDoc } from 'firebase/firestore'
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchBar from '../components/SearchBar';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '5px solid #1565C0',
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};
const EmployeesPage = () => {
  
  const [employees,setEmployees]=useState([]);
  const [filteredRecords, setFilteredRecords] = useState(employees);
  const [page, setPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    
    const getZaposleni = async () => {
      try{
        console.log("getZaposleni")
        const response = await getDocs(zaposleniCollectionRef);
        const filteredResponse = response.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        setEmployees(filteredResponse)
        setFilteredRecords(filteredResponse)
      }catch(error){
        console.error('getZaposleni', error)
      }
    };  
      getZaposleni(); 
    }, []);

  const edit = () => {alert('Izmena')}
  const erase = () => {alert('Brisanje')}
  const [openAddModal, setOpenAddModal] = React.useState(false);
  const add = () => setOpenAddModal(true);


  const [formData, setFormData] = useState({
    "Ime": "",
    "JMBG": "",
    "KontaktSifra": "/Kontakt/QzvocI34fTg1932fbC5m",
    "Nadredjeni": "Zaposleni/KjNdLLsLDKlIQPf4RtDS",
    "PocetakRada": "2024-04-09T00:00:00+02:00",
    "PozicijaUFirmiSifra": "/PozicijaUFirmi/19RfnXopMQ2ZZk7ZwTxX",
    "Prezime": "",
    "Sifra": "",
    "VeterinarskaStanicaSifra": "/VeterinarskaSta"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addDoc(zaposleniCollectionRef, formData);
      setFormData({
        Ime: '',
        Prezime: '',
        JMBG: '',
        Sifra: ''
      });
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };


  const handleClose = () => setOpenAddModal(false);



  const paginateRecords = () => {
    const startIndex = (page - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return filteredRecords.slice(startIndex, endIndex);
  };
  const handlePageChange = (event, value) => {
      setPage(value);
  };

  

    const handleSearch = (searchTerm) => {
      const filtered = employees.filter(employee =>
        employee.Ime.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.Prezime.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.JMBG.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecords(filtered);
    };
    
  return (
    <Box sx={{ margin: '30px'}}>            
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">
          Zaposleni
        </Typography>      
        <SearchBar onSearch={handleSearch} />
        </Box>        
        <Button variant="contained" color="primary" sx={{marginLeft:'10px;'}} onClick={add}>
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
            {paginateRecords().map((employee,index) => (
              <TableRow key={index}>
                <TableCell sx={{ padding: '1px 14px' }}>{(page - 1) * recordsPerPage + index + 1}.</TableCell>
                <TableCell sx={{ padding: '1px 14px' }}>{employee.Ime}</TableCell>
                <TableCell sx={{ padding: '1px 14px' }}>{employee.Prezime}</TableCell>
                <TableCell sx={{ padding: '1px 14px' }}>{employee.JMBG}</TableCell>
                <TableCell sx={{ padding: '1px 14px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button sx={{ m: 0.5 }} variant="contained" color="inherit" onClick={edit} title="Prikaži">                      
                      <VisibilityIcon/>
                    </Button>
                    <Button sx={{ m: 0.5 }} variant="contained" color="warning" onClick={edit} title="Izmeni">
                      <EditIcon/>
                    </Button>
                    <Button sx={{ m: 0.5 }} variant="contained" color="error" onClick={erase} title="Obriši">
                      <DeleteIcon/>
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
              ))}           
            
          </TableBody>
        </Table>
      </TableContainer> 
      <Pagination sx={{ m: 1 }}
        count={Math.ceil(filteredRecords.length / recordsPerPage)}
        page={page}
        onChange={handlePageChange}
      />
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openAddModal}>
          <Box sx={styleModal}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Novi zaposleni:
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl sx={{ m: 0.5, width : '100%' }}>
                <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Ime"  name="Ime" value={formData.Ime} onChange={handleChange}/>
                <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Prezime"  name="Prezime" value={formData.Prezime} onChange={handleChange}/>
                <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="JMBG"  name="JMBG" value={formData.JMBG} onChange={handleChange}/>
                <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Šifra" name="Sifra" value={formData.Sifra} onChange={handleChange} />
                <Button type="submit" variant="contained" color="primary">SAČUVAJ</Button>
              </FormControl>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Box>
    
  )
};

export default EmployeesPage;
