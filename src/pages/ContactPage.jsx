import React ,{useState,useEffect, useRef} from "react";
import { Box,Button,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography,Paper, Pagination} from '@mui/material';
import { contactCollectionRef  } from '../config/Firebase'
import { getDocs, doc, deleteDoc } from 'firebase/firestore'
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchBar from '../components/SearchBar';
import AddNewContact from "../components/contacts/AddNewContact";
import ShowContact from "../components/contacts/ShowContact";
import EditContact from "../components/contacts/EditContact";

const ContactPage = () => {
  const [contacts,setContacts]=useState([]);
  const [filteredRecords, setFilteredRecords] = useState(contacts);
  const [page, setPage] = useState(1);
  const [modalAddNewOpen, setAddNewModalOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [modalShowOpen, setModalShowOpen] = useState(false);
  const [contactId, setEmpId] = useState();
  const recordsPerPage = 10;
  const getContactsRef = useRef(null);

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

  const paginateRecords = () => {
    const startIndex = (page - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return filteredRecords.slice(startIndex, endIndex);
  };
  const handlePageChange = (event, value) => {
      setPage(value);
  };
  const handleSearch = (searchTerm) => {
    const filtered = contacts.filter(contact =>
      contact.Naziv.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
    setFilteredRecords(filtered);
  };
  useEffect(() => {
    const getContacts = async () => {
      try{
        const response = await getDocs(contactCollectionRef);
        const filteredResponse = response.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        setContacts(filteredResponse)
        setFilteredRecords(filteredResponse)
      }catch(error){
        console.error('getContacts', error)
      }
    };  
    getContactsRef.current = getContacts;
    getContacts(); 
  }, []);

  const deleteContact = async(id) => { try {
    const docRef = doc(contactCollectionRef, id);
    await deleteDoc(docRef);
    alert("Kontakt je uspešno obrisan!");
    getContactsRef.current(); 
  } catch (error) {
    console.error("Greška prilikom brisanja dokumenta:", error);
  }}

  return (
    <Box sx={{ margin: '30px'}}>            
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">
          Kontakti
        </Typography>      
        <SearchBar onSearch={handleSearch} />
        </Box>        
        <Button variant="contained" color="primary" sx={{marginLeft:'10px;'}} onClick={toggleAddNewModal}>
          Dodaj
        </Button>
      </Box>
      <hr></hr>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Redni broj</TableCell>
              <TableCell>Naziv</TableCell>
              <TableCell>Šifra</TableCell>
              <TableCell>Kontakt</TableCell>
              <TableCell style={{ width: '180px' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>          
            {paginateRecords().map((contact,index) => (
              <TableRow key={index}>
                <TableCell sx={{ padding: '1px 14px' }}>{(page - 1) * recordsPerPage + index + 1}.</TableCell>
                <TableCell sx={{ padding: '1px 14px' }}>{contact.Naziv}</TableCell>
                <TableCell sx={{ padding: '1px 14px' }}>{contact.Sifta}</TableCell>
                <TableCell sx={{ padding: '1px 14px' }}>{contact.Vrednost}</TableCell>
                <TableCell sx={{ padding: '1px 14px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button sx={{ m: 0.5 }} variant="contained" color="inherit" onClick={() => toggleShowModal(contact.id)}  title="Prikaži">                      
                      <VisibilityIcon/>
                    </Button>
                    <Button sx={{ m: 0.5 }} variant="contained" color="warning" onClick={() => toggleEditModal(contact.id)} title="Izmeni">
                      <EditIcon/>
                    </Button>
                    <Button sx={{ m: 0.5 }} variant="contained" color="error" onClick={() => deleteContact(contact.id)} title="Obriši">
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
      <AddNewContact isOpen={modalAddNewOpen} toggleModal={toggleAddNewModal} getContact={getContactsRef}/>
      <EditContact isOpen={modalEditOpen} toggleModal={toggleEditModal} contactId = {contactId} getContact={getContactsRef}/> 
      <ShowContact isOpen={modalShowOpen} toggleModal={toggleShowModal} contactId = {contactId}/>
    </Box>
  )
};

export default ContactPage;
