import { User } from 'firebase/auth';
import React from 'react';
import { Box, FormLabel, Grid, Image, Text } from '@/lib/chakraui';

type Props = {
  user?: User | null;
};

export default function Profile({ user }: Props) {
  return (
    <Grid gap={2}>
      <Box display="contents">
        <Text>ユーザー名</Text>
        {user?.displayName && <Text>{user.displayName}</Text>}
        <Text>ユーザー画像</Text>
        {user?.photoURL && (
          <Image
            src={user.photoURL}
            alt="ユーザー画像"
            borderRadius="full"
            boxSize="100px"
          />
        )}
        <FormLabel htmlFor="email">メールアドレス</FormLabel>
        {user?.email && <Text>{user.email}</Text>}
      </Box>
    </Grid>
  );
}
