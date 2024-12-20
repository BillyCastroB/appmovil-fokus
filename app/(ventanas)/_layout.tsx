import { Tabs, useNavigation } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle:
          route.name === 'index' || route.name === 'login'
            ? { display: 'none', width: 0, height: 0 } // Oculta la barra en "index" y "login"
            : Platform.select({
                ios: {
                  position: 'absolute', // Efecto flotante en iOS
                },
                default: {},
              }),
      })}>
      {/* Pantalla "index", sin barra de navegación */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarStyle: { 
            height: 0,        // Establecer altura a 0 para eliminar el espacio
            display: 'none'   // También ocultar la barra completamente
          },
          tabBarButton: () => null, // Excluir la pestaña del menú
        }}
      />
      {/* Pantalla "login", sin barra de navegación */}
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarStyle: { height: 0, width: 0, display: 'none' }, 
          tabBarButton: () => null, // Excluye la pestaña del menú
        }}
      />
      
      <Tabs.Screen
        name="menuInicio"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" size={28} color="#880216" />,
        }}
      />

      <Tabs.Screen
        name="newPassword"
        options={{
          title: 'newPassword',
          tabBarStyle: { display: 'none' },
          tabBarButton: () => null, // Excluye la pestaña del menú
        }}
      />
      <Tabs.Screen
        name="listadoActividades"
        options={{
          title: 'listadoActividades',
        }}
      />
    </Tabs>
  );
}