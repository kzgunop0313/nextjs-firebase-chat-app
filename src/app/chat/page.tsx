'use client';

import { onChildAdded, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import Message from './components/Message';
import SendMessage from './components/SendMessage';
import { Chat as ChatType } from './types';
import AuthGuard from '@/auth/AuthGuard';
import { useAuthContext } from '@/auth/AuthProvider';
import { Container, Flex, Heading, Spacer } from '@/lib/chakraui';
import { db } from '@/lib/firebase';

export default function Chat() {
  const { user } = useAuthContext();
  const [chats, setChats] = useState<ChatType[]>([]);

  useEffect(() => {
    try {
      const dbRef = ref(db, 'chat');
      return onChildAdded(dbRef, (snapshot) => {
        const value = snapshot.val();
        setChats((prev) => [...prev, value]);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    user && (
      <AuthGuard>
        <Container py={14}>
          <Heading>チャット</Heading>
          <Spacer height={4} aria-hidden />
          <Flex
            flexDirection={'column'}
            overflowY={'auto'}
            gap={2}
            height={400}
          >
            {chats.map((chat, index) => (
              <Message
                key={index}
                chat={chat}
                isMyMessage={chat.uid === user.uid}
              />
            ))}
          </Flex>
          <SendMessage user={user} />
        </Container>
      </AuthGuard>
    )
  );
}
