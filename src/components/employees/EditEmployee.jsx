import React ,{useState,useEffect} from "react";
import { Box,Button, Typography, Modal, Fade, Backdrop, FormControl, TextField, InputLabel, MenuItem, Select, FormControlLabel, Checkbox } from '@mui/material';
import { zaposleniCollectionRef } from '../../config/Firebase'
import {  doc, getDoc, setDoc } from 'firebase/firestore'
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
    "Rola" : Role.User
    }

const EditEmployee = ({ isOpen, toggleModal, empId, getZaposleni }) => {
    const [docData, setDocData] = useState(defaultUser);
    
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
      if (docData.Email && docData.Ime){

        const docRef = doc(zaposleniCollectionRef, empId)

        await setDoc(docRef, docData);
        
        toggleModal(empId);

        if (getZaposleni.current) {
          getZaposleni.current();
      }

        setDocData(defaultUser);

   
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
                  <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Email" name="Email" value={docData.Email} onChange={handleChange} />
                  <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Ime"  name="Ime" value={docData.Ime} onChange={handleChange}/>
                  <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="Prezime"  name="Prezime" value={docData.Prezime} onChange={handleChange}/>
                  <TextField sx={{ marginBottom: '5px' }} type="text" color='primary' placeholder="JMBG"  name="JMBG" value={docData.JMBG} onChange={handleChange}/>

                  <FormControlLabel
                    label="Zahtev za reset lozinke"
                    control={
                      <Checkbox
                        name="PasswordReset"
                        onChange={handleChange}
                      />
                    }
                  />
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
  