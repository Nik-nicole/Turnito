import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Button from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Image } from 'expo-image';
import { Stack, useRouter } from 'expo-router';
import React from 'react';

import { Platform, StyleSheet, View, type DimensionValue, type ImageStyle, type TextStyle, type ViewStyle } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ThemedView style={styles.container} lightColor="#8C52FF" darkColor="#8C52FF">
      <View style={styles.content}>
        <Image
          source={require('../../assets/images/Logo.png')}
          style={styles.reactLogo}
        />

        <View style={styles.section}>
          <IconSymbol name="bag" size={56} color="#FFFFFF" />
          <ThemedText style={styles.paragraph} lightColor="#FFFFFF" darkColor="#FFFFFF">
            Quieres crear tu sala de turnos Registrate
          </ThemedText>
          <ThemedText style={styles.strong} lightColor="#FFFFFF" darkColor="#FFFFFF">AQUI !</ThemedText>
          <Button 
                title="Registrarse como Empresa" 
                onPress={() => router.push('/pages/Auth/register-company')}
                backgroundColor="white"
                textColor="#5A35B8"
                borderRadius= {12}
                paddingVertical= {12}
                paddingHorizontal={18}
                minWidth= {Platform.select({ web: 320, default: 240 }) as number}
                textStyle={{ fontSize: 14 }}
            />
        </View>

        <View style={styles.separatorRow}>
          <ThemedText style={styles.separator} lightColor="#FFFFFF" darkColor="#FFFFFF">--------- o ---------</ThemedText>
        </View>

        <View style={styles.section}>
          <IconSymbol name="person" size={56} color="#FFFFFF" />
          <ThemedText style={styles.paragraph} lightColor="#FFFFFF" darkColor="#FFFFFF">
            Toma tu turno y no hagas más fila. Regístrate
          </ThemedText>
          <ThemedText style={styles.strong} lightColor="#FFFFFF" darkColor="#FFFFFF">AQUI !</ThemedText>
          <Button 
                title="Registrarse como Usuario" 
                onPress={() => router.push('/pages/Auth/userLogin')}
                backgroundColor="white"
                textColor="#5A35B8"
                borderRadius= {12}
                paddingVertical= {12}
                paddingHorizontal={18}
                minWidth= {Platform.select({ web: 320, default: 240 }) as number}
                textStyle={{ fontSize: 14 }}
            />
        </View>

        <View style={styles.sectionBottom}>
          <ThemedText style={styles.paragraph} lightColor="#FFFFFF" darkColor="#FFFFFF">
            Si ya tienes cuenta Inicia Sesión
          </ThemedText>
          <Button 
                title="inicia Sesion" 
                onPress={() => router.push('/pages/register-company')}
                backgroundColor="white"
                textColor="#5A35B8"
                borderRadius= {12}
                paddingVertical= {12}
                paddingHorizontal= {18}
                minWidth= {Platform.select({ web: 320, default: 240 }) as number}
                textStyle={{ fontSize: 14 }}
            />
        </View>
      </View>
    </ThemedView>
    </>
  );
}

const styles = StyleSheet.create<{
  container: ViewStyle;
  content: ViewStyle;
  title: TextStyle;
  section: ViewStyle;
  sectionBottom: ViewStyle;
  paragraph: TextStyle;
  strong: TextStyle;
  separatorRow: ViewStyle;
  separator: TextStyle;
  reactLogo: ImageStyle;
}>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    paddingVertical: Platform.select({ web: 40, default: 0 }) as number,
  },
  content: {
    width: Platform.select({ web: '100%' as DimensionValue, default: '88%' as DimensionValue })!,
    maxWidth: Platform.select({ web: 820, default: undefined }) as number | undefined,
    alignSelf: 'center',
    marginTop: Platform.select({ web: 10, default: 30 }) as number,
    gap: Platform.select({ web: 24, default: 18 }) as number,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 8,
  },
  section: {
    alignItems: 'center',
        
    gap: Platform.select({ web: 10, default: 8 }) as number,
    marginBottom: 8,
    maxWidth: Platform.select({ web: 560, default: undefined }) as number | undefined,
    alignSelf: 'center',
  },
  sectionBottom: {
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 14,
    textAlign: 'center',
  },
  strong: {
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  separatorRow: {
    alignItems: 'center',
    marginVertical: 4,
  },
  separator: {
    fontWeight: 'bold',
  },
 
 

  reactLogo: {
    alignSelf: 'center',
    width: Platform.select({ web: 260, default: 200 }) as number,
    height: Platform.select({ web: 260, default: 200 }) as number,
    marginTop: Platform.select({ web: -100, default: -130 }) as number,
    position: 'absolute',
    gap: Platform.select({ web: 10, default: 8 }) as number,
   
  },
});
