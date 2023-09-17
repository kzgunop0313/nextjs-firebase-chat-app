'use client';

import React from 'react';
import Profile from './components/Profile';
import SignOut from './components/SignOut';
import AuthGuard from '@/auth/AuthGuard';
import { useAuthContext } from '@/auth/AuthProvider';
import { Center, Container, Heading, Spacer } from '@/lib/chakraui';

export default function MyPage() {
  const { user } = useAuthContext();

  return (
    <AuthGuard>
      <Container py={14}>
        <Heading>プロフィール</Heading>
        <Spacer height={8} aria-hidden />
        <Profile user={user} />
        <Spacer height={4} aria-hidden />
        <Center>
          <SignOut />
        </Center>
      </Container>
    </AuthGuard>
  );
}
