'use client'; // Ensure this file is treated as a client component

import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const AdminLogin = () => {
  const router = useRouter();
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      adminId, 
      password,
      role: 'admin',
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
      }).then(() => {
        router.push('/admin/dashboard'); // Ensure this line runs after Swal is closed
      });
    }
  };

  return (
    <Container sx={{ height: 'calc(100vh - 100px)', paddingTop: '80px' }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '500px', margin: 'auto' }}>
        <Typography
          sx={{ textAlign: 'center', width: '100%', marginBottom: '20px' }}
          variant="h4"
        >
          Admin Login
        </Typography>
        <TextField
          fullWidth
          label="Enter admin id"
          variant="filled"
          type="text"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
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
          sx={{ background: 'brown', width: '150px', height: '43px' }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default AdminLogin;
