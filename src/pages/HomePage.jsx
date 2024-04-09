import * as React from 'react';
import { Email, Phone, LocationOn, Person } from '@mui/icons-material';
import { Card, CardContent, CardActionArea, CardMedia, Typography, Grid, Box , Icon} from '@mui/material';



const HomePage = () => {

  return (
    <Box sx={{margin : "auto"}}>
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
       
        <Grid  item xs={6} sm={5} md={4} lg={3}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/kartoni.jpg"
                alt="---kartoni---"
              />
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
        <Grid item xs={6} sm={5} md={4} lg={3}>
          <Card >
            <CardActionArea>
            <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/usluge.jpg"
                alt="---Usluge---"
              />
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
        <Grid item xs={6} sm={5} md={4} lg={3}>
          <Card >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/artikli.jpg"
                alt="---atrikli---"
              />
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
        <Grid item xs={6} sm={5} md={4} lg={3}>
          <Card >
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
  )
};

export default HomePage;
