import { format } from 'date-fns';
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
        <Flex alignItems="center" gap={2}>
          <Text fontSize="sm">{chat.displayName}</Text>
          <Text fontSize="xs">
            {format(new Date(chat.createdAt), 'yyyy/MM/dd HH:mm')}
          </Text>
        </Flex>
        <Text bgColor="gray.200" rounded="md" px={2} py={1}>
          {chat.message}
        </Text>
      </Box>
    </Flex>
  );
}
