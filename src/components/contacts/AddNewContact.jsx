import React ,{useState} from "react";
import { Box,Button, Typography, Modal, Fade, Backdrop, FormControl, TextField } from '@mui/material';
import { contactCollectionRef } from '../../config/Firebase'
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

const AddNewContact = ({ isOpen, toggleModal, getContact }) => {

    const [formData, setFormData] = useState({
        "VlasnikFKs": [""],
        "Tip": "",
        "Vrednost": "",
        "ZaposleniFKs": [""],
        "DobavljacFKs": [""],
        "Naziv": "",
        "Sifta": ""
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
      await addDoc(contactCollectionRef, formData);
      setFormData({
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
            Novi kontakt:
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ m: 0.5, width : '100%' }}>
              <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Naziv"  name="Naziv" value={formData.Naziv} onChange={handleChange}/>
              <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Šifra"  name="Sifta" value={formData.Sifta} onChange={handleChange}/>
              <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Kontakt"  name="Vrednost" value={formData.Vrednost} onChange={handleChange}/>
              <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Tip" name="Tip" value={formData.Tip} onChange={handleChange} />
              <Button type="submit" variant="contained" color="primary">SAČUVAJ</Button>
            </FormControl>
          </form>
        </Box>
        </Fade>
      </Modal>
    )
  };
  
  export default AddNewContact;
  