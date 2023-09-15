'use client';

import { AuthProvider } from '@/auth/AuthProvider';
import { ChakraProvider } from '@chakra-ui/react';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <AuthProvider>{children}</AuthProvider>
    </ChakraProvider>
  );
}
