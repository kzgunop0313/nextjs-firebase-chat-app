'use client';

import { useRouter } from 'next/navigation';
import { useAuthContext } from './AuthProvider';
import { Flex, Spinner } from '@/lib/chakraui';

type Props = { children: React.ReactNode };

export default function AuthGuard({ children }: Props) {
  const { user } = useAuthContext();
  const { push } = useRouter();

  if (typeof user === 'undefined') {
    return (
      <Flex alignItems="center" justifyContent="center" ringColor="blue.400">
        <Spinner
          thickness="4px"
          size="xl"
          emptyColor="gray.200"
          color="blue.400"
        />
      </Flex>
    );
  }

  if (user === null || !user.emailVerified) {
    push('/');
    return null;
  }

  return children;
}
