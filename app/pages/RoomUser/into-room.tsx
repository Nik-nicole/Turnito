// app/pages/RoomUser/IntoRoom.tsx
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import SvgComponent from "../../../assets/Undraw/Join";

export default function IntoRoom() {
  const params = useLocalSearchParams();
  const roomId = params.roomId as string || 'sin-id';

  return (
    <View style={styles.container}>
      <SvgComponent width={200} height={200} />
      <Text style={styles.roomId}>ID de la sala: {roomId}</Text>
      <Text style={styles.message}>¡Bienvenido a la sala de espera!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  roomId: {
    fontSize: 18,
    marginTop: 20,
    color: '#333',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    fontFamily: 'monospace',
  },
  message: {
    fontSize: 22,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#8C52FF',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});