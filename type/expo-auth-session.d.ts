// types/expo-auth-session.d.ts

declare module 'expo-auth-session' {
  // Extendemos las opciones de redirect para permitir useProxy
  interface AuthSessionRedirectUriOptions {
    useProxy?: boolean;
  }

  // Declaramos la función makeRedirectUri para que TS la reconozca
  function makeRedirectUri(options?: AuthSessionRedirectUriOptions): string;
}
