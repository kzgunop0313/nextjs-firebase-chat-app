'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AuthGuard from '@/auth/AuthGuard';
import { useAuthContext } from '@/auth/AuthProvider';
import { IMAGE_TYPES } from '@/constants/imageType';
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Image,
  Input,
  Spacer,
  Text,
  chakra,
  useToast,
} from '@/lib/chakraui';

const profileFormSchema = z.object({
  username: z
    .string()
    .max(10, { message: '10文字以内で入力してください。' })
    .min(1, { message: '名前を入力してください' }),
  image: z
    .custom<File>((value) => value)
    .refine((file) => file.size < 500000, {
      message: 'ファイルサイズは最大5MBです',
    })
    .refine((file) => IMAGE_TYPES.includes(file.type), {
      message: '.jpgもしくは.pngのみ可能です',
    }),
});

type ProfileFormSchemaType = z.infer<typeof profileFormSchema>;

export default function Profile() {
  const { user } = useAuthContext();
  const { push } = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormSchemaType>({
    resolver: zodResolver(profileFormSchema),
  });
  const [isLoadingSignOut, setIsLoadingSignOut] = useState<boolean>(false);
  const [isLoadingProfileUpdate, setIsLoadingProfileUpdate] =
    useState<boolean>(false);
  const toast = useToast();

  const onSubmit = (data: ProfileFormSchemaType) => {
    setIsLoadingProfileUpdate(true);
    try {
      const auth = getAuth();
      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: data.username,
        });
        toast({
          title: '変更されました。',
          status: 'success',
          position: 'top',
        });
      }
    } catch (error) {
      toast({
        title: 'エラーが発生しました。',
        status: 'error',
        position: 'top',
      });
    } finally {
      setIsLoadingProfileUpdate(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoadingSignOut(true);
    try {
      const auth = getAuth();
      await signOut(auth);
      toast({
        title: 'ログアウトしました。',
        status: 'success',
        position: 'top',
      });
      push('/signin');
    } catch (e) {
      toast({
        title: 'エラーが発生しました。',
        status: 'error',
        position: 'top',
      });
    } finally {
      setIsLoadingSignOut(false);
    }
  };

  useEffect(() => {
    if (user && user.displayName) {
      setValue('username', user.displayName);
    }
  }, [setValue, user]);

  return (
    <AuthGuard>
      <Container py={14}>
        <Heading>プロフィール</Heading>
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
              <FormControl>
                <FormLabel htmlFor="file">ユーザー画像</FormLabel>
                {user?.photoURL && (
                  <Image
                    src={user.photoURL}
                    alt="ユーザー画像"
                    borderRadius="full"
                    boxSize="100px"
                  />
                )}
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="email">メールアドレス</FormLabel>
                {user?.email && <Text>{user.email}</Text>}
              </FormControl>
            </Box>
          </Grid>
          <Spacer height={4} aria-hidden />
          <Center>
            <ButtonGroup gap={4}>
              <Button
                type="button"
                colorScheme="red"
                onClick={handleSignOut}
                isLoading={isLoadingSignOut}
              >
                ログアウト
              </Button>
              <Button
                type="submit"
                colorScheme="green"
                isLoading={isLoadingProfileUpdate}
              >
                変更する
              </Button>
            </ButtonGroup>
          </Center>
        </chakra.form>
      </Container>
    </AuthGuard>
  );
}
