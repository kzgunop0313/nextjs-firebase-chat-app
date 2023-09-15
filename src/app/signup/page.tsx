'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Input,
  Spacer,
  chakra,
  useToast,
} from '@/lib/chakraui';
import { initializeFirebaseApp } from '@/lib/firebase';

export const signUpFormSchema = z.object({
  username: z.string().min(1, { message: '名前を入力してください' }),
  email: z.string().email({ message: '正しい形式で入力してください' }),
  password: z
    .string()
    .min(8, { message: '8桁以上のパスワードを入力してください' }),
});

type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const onSubmit = async (data: SignUpFormSchemaType) => {
    setIsLoading(true);
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      updateProfile(userCredential.user, {
        displayName: data.username,
      });
      await sendEmailVerification(userCredential.user);
      toast({
        title: '確認メールを送信しました。',
        status: 'success',
        position: 'top',
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/email-already-in-use':
            toast({
              title: 'すでに登録済みのメールアドレスです。',
              status: 'error',
              position: 'top',
            });
            break;
          default:
            toast({
              title: 'エラーが発生しました。',
              status: 'error',
              position: 'top',
            });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container py={14}>
      <Heading>会員登録</Heading>
      <chakra.form onSubmit={handleSubmit(onSubmit)}>
        <Spacer height={8} aria-hidden />
        <Grid gap={4}>
          <Box display="contents">
            <FormControl isInvalid={Boolean(errors.username)}>
              <FormLabel htmlFor="useName">ユーザー名</FormLabel>
              <Input
                type="text"
                id="username"
                placeholder="ユーザー名"
                {...register('username')}
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor="email">メールアドレス</FormLabel>
              <Input
                type="email"
                id="email"
                placeholder="your@email.com"
                {...register('email')}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.password)}>
              <FormLabel htmlFor="password">パスワード(8文字以上)</FormLabel>
              <Input
                type="password"
                id="password"
                placeholder="パスワード"
                {...register('password')}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
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
