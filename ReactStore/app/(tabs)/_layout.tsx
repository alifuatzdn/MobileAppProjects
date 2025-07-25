import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import register from '../(auth)/register'
import { useBasket } from '@/Context/CartContext'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: false,
        tabBarActiveTintColor: "#22c1f4",
        tabBarInactiveTintColor: "#75797a",
        tabBarStyle: {
          borderTopWidth: 1,
          borderColor: "#75797a",
          position: "absolute",
          elevation: 0,
          height: 60,
          paddingBottom: 6,
        },
      }}
    >

      <Tabs.Screen
        name="(profile)"
        options={{
          href: null
        }}
      />

      <Tabs.Screen name='index'
        options={{
          tabBarIcon: ({ size, color }) => <Ionicons name='home' size={size} color={color} />,
          tabBarLabel: "Ana Sayfa",
        }}
      />

      <Tabs.Screen name='wishlist'
        options={{
          tabBarIcon: ({ size, color }) => <Ionicons name='heart' size={size} color={color} />,
          tabBarLabel: "Favorilerim",
        }}
      />

      <Tabs.Screen name='cart'
        options={{
          tabBarIcon: ({ size, color }) => {
            const { basketCount } = useBasket();
            return (
              <View>
                <Ionicons name='cart' size={size} color={color} />
                {basketCount > 0 && (
                  <View style={{
                    position: "absolute",
                    right: -3,
                    top: -3,
                    borderRadius: 50,
                    paddingVertical: 0,
                    paddingHorizontal: 4,
                    backgroundColor: "#ff3930",
                  }}>
                    <Text style={{ color: "#fff", fontSize: 12 }}>{basketCount}</Text>
                  </View>
                )}
              </View>
            );
          },
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