'use client'
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';

export default function AboutCard() {
  const theme = useTheme();
  const sm = theme.breakpoints.down('sm');
  return (
    <Card sx={{ maxWidth: 545 }}>
      <CardMedia
        sx={{ height: 320 }}
        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwJ8jqVxtT7OFRQcvHXOnJvmVL4BZe8VHCmw&s"
        title="green iguana"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary',fontSize:'1.3rem',[sm]:{fontSize:'1.2rem'} }}>
        BSA College Hostel provides affordable, comfortable accommodation for students enrolled at our institution. We aim to create a secure home away from home where you can focus on your studies while experiencing an enriching communal living environment.
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant='outlined' sx={{textTransform:'none',fontSize:'1.2rem'}}>Read More</Button>
      </CardActions>
    </Card>
  );
}
