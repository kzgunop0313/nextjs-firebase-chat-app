'use client';
// import { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Spacer,
  chakra,
} from '@/lib/chakraui';

export default function SignUp() {
  //   const handleSubmit = () => {};
  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');

  return (
    <Container py={14}>
      <Heading>サインアップ</Heading>
      <chakra.form>
        <Spacer height={8} aria-hidden />
        <Grid gap={4}>
          <Box display="contents">
            <FormControl>
              <FormLabel>メールアドレス</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl>
              <FormLabel>パスワード</FormLabel>
              <Input type="password" />
            </FormControl>
          </Box>
        </Grid>
        <Spacer height={4} aria-hidden />
        <Center>
          <Button type="submit">アカウントを作成</Button>
        </Center>
      </chakra.form>
    </Container>
  );
}
