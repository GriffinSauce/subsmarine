import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { useEffect } from 'react';

const useRedirectUnauthenticated = (redirectTo: string): void => {
  const router = useRouter();
  const [session, loading] = useSession();

  useEffect(() => {
    if (!(session?.user || loading)) {
      router.push(redirectTo);
    }
  }, [session?.user, loading, router, redirectTo]);
};

export default useRedirectUnauthenticated;
