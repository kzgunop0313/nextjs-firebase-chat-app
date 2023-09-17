'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from 'firebase/auth';
import { push, ref } from 'firebase/database';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  chakra,
  useToast,
} from '@/lib/chakraui';
import { db } from '@/lib/firebase';

const sendMessageFormSchema = z.object({
  message: z
    .string()
    .max(100, { message: '100文字以内で入力してください。' })
    .min(1, { message: 'メッセージを入力してください' }),
});

type SendMessageFormSchemaType = z.infer<typeof sendMessageFormSchema>;
type Props = { user: User };

export default function SendMessage({ user }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SendMessageFormSchemaType>({
    resolver: zodResolver(sendMessageFormSchema),
    defaultValues: {
      message: '',
    },
  });

  const toast = useToast();

  const onSubmit = async (data: SendMessageFormSchemaType) => {
    try {
      const dbRef = ref(db, 'chat');
      await push(dbRef, {
        message: data.message,
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      setValue('message', '');
    } catch (error) {
      toast({
        title: 'エラーが発生しました。',
        status: 'error',
        position: 'top',
      });
    }
  };

  return (
    <chakra.form onSubmit={handleSubmit(onSubmit)} display="flex" gap={2}>
      <FormControl isInvalid={Boolean(errors.message)}>
        <Input
          type="text"
          id="message"
          placeholder="メッセージを送信"
          {...register('message')}
        />
        <FormErrorMessage>
          {errors.message && errors.message.message}
        </FormErrorMessage>
      </FormControl>
      <Button type="submit" colorScheme="green">
        送信
      </Button>
    </chakra.form>
  );
}
