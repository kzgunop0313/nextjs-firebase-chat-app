'use client';

import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
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
  useToast,
} from '@/lib/chakraui';
import { initializeFirebaseApp } from '@/lib/firebase';

export default function SignUp() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email);
    setIsLoading(true);
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await sendEmailVerification(userCredential.user);
      setEmail('');
      setPassword('');
      toast({
        title: '確認メールを送信しました。',
        status: 'success',
        position: 'top',
      });
    } catch (error) {
      toast({
        title: 'エラーが発生しました。',
        status: 'error',
        position: 'top',
      });
      if (error instanceof FirebaseError) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initializeFirebaseApp;
  }, []);

  return (
    <Container py={14}>
      <Heading>サインアップ</Heading>
      <chakra.form onSubmit={handleSubmit}>
        <Spacer height={8} aria-hidden />
        <Grid gap={4}>
          <Box display="contents">
            <FormControl>
              <FormLabel>メールアドレス</FormLabel>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>パスワード</FormLabel>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FormControl>
          </Box>
        </Grid>
        <Spacer height={4} aria-hidden />
        <Center>
          <Button type="submit" isLoading={isLoading}>
            アカウントを作成
          </Button>
        </Center>
      </chakra.form>
    </Container>
  );
}
