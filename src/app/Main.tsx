import { Container } from '@/lib/chakraui';

type Props = { children: React.ReactNode };

export default function Main({ children }: Props) {
  return (
    <Container as="main" maxW={'100%'} my="4">
      {children}
    </Container>
  );
}
