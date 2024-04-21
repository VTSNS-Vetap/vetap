import React ,{useState,useEffect, useRef} from "react";
import { Box,Button, Typography, Modal, Fade, Backdrop, FormControl, TextField, InputLabel, MenuItem, Select, FormControlLabel, Checkbox } from '@mui/material';
import { zaposleniCollectionRef } from '../../config/Firebase'
import {  doc, getDoc, setDoc } from 'firebase/firestore'
import { Role } from "../../constants/role.constants";
import CustomConfirm from "../ui/CustomConfirm";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    bgcolor: 'background.paper',
    border: '5px solid #1565C0',
    boxShadow: 24,
    borderRadius: 5,
    p: 4,
  };

  const defaultUser = {
    "Ime": "",
    "JMBG": "",
    "KontaktSifra": "/Kontakt/QzvocI34fTg1932fbC5m",
    "Nadredjeni": "Zaposleni/KjNdLLsLDKlIQPf4RtDS",
    "PocetakRada": "2024-04-09T00:00:00+02:00",
    "PozicijaUFirmiSifra": "/PozicijaUFirmi/19RfnXopMQ2ZZk7ZwTxX",
    "Prezime": "",
    "Email" :"",
    "VeterinarskaStanicaSifra": "/VeterinarskaSta",
    "Password" : "1234",
    "PasswordReset": true,
    "Rola" : Role.User,
    "Adresa":"",
    "Telefon":""
    }

const EditEmployee = ({ isOpen, toggleModal, empId, getZaposleni }) => {
    const [docData, setDocData] = useState(defaultUser);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date(docData.PocetakRada));

    const datePickerRef = useRef(null);
    const handleClick = () => {
      if (datePickerRef.current) {
          datePickerRef.current.setOpen(true); 
      }
    };
    const handleDateChange = (date) => {
      setSelectedDate(date);
        setDocData({
          ...docData,
          PocetakRada: date
          });
    };
    useEffect(() => {
        if (empId && isOpen) { 
        const fetchData = async () => {
          try {
            const docRef = doc(zaposleniCollectionRef, empId)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setDocData(docSnap.data());
              } else {
                console.log('Nema takvog dokumenta!');
              }
          } catch (error) {
            console.error('Greška pri dohvaćanju dokumenta:', error);
          } 
        };
    
        fetchData();
        }
      }, [empId,isOpen]);
    
    const handleChange = (e) => {
        setDocData({
        ...docData,
        [e.target.name]: e.target.value
        });
    };
    const handleConfirmClose = () => {
      setConfirmOpen(false);
    };
    
    const handleSubmit = (event) => {
      event.preventDefault();
      setConfirmOpen(true);
    };
    
    const handleConfirmed = async () => {  
      try {
        if (docData.Email && docData.Ime){
          const docRef = doc(zaposleniCollectionRef, empId)
          await setDoc(docRef, docData);        
          toggleModal(empId);
          if (getZaposleni.current) {
            getZaposleni.current();
          }
          setDocData(defaultUser);   
          setConfirmOpen(false);
        }
      } catch (error) {
        console.error('Error writing document: ', error);
      }
    };

    return (
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={toggleModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
            <Box sx={styleModal}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
                Izmeni podatke o zaposlenom:
            </Typography>
            <hr></hr>
            {docData && (
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', width: '100%' }}>
              <Box sx={{ p:1 }}>
                <FormControl sx={{ m: 1, width : '100%' }}>
                  <InputLabel id="rola-simple-select-label">Rola</InputLabel>
                  <Select
                    labelId="rola-simple-select-label"
                    value={docData.Rola}
                    label="Rola"
                    onChange={handleChange}
                    name={"Rola"}
                    sx={{ marginBottom: '5px' }}
                  >
                    <MenuItem value={Role.User}>Korisnik</MenuItem>
                    <MenuItem value={Role.Admin}>Administrator</MenuItem>
                  </Select>
                </FormControl>
               
                <FormControl sx={{ m: 1, width : '100%' }}>
                  <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' label="Ime" name="Ime" value={docData.Ime} onChange={handleChange}/>
                </FormControl>
                <FormControl sx={{ m: 1, width : '100%' }}>
                  <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' label="Adresa"  name="Adresa" value={docData.Adresa} onChange={handleChange}/>
                </FormControl>
                <FormControl sx={{ m: 1, width : '100%' }}>
                  <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' label="Telefon"  name="Telefon" value={docData.Telefon} onChange={handleChange}/>
                </FormControl>
              </Box>
              <Box sx={{ p:1 }}>
                <FormControl sx={{ m: 1, width : '100%' }}>
                  <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' label="Email" name="Email" value={docData.Email} onChange={handleChange} />
                </FormControl>
                <FormControl sx={{ m: 1, width : '100%' }}>
                  <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' label="Prezime"   name="Prezime" value={docData.Prezime} onChange={handleChange}/>
                </FormControl>
                <FormControl sx={{ m: 1, width : '100%' }}>
                  <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' label="JMBG"  name="JMBG" value={docData.JMBG} onChange={handleChange}/>
                </FormControl>
                <FormControl sx={{ m: 1, width : '100%',position: 'relative' }}>       
                <TextField
                    label="Datum početka rada"
                    name="PocetakRada"
                    value={selectedDate ? selectedDate.toLocaleDateString('sr-RS') : ''}
                    InputProps={{ readOnly: true }}
                    onClick={handleClick}
                    onChange={handleChange}
                    style={{ position: 'absolute', width:'100%', zIndex:100,left: 0 }}
                />           
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="Select Date"
                    ref={datePickerRef}
                    customInput={<></>}
                />             
              </FormControl>  
              </Box>
            </Box>
              <FormControlLabel
                    label="Zahtev za reset lozinke"
                    control={
                      <Checkbox
                        name="PasswordReset"
                        onChange={handleChange}
                      />
                    }
                    />
              <Button type="submit" variant="contained" color="primary" sx={{width:'100%'}}>SAČUVAJ</Button>
                
            </form>
              )}
              <CustomConfirm open={confirmOpen}
              onClose={handleConfirmClose}
              onConfirm={handleConfirmed}
              title="Potvrda"
              message="Da li ste sigurni da želite da sačuvate izmene?"
            />
            </Box>
            
        </Fade>
        
      </Modal>
    )
  };
  
  export default EditEmployee;
  