"use client"
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

export default function GettingStarted() {
  const router = useRouter();

  const handleStartDeveloping = () => {
    router.push('/authenticated-home'); // Redirect to the authenticated-home  or any starting page
  };

  return (
    <Box sx={{ minHeight: '100vh', py: 5, background: "linear-gradient(135deg,  #005080, rgb(199, 247, 247))" }}>
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
            Getting Started with Your Project
          </Typography>
          <Typography variant="h5" sx={{ mt: 2, color: 'text.secondary' }}>
            A Guide to Develop Your Next.js Application with Authentication and Data Management
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
              This project uses <b>Next.js</b>, <b>Material-UI</b>, and <b>CognitoIdentityProviderClient</b> for authentication. Below is the directory structure, and we’ll guide you on how to get started with modifying and extending your app.
            </Typography>

            <Typography variant="h6" sx={{ mt: 4 }}>
              Directory Breakdown:
            </Typography>

            <Typography variant="body1" sx={{ mt: 1 }}>
              1. <b>/src/app</b> - The main source folder for Next.js pages.
              <ul>
                <li>/authenticated-home: This is the first page that an authenticated user sees once they log in. </li>
                <li>/contact: Stores the Contact page where users can find your contact details. It is also a contact form which users can fill and it will send an email to you via <a href='https://resend.com'>Resend</a>.</li>
                <li>/data-fetch: A page for displaying weekly trips, using data from /data-fetch/data.ts.</li>
                <li>/getting-started: The current page that you are on. You can modify this to be the about page that you include information about your app or business.</li>
                <li>/signin: The Sign-In page where users can log in to the application.</li>
                <li>/globals.css: The global stylesheet for your app. You can customize this for your app’s global styling.</li>
                <li>/layout.tsx: This file defines the layout for your pages, such as header, footer, sidebar, or any persistent layout element.</li>
                <li>/favicon.ico: The icon displayed in the browser tab.</li>
              </ul>
            </Typography>

            <Typography variant="body1" sx={{ mt: 2 }}>
              2. <b>/src/components</b> - Custom components that are reused across pages.
              <ul>
                <li>AuthenticatedLayout.tsx: This layout is used to wrap pages that require user authentication. You can add sidebars, headers, or other components that are visible only when a user is logged in.</li>
                <li>NavigationLoader.tsx: A component to display loading states or transitions while navigating between pages.</li>
              </ul>
            </Typography>

            <Typography variant="body1" sx={{ mt: 2 }}>
              3. <b>/src/context</b> - For React Context API to manage authentication state across the app.
              <ul>
                <li>AuthContext.tsx: This is where you manage the authentication state. You can use this context to handle login, logout, and user session throughout the application. The context is imported and used in various components that require authentication.</li>
              </ul>
            </Typography>

            <Typography variant="body1" sx={{ mt: 2 }}>
              4. <b>/src/hooks</b> - Custom React hooks to manage reusable logic.
              <ul>
                <li>useAuth.ts: A custom hook that abstracts authentication logic. It provides utility functions like login(), logout(), and isAuthenticated() which are used in components that need to know whether the user is logged in or not.</li>
              </ul>
            </Typography>


            <Typography variant="body1" sx={{ mt: 2 }}>
             5. <b>app/api/</b>  - The API directory handles authentication actions. Here's a breakdown of its structure:
              <ul>
                <li> auth/[action]/route.ts: This file handles various authentication actions like login, signup, password reset, etc. The <code>[action]</code> is dynamic and can catch different actions based on the URL path..</li>
                <li> auth/signout/route.ts: This file handles user sign-out functionality. When a user logs out, this endpoint will remove their session or token.</li>
                <li> auth/status/route.ts: This endpoint checks the authentication status of the user. It helps to verify whether the user is authenticated or not, and can be used for session management.</li>
              </ul>
            </Typography>

            <Typography variant="h6" sx={{ mt: 4 }}>
              Steps to Start Developing:
            </Typography>
            <ul>
              <li>1. Set Up the Project: Clone the repository and install dependencies by running <code>npm install</code> or <code>yarn install</code> in your project folder.</li>
              <li>2. Run the Application: Start the development server using <code>npm run dev</code> or <code>yarn dev</code>. This will launch the application at <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.</li>
              <li>3. Modifying Pages: To customize the pages, go to the respective files in <code>/src/app</code>. For example, if you want to change the content of the About page, edit <code>/src/app/about/page.tsx</code>.</li>
              <li>4. Authentication and Context: The app uses React Context to manage authentication. In <code>AuthContext.tsx</code>, you’ll find the logic that determines whether a user is logged in or not. You can extend this by adding functions to handle registration, user roles, etc.</li>
              <li>5. Styling with Material-UI: The project uses Material-UI components. You can customize the theme and modify individual components as per your needs. For example, if you want to change the primary color, modify it in the theme settings found in <code>layout.tsx</code>.</li>
              <li>6. Data Management: Pages like Fare Calculation and Weekly Trips are fed by static data from <code>/data.ts</code> files. You can either replace this with API calls or use a database if you need to make it dynamic.</li>
              <li>7. Reusable Components: If you need a layout or reusable component across pages, like a navigation bar or sidebar, modify the <code>AuthenticatedLayout.tsx</code> to add or adjust components that should appear on every authenticated page.</li>
            </ul>

            <Typography variant="h6" sx={{ mt: 4 }}>
              Next Steps:
            </Typography>
            <ul>
              <li>As you develop, consider adding features like user registration, authenticated-home  customization, and data fetching from APIs. You can create new API routes under <code>/src/app/api</code>.</li>
            </ul>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
}
