'use client';

import React from 'react';
import {
  Box,
  Button,
  Center,
  Container,
  Grid,
  Heading,
  Spacer,
  Text,
} from '@/lib/chakraui';

// export const signInFormSchema = z.object({
//   email: z.string().email({ message: '正しい形式で入力してください' }),
//   password: z.string().min(1, { message: 'パスワードを入力してください' }),
// });

// type SignInFormSchemaType = z.infer<typeof signInFormSchema>;

export default function SignIn() {
  //   const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<SignInFormSchemaType>({
  //     resolver: zodResolver(signInFormSchema),
  //     defaultValues: {
  //       email: '',
  //       password: '',
  //     },
  //   });

  //   const [isLoading, setIsLoading] = useState<boolean>(false);
  //   const toast = useToast();

  //   const onSubmit = async (data: SignInFormSchemaType) => {
  //     setIsLoading(true);
  //     try {
  //       const auth = getAuth();
  //       await signInWithEmailAndPassword(auth, data.email, data.password);
  //       toast({
  //         title: 'ログインしました。',
  //         status: 'success',
  //         position: 'top',
  //       });
  //     } catch (error) {
  //       if (error instanceof FirebaseError) {
  //         toast({
  //           title: 'メールアドレスまたは、パスワードが違います。',
  //           status: 'error',
  //           position: 'top',
  //         });
  //       }
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   useEffect(() => {
  //     initializeFirebaseApp;
  //   }, []);

  return (
    <Container py={14}>
      <Heading>プロフィール</Heading>
      <Spacer height={8} aria-hidden />
      <Grid gap={4}>
        <Box display="contents">
          <Box>
            <Text>メールアドレス</Text>
          </Box>
        </Box>
      </Grid>
      <Spacer height={4} aria-hidden />
      <Center>
        <Button type="button" colorScheme="red">
          ログアウト
        </Button>
      </Center>
    </Container>
  );
}
