'use client';

import Link from 'next/link';
import { useAuthContext } from '@/auth/AuthProvider';
import { pagesPath } from '@/lib/$path';
import { Flex, Heading, Button, ButtonGroup, chakra } from '@/lib/chakraui';

export default function Header() {
  const { user } = useAuthContext();

  return (
    <chakra.header as="header" p={4}>
      <Flex
        bg="white"
        minH="60px"
        borderBottom={1}
        borderStyle="solid"
        borderColor="gray.200"
        align="center"
      >
        <Flex flex={1} justify="space-between" maxW="5xl" mx="auto">
          <Heading as="h1" size="lg">
            <Link href={pagesPath.chat.$url().pathname}>チャットアプリ</Link>
          </Heading>
          {user && user.emailVerified ? (
            <Link href={pagesPath.mypage.$url().pathname}>
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
              <Link href={pagesPath.signup.$url().pathname}>
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
              <Link href={pagesPath.signin.$url().pathname}>
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
