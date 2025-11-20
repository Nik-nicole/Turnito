// src/app/RegisterCompany.tsx
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Button from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import InputText from '@/components/ui/inputText';
import useAuthGoogle from '@/hooks/Auth/authGoogle';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function RegisterCompany() {
  const router = useRouter();

  const [category, setCategory] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Desde tu hook
  const { promptAsync, user, loading: authLoading, error } = useAuthGoogle();

  // Cuando user exista, navegamos a Instructions
  useEffect(() => {
    if (user) {
      router.push('/pages/Instructions');
    }
  }, [user, router]);

  const handleSubmit = () => {
    console.log({ category, companyName, email });
  };

  // Ruta local del icono que subiste → la uso como URI de imagen.
  // (El archivo está en /mnt/data según tu historial; lo referencio con file://)
  const GOOGLE_ICON_FILE_URI = 'file:///mnt/data/4c8731a1-8ae5-4701-b1b4-813e6fbb5516.png';

  // Botón personalizado de Google
  const GoogleButton: React.FC = () => {
    const [busy, setBusy] = useState(false);

    const onPress = async () => {
      try {
        setBusy(true);
        // No pasamos useProxy: el hook decide el redirectUri correcto según entorno
        const res = await promptAsync();
        console.log('promptAsync result', res);
        // El hook procesa la respuesta (fetch userinfo). Cuando user quede en estado,
        // el useEffect arriba redirigirá automáticamente.
      } catch (e) {
        console.error('Error al iniciar Sesion', e);
      } finally {
        setBusy(false);
      }
    };

    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={styles.googleButton}
        accessibilityRole="button"
        accessibilityLabel="Registrarme con Google"
      >
        <View style={styles.googleContent}>
          <Image
            // usando el archivo local que subiste; en tu entorno local Expo Go debe poder accederlo
            source={{ uri: GOOGLE_ICON_FILE_URI }}
            style={styles.googleIcon}
            resizeMode="contain"
            accessibilityIgnoresInvertColors
          />
          <Text style={styles.googleText}>Registrarme con Google</Text>
        </View>

        {busy || authLoading ? <ActivityIndicator color="#FFFFFF" style={{ marginLeft: 10 }} /> : null}
      </TouchableOpacity>
    );
  };

  return (
    <>
      {/* Si quieres usar <Stack.Screen name="Instructions" ... /> en algún lugar del árbol,
          eso lo defines en el archivo de rutas; aquí usamos router.push('/Instructions') */}
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView style={styles.container} lightColor="#8C52FF" darkColor="#8C52FF">
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.select({ ios: 40, android: 0, web: 0 }) as number}
          >
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Volver"
                onPress={() => router.push('/pages/welcome')}
                style={styles.backButton}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              >
                <IconSymbol name={'arrow.left'} size={32} color={'#FFFFFF'} />
              </Pressable>

              <View style={styles.hero}>
                <LinearGradient
                  pointerEvents="none"
                  colors={['#EBD8FF', '#8C52FF']}
                  start={{ x: 0.8, y: 0.0 }}
                  end={{ x: 0.0, y: 1 }}
                  style={styles.heroCircle}
                />
                <View style={styles.header}>
                  <ThemedText style={styles.title} lightColor="#FFFFFF" darkColor="#FFFFFF">
                    Registro
                  </ThemedText>
                  <ThemedText style={styles.subtitle} lightColor="#FFFFFF" darkColor="#FFFFFF">
                    ¿ya tienes una cuenta <Text style={{ fontWeight: 'bold' }}>Inicia Sesión</Text>?
                  </ThemedText>
                </View>
              </View>

              <View style={styles.cardWrapper}>
                <View style={styles.badge} />

                <View style={styles.card}>
                  <View style={{ marginTop: 17 }}>
                    <Text style={styles.label}>Nombre </Text>
                  </View>
                  <InputText
                    value={companyName}
                    onChangeText={setCompanyName}
                    placeholder="Ej. Laura Sofia"
                    placeholderTextColor="#9C7DFF"
                    variant="outline"
                    color="#5A35B8"
                    borderColor="#B9A4FF"
                    borderWidth={1}
                    borderRadius={12}
                    containerStyle={{ paddingVertical: 12, paddingHorizontal: 14 }}
                    style={{ fontSize: 12 }}
                    fullWidth
                  />

                  <Text style={styles.label}>Email</Text>
                  <InputText
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholder="correo@empresa.com"
                    placeholderTextColor="#9C7DFF"
                    variant="outline"
                    color="#5A35B8"
                    borderColor="#B9A4FF"
                    borderWidth={1}
                    borderRadius={12}
                    containerStyle={{ paddingVertical: 12, paddingHorizontal: 14 }}
                    style={{ fontSize: 12 }}
                    fullWidth
                  />

                  <Text style={styles.label}>Contraseña</Text>
                  <InputText
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    clearable={false}
                    placeholder="••••••••"
                    placeholderTextColor="#9C7DFF"
                    variant="outline"
                    color="#5A35B8"
                    borderColor="#B9A4FF"
                    borderWidth={1}
                    borderRadius={12}
                    rightIcon={showPassword ? 'eye.slash' : 'eye'}
                    rightIconPress={() => setShowPassword((s) => !s)}
                    containerStyle={{ paddingVertical: 12, paddingHorizontal: 14 }}
                    style={{ fontSize: 12 }}
                    fullWidth
                  />

                  {/* Google button (custom) */}
                  <View style={{ marginTop: 14 }}>
                    <GoogleButton />
                    {/* Mostrar error del hook si existe */}
                    {error ? <Text style={styles.errorText}>{error}</Text> : null}
                  </View>

                  <View style={{ flexDirection: 'row', gap: 12, justifyContent: 'center', paddingVertical: 19 }}>
                    {Array.from({ length: 14 }).map((_, i) => (
                      <View key={i} style={{ width: 8, height: 2, backgroundColor: '#6F36FF', opacity: 0.8 }} />
                    ))}
                  </View>

                  <Button
                    title="Registrarse"
                    onPress={handleSubmit}
                    backgroundColor="#6F36FF"
                    textColor="#FFFFFF"
                    borderRadius={12}
                  />

                  <View style={{ height: 12 }} />
                </View>

                <View style={styles.badgeBottom} />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    width: Platform.select({ web: '100%', default: '92%' }) as any,
    maxWidth: Platform.select({ web: 960, default: 1200 }) as any,
    alignSelf: 'center',
    paddingBottom: 32,
  },
  header: {
    marginTop: Platform.select({ web: 10, default: 10 }) as number,
    marginBottom: 16,
    zIndex: 2,
  },
  hero: {
    position: 'relative',
    paddingTop: Platform.select({ web: 24, default: 16 }) as number,
    paddingBottom: Platform.select({ web: 8, default: 8 }) as number,
    overflow: 'visible',
  },
  heroCircle: {
    position: 'absolute',
    width: Platform.select({ web: 420, default: 340 }) as number,
    height: Platform.select({ web: 420, default: 340 }) as number,
    borderRadius: Platform.select({ web: 210, default: 170 }) as number,
    top: Platform.select({ web: -60, default: -40 }) as number,
    right: Platform.select({ web: -80, default: -36 }) as number,
    opacity: 0.8,
    transform: [{ scaleX: -1 }],
    marginRight: Platform.select({ web: -80, default: 120 }) as number,
  },
  title: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '800',
    marginTop: Platform.select({ web: 24, default: 190 }) as number,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    opacity: 0.95,
  },
  cardWrapper: {
    position: 'relative',
    marginTop: 3,
    width: Platform.select({ web: '100%', default: '100%' }) as any,
    alignSelf: 'center',
    marginBottom: 24,
  },
  backButton: {
    position: 'absolute',
    top: Platform.select({ web: 10, default: 34 }) as number,
    left: Platform.select({ web: 10, default: 287 }) as number,
    zIndex: 50,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8C52FF',
    position: 'absolute',
    top: -23,
    right: 137,
    zIndex: 10,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  badgeBottom: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8C52FF',
    position: 'absolute',
    bottom: -23,
    right: 137,
    zIndex: 10,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  card: {
    backgroundColor: '#ffffffff',
    borderRadius: 20,
    padding: 16,
    width: Platform.select({ web: '100%', default: '100%' }) as any,
    alignSelf: 'center',
  },
  label: {
    color: '#5A35B8',
    marginTop: -2,
    fontWeight: '600',
    paddingHorizontal: 16,
  },

  /* Google button styles */
  googleButton: {
    backgroundColor: '#8C52FF', // moradito
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  googleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },

  errorText: {
    color: '#ff6b6b',
    marginTop: 8,
    textAlign: 'center',
  },
});

