# リアルタイムチャットアプリケーション

## 技術スタック

### フロントエンド

- Next.js

### バックエンド

- Firebase Authentication
- Firebase Realtime Database

### インフラ

- Vercel

## 質問事項への回答

### 自分の強みが発揮されているコードはどこですか？またそれはなぜですか？

1つ目

該当コード(/src/app/chat/page.tsx)

```typescript
useEffect(() => {
  try {
    const dbRef = ref(db, 'chat');
    return onChildAdded(dbRef, (snapshot) => {
      const value = snapshot.val();
      setChats((prev) =>
        [...prev, value].sort((a, b) => a.createdAt - b.createdAt),
      );
    });
  } catch (error) {
    console.error(error);
  }
}, []);
```

理由  
リアルタイムでのチャットを実装するために、Firebase Realtime Databaseを使用してデータの取得と監視を行い、データの更新をuseEffect内で処理するコードを示します。

2つ目

該当コード(/src/app/chat/page.tsx)

```typescript
useEffect(() => {
  messagesElementRef.current?.scrollTo({
    top: messagesElementRef.current.scrollHeight,
  });
}, [chats]);
```

理由  
chatsが更新されたとき、スクロールを操作することでメッセージを送信したとき、自分の送信したメッセージを見ることが出来ます。これによりUXが向上させてます。

2つ目

該当コード(/src/app/signup/page.tsx)

```typescript
const signUpFormSchema = z.object({
  username: z
    .string()
    .max(10, { message: '10文字以内で入力してください。' })
    .min(1, { message: '名前を入力してください' }),
  email: z.string().email({ message: '正しい形式で入力してください' }),
  image: z
    .custom<File>((value) => value, { message: '画像を選択してください' })
    .refine((file) => file.size < 500000, {
      message: 'ファイルサイズは最大5MBです',
    })
    .refine((file) => IMAGE_TYPES.includes(file.type), {
      message: '.jpgもしくは.pngのみ可能です',
    }),
  password: z
    .string()
    .max(100, { message: '100文字以内で入力してください。' })
    .min(8, { message: '8桁以上のパスワードを入力してください' }),
});
```

理由  
React Hook FormとZodを使用してフォームを管理することで、フォームのバリデーションとデータの安全性を向上させることができます。該当コードは会員登録のバリデーションです。

3つ目

該当コード(/src/app/signup/page.tsx)

```typescript
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      setValue('image', file);
      setImagePreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  }
};
```

理由  
画像が選択されたとき、画像をプレビューで見れるようにしてあります。これによりユーザーはどんな見た目で画像が使用されるのかを確認することが出来ます。

4つ目

該当コード(/src/app/signin/page.tsx)

```typescript
const onSubmit = async (data: SignInFormSchemaType) => {
  setIsLoading(true);
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
      toast({
        title: 'メールアドレスが未確認です。',
        status: 'error',
        position: 'top',
      });
      setIsLoading(false);
      return;
    }
    await signInWithEmailAndPassword(auth, data.email, data.password);
    toast({
      title: 'ログインしました。',
      status: 'success',
      position: 'top',
    });
    push('/chat');
  } catch (error) {
    toast({
      title: 'エラーが発生しました。',
      status: 'error',
      position: 'top',
    });
  } finally {
    setIsLoading(false);
  }
};
```

理由  
フォームの送信中はボタンをローディングのアニメーションを表示にすることで、UXを向上させています。
また、送信が成功したのか失敗したのかをわかるようにtoastを表示してUXを向上させています。

5つ目

該当コード(/src/auth/AuthProvider.tsx)

```typescript
export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<GlobalAuthState>(initialState);

  useEffect(() => {
    initializeFirebaseApp();
    try {
      const auth = getAuth();
      return onAuthStateChanged(auth, (user) => {
        setUser({
          user,
        });
      });
    } catch (error) {
      setUser(initialState);
      throw error;
    }
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
```

理由  
認証状態をアプリケーション全体で取得したいと思い認証状態をグローバルに管理するProviderの作成しました。
また、userの型をUser（認証されている状態）、null（認証されていない状態undefined（初期値の状態）にしました。

6つ目

該当コード(/src/auth/AuthGuard.tsx)

```typescript
export default function AuthGuard({ children }: Props) {
  const { user } = useAuthContext();
  const { push } = useRouter();

  if (typeof user === 'undefined') {
    return (
      <Flex alignItems="center" justifyContent="center" ringColor="blue.400">
        <Spinner
          thickness="4px"
          size="xl"
          emptyColor="gray.200"
          color="blue.400"
        />
      </Flex>
    );
  }

  if (user === null || !user.emailVerified) {
    push('/');
    return null;
  }

  return children;
}
```

理由  
認証しているか判定して認証していない場合はトップ画面に遷移させるAuthGuardを作成しました。これにより未ログイン状態でチャット画面やマイページ画面を閲覧出来ないようにしています。

### どのような拡張性を想定し、何をもって備えていますか？

1. ReactHookFormとZodを使用して、フォームを作成しているので仮に将来的にフォームの項目が増えたり、バリデーションを変更したい場合などに容易に対応することが出来ます。

2. Next.jsのApp Routerを使用して開発しているのでページによってlayoutを変えたり、ルーティングとレイアウトの関連性が明確なのでコードの整理と保守性が向上します。

3. ESLintとPrettierを導入しているため、私以外のエンジニアがコードを書く際でも、コードフォーマットのコンフリクト解消に役立ち、コード品質向上やコーディング規約の遵守を支援します。

4. GitHub Actionsを導入しているため、コードの品質向上、継続的なデリバリーの自動化、可視性の向上など、ソフトウェア開発プロセスを効率的かつ信頼性の高いものに出来ます。
