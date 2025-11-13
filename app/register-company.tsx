import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Button from '@/components/ui/Button';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function RegisterCompany() {
  const router = useRouter();

  const [category, setCategory] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    console.log({ category, companyName, email });
  };

  return (
    <ThemedView style={styles.container} lightColor="#8C52FF" darkColor="#8C52FF">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <ThemedText style={styles.title} lightColor="#FFFFFF" darkColor="#FFFFFF">
              Registro
            </ThemedText>
            <ThemedText style={styles.subtitle} lightColor="#FFFFFF" darkColor="#FFFFFF">
              ¿ya tienes una cuenta <Text style={{ fontWeight: 'bold' }}>Inicia Sesión</Text>?
            </ThemedText>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Escoge la categoría</Text>
            <TextInput
              value={category}
              onChangeText={setCategory}
              placeholder="Selecciona o escribe una categoría"
              placeholderTextColor="#9C7DFF"
              style={styles.input}
            />

            <Text style={styles.label}>Nombre de la Empresa o Negocio</Text>
            <TextInput
              value={companyName}
              onChangeText={setCompanyName}
              placeholder="Ej. Panadería La Abuela"
              placeholderTextColor="#9C7DFF"
              style={styles.input}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="correo@empresa.com"
              placeholderTextColor="#9C7DFF"
              style={styles.input}
            />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••"
              placeholderTextColor="#9C7DFF"
              style={styles.input}
            />

            <View style={{ height: 12 }} />

            <Button
              title="Registrarse"
              onPress={handleSubmit}
              backgroundColor="#6F36FF"
              textColor="#FFFFFF"
              borderRadius={12}
            />

            <View style={{ height: 12 }} />

            <Button
              title="Volver"
              onPress={() => router.back()}
              backgroundColor="#FFFFFF"
              borderColor="#5A35B8"
              textColor="#5A35B8"             
              borderRadius={12}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Platform.select({ web: 40, default: 0 }) as number,
  },
  content: {
    width: Platform.select({ web: '100%', default: '92%' }) as any,
    maxWidth: Platform.select({ web: 820, default: undefined }) as any,
    alignSelf: 'center',
  },
  header: {
    marginTop: Platform.select({ web: 10, default: 30 }) as number,
    marginBottom: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    opacity: 0.95,
  },
  card: {
    backgroundColor: '#ffffffff',
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
  },
  label: {
    color: '#5A35B8',
    marginTop: 10,
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#B9A4FF',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
});
