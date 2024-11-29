"use client"
import React from 'react';
import Form from './clientComponents/Form';
import { Box, Typography, useTheme } from '@mui/material';

const HomeForm = ()=> {

 const theme = useTheme();
 const small = theme.breakpoints.down('sm');

  return (
    <Box sx={{paddingTop:"40px",paddingBottom:'40px'}}>
      <Typography variant='h3' sx={{fontWeight:'bold',fontSize:'2.2rem',color:'brown',[small]:{
        fontSize:'1.6rem',
        color:'brown'
      },margin:"30px 0px"}}>Leave us a note and we will get back to you</Typography>
      <Form />
    </Box>
  );
}
export default HomeForm;
