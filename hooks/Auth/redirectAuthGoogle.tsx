// hooks/Auth/useGoogleAuthWithRedirect.ts
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import useAuthGoogle from './authGoogle';

type UseGoogleAuthWithRedirectReturn = {
  loginWithGoogle: () => Promise<void>;
  user: any | null;
  loading: boolean;
  error: string | null;
};

export default function useGoogleAuthWithRedirect(
  targetRoute: string = '/pages/Instructions'
): UseGoogleAuthWithRedirectReturn {
  const router = useRouter();
  const { promptAsync, user, loading, error } = useAuthGoogle();

  const loginWithGoogle = useCallback(async () => {
    try {
      const res = await promptAsync();
      console.log('[useGoogleAuthWithRedirect] promptAsync result:', res);

      if (res?.type === 'success') {
        console.log('[useGoogleAuthWithRedirect] Login OK, redirigiendo a', targetRoute);
        router.replace(targetRoute);
      } else if (res?.type === 'cancel' || res?.type === 'dismiss') {
        console.log('[useGoogleAuthWithRedirect] Usuario canceló/cerró el login');
      } else if (res?.type === 'error') {
        console.log('[useGoogleAuthWithRedirect] Error en login:', res.error);
      }
    } catch (e) {
      console.error('[useGoogleAuthWithRedirect] Error al iniciar sesión', e);
    }
  }, [promptAsync, router, targetRoute]);

  return {
    loginWithGoogle,
    user,
    loading,
    error,
  };
}
