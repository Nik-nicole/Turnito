import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import Button from '@/components/ui/Button';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image } from 'expo-image';
import { Stack } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';

export default function Instructions() {

    const handleSubmit = () => {
    console.log({ });
  };
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <ThemedView style={styles.layout} lightColor="#8C52FF" darkColor="#8C52FF">
                {/* Contenedor de todo , NOTA: container no es el contenedor general como layout este es el contenedor de los componente spara que 
                se mantengan en el centro */}
                <View style={styles.container}>
                    <Image
                        source={require('../../assets/images/LogoPurple.png')}
                        style={styles.reactLogo}
                    />
                    <ThemedText style={styles.title}>
                        Sistema de gestion de turnos en filas
                    </ThemedText>
                    <ThemedText style={styles.subtitle}>
                        ! Gasta menos tiempo ¡
                    </ThemedText>

                    {/* Contenedor blanco de las intrucciones */}
                    <View style={styles.containerBox}>
                        <View style={styles.intructionSection}>
                            <View style={styles.featureItem}>
                                <View style={styles.Box}>
                                    <MaterialCommunityIcons name="cellphone" size={30} color="#8C52FF" />
                                </View>
                                <View style={styles.featureTextContainer}>
                                    <ThemedText style={styles.subtitle3}>
                                        Sin esperas Físicas
                                    </ThemedText>
                                    <ThemedText style={styles.featureDescription}>
                                        Toma tu turno desde tu dispositivo y espera cómodamente
                                    </ThemedText>
                                </View>
                            </View>
                            
                            <View style={styles.featureItem}>
                                <View style={styles.Box}>
                                    <Feather name="user" size={30} color="#8C52FF" />
                                </View>
                                <View style={styles.featureTextContainer}>
                                    <ThemedText style={styles.subtitle3}>
                                        Tiempo estimado
                                    </ThemedText>
                                    <ThemedText style={styles.featureDescription}>
                                        Conoce cuánto tiempo estimado falta para tu turno
                                    </ThemedText>
                                </View>
                            </View>
                            
                            <View style={styles.featureItem}>
                                <View style={styles.Box}>
                                    <Entypo name="check" size={24} color="#8C52FF" />
                                </View>
                                <View style={styles.featureTextContainer}>
                                    <ThemedText style={styles.subtitle3}>
                                        Fácil y rápido
                                    </ThemedText>
                                    <ThemedText style={styles.featureDescription}>
                                        Solo necesitas el código de la sala para comenzar
                                    </ThemedText>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Button
                            title="Comenzar"
                            onPress={handleSubmit}
                            backgroundColor="#8C52FF"
                            textColor="#FFFFFF"
                            borderRadius={12}
                            paddingVertical={12}
                            paddingHorizontal={18}
                            minWidth={Platform.select({ web: 320, default: 240 })}
                            textStyle={{ fontSize: 14 }}
                        />
                    </View>
                        
                    
                </View>
                 
            </ThemedView>
            
        </>

    );
}

const styles = StyleSheet.create({
    layout:{
        flex: 5,
        backgroundColor: '#F7F4FF',
        alignItems: 'center', 
       
    },

    container: {
          alignItems: 'center', 
          marginTop: 145

    },
    subtitle3: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#424242',
        marginBottom: 4,
    },
    Box: {
        backgroundColor: '#f1e2ffff',
        width: 50,
        height: 50,
        marginTop: 5,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerBox: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 15,
        marginTop: 20,
        padding: 20,
    },
    title: {
        fontSize: 14,
        color: '#464646ff',
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: -6,
        color: '#5f5f5fff',
    },
    intructionSection: {
        width: '100%',
        gap: 20,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
    },
    featureTextContainer: {
        flex: 1,
        marginLeft: 15,
    },
    featureDescription: {
        fontSize: 12,
        color: '#666666',
        lineHeight: 16,
    },
    reactLogo: {
        width: 200,
        height: 100
    },
});
