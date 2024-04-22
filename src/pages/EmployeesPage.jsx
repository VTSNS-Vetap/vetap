import React ,{useState,useEffect, useRef} from "react";
import { Box,Button,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,Paper, Pagination} from '@mui/material';
import { zaposleniCollectionRef  } from '../config/Firebase'
import { getDocs, doc, deleteDoc } from 'firebase/firestore'
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchBar from '../components/SearchBar';
import CustomConfirm from '../components/ui/CustomConfirm';
import AddNewEmployee from "../components/employees/AddNewEmployee";
import ShowEmployee from "../components/employees/ShowEmployee";
import EditEmployee from "../components/employees/EditEmployee";

const EmployeesPage = () => {
  const [employees,setEmployees]=useState([]);
  const [filteredRecords, setFilteredRecords] = useState(employees);
  const [modalAddNewOpen, setAddNewModalOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalShowOpen, setModalShowOpen] = useState(false);
  const [empId, setEmpId] = useState();
  const [page, setPage] = useState(1);
  const recordsPerPage = 10;
  const getZaposleniRef = useRef(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const toggleAddNewModal = () => {
    setAddNewModalOpen(!modalAddNewOpen);
  };

  const toggleEditModal = (id) => {
    setModalEditOpen(!modalEditOpen);
    setEmpId(id);
  };

  const toggleShowModal = (id) => {
    setModalShowOpen(!modalShowOpen);
    setEmpId(id);
  };

  const deleteEmp = async (id) => {
    try {
      setDeleteId(id);
      setConfirmOpen(true);
    } catch (error) {
      console.error("Greška prilikom brisanja dokumenta:", error);
    }
  };

  const handleDeleteConfirmClose = () => {
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const docRef = doc(zaposleniCollectionRef, deleteId);
      await deleteDoc(docRef);
      alert("Zaposleni je uspešno obrisan!");
      getZaposleniRef.current();
      setConfirmOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Greška prilikom brisanja dokumenta:", error);
    }
  };

  useEffect(() => {    
    const getZaposleni = async () => {
      try{
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
      getZaposleniRef.current = getZaposleni;
      getZaposleni(); 
  }, []);

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
      employee.JMBG.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.Email.toLowerCase().includes(searchTerm.toLowerCase())
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
        <SearchBar name="employeesSearchInput" onSearch={handleSearch} />
        </Box>        
        <Button name="employeesAddBtn" variant="contained" color="primary" sx={{marginLeft:'10px;'}} onClick={toggleAddNewModal}>
          Dodaj
        </Button>
      </Box>
      <hr></hr>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Redni broj</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Ime</TableCell>
              <TableCell>Prezime</TableCell>
              <TableCell style={{ width: '180px' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>          
            {paginateRecords().map((employee,index) => (
              <TableRow id={employee.id} key={index}>
                <TableCell sx={{ padding: '1px 14px' }}>{(page - 1) * recordsPerPage + index + 1}.</TableCell>
                <TableCell sx={{ padding: '1px 14px' }}>{employee.Email}</TableCell>
                <TableCell sx={{ padding: '1px 14px' }}>{employee.Ime}</TableCell>
                <TableCell sx={{ padding: '1px 14px' }}>{employee.Prezime}</TableCell>
                <TableCell sx={{ padding: '1px 14px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button sx={{ m: 0.5 }} variant="contained" color="inherit" onClick={() => toggleShowModal(employee.id)}  title="Prikaži">                      
                      <VisibilityIcon/>
                    </Button>
                    <Button sx={{ m: 0.5 }} variant="contained" color="warning" onClick={() => toggleEditModal(employee.id)} title="Izmeni">
                      <EditIcon/>
                    </Button>
                    <Button name="employeesRemoveBtn"  sx={{ m: 0.5 }} variant="contained" color="error" onClick={() => deleteEmp(employee.id)} title="Obriši">
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
      <CustomConfirm open={confirmOpen}
        onClose={handleDeleteConfirmClose}
        onConfirm={handleDeleteConfirmed}
        title="Potvrda"
        message="Da li ste sigurni da želite da obrišete zaposlenog?"
        name="ConfirmModal"
      />
      <AddNewEmployee isOpen={modalAddNewOpen} toggleModal={toggleAddNewModal} getZaposleni={getZaposleniRef}/>
      <EditEmployee isOpen={modalEditOpen} toggleModal={toggleEditModal} empId = {empId} getZaposleni={getZaposleniRef}/>
      <ShowEmployee isOpen={modalShowOpen} toggleModal={toggleShowModal} empId = {empId}/>
    </Box>
    
  )
};

export default EmployeesPage;
