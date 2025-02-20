// src/app/layout.tsx
'use client';
import { AuthProvider } from '@/context/AuthContext';
import AuthenticatedLayout from '@/components/AuthenticatedLayout';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#005080',
    },
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <AuthenticatedLayout>
              {children}
            </AuthenticatedLayout>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}