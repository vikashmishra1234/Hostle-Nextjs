'use client';

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Snackbar, IconButton, InputAdornment } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import MessageIcon from '@mui/icons-material/Message';
import theme from './theme';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const handleCloseSnackbar = () => {
    setIsSubmitted(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: '1000px',
          margin: 'auto',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
      
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          variant="filled"
          required
          error={!!errors.name}
          helperText={errors.name}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          variant="filled"
          required
          type="email"
          error={!!errors.email}
          helperText={errors.email}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          fullWidth
          variant="filled"
          required
          multiline
          rows={4}
          error={!!errors.message}
          helperText={errors.message}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MessageIcon color="primary" />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', mt: 3 }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              
              type="submit"
              startIcon={<SendIcon />}
              sx={{
                background:'brown',
                color:'white',
                padding: '10px 30px',
                fontSize: '1rem',
              }}
            >
              Send Message
            </Button>
          </motion.div>
        </Box>
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <Snackbar
                open={isSubmitted}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Message sent successfully!"
                action={
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleCloseSnackbar}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                }
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </ThemeProvider>
  );
};

export default ContactForm;

