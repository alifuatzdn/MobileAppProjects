import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: false,
        tabBarActiveTintColor: "#22c1f4",
        tabBarInactiveTintColor: "#75797a",
        tabBarStyle: {
        borderWidth: 0,
        position: "absolute",
        elevation: 0,
        height: 60,
        paddingBottom: 6,
        },
      }}
    >
      <Tabs.Screen name='index'
        options={{
          tabBarIcon: ({ size, color }) => <Ionicons name='home' size={size} color={color} />,
          tabBarLabel: "Ana Sayfa",
        }}
      />

      <Tabs.Screen name='wishlist' 
        options={{
          tabBarIcon: ({ size, color }) => <Ionicons name='heart' size={size} color={color} />,
          tabBarLabel: "Listelerim",
        }}
      />

      <Tabs.Screen name='cart' 
        options={{
          tabBarIcon: ({ size, color }) => <Ionicons name='cart' size={size} color={color} />,
          tabBarLabel: "Sepetim",
        }}
      />
      
      <Tabs.Screen name='profile' 
        options={{
          tabBarIcon: ({ size, color }) => <Ionicons name='person' size={size} color={color} />,
          tabBarLabel: "Hesabım",
        }}
      />
    </Tabs>
  )
}