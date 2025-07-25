import { getOrders, OrderResponse } from "@/Services/orderService"
import { styles } from "@/styles/orders"
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useFocusEffect, useIsFocused } from "@react-navigation/native"
import { router } from "expo-router"
import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function orders() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const isFocused = useIsFocused();

  const getUserOrders = async () => {
    const response = await getOrders();
    setOrders(response);
  };

  useEffect(() => {
    getUserOrders();
  }, [isFocused])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => { router.push("../profile") }}>
          <Ionicons name='arrow-back' size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Siparişlerim</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#75797a" />
          <TextInput placeholder="Siparişlerimde ara" placeholderTextColor="#75797a" style={styles.search}></TextInput>
        </View>
        {orders.slice().reverse().map(order => (
          <Pressable onPress={() => router.push(`/orderDetails?id=${order.id}`)} key={order.id}>
            <View style={styles.order}>
              <View style={styles.orderInfo}>
                <View style={styles.orderImgContainer}>
                  <Image source={{ uri: order.products[0].image }} style={styles.orderImg} />
                </View>
                <View>
                  <Text style={styles.orderText}>
                    {new Date(new Date(order.createdAt).setHours(new Date(order.createdAt).getHours() + 3)).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                  <Text style={[styles.orderText, { color: "#0aa222", }]}></Text>
                </View>
              </View>
              <View style={styles.orderStatus}>
                <View style={styles.orderStatusPart}>
                  <MaterialCommunityIcons name="package-variant" size={20} color={"#75797a"}/>
                  <Text style={styles.orderStatusText} >Sipariş hazırlanıyor</Text>
                </View>
                <View style={styles.orderStatusPart}>
                  <Text style={[styles.orderStatusText, { color: "#22c1f4" }]} >Sipariş detayları</Text>
                  <Ionicons name="chevron-forward-outline" size={15} color="#22c1f4" />
                </View>
              </View>
            </View >
          </Pressable>
        ))}
      </ScrollView >
    </View >
  )
}