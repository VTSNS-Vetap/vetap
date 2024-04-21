import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { userService } from '../../services/user.service';
import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';

function SignIn() {

  const navigate = useNavigate();

  const [loginMessage, setLoginMessage] = useState('');
  const [passwordReset, setPasswordReset] = useState(false);
  const [userId, setUserId] = useState()

  const [_password, set_password] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('signInEmail');
    const password = data.get('signInPassword');
    const passwordConfirm = data.get('signInPasswordConfirm');

    if (!email.trim() && !password.trim()) return;

    if (password && passwordConfirm && passwordReset && userId){
      if ( password === passwordConfirm){
       let isDone =  userService.updatePassword(userId, password)
       if (isDone){
        setPasswordReset(false)
        set_password("")
       }
      }
      else {
        setLoginMessage('Šifre se ne poklapaju.')
        return;
      }
    }

    userService.login(email, password)
    .then((response) => {
      
      if (response && response.PasswordReset){
        setPasswordReset(true);
        set_password("")
        setUserId(response.Id)
      } else {
      navigate("/")
      }
    })
    .catch(() => {
      setLoginMessage('Pogrešna e-mail adresa ili lozinka.');
    }
  )
  };


  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography name="signInFormTitle" component="h1" variant="h5">
          { passwordReset ?  "ZAHTEV ZA PROMENU LOZINKE" :  "VETAP PRIJAVA"} 
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Vaša e-mail adresa"
              name="signInEmail"
              autoComplete="email"
              autoFocus
            />
            <TextField

              margin="normal"
              required
              fullWidth
              name="signInPassword"
              label= { passwordReset ? "Unesi novu lozinku" :  "Vaša lozinka"}
              type="password"
              value={_password}
              autoComplete="current-password"
              onChange={(e) => set_password(e.target.value)}
            />
            { passwordReset && <TextField
              margin="normal"
              required
              fullWidth
              name="signInPasswordConfirm"
              label="Ponovi novu lozinku"
              type="password"
              autoComplete=""
            />
            }

            <Button
              name="signInBtnSubmit"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              { passwordReset ? "POTVRDI" : "PRIJAVA" }
            </Button>
            <Typography name="signInWorningMessage" variant="body1" color={red["A700"]} align="center">
              {loginMessage}
            </Typography>
            <Grid container>
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;
