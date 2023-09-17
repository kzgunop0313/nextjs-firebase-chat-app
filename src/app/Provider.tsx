'use client';

import { ChakraProvider } from '@chakra-ui/react';
import AuthProvider from '@/auth/AuthProvider';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <AuthProvider>{children}</AuthProvider>
    </ChakraProvider>
  );
}
