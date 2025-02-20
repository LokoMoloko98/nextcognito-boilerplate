'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Grid,
  Paper
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#005080', // Darker electric blue
    },
  },
});

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
    ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch('https://formspree.io/f/movjpape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.ok) {
          setSuccess(true);
          setFormData({ name: '', email: '', message: '' });
        } else {
          setError('Form submission failed. Please try again later.');
        }
      } else {
        setError('Form submission failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.paper',
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Paper sx={{ p: 5, borderRadius: 2, boxShadow: 4, backgroundColor: 'white' }}>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4, width: '100%' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Get in Touch
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Interested in joining or have questions? Fill in the form below, and we'll get back to you!
            </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    required
                  />
                </Grid>
              </Grid>
              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
              {success && (
                <Typography color="success.main" sx={{ mt: 2 }}>
                  Message sent successfully!
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, bgcolor: '#005080', color: '#fff' }}
                disabled={loading}
              >
                {loading? 'Sending...': 'Send Message'}
              </Button>
            </Box>
            </Paper>
          </Box>
      </Container>
    </ThemeProvider>
  );
}