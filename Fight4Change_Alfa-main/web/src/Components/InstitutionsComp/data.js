import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './cards.css'

export default function InstCard() {

  return (
    <Card className="card">
      <CardActionArea>
        <img
          alt="inst"
          className="card-img"
          src={"https://upload.wikimedia.org/wikipedia/pt/a/ab/Log%C3%B3tipo_do_Banco_Alimentar_Contra_a_Fome.png"}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Banco Alimentar contra a fome
          </Typography>
          <Typography fontSize="small" color="primary">Description:</Typography>
            <Typography color="textSecondary" id = "description" paragraph>
            Help others by giving food to those who are in need.
            </Typography>
            <Typography color="primary">Category:</Typography>
            <Typography color="textSecondary" id = "description" paragraph>
            Food, Donation.
            </Typography>          
        </CardContent>
      </CardActionArea> 
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}