import { NextResponse, NextRequest } from 'next/server';
import { CognitoIdentityProviderClient, InitiateAuthCommand } from "@aws-sdk/client-cognito-identity-provider";
import { fromEnv } from "@aws-sdk/credential-providers";

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
  credentials: fromEnv(),
});

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const command = new InitiateAuthCommand({
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
    });

    const response = await cognitoClient.send(command);

    // Handle NEW_PASSWORD_REQUIRED challenge
    if (response.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
      return NextResponse.json({
        challenge: 'NEW_PASSWORD_REQUIRED',
        username,
        session: response.Session,
      }, { status: 200 });  // Send a JSON response to be handled by the frontend
    }

    // Extract tokens
    const { AccessToken, RefreshToken, IdToken } = response.AuthenticationResult ?? {};

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/',
    };

    const res = NextResponse.json({ success: true });

    if (AccessToken) res.cookies.set('accessToken', AccessToken, { ...cookieOptions, maxAge: 3600 });
    if (RefreshToken) res.cookies.set('refreshToken', RefreshToken, { ...cookieOptions, maxAge: 2592000 });
    if (IdToken) res.cookies.set('idToken', IdToken, { ...cookieOptions, maxAge: 3600 });

    return res;
  } catch (error: any) {
    console.error("Signin error:", error);
    return NextResponse.json({ error: error.message || 'Signin failed' }, { status: error.$metadata?.httpStatusCode || 500 });
  }
}
  
  // In this code, we are using the  InitiateAuthCommand  to authenticate the user with the provided username and password. If the authentication is successful, we extract the tokens from the response and set them as cookies in the response. 
  // If the authentication fails, we return an error response with a status code of 500. 
  // The code also handles the  NEW_PASSWORD_REQUIRED  challenge, which occurs when the user needs to set a new password. In this case, we return a JSON response with the challenge type, username, and session information. 
  // The frontend can then handle this response and prompt the user to set a new password. 
  // Now that we have implemented the signin route, let's create the frontend components to handle the signin process. 
  // Create the Signin Page 
  // Next, we will create the signin page and components to handle the signin process. 
  // First, create a new file named  signin.tsx  in the  src/pages/auth  directory.