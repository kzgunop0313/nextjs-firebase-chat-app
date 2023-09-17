'use client';

import NextLink from 'next/link';
import { useAuthContext } from '@/auth/AuthProvider';
import { Box, Flex, Heading, Button, ButtonGroup } from '@/lib/chakraui';

export default function Header() {
  const { user } = useAuthContext();

  return (
    <Box as="header">
      <Flex
        bg="white"
        color="gray.600"
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor="gray.200"
        align="center"
      >
        <Flex flex={1} justify="space-between" maxW="5xl" mx="auto">
          <Heading as="h1" size="lg">
            <NextLink href="/">チャットアプリ</NextLink>
          </Heading>
          {user ? (
            <Button
              as={NextLink}
              fontSize="sm"
              fontWeight={600}
              color="white"
              bg="blue.400"
              href="/profile"
              _hover={{
                bg: 'blue.400',
              }}
            >
              マイページ
            </Button>
          ) : (
            <ButtonGroup>
              <Button
                as={NextLink}
                fontSize="sm"
                fontWeight={600}
                color="white"
                bg="blue.400"
                href="/signup"
                _hover={{
                  bg: 'blue.400',
                }}
              >
                会員登録
              </Button>
              <Button
                as={NextLink}
                fontSize="sm"
                fontWeight={600}
                color="white"
                bg="blue.400"
                href="/signin"
                _hover={{
                  bg: 'blue.400',
                }}
              >
                ログイン
              </Button>
            </ButtonGroup>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}
