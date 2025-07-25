import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        animation: 'none',
        headerShown: false,
      }}
    >
      <Stack.Screen name="register" options={{ headerShown: false, }} />
    </Stack>
  )
}