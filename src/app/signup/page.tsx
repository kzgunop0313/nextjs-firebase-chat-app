'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
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
  Image,
  Input,
  Spacer,
  chakra,
  useToast,
} from '@/lib/chakraui';
import { storage } from '@/lib/firebase';

const IMAGE_TYPES = ['image/jpeg', 'image/png'];

const signUpFormSchema = z.object({
  username: z
    .string()
    .max(10, { message: '10文字以内で入力してください。' })
    .min(1, { message: '名前を入力してください' }),
  email: z.string().email({ message: '正しい形式で入力してください' }),
  image: z
    .custom<File>((value) => value, { message: '画像を選択してください' })
    .refine((file) => file.size < 500000, {
      message: 'ファイルサイズは最大5MBです',
    })
    .refine((file) => IMAGE_TYPES.includes(file.type), {
      message: '.jpgもしくは.pngのみ可能です',
    }),
  password: z
    .string()
    .max(100, { message: '100文字以内で入力してください。' })
    .min(8, { message: '8桁以上のパスワードを入力してください' }),
});

type SignUpFormSchemaType = z.infer<typeof signUpFormSchema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      image: undefined,
      username: '',
      email: '',
      password: '',
    },
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setValue('image', file);
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: SignUpFormSchemaType) => {
    setIsLoading(true);
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const storageRef = ref(
        storage,
        `profile-images/${userCredential.user.uid}.jpg`,
      );
      await uploadBytes(storageRef, data.image);
      const downloadURL = await getDownloadURL(storageRef);
      updateProfile(userCredential.user, {
        displayName: data.username,
        photoURL: downloadURL,
      });
      await sendEmailVerification(userCredential.user, {
        url: 'https://nextjs-firebase-chat-app.vercel.app/signin',
      });
      toast({
        title: '確認メールが送信されました。',
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
            <FormControl isInvalid={Boolean(errors.username)}>
              <FormLabel htmlFor="useName">ユーザー画像</FormLabel>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
              />
              <FormErrorMessage>
                {errors.image && errors.image.message}
              </FormErrorMessage>
              <Spacer height={4} aria-hidden />
              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="選択された画像のプレビュー"
                  borderRadius="full"
                  boxSize="100px"
                />
              )}
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
          <Button type="submit" colorScheme="green" isLoading={isLoading}>
            アカウントを作成
          </Button>
        </Center>
      </chakra.form>
    </Container>
  );
}
