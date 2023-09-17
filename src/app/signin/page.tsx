'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
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

const signInFormSchema = z.object({
  email: z.string().email({ message: '正しい形式で入力してください' }),
  password: z.string().min(1, { message: 'パスワードを入力してください' }),
});

type SignInFormSchemaType = z.infer<typeof signInFormSchema>;

export default function SignIn() {
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormSchemaType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const onSubmit = async (data: SignInFormSchemaType) => {
    setIsLoading(true);
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: 'ログインしました。',
        status: 'success',
        position: 'top',
      });
      push('/chat');
    } catch (error) {
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
    <Container py={14}>
      <Heading>ログイン</Heading>
      <chakra.form onSubmit={handleSubmit(onSubmit)}>
        <Spacer height={8} aria-hidden />
        <Grid gap={4}>
          <Box display="contents">
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
              <FormLabel htmlFor="password">パスワード</FormLabel>
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
          <Button type="submit" colorScheme="green" isLoading={isLoading}>
            ログイン
          </Button>
        </Center>
      </chakra.form>
    </Container>
  );
}
