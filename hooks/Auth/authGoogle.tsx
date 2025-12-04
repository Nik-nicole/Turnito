// src/hooks/Auth/authGoogle.ts
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const EXPO_CLIENT_ID =
  '18569793904-8eqqdlcuucf4hdt4uqrtl729541ued40.apps.googleusercontent.com'; // para Expo Go (dev)
const ANDROID_CLIENT_ID =
  '18569793904-cmodceen6vhubtm7a2rl1n46mn0sdlv4.apps.googleusercontent.com';
const WEB_CLIENT_ID =
  '18569793904-3rr67du5enddqfbpcsodnpidlporfl3h.apps.googleusercontent.com';

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

  const appOwnership = Constants.appOwnership; // 'expo', 'standalone' o null

  // ⚠️ AQUÍ ES DONDE CAMBIA TODO
  // Antes tenías if/else if que hacían que en Expo Go NUNCA se pusiera androidClientId.
  // Ahora:
  // - Siempre que sea Android => androidClientId
  // - Si es Expo Go => también expoClientId
  // - Si es Web => webClientId
  let config: any = {
    scopes: ['openid', 'profile', 'email'],
  };

  // Android (incluido Expo Go en Android) => NECESITA androidClientId
  if (Platform.OS === 'android') {
    config.androidClientId = ANDROID_CLIENT_ID;
  }

  // Web
  if (Platform.OS === 'web') {
    config.webClientId = WEB_CLIENT_ID;
  }

  // Expo Go (sea iOS o Android)
  if (appOwnership === 'expo') {
    config.expoClientId = EXPO_CLIENT_ID;
  }

  console.log('[AUTH] appOwnership:', appOwnership, 'Platform:', Platform.OS, 'config:', config);

  const [request, response, promptAsyncNative] = Google.useAuthRequest(config as any);

  useEffect(() => {
    if (request) {
      console.log('[AUTH] redirectUri usado por request:', request.redirectUri);
    }
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
      if (!response) return;

      console.log('[AUTH] response completo de Google:', response);
      console.log('[AUTH] Respuesta de Google recibida, tipo:', response.type);

      try {
        if (response.type === 'success') {
          setError(null);

          const accessToken =
            response.authentication?.accessToken ?? response.params?.access_token;

          if (accessToken) {
            await fetchUserInfo(accessToken);
            return;
          }

          setError('Éxito pero no se obtuvo token.');
          setUser(null);
        } else if (response.type === 'error') {
          const respErr =
            (response as any).error ?? response.params?.error_description ?? JSON.stringify(response);
          setError(String(respErr));
          console.error('[authGoogle] ERROR:', response);
        } else if (response.type === 'dismiss' || response.type === 'cancel') {
          console.log('[authGoogle] Usuario canceló/cerró login:', response.type);
          setError('Inicio de sesión cancelado o no completado.');
        }
      } catch (err: any) {
        console.error('[authGoogle] unexpected error:', err);
        setError(err?.message ?? 'Error inesperado en el flujo de autenticación.');
      }
    })();
  }, [response, fetchUserInfo]);

  const promptAsync = useCallback(async () => {
    try {
      setError(null);
      if (!request) {
        const errorMsg = 'Auth request not ready yet';
        console.error('[AUTH ERROR]', errorMsg);
        setError(errorMsg);
        return null;
      }

      console.log('[AUTH] Iniciando autenticación...');
      const result = await promptAsyncNative();
      console.log('[AUTH] Resultado de autenticación:', result?.type);
      return result;
    } catch (err: any) {
      console.error('[AUTH ERROR] Error en promptAsync:', err);
      setError(err?.message ?? 'Error al iniciar la autenticación.');
      throw err;
    }
  }, [request, promptAsyncNative]);

  const signOut = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  return {
    request,
    response,
    promptAsync,
    user,
    loading,
    error,
    signOut,
  };
}
