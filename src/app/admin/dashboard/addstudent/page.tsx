"use client"
import React, { useState } from 'react';
import axios from 'axios'
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
} from '@mui/material';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    rollNumber: '',
    studentPhone: '',
    studentEmail: '',
    studentFatherName: '',
    studentAddress: '',
    studentYear: '',
    studentBranch: '',
    studentFatherPhone: '',
    studentPassword: '',
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    console.log(formData);
    try {
        const res = await axios.post('http://localhost:3000/api/addstudent',formData);
        console.log(res);
    } catch (error:any) {
        console.log(error)
    }
  };

  return (
    <Container component="main" >
      <Box sx={{ mt: 4 }}>
        <Typography sx={{textAlign:'center',fontWeight:'bold',color:"brown"}} component="h1" variant="h4">
          Student Information Form
        </Typography>
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Student Name"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Roll Number"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
          />
         
          <TextField
            margin="normal"
            required
            fullWidth
            label="Father's Name"
            name="studentFatherName"
            value={formData.studentFatherName}
            onChange={handleChange}
          />
          <TextField
          margin="normal"
          required
          fullWidth
          label="Student Phone"
          name="studentPhone"
          value={formData.studentPhone}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          color='secondary'
          required
          fullWidth
          label="Student Email"
          name="studentEmail"
          type="email"
          value={formData.studentEmail}
          onChange={handleChange}
        />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Father's Phone"
            name="studentFatherPhone"
            value={formData.studentFatherPhone}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Year"
            name="studentYear"
            value={formData.studentYear}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Branch"
            name="studentBranch"
            value={formData.studentBranch}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Set a password for student"
            name="studentPassword"
            value={formData.studentPassword}
            onChange={handleChange}
          />
           <TextField
           multiline
           rows={4}
            margin="normal"
            required
            fullWidth
            label="Address"
            name="studentAddress"
            value={formData.studentAddress}
            onChange={handleChange}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 ,background:"brown",height:'45px'}}>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default StudentForm;
