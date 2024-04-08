import * as React from 'react';

import { Card, CardContent, CardActionArea, CardMedia, Typography, Grid } from '@mui/material';



const HomePage = () => {

  return (
    <>
      <Grid  
        rowSpacing={1} 
        columnSpacing={{ xs: 1, sm: 3, md: 5 }}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        >
       
        <Grid  item xs={6} sm={5} md={4} lg={3}>
          <Card >
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
                <Typography variant="body2" color="text.secondary">
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
                alt="---usluge---"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Usluge
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Kreiranje, ažuriranje i pregled usluga koje se pružaju
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        
        
          <div></div>
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
                <Typography variant="body2" color="text.secondary">
                  Praćenje inventara, nabavka i upravljanje zalihama medicinskih i drugih potrepština
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
                image="/static/images/cards/kontakti.jpg"
                alt="---kontakti---"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Kontakti
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Centralizovano mesto za čuvanje kontaktnih informacija vaših klijenata, kolega 
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      
    </>
  )
};

export default HomePage;
