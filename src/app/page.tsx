'use client';
import { Box, Container, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#005080',
    },
  },
});

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/getting-started'); // Adjust route as needed
  };

  return (
    <Box sx={{ minHeight: '100vh', py: 5, background: 'linear-gradient(135deg, #005080,rgb(216, 255, 255))' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.paper',
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            width: '92%',
            margin: '10% auto',
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 'bold', color: 'primary.main', mt: 3 }}
          >
            Welcome to the Development Guide
          </Typography>
          <Typography variant="h5" sx={{ mt: 2, color: 'text.secondary' }}>
            A Simple Template for Your Next Project
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: 3,
            }}
          >
            <Typography variant="body1" align="center" sx={{ maxWidth: 600 }}>
              This template serves as a basic starting point for building modern web applications with Next.js, MUI, and a customizable theme.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{ mt: 3, bgcolor: 'primary.main' }}
              onClick={handleGetStarted}
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
}
