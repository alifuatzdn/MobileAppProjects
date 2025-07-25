import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/coupon';
import { router } from 'expo-router';
import { Coupon, getCouponsByUser } from '@/Services/couponService';
import { useIsFocused } from '@react-navigation/native';

export default function coupon() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const isFocused = useIsFocused();

  const getUserCoupons = async () => {
    try {
      const response = await getCouponsByUser();
      setCoupons(response);
    } catch (error) {
      console.error("Kuponlar alınırken sorun oluştu.", error)
    }
  };

  useEffect(() => {
    getUserCoupons();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            router.push("/(tabs)/profile");
          }}
        >
          <Ionicons name="arrow-back" size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Kuponlarım</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {coupons.map(coupon => (
          <View style={styles.couponContainer} key={coupon.id}>
            <Text style={styles.couponTitle}>
              {coupon.name}
            </Text>
            <Text>
              {coupon.minLimit.toLocaleString("tr-TR")} TL ve üzeri alışverinize {coupon.discount.toLocaleString("tr-TR")} TL indirim.
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}