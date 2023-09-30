//@ts-nocheck
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Item(props) {
  return (
    <Card sx={{ width: 300, height: 300, marginTop: 2, borderRadius: 3, border: "2px outset rgb(254,136,1)", position: "relative"}}>
      <CardMedia
        sx={{ height: 180 }}
        image={props.img}
        title={props.item}
      />
      <div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" width="100%" position="absolute" left="0px" textAlign="center" backgroundColor="rgb(255, 213, 122)">
            {props.item}
          </Typography>
          <Typography variant="body1" color="text.secondary" position="absolute" bottom="40px">
            Vendor: {props.vendor}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
}
