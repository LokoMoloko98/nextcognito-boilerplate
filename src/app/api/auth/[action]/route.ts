import { NextResponse, NextRequest } from 'next/server';
import { CognitoIdentityProviderClient, SignUpCommand, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import { fromEnv } from "@aws-sdk/credential-providers";
import { secret } from '@aws-amplify/backend';

async function getSecretValue(secretName: string): Promise<string> {
  const secretValue = await secret(secretName);
  return String(secretValue); // Ensures it's explicitly cast to a string
}

export async function POST(req: NextRequest, { params }: { params: { action: string } }) {
  try {
    const { username, password, email } = await req.json();
    const { action } = await params;

    const clientId = await getSecretValue('NEXT_PUBLIC_COGNITO_CLIENT_ID');
    const region = await getSecretValue('NEXT_PUBLIC_AWS_REGION');

    const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({
      region: region || 'us-east-1',
      credentials: fromEnv(),
    });

    let command;

    if (action === 'signup') {
      command = new SignUpCommand({
        ClientId:  clientId,
        Username: username,
        Password: password,
        UserAttributes: [{ Name: 'email', Value: email }],
      });
      const cognitoResponse = await cognitoIdentityProviderClient.send(command);
      return NextResponse.json({ success: true, data: cognitoResponse });
    } else if (action === 'signin') {
      const authParams = {
        USERNAME: username, // Important: Case-sensitive!
        PASSWORD: password, // Important: Case-sensitive!
      };

      command = new InitiateAuthCommand({
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: clientId,
        AuthParameters: authParams, // Use the correct structure here!
      });

      const cognitoResponse = await cognitoIdentityProviderClient.send(command);

      const accessToken = cognitoResponse.AuthenticationResult?.AccessToken;
      const refreshToken = cognitoResponse.AuthenticationResult?.RefreshToken;
      const idToken = cognitoResponse.AuthenticationResult?.IdToken;

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        path: '/',
      };

      const response = NextResponse.json({ success: true });

      if (accessToken) {
        response.cookies.set('accessToken', accessToken, { ...cookieOptions, maxAge: 3600 });
      }
      if (refreshToken) {
        response.cookies.set('refreshToken', refreshToken, { ...cookieOptions, maxAge: 2592000 });
      }
      if (idToken) {
        response.cookies.set('idToken', idToken, { ...cookieOptions, maxAge: 3600 });
      }

      return response;
    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Authentication error:", error);
    return NextResponse.json({ error: error.message || 'Authentication failed' }, { status: error.statusCode || 500 });
  }
}