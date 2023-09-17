import { Container } from '@/lib/chakraui';

type Props = { children: React.ReactNode };

export default function Main({ children }: Props) {
  return (
    <Container as="main" maxW="container.lg" my="4">
      {children}
    </Container>
  );
}
