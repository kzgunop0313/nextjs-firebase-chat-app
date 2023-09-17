import { Container } from '@/lib/chakraui';

type Props = { children: React.ReactNode };

export default function Main({ children }: Props) {
  return (
    <Container
      as="main"
      maxW="container.lg"
      my="4"
      minH="calc(100vh - 115px - 2rem)"
    >
      {children}
    </Container>
  );
}
