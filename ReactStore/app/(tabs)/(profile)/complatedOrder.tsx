import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from "@/styles/complatedOrder"
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function complatedOrder() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000)
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerLogout}>
        <Text style={styles.headerText}>Sipariş Durumu</Text>
      </View>

      <View style={styles.logout}>
        <View style={{ marginBottom: 50, alignItems: "center", justifyContent: "center" }}>
          <Ionicons name="checkmark" size={80} style={styles.check} />
          <Text style={{ color: "#22c1f4", fontSize: 30, fontWeight: "bold" }}>Sipariş Tamamlandı</Text>
        </View>
        <Text style={styles.logoutText}>Siparişiniz başarıyla oluşturuldu. Ana sayfaya yönlendiriliyorsunuz...</Text>
      </View>
    </View >
  )
}