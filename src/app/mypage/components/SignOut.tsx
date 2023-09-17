'use client';

import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button, useToast } from '@/lib/chakraui';

export default function SignOut() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const auth = getAuth();
      await signOut(auth);
      toast({
        title: 'ログアウトしました。',
        status: 'success',
        position: 'top',
      });
      push('/');
    } catch (e) {
      toast({
        title: 'エラーが発生しました。',
        status: 'error',
        position: 'top',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      colorScheme="red"
      onClick={handleSignOut}
      isLoading={isLoading}
    >
      ログアウト
    </Button>
  );
}
