import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import '../../../global.css';
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#8C52FF',
        tabBarInactiveTintColor: '#9E9E9E',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0',
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="notificacion"
        options={{
          title: 'notificacion',
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <Ionicons name="notifications" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="join-room"
        options={{
          title: 'Unirse a Sala',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <Ionicons name="ticket" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <Ionicons name="person" size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
});