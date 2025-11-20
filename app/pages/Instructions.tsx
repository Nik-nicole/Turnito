import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Instructions() {
    return (
        <>
        <Stack.Screen options={{ headerShown: false }} />
        <ThemedView style={styles.container} lightColor="#8C52FF" darkColor="#8C52FF">

            <View style={styles.container}>
                <ThemedText style={styles.title}>
                    Instrucciones
                </ThemedText>
            </View>
        </ThemedView>
       </>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
