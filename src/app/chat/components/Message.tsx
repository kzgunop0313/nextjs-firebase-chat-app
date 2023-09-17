import React from 'react';
import { Chat } from '../types';
import { Box, Flex, Text, Image } from '@/lib/chakraui';

type Props = {
  chat: Chat;
  isMyMessage: boolean;
};

export default function Message({ chat, isMyMessage }: Props) {
  return (
    <Flex
      alignItems="start"
      justifyContent={isMyMessage ? 'end' : 'start'}
      flexDirection={isMyMessage ? 'row-reverse' : 'row'}
    >
      <Image
        src={chat.photoURL}
        alt="ユーザー画像"
        borderRadius="full"
        boxSize="50px"
      />
      <Box ml={2}>
        <Text fontSize="sm">{chat.displayName}</Text>
        <Text bgColor="gray.200" rounded="md" px={2} py={1}>
          {chat.message}
        </Text>
      </Box>
    </Flex>
  );
}
