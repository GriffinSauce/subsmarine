import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import { useEffect } from 'react';

const useRedirectUnauthenticated = (redirectTo: string): void => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.push(redirectTo);
  }, [user, isLoading, router, redirectTo]);
};

export default useRedirectUnauthenticated;
