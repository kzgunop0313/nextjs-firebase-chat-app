'use client';

import { onChildAdded, ref } from 'firebase/database';
import React, { useEffect, useRef, useState } from 'react';
import Message from './components/Message';
import SendMessage from './components/SendMessage';
import { Chat as ChatType } from './types';
import AuthGuard from '@/auth/AuthGuard';
import { useAuthContext } from '@/auth/AuthProvider';
import { Container, Flex, Heading, Spacer, Spinner } from '@/lib/chakraui';
import { db } from '@/lib/firebase';

export default function Chat() {
  const messagesElementRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuthContext();
  const [chats, setChats] = useState<ChatType[]>([]);

  useEffect(() => {
    try {
      const dbRef = ref(db, 'chat');
      return onChildAdded(dbRef, (snapshot) => {
        const value = snapshot.val();
        setChats((prev) =>
          [...prev, value].sort((a, b) => a.createdAt - b.createdAt),
        );
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    messagesElementRef.current?.scrollTo({
      top: messagesElementRef.current.scrollHeight,
    });
  }, [chats]);

  return (
    user && (
      <AuthGuard>
        <Container py={14}>
          <Heading>チャット</Heading>
          <Spacer height={4} aria-hidden />
          <Flex
            flexDirection="column"
            overflowY="auto"
            gap={4}
            height={500}
            ref={messagesElementRef}
            paddingBottom={8}
          >
            {chats.length > 0 ? (
              chats.map((chat, index) => (
                <Message
                  key={index}
                  chat={chat}
                  isMyMessage={chat.uid === user.uid}
                />
              ))
            ) : (
              <Flex
                alignItems="center"
                justifyContent="center"
                ringColor="blue.400"
              >
                <Spinner
                  thickness="4px"
                  size="xl"
                  emptyColor="gray.200"
                  color="blue.400"
                />
              </Flex>
            )}
          </Flex>
          <SendMessage user={user} />
        </Container>
      </AuthGuard>
    )
  );
}