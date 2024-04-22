import React ,{useState, useRef} from "react";
import { Box,Button, Typography, Modal, Fade, Backdrop, FormControl, TextField, InputLabel, Select, MenuItem } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { zaposleniCollectionRef } from '../../config/Firebase'
import { addDoc } from 'firebase/firestore'
import { Role } from "../../constants/role.constants";

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

const AddNewEmployee = ({ isOpen, toggleModal, getZaposleni }) => {
      const [selectedDate, setSelectedDate] = useState(null);

      const handleDateChange = (date) => {
          setSelectedDate(date);
          setFormData({
            ...formData,
            PocetakRada: date
            });
      };
    const [formData, setFormData] = useState({
        "Ime": "",
        "JMBG": "",
        "KontaktSifra": "/Kontakt/QzvocI34fTg1932fbC5m",
        "Nadredjeni": "Zaposleni/KjNdLLsLDKlIQPf4RtDS",
        "PocetakRada": "",
        "PozicijaUFirmiSifra": "/PozicijaUFirmi/19RfnXopMQ2ZZk7ZwTxX",
        "Prezime": "",
        "Email" :"",
        "VeterinarskaStanicaSifra": "/VeterinarskaSta",
        "Password" : "1234",
        "PasswordReset": true,
        "Rola" : Role.User,
        "Telefon": ''
      });
      
    const handleChange = (e) => {
      console.log(formData)
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
        
    };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      if (formData.Email && formData.Ime){
        await addDoc(zaposleniCollectionRef, formData);
        
        if (getZaposleni.current) {
          getZaposleni.current();
        }
        toggleModal();
        
      }  
      setFormData({
        Ime: '',
        Prezime: '',
        JMBG: '',
        Email: '',
        Rola: Role.User,
        Telefon: '',
        PocetakRada: ''
      });
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };
  const datePickerRef = useRef(null);
  const handleClick = () => {
    if (datePickerRef.current) {
        datePickerRef.current.setOpen(true); 
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
          <Typography id="transition-modal-title" variant="h6" component="h2" sx={{mb: 2}}>
            Novi zaposleni:
          </Typography>
          <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', width: '100%' }}>
            <Box sx={{ p:1 }}>
              <FormControl sx={{ m: 1, width : '100%' }}>
                <InputLabel id="rola-simple-select-label">Rola</InputLabel>
                <Select
                  labelId="rola-simple-select-label"
                  value={formData.Rola}
                  label="Rola"
                  onChange={handleChange}
                  name={"Rola"}
                >
                  <MenuItem value={'user'}>Korisnik</MenuItem>
                  <MenuItem value={'admin'}>Administrator</MenuItem>
                </Select>
              </FormControl>            
              <FormControl sx={{ m: 1, width : '100%' }}>
                <InputLabel id="Ime"></InputLabel>
                <TextField labelId="Ime" label="Ime" type="text" color='primary' name="Ime" value={formData.Ime} onChange={handleChange} required/>
              </FormControl>    
              <FormControl sx={{ m: 1, width : '100%' }}>
                <InputLabel id="Telefon"></InputLabel>
                <TextField labelId="Telefon" label="Telefon" type="text" color='primary' name="Telefon" value={formData.Telefon} onChange={handleChange} required/>
              </FormControl>          
              <FormControl sx={{ m: 1, width : '100%' }}>
                <InputLabel id="Adresa"></InputLabel>
                <TextField labelId="Adresa" label="Adresa" type="text" color='primary' name="Adresa" value={formData.Adresa} onChange={handleChange} required/>
              </FormControl> 
            </Box>
            <Box sx={{ p:1 }}>
              <FormControl sx={{ m: 1, width : '100%' }}>
                <InputLabel id="email"></InputLabel>
                <TextField labelId="email"  label="Email" InputProps={{type: 'email'}} color='primary'  name="Email" value={formData.Email} onChange={handleChange} required/>
              </FormControl>
              <FormControl sx={{ m: 1, width : '100%' }}>  
                <InputLabel id="Prezime"></InputLabel>
                <TextField labelId="Prezime" label="Prezime" type="text" color='primary' placeholder="Prezime"  name="Prezime" value={formData.Prezime} onChange={handleChange} required/>
              </FormControl>
              <FormControl sx={{ m: 1, width : '100%' }}>
                <InputLabel id="JMBG"></InputLabel>
                <TextField labelId="JMBG" label="JMBG" type="text" color='primary' placeholder="JMBG"  name="JMBG" value={formData.JMBG} onChange={handleChange} inputProps={{ maxLength: 13, minLength: 13 }} required/>
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
            <FormControl sx={{ m: 1, width : '100%' }}>
              <Button name="employeesAddBtnSubmit" type="submit" variant="contained" color="primary">SAČUVAJ</Button>
            </FormControl>
          </form>
        </Box>
        </Fade>
      </Modal>
    )
  };
  
  export default AddNewEmployee;
  