// hooks/Auth/authGoogle.ts
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const ANDROID_CLIENT_ID = '18569793904-p0mshh7c0dnjdhkkbjjedghanher41d5.apps.googleusercontent.com'; // (Android OAuth client)
const WEB_CLIENT_ID = '18569793904-3rr67du5enddqfbpcsodnpidlporfl3h.apps.googleusercontent.com'; // (Web OAuth client)

type UseAuthGoogleReturn = {
  request: any | null;
  response: any | null;
  promptAsync: () => Promise<any>;
  user: any | null;
  loading: boolean;
  error: string | null;
  signOut: () => void;
};

export default function useAuthGoogle(): UseAuthGoogleReturn {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Detectar si estamos ejecutando en Expo Go (proxy) o en standalone/dev-client
  const appOwnership = Constants.appOwnership; // 'expo' cuando es Expo Go
  const isExpoGo = appOwnership === 'expo';

  // REDIRECT URI: forzar el proxy de Expo cuando estemos en Expo Go
  const proxyRedirectUri = 'https://auth.expo.io/@niki-nicole/turnito';
  // fallback: makeRedirectUri si no quieres forzar o para otros entornos
  const autoRedirectUri = AuthSession.makeRedirectUri({ useProxy: true });

  // Decide redirectUri final
  const redirectUri = isExpoGo ? proxyRedirectUri : autoRedirectUri;
  console.log('[DEBUG] appOwnership =', appOwnership);
  console.log('[DEBUG] isExpoGo =', isExpoGo);
  console.log('[DEBUG] redirectUri final =', redirectUri);

  /**
   * IMPORTANTE: si estamos en Expo Go, forzamos clientId = WEB_CLIENT_ID (no androidClientId)
   * Si estamos en standalone (apk / dev-client), pasamos androidClientId para que la librería
   * pueda usarlo en Android.
   */
  const clientConfig: any = {
    clientId: WEB_CLIENT_ID, // por defecto usar web client
    redirectUri,
    scopes: ['openid', 'profile', 'email'],
  };

  if (!isExpoGo && Platform.OS === 'android') {
    // sólo en builds instaladas (no Expo Go) añade androidClientId
    clientConfig.androidClientId = ANDROID_CLIENT_ID;
  }

  // request/response/promptAsync del provider de Google
  const [request, response, promptAsync] = Google.useAuthRequest(clientConfig as any);

  // DEBUG: imprimir request cuando esté listo
  useEffect(() => {
    console.log('[DEBUG] Google.useAuthRequest -> request:', request);
  }, [request]);

  const fetchUserInfo = useCallback(async (accessToken: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch userinfo: ${res.status} ${res.statusText} - ${text}`);
      }

      const userInfo = await res.json();
      setUser(userInfo);
      return userInfo;
    } catch (err: any) {
      console.error('[authGoogle] fetchUserInfo error:', err);
      setError(err?.message ?? 'Error al obtener información del usuario.');
      setUser(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (!response) return;

        console.log('[DEBUG] response completa de Google:', JSON.stringify(response, null, 2));

        if (response.type === 'success') {
          setError(null);

          const maybeAccessToken =
            (response as any).authentication?.accessToken ??
            (response as any).params?.access_token;

          if (maybeAccessToken) {
            await fetchUserInfo(maybeAccessToken);
            return;
          }

          const code = (response as any).params?.code;
          if (code) {
            const message = 'Auth success but received authorization code. Exchange it for tokens on your server.';
            console.warn('[authGoogle] ', message, 'code:', code);
            setError(message);
            setUser(null);
            return;
          }

          setError('Autenticación completada pero no se obtuvo access token ni code.');
          setUser(null);
          return;
        }

        if (response.type === 'error') {
          const respErr =
            (response as any).error ??
            (response as any).params?.error_description ??
            JSON.stringify(response);

          setError(String(respErr));
          console.error('[authGoogle] auth error response:', response);
          return;
        }

        if (response.type === 'dismiss' || response.type === 'cancel') {
          console.info('[authGoogle] user dismissed/cancelled auth:', response.type);
        }
      } catch (err: any) {
        console.error('[authGoogle] unexpected error handling response:', err);
        setError(err?.message ?? 'Error inesperado en el flujo de autenticación.');
      }
    })();
  }, [response, fetchUserInfo]);

  const signOut = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  const startAuth = useCallback(async () => {
    try {
      setError(null);

      if (!request) {
        const msg = 'Auth request not ready yet.';
        console.warn('[authGoogle] startAuth: request not ready');
        setError(msg);
        return;
      }

      console.log('[DEBUG] Ejecutando promptAsync()...');
      // no pasamos useProxy aquí para evitar problemas de tipos; ya determinamos redirectUri arriba
      const res = await promptAsync();
      console.log('[DEBUG] promptAsync() returned:', res);
      return res;
    } catch (err: any) {
      console.error('[authGoogle] promptAsync error:', err);
      setError(err?.message ?? 'Error al iniciar la autenticación.');
      throw err;
    }
  }, [promptAsync, request]);

  return {
    request: request ?? null,
    response: response ?? null,
    promptAsync: startAuth,
    user,
    loading,
    error,
    signOut,
  };
}
