import * as React from 'react';
import { Description,  Phone , LocalHospital, ShoppingCart} from '@mui/icons-material';
import { Card, CardContent, CardActionArea, CardMedia, Typography, Grid, Box , Icon} from '@mui/material';
import { useNavigate } from "react-router-dom";


const HomePage = () => {

  const navigate = useNavigate();


  return (

    <Box>

      <Grid
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 3, md: 5 }}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginBottom="10px"
        marginTop="10px<"
        >

        <Grid  item xs={12} sm={5} md={4} lg={3}>
          <Card onClick={() => navigate("/kartoni")} >
            <CardActionArea>
              <CardMedia sx={{height: "140px"}}>
                <Icon sx={{width:"100%", height:"100%"}} ><Description sx={{fontSize : "5rem", marginTop:"4rem", color: "gray"}}/></Icon>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Kartoni
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{height: "40px"}}>
                  Praćenje medicinskih kartona, istorije bolesti
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={5} md={4} lg={3}>
          <Card onClick={() => navigate("/usluge")} >
            <CardActionArea>
              <CardMedia sx={{height: "140px"}}>
                <Icon sx={{width:"100%", height:"100%"}} ><LocalHospital sx={{fontSize : "5rem", marginTop:"4rem", color: "gray"}}/></Icon>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Usluge
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{height: "40px"}}>
                  Kreiranje, ažuriranje i pregled usluga koje se pružaju
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>

      </Grid>
      <Grid
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 3, md: 5 }}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        >
        <Grid item xs={12} sm={5} md={4} lg={3}>
          <Card onClick={() => navigate("/artikli")} >
            <CardActionArea>
              <CardMedia sx={{height: "140px"}}>
                <Icon sx={{width:"100%", height:"100%"}} ><ShoppingCart sx={{fontSize : "5rem", marginTop:"4rem", color: "gray"}}/></Icon>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Artikli
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{height: "40px"}}>
                  Praćenje inventara, nabavka i upravljanje zalihama medicinskih i drugih potrepština
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} sm={5} md={4} lg={3}>
          <Card onClick={() => navigate("/kontakti")} >
            <CardActionArea>
              <CardMedia sx={{height: "140px"}}>
                <Icon sx={{width:"100%", height:"100%"}} ><Phone sx={{fontSize : "5rem", marginTop:"4rem", color: "gray"}}/></Icon>
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Kontakti
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{height: "40px"}}>
                  Centralizovano mesto za čuvanje kontaktnih informacija vaših klijenata, kolega
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

    </Box>
  )}


export default HomePage;
