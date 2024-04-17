import React ,{useState} from "react";
import { Box,Button, Typography, Modal, Fade, Backdrop, FormControl, TextField, InputLabel, Select, MenuItem } from '@mui/material';
import { zaposleniCollectionRef } from '../../config/Firebase'
import { addDoc } from 'firebase/firestore'
import { Role } from "../../constants/role.constants";

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

const AddNewEmployee = ({ isOpen, toggleModal, getZaposleni }) => {

    const [formData, setFormData] = useState({
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
        "Rola" : Role.User
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
      });
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
          <Typography id="transition-modal-title" variant="h6" component="h2" sx={{mb: 2}}>
            Novi zaposleni:
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ m: 1, width : '100%' }}>
              <InputLabel id="rola-simple-select-label">Rola</InputLabel>
              <Select
                labelId="rola-simple-select-label"
                value={formData.Rola}
                label="Rola"
                onChange={handleChange}
                name={"Rola"}
                sx={{ marginBottom: '5px' }}
              >
                <MenuItem value={'user'}>Korisnik</MenuItem>
                <MenuItem value={'admin'}>Administrator</MenuItem>
              </Select>
              <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Email" name="Email" value={formData.Email} onChange={handleChange} />
              <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Ime"  name="Ime" value={formData.Ime} onChange={handleChange}/>
              <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Prezime"  name="Prezime" value={formData.Prezime} onChange={handleChange}/>
              <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="JMBG"  name="JMBG" value={formData.JMBG} onChange={handleChange}/>
              
              
              <Button type="submit" variant="contained" color="primary">SAČUVAJ</Button>
            </FormControl>

          </form>
        </Box>
        </Fade>
      </Modal>
    )
  };
  
  export default AddNewEmployee;
  