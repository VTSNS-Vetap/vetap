import React ,{useState} from "react";
import { Box,Button, Typography, Modal, Fade, Backdrop, FormControl, TextField } from '@mui/material';
import { zaposleniCollectionRef } from '../../config/Firebase'
import { addDoc } from 'firebase/firestore'

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
        "SifraZaposleni": "",
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
        SifraZaposleni: ''
      });
      if (getZaposleni.current) {
        getZaposleni.current();
      }
      toggleModal();
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
            Novi zaposleni:
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ m: 0.5, width : '100%' }}>
              <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Ime"  name="Ime" value={formData.Ime} onChange={handleChange}/>
              <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Prezime"  name="Prezime" value={formData.Prezime} onChange={handleChange}/>
              <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="JMBG"  name="JMBG" value={formData.JMBG} onChange={handleChange}/>
              <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Šifra" name="SifraZaposleni" value={formData.SifraZaposleni} onChange={handleChange} />
              <Button type="submit" variant="contained" color="primary">SAČUVAJ</Button>
            </FormControl>
          </form>
        </Box>
        </Fade>
      </Modal>
    )
  };
  
  export default AddNewEmployee;
  