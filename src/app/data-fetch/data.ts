'use server';

import { cookies } from 'next/headers';
import { CognitoIdentityProviderClient, GetUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { fromEnv } from '@aws-sdk/credential-providers';

const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({
  region: 'us-east-1',
  credentials: fromEnv(),
});

export async function getProfileData() {
  const cookiesData = await cookies();
  const accessToken = cookiesData.get('accessToken')?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const command = new GetUserCommand({ AccessToken: accessToken });
    const data = await cognitoIdentityProviderClient.send(command);
    return data;
  } catch (error) {
    console.error('Error fetching user attributes:', error);
    return null;
  }
}

export async function getWeeklyTripsData(passengerId: string, targetDate: string) {
  try {
    const cookiesData = await cookies();
    const accessToken = cookiesData.get('accessToken')?.value;
    const response = await fetch(
      `"https://v2.jokeapi.dev/joke/Any?type=twopart"`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (err: any) {
    console.error('Fetch error:', err);
    throw new Error(err.message);
  }
}