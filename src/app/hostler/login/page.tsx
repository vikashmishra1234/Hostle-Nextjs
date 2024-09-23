"use client"

import { Box, Button, Container, TextField, Typography } from '@mui/material'
import { signIn } from 'next-auth/react'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const HostlerLogin = () => {
    const router = useRouter();
  const [rollNumber, setrollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false, 
      rollNumber,         
      password,
      role,
      callbackUrl: '/hostler/dashboard',       
    });

    if (res?.error) {
      // Handle errors here (e.g., invalid credentials)
      console.error('HostlerLogin failed:', res.error);
    } else {
      alert("login successfully")
      router.push('/hostler/dashboard')
      console.log('HostlerLogin successful',res);
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
