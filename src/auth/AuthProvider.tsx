'use client';

import { initializeFirebaseApp } from '@/lib/firebase';
import type { User } from '@firebase/auth';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

export type GlobalAuthState = {
  user: User | null | undefined;
};
const initialState: GlobalAuthState = {
  user: undefined,
};
const AuthContext = createContext<GlobalAuthState>(initialState);

type Props = { children: ReactNode };

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<GlobalAuthState>(initialState);

  useEffect(() => {
    initializeFirebaseApp;
    try {
      const auth = getAuth();
      return onAuthStateChanged(auth, (user) => {
        setUser({
          user,
        });
      });
    } catch (error) {
      setUser(initialState);
      throw error;
    }
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
