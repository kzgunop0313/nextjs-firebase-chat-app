import AuthGuard from '@/auth/AuthGuard';

export default function Home() {
  return (
    <AuthGuard>
      <main>
        <div>チャットアプリ</div>
      </main>
    </AuthGuard>
  );
}
