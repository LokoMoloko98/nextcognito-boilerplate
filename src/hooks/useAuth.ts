// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthStatus {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: Error | null;
}

export const useAuth = () => {
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<AuthStatus>({
    isLoggedIn: false,
    isLoading: true,
    error: null,
  });

  const checkAuthStatus = async () => {
    try {
      const res = await fetch('/api/auth/status');
      const data = await res.json();
      
      setAuthStatus({
        isLoggedIn: data.isLoggedIn,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setAuthStatus({
        isLoggedIn: false,
        isLoading: false,
        error: error instanceof Error ? error : new Error('Authentication check failed'),
      });
    }
  };

  const signOut = async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
      setAuthStatus({
        isLoggedIn: false,
        isLoading: false,
        error: null,
      });
      router.push('/');
    } catch (error) {
      setAuthStatus(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error('Sign out failed'),
      }));
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return {
    ...authStatus,
    signOut,
    refreshAuthStatus: checkAuthStatus,
  };
};