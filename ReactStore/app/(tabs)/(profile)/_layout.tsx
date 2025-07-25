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
      <Stack.Screen name='addresses' />
      <Stack.Screen name='addAddress' />
      <Stack.Screen name='editAddress' />
      <Stack.Screen name='orders' />
      <Stack.Screen name='orderDetails' />
      <Stack.Screen name='creditCards' />
      <Stack.Screen name='addCreditCard' />
      <Stack.Screen name='editCreditCard' />
      <Stack.Screen name='payment' />
      <Stack.Screen name='complatedOrder' />
      <Stack.Screen name='comments' />
      <Stack.Screen name='productDetail' />
      <Stack.Screen name='coupon' />
      <Stack.Screen name='settings' />
    </Stack>
  )
}