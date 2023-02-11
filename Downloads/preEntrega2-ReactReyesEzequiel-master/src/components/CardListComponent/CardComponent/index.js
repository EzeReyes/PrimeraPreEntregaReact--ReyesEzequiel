import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import "./style.css";


const CardComponent = ( {data} ) => {
  return (
    <Card className="cardProducts" sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={data.img}
          alt={data.id}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.nombre} $ {data.precio}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          COMPRAR
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardComponent;
