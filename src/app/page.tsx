import { Button, Container, Link, Text, Flex } from '@/lib/chakraui';

export default function Home() {
  return (
    <Container py={14}>
      <Flex flexDirection="column" gap={4}>
        <Text fontSize="xl">はじめて利用される方</Text>
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
        <Text fontSize="xl">アカウントをお持ちの方</Text>
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
      </Flex>
    </Container>
  );
}
