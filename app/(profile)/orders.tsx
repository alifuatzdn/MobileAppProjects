import { styles } from "@/styles/orders"
import { Ionicons } from '@expo/vector-icons'
import { router } from "expo-router"
import React from 'react'
import { Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function orders() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => { router.push("../(tabs)/profile") }}>
          <Ionicons name='arrow-back' size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Siparişlerim</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <Pressable onPress={() => { router.push("/(profile)/orderDetails") }}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#75797a" />
            <TextInput placeholder="Siparişlerimde ara" placeholderTextColor="#75797a" style={styles.search}></TextInput>
          </View>
          <View style={styles.order}>
            <View style={styles.orderInfo}>
              <View style={styles.orderImgContainer}>
                <Image source={require("@/assets/images/phone1.webp")} style={styles.orderImg} />
              </View>
              <View>
                <Text style={styles.orderText}>21 Haziran 2025</Text>
                <Text style={[styles.orderText, { color: "#0aa222", }]}>32.749,00 TL</Text>
              </View>
            </View>
            <View style={styles.orderStatus}>
              <View style={styles.orderStatusPart}>
                <Ionicons name="checkmark" size={15} style={styles.check} />
                <Text style={styles.orderStatusText} >Sipariş tamamlandı</Text>
              </View>
              <View style={styles.orderStatusPart}>
                <Text style={[styles.orderStatusText, { color: "#22c1f4" }]} >Sipariş detayları</Text>
                <Ionicons name="chevron-forward-outline" size={15} color="#22c1f4" />
              </View>
            </View>
          </View >
        </Pressable>
      </ScrollView >
    </View >
  )
}