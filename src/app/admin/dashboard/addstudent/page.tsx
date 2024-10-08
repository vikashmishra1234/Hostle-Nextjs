"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
} from '@mui/material';
import Swal from 'sweetalert2';

interface StudentFormData {
  studentName: string;
  rollNumber: string;
  studentPhone: string;
  studentEmail: string;
  studentFatherName: string;
  studentAddress: string;
  studentYear: string;
  studentBranch: string;
  studentFatherPhone: string;
  studentPassword: string;
}

const StudentForm = () => {
  const [formData, setFormData] = useState<StudentFormData>({
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post('http://localhost:3000/api/addstudent', formData);
      if(res && res?.data.message){
        Swal.fire({
          icon:'success',
          title:'Success !',
          text:res?.data?.message || "student added successfully"
        })
      }
    } catch (error) {
      Swal.fire({
        icon:'error',
        title:'Opps !',
        text:"Unable add student"
      })
      console.log(error);
    }
  };

  return (
    <Container component="main">
      <Box sx={{ mt: 4 }}>
        <Typography sx={{ textAlign: 'center', fontWeight: 'bold', color: 'brown' }} component="h1" variant="h4">
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
            color="secondary"
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, background: 'brown', height: '45px' }}>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default StudentForm;
