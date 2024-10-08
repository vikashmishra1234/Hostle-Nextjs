'use client';

import { TextField, Button, Box, useTheme } from '@mui/material';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';

const Form = () => {
  const [name, setName] = useState<string>(''); // Use string for name
  const [email, setEmail] = useState<string>(''); // Use string for email
  const [message, setMessage] = useState<string>(''); // Use string for message

  const theme = useTheme();
  const small = theme.breakpoints.down('sm');

  // Correctly type the event as React.FormEvent<HTMLFormElement>
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message);
    console.log(name);
    console.log(email);
  };

  return (
    <Box component={'form'} onSubmit={handleSubmit}>
      <TextField
        label="Enter your name"
        value={name}
        // Correctly type the event as React.ChangeEvent<HTMLInputElement>
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        fullWidth
        variant="filled"
        required
        type="text"
        sx={{
          marginBottom: '30px',
          [small]: {
            marginBottom: '20px'
          }
        }}
        inputProps={{
          sx: { fontSize: '1rem', height: '50px', [small]: { height: '30px' }, border: "none" }
        }}
      />
      <TextField
        label="Enter your email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        fullWidth
        variant="filled"
        required
        type="email"
        sx={{
          marginBottom: '30px',
          [small]: {
            marginBottom: '20px'
          }
        }}
        inputProps={{
          disableUnderline: true,
          sx: { fontSize: '1rem', height: '50px', [small]: { height: '30px' }, border: "none" }
        }}
      />
      <TextField
        label="Enter your message"
        multiline
        rows={4}
        value={message}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
        fullWidth
        variant="filled"
        required
        type="text"
        sx={{
          marginBottom: '30px',
          [small]: {
            marginBottom: '20px'
          }
        }}
        inputProps={{
          disableUnderline: true,
          sx: { fontSize: '1rem', height: '50px', [small]: { height: 'unset' }, border: "none" }
        }}
      />

      <motion.div
        initial={{
          opacity: 1,
          width: 'fit-content'
        }}
        whileHover={{
          opacity: .6
        }}
        whileTap={{
          scale: .7
        }}
        transition={{ ease: 'easeInOut' }}
      >
        <Button
          variant="contained"
          color="inherit"
          type='submit'
          sx={{
            height: '54px',
            borderRadius: '6px',
            width: '200px',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            textTransform: 'none',
            backgroundColor: 'brown',
            color: 'white',
            [small]: {
              height: '44px',
              width: '130px',
              fontSize: '1.1rem'
            }
          }}
        >
          Send <SendIcon sx={{
            marginLeft: '10px', height: '24px', [small]: {
              height: '22px',
              marginLeft: '5px'
            }
          }} />
        </Button>
      </motion.div>

    </Box>
  );
};

export default Form;
