import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const role = typeof searchParams.role === 'string' ? searchParams.role : 'student';

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm role={role} />
      </Suspense>
    </div>
  );
}
