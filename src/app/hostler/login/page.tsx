"use client"
import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { signIn,getSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

const HostlerLogin = () => {
    const router = useRouter();
  const [rollNumber, setrollNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false, 
      rollNumber,         
      password,
      role:'student',      
    });

    if (res?.error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Login Failed!',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Login successful!',
      }).then(async () => {
        await router.push('/hostler/dashboard'); // Navigate to dashboard after Swal confirmation
        console.log('Navigated to dashboard');
      });
    }
  };

  return (
    <Container sx={{ height: "calc(100vh - 100px)", paddingTop: "80px" }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '500px', margin: 'auto' }}>
        <Typography
          sx={{ textAlign: 'center', width: '100%', marginBottom: "20px" }}
          variant="h4"
        >
         Hostler Login
        </Typography>
        <TextField
          fullWidth
          label="Enter admin id"
          variant="filled"
          type="text"
          value={rollNumber}
          onChange={(e) => setrollNumber(e.target.value)}
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          fullWidth
          label="Password"
          variant="filled"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: '20px' }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ background: "brown", width: '150px', height: "43px" }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}

export default HostlerLogin;
