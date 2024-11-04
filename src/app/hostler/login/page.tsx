'use client'; // Ensure this file is treated as a client component

import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { signIn, signOut } from 'next-auth/react';
import React, { useState ,useEffect} from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Loader from '@/app/MyLoading';

const HostlerLogin = () => {
  const router = useRouter();
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading,setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getOrCreateUserId = (rollNumber:string) => {
      let deviceId = localStorage.getItem('deviceId');
      if (!deviceId) {
        deviceId = uuidv4()+'X'+rollNumber;
        localStorage.setItem('deviceId', deviceId);
        return true
      }  
      let savedrollNumber = deviceId.split('X')[1];
      if(savedrollNumber!=rollNumber){
        return false;
      }
      return true;
      
    };
    

setLoading(true);
    const res = await signIn('credentials', {
      redirect: false,
      rollNumber, // Ensure this matches the provider's expected parameters
      password,
      role: 'student',
    });
setLoading(false);
    if (res?.error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'Login Failed!',
      });
    } else {
      if(getOrCreateUserId(rollNumber)){
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Login successful!',
        })
        router.push('/hostler/dashboard')
      }
      else{
        setLoading(true)
        await signOut({redirect:false})
        Swal.fire({
          icon: 'error',
          title: 'Opps!',
          text: 'device is not match!',
        })
        setLoading(false)
      }
    }
  };
if(isLoading){
  return <Loader loading={isLoading}/>
}
  return (
    <Container sx={{ height: 'calc(100vh - 100px)', paddingTop: '80px' }}>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '500px', margin: 'auto' }}>
        <Typography
          sx={{ textAlign: 'center', width: '100%', marginBottom: '20px' }}
          variant="h4"
        >
          Hostler Login
        </Typography>
        <TextField
          fullWidth
          label="Enter roll number"
          variant="filled"
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
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

export default HostlerLogin;
