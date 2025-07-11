import { styles } from "@/styles/addresses"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"
import React from 'react'
import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function addresses() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => { router.push("../(tabs)/profile") }}>
          <Ionicons name='arrow-back' size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Adreslerim</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <TouchableOpacity style={styles.newAddress} onPress={() => router.push("/(profile)/addAddress")}>
          <Ionicons name="add" size={17} style={styles.addImg}></Ionicons>
          <Text style={styles.newAddressText}>Yeni Adres Ekle</Text>
        </TouchableOpacity>

        <View style={styles.addressPart}>
          <View style={{ flex: 1 }} >
            <View style={styles.addressName}>
              <Ionicons name="home-outline" size={22} />
              <Text style={styles.addressNameText}>Evim</Text>
            </View>
            <Text>adress bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla</Text>
          </View>
          <View style={styles.addressEdit}>
            <Pressable>
              <Ionicons name="create-outline" size={25} color="#22c1f4" />
            </Pressable>
          </View>
        </View>
        <View style={styles.addressPart}>
          <View style={{ flex: 1 }} >
            <View style={styles.addressName}>
              <Ionicons name="home-outline" size={22} />
              <Text style={styles.addressNameText}>Evim</Text>
            </View>
            <Text>adress bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla</Text>
          </View>
          <View style={styles.addressEdit}>
            <Pressable>
              <Ionicons name="create-outline" size={25} color="#22c1f4" />
            </Pressable>
          </View>
        </View>
        <View style={styles.addressPart}>
          <View style={{ flex: 1 }} >
            <View style={styles.addressName}>
              <Ionicons name="home-outline" size={22} />
              <Text style={styles.addressNameText}>Evim</Text>
            </View>
            <Text>adress bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla</Text>
          </View>
          <View style={styles.addressEdit}>
            <Pressable>
              <Ionicons name="create-outline" size={25} color="#22c1f4" />
            </Pressable>
          </View>
        </View>
        <View style={styles.addressPart}>
          <View style={{ flex: 1 }} >
            <View style={styles.addressName}>
              <Ionicons name="home-outline" size={22} />
              <Text style={styles.addressNameText}>Evim</Text>
            </View>
            <Text>adress bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla</Text>
          </View>
          <View style={styles.addressEdit}>
            <Pressable>
              <Ionicons name="create-outline" size={25} color="#22c1f4" />
            </Pressable>
          </View>
        </View>
        <View style={styles.addressPart}>
          <View style={{ flex: 1 }} >
            <View style={styles.addressName}>
              <Ionicons name="home-outline" size={22} />
              <Text style={styles.addressNameText}>Evim</Text>
            </View>
            <Text>adress bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla</Text>
          </View>
          <View style={styles.addressEdit}>
            <Pressable>
              <Ionicons name="create-outline" size={25} color="#22c1f4" />
            </Pressable>
          </View>
        </View>
        <View style={styles.addressPart}>
          <View style={{ flex: 1 }} >
            <View style={styles.addressName}>
              <Ionicons name="home-outline" size={22} />
              <Text style={styles.addressNameText}>Evim</Text>
            </View>
            <Text>adress bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla</Text>
          </View>
          <View style={styles.addressEdit}>
            <Pressable>
              <Ionicons name="create-outline" size={25} color="#22c1f4" />
            </Pressable>
          </View>
        </View>
        <View style={styles.addressPart}>
          <View style={{ flex: 1 }} >
            <View style={styles.addressName}>
              <Ionicons name="home-outline" size={22} />
              <Text style={styles.addressNameText}>Evim</Text>
            </View>
            <Text>adress bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla</Text>
          </View>
          <View style={styles.addressEdit}>
            <Pressable>
              <Ionicons name="create-outline" size={25} color="#22c1f4" />
            </Pressable>
          </View>
        </View>

      </ScrollView >
    </View >

  )
}