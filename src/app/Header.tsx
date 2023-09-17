'use client';

import Link from 'next/link';
import { useAuthContext } from '@/auth/AuthProvider';
import { Flex, Heading, Button, ButtonGroup, chakra } from '@/lib/chakraui';

export default function Header() {
  const { user } = useAuthContext();

  return (
    <chakra.header as="header" py={4}>
      <Flex
        bg="white"
        minH="60px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor="gray.200"
        align="center"
      >
        <Flex flex={1} justify="space-between" maxW="5xl" mx="auto">
          <Heading as="h1" size="lg">
            <Link href="/chat">チャットアプリ</Link>
          </Heading>
          {user ? (
            <Link href="/mypage">
              <Button
                fontSize="sm"
                fontWeight={600}
                color="white"
                bg="blue.400"
                _hover={{
                  bg: 'blue.400',
                }}
              >
                マイページ
              </Button>
            </Link>
          ) : (
            <ButtonGroup>
              <Link href="/signup">
                <Button
                  fontSize="sm"
                  fontWeight={600}
                  color="white"
                  bg="blue.400"
                  _hover={{
                    bg: 'blue.400',
                  }}
                >
                  会員登録
                </Button>
              </Link>
              <Link href="/signin">
                <Button
                  fontSize="sm"
                  fontWeight={600}
                  color="white"
                  bg="blue.400"
                  _hover={{
                    bg: 'blue.400',
                  }}
                >
                  ログイン
                </Button>
              </Link>
            </ButtonGroup>
          )}
        </Flex>
      </Flex>
    </chakra.header>
  );
}
