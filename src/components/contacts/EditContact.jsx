import React ,{useState,useEffect} from "react";
import { Box,Button, Typography, Modal, Fade, Backdrop, FormControl, TextField } from '@mui/material';
import { contactCollectionRef } from '../../config/Firebase'
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

const EditContact = ({ isOpen, toggleModal, contactId, getContact }) => {
    const [docData, setDocData] = useState({
        "VlasnikFKs": [""],
        "Tip": "",
        "Vrednost": "",
        "ZaposleniFKs": [""],
        "DobavljacFKs": [""],
        "Naziv": "",
        "Sifta": ""
      });
    
    useEffect(() => {
        if (contactId && isOpen) { 
        const fetchData = async () => {
          try {
            const docRef = doc(contactCollectionRef, contactId)
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
      }, [contactId, isOpen]);
    
    const handleChange = (e) => {
        setDocData({
        ...docData,
        [e.target.name]: e.target.value
        });
    };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const docRef = doc(contactCollectionRef, contactId)
        await setDoc(docRef, docData);
        alert("Dokument uspešno ažuriran!");
        setDocData({
            "VlasnikFKs": [""],
            "Tip": "",
            "Vrednost": "",
            "ZaposleniFKs": [""],
            "DobavljacFKs": [""],
            "Naziv": "",
            "Sifta": ""
            });
        if (getContact.current) {
            getContact.current();
        }
        toggleModal(contactId);
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
                Izmeni podatke o kontaktu:
            </Typography>
            <hr></hr>
            {docData && (
            <form onSubmit={handleSubmit}>
                <FormControl sx={{ m: 0.5, width : '100%' }}>
                <Typography id="transition-modal-title">Naziv:</Typography>
                <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Naziv"  name="Naziv" value={docData.Naziv} onChange={handleChange}/>
                <Typography id="transition-modal-title">Šifra:</Typography>
                <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Šifra"  name="Sifta" value={docData.Sifta} onChange={handleChange}/>
                <Typography id="transition-modal-title">Kontakt:</Typography>
                <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Kontakt"  name="Vrednost" value={docData.Vrednost} onChange={handleChange}/>
                <Typography id="transition-modal-title">Tip:</Typography>
                <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Tip" name="Tip" value={docData.Tip} onChange={handleChange} />
                <Button type="submit" variant="contained" color="primary">SAČUVAJ</Button>
                </FormControl>
            </form>
              )}
            </Box>
        </Fade>
      </Modal>
    )
  };
  
  export default EditContact;
  