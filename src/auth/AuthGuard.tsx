'use client';

import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useAuthContext } from './AuthProvider';
import { Box, Center, Flex, Spinner } from '@/lib/chakraui';

type Props = {
  children: ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { user } = useAuthContext();
  const { push } = useRouter();

  if (typeof user === 'undefined') {
    return (
      <Flex alignItems="center" justifyContent="center">
        <Spinner
          thickness="4px"
          size="xl"
          emptyColor="gray.200"
          color="blue.400"
        />
      </Flex>
    );
  }

  if (user === null) {
    push('/signin');
    return null;
  }

  return <>{children}</>;
}
