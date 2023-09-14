import NextLink from 'next/link';
import { Box, Flex, Heading, Button } from '@/lib/chakraui';

export default function Header() {
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
          <Button
            as={NextLink}
            fontSize="sm"
            fontWeight={600}
            color="white"
            bg="blue.400"
            href="/signup"
            _hover={{
              bg: 'blue.300',
            }}
          >
            サインイン
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
