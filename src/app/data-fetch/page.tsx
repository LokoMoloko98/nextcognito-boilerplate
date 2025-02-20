'use client';

import { useState, useEffect } from 'react';
import { getProfileData } from './data';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';

const JokeAPI = () => {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJoke = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://v2.jokeapi.dev/joke/Any?type=twopart");
        const jokeData = await response.json();
        setJoke(`${jokeData.setup} - ${jokeData.delivery}`);
      } catch (error) {
        console.error("Error fetching joke:", error);
        setError("Failed to fetch joke");
      } finally {
        setLoading(false);
      }
    };
    fetchJoke();
  }, []);

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f4f4f9', minHeight: '100vh', background: 'linear-gradient(360deg, #005080, rgb(255, 255, 255))' }}>
      <Typography variant="h4" sx={{ color: '#003359 ', fontWeight: 'bold', mb: 3 }}>
        Joke API
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100px">
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box p={3}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Typography variant="body2" color="text.secondary">
            Please check the browser console for more details.
          </Typography>
        </Box>
      )}

      {joke && (
        <Typography variant="h6" sx={{ color: '#003359', fontStyle: 'italic', mb: 3, textAlign: 'center' }}>
          {joke}
        </Typography>
      )}
    </Box>
  );
};

export default JokeAPI;
