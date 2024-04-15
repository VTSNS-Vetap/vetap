import React ,{useState,useEffect} from "react";
import { Box,Button, Typography, Modal, Fade, Backdrop, FormControl, TextField } from '@mui/material';
import { zaposleniCollectionRef } from '../../config/Firebase'
import {  doc, getDoc, setDoc } from 'firebase/firestore'

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

const EditEmployee = ({ isOpen, toggleModal, empId, getZaposleni }) => {
    const [docData, setDocData] = useState({
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
    
    useEffect(() => {
        if (empId) { 
        const fetchData = async () => {
          try {
            const docRef = doc(zaposleniCollectionRef, empId)
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log(docSnap.data());
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
      }, [empId]);
    
    const handleChange = (e) => {
        setDocData({
        ...docData,
        [e.target.name]: e.target.value
        });
    };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const docRef = doc(zaposleniCollectionRef, empId)
        await setDoc(docRef, docData);
        alert("Dokument uspešno ažuriran!");
        setDocData({
            Ime: '',
            Prezime: '',
            JMBG: '',
            SifraZaposleni: ''
        });
        if (getZaposleni.current) {
            getZaposleni.current();
        }
        toggleModal(empId);
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
                <FormControl sx={{ m: 0.5, width : '100%' }}>
                <Typography id="transition-modal-title">Ime:</Typography>
                <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Ime"  name="Ime" value={docData.Ime} onChange={handleChange}/>
                <Typography id="transition-modal-title">Prezime:</Typography>
                <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Prezime"  name="Prezime" value={docData.Prezime} onChange={handleChange}/>
                <Typography id="transition-modal-title">JMBG:</Typography>
                <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="JMBG"  name="JMBG" value={docData.JMBG} onChange={handleChange}/>
                <Typography id="transition-modal-title">Sifra:</Typography>
                <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Šifra" name="SifraZaposleni" value={docData.SifraZaposleni} onChange={handleChange} />
                <Button type="submit" variant="contained" color="primary">SAČUVAJ</Button>
                </FormControl>
            </form>
              )}
            </Box>
        </Fade>
      </Modal>
    )
  };
  
  export default EditEmployee;
  