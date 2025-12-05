import Button from '@/components/ui/Button';
import Input from '@/components/ui/inputText';
import { Feather } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';

import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Join from '../../../assets/Undraw/Join';

export default function JoinRoom() {
  const [roomCode, setRoomCode] = useState('');

  const recentRooms = [
    { id: '1', name: 'Compensar', code: '87951' },
    { id: '2', name: 'Barber Shop', code: '76345' },
  ];

  const handleJoinRoom = () => {
    if (!roomCode.trim()) return;
    console.log('Joining room with code:', roomCode);
  };

  const handleScanQR = () => {
    console.log('Escanear QR');
  };

  const handleJoinRecentRoom = (roomId: string) => {
    console.log('Joining recent room:', roomId);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5EEFF]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView className="flex-1">
          <View className="items-center justify-center pt-8">
            <Join width={90} height={90} />
          </View>

          <Text className="text-2xl text-center mt-7 font-normal text-gray-800">
            Unirse a sala
          </Text>
          <Text className="text-sm text-center font-light text-gray-600 mb-8">
            Ingresa el código de la sala para continuar
          </Text>

          {/* Card principal */}
          <View className="mx-6 bg-white p-5 rounded-2xl shadow-sm">
            {/* Input sin X, estilo suave */}
            <View className="mb-6">
              <Input
                label="Código de la sala"
                placeholder="Ej: 2354"
                value={roomCode}
                onChangeText={setRoomCode}
                variant="ghost"
                backgroundColor="#F5EEFF"
                borderColor="#E5DAFF"
                borderWidth={1}
                clearable={false}   // <--- sin X
                fullWidth
                size="lg"
                keyboardType="numeric"
                containerStyle={{ marginBottom: 16 }}
              />
            </View>

            {/* Botones */}
            <View className="space-y-3">
              {/* BOTÓN CON DEGRADADO */}
              <Button
                title="Entrar a la sala"
                onPress={handleJoinRoom}
                variant="solid"
                fullWidth
                useGradient
                gradientColors={['#A855F7', '#8B5CF6']}
                style={{ borderRadius: 16 }}
              />

              {/* Separador */}
              <View className="flex-row items-center my-4">
                <View className="flex-1 h-px bg-gray-200" />
                <Text className="mx-3 text-xs text-gray-400">
                  o escanea el código QR
                </Text>
                <View className="flex-1 h-px bg-gray-200" />
              </View>

              {/* Botón Escanea QR con Ionicons */}
              <Button
                title="Escanea QR"
                onPress={handleScanQR}
                variant="outline"
                color="#8C52FF"
                size="lg"
                fullWidth
              >
                <View className="flex-row items-center justify-center">
                  <Ionicons
                    name="qr-code-outline"
                    size={20}
                    color="#8C52FF"
                    style={{ marginRight: 8 }}
                  />
                  <Text className="text-base font-semibold text-[#8C52FF]">
                    Escanea QR
                  </Text>
                </View>
              </Button>
            </View>
          </View>

          {/* Salas recientes */}
          <View className="mx-6 mt-6 bg-white p-5 rounded-2xl shadow-sm mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Salas recientes:
            </Text>

            {recentRooms.length > 0 ? (
              recentRooms.map((room, index) => (
                <TouchableOpacity
                  key={room.id}
                  className={`flex-row items-center py-4 ${
                    index < recentRooms.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                  onPress={() => handleJoinRecentRoom(room.id)}
                >
                  <View className="w-10 h-10 rounded-xl bg-[#F5EEFF] justify-center items-center mr-3">
                    <Feather name="home" size={20} color="#8C52FF" />
                  </View>
                  <View>
                    <Text className="text-base font-medium text-gray-800">
                      {room.name}
                    </Text>
                    <Text className="text-sm text-gray-500">
                      Sala {room.code}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text className="text-center text-gray-400 py-4">
                No hay salas recientes
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
