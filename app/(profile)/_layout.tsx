import { Stack } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name='addresses' options={{ headerShown: false }} />
      <Stack.Screen name='addAddress' options={{ headerShown: false }} />
    </Stack>
  )
}