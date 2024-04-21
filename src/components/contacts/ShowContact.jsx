import React ,{useState,useEffect} from "react";
import { Box, Typography, Modal, Fade, Backdrop, Paper} from '@mui/material';
import { contactCollectionRef } from '../../config/Firebase'
import { doc, getDoc } from "firebase/firestore";

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

const ShowEmployee = ({ isOpen, toggleModal, contactId }) => {
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
                console.log(docSnap.data())
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
                Podaci o kontaktu:
            </Typography>
            {docData && (
            <Paper elevation={3} style={{ padding: 20 }}>
                <Typography variant="body1" gutterBottom>
                    <strong>Naziv:</strong> {docData.Naziv}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Šifra:</strong> {docData.Sifta}
                </Typography>
                <Typography variant="body1">
                    <strong>Kontakt:</strong> {docData.Vrednost}
                </Typography>
                </Paper>
            )}
            </Box>
        </Fade>
      </Modal>
    )
  };
  
  export default ShowEmployee;
  