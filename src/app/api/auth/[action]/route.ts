import { NextResponse, NextRequest } from 'next/server';
import { CognitoIdentityProviderClient, SignUpCommand, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import { fromEnv } from "@aws-sdk/credential-providers";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";
const ssmClient = new SSMClient({ region: process.env.AWS_REGION || "us-east-1" });

const cognitoIdentityProviderClient = new CognitoIdentityProviderClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
  credentials: fromEnv(),
});

async function getSecret(parameterName: string, withDecryption = true): Promise<string | null> {
  try {
    const command = new GetParameterCommand({
      Name: parameterName,
      WithDecryption: withDecryption, // Decrypt SecureString parameters
    });

    const response = await ssmClient.send(command);
    return response.Parameter?.Value || null;
  } catch (error) {
    console.error(`Error fetching secret ${parameterName}:`, error);
    return null;
  }
}

export async function POST(req: NextRequest, { params }: { params: { action: string } }) {
  try {
    const { username, password, email } = await req.json();
    const { action } = await params;
    const appId = process.env.AWS_APP_ID;
    if (!appId) {
      throw new Error("AWS_APP_ID is missing in environment variables.");
    }
    const clientId = await getSecret(`/amplify/shared/${appId}/NEXT_PUBLIC_COGNITO_CLIENT_ID`);
    console.log("Cognito Client ID:", clientId);
    if (!clientId) throw new Error("Cognito Client ID is missing!");

    let command;

    if (action === 'signup') {
      command = new SignUpCommand({
        ClientId: clientId,
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