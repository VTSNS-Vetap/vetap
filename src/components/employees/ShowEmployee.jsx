import React ,{useState,useEffect} from "react";
import { Box, Typography, Modal, Fade, Backdrop, Paper} from '@mui/material';
import { zaposleniCollectionRef } from '../../config/Firebase'
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

const ShowEmployee = ({ isOpen, toggleModal, empId }) => {
    const [docData, setDocData] = useState(null);
    
    useEffect(() => {
        if (empId && isOpen) { 
        const fetchData = async () => {
          try {
            const docRef = doc(zaposleniCollectionRef, empId)
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
      }, [empId,isOpen]);

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
                Podaci o zaposlenom:
            </Typography>
            {docData && (
            <Paper elevation={3} style={{ padding: 20 }}>
              <Typography variant="body1" gutterBottom>
                    <strong>Email:</strong> {docData.Email}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Ime:</strong> {docData.Ime}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <strong>Prezime:</strong> {docData.Prezime}
                </Typography>
                <Typography variant="body1">
                    <strong>JMBG:</strong> {docData.JMBG}
                </Typography>
                </Paper>
            )}
            </Box>
        </Fade>
      </Modal>
    )
  };
  
  export default ShowEmployee;
  