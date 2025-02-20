'use server';

import { cookies } from 'next/headers';
import { CognitoIdentityProviderClient, GetUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { fromEnv } from '@aws-sdk/credential-providers';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({
  region: 'us-east-1',
  credentials: fromEnv(),
});

async function getProfileData() {
  const accessToken = (await cookies()).get('accessToken')?.value;
  if (!accessToken) return null;

  try {
    const command = new GetUserCommand({ AccessToken: accessToken });
    const data = await cognitoIdentityProviderClient.send(command);
    return data;
  } catch (error) {
    console.error('Error fetching user attributes:', error);
    return null;
  }
}

const CardWrapper = ({ title, children }) => (
  <Card sx={{
    borderRadius: 3,
    boxShadow: 4,
    background: 'rgba(0, 80, 128, 0.9)',
    color: 'rgb(216, 255, 255)',
    p: 3,
    textAlign: 'left',
  }}>
    <CardContent>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'rgb(255, 255, 255)' }}>
        {title}
      </Typography>
      {children}
    </CardContent>
  </Card>
);

const DummyCard = () => (
  <CardWrapper title="Fares">
    <Typography variant="body2" paragraph>
      Weekly base fare = R350
    </Typography>
    <Typography variant="body2" paragraph>
      <strong>Threshold for Discounts:</strong><br />
      Passengers must miss 40% or more of their trips in a week to qualify for discounts.
    </Typography>
    <Typography variant="body2" paragraph>
      <strong>Discount Rate:</strong><br />
      For each trip missed beyond the 40% threshold, 15% discount is applied per trip.
    </Typography>
  </CardWrapper>
);

export default async function Dashboard() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const userData = await getProfileData();
  if (!userData) {
    return <Box sx={{ textAlign: 'center', mt: 5, color: 'rgb(255, 255, 255)' }}>You are not logged in.</Box>;
  }

  const username = userData.UserAttributes?.find(attr => attr.Name === 'name')?.Value;

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      py: 5,
      px: 2,
      background: 'linear-gradient(135deg, #005080, rgb(255, 255, 255))',
      color: 'rgb(216, 255, 255)',
    }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'rgb(255, 255, 255)' }}>
        Welcome {username}
      </Typography>

      <Grid container spacing={3} sx={{ maxWidth: '100%', width: '100%', overflow: 'hidden' }}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <CardWrapper title="dolore enim quia excepturi tempore veritatis error sit">
            <Typography variant="body2" paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>dolore enim quia excepturi tempore veritatis error sit </strong><br />
              Nulla facilisi. Donec ac felis sit amet nunc tincidunt ultricies.
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>quidem facere doloremque delectus reiciendis necessitatibus, debitis, quo tempora!</strong><br />
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
            </Typography>
          </CardWrapper>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
        </Grid>
      </Grid>
    </Box>
  );
}

