import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

import Join from "../../../assets/Undraw/Join";

export default function JoinRoom() {
  const handleStart = () => {
    const roomId = `room-${Math.random().toString(36).substring(2, 8)}`;
    router.push({
      pathname: '/pages/RoomUser/into-room',
      params: { roomId }
    });
  };

  return (
    <View className="flex-1 bg-white">
      <View className="mt-8 items-center justify-center">
        <Join width={90} height={90} />
      </View>
      <Text className="text-xl font-bold text-center my-5">
        Unirme a una Sala
      </Text>
      <View className="flex-1 justify-center items-center p-5">
        <TouchableOpacity 
          className="mt-8 bg-[#8C52FF] py-4 rounded-xl w-[80%] items-center shadow-lg"
          onPress={handleStart}
          activeOpacity={0.8}
        >
          <Text className="text-white font-bold text-lg">
            Comenzar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}