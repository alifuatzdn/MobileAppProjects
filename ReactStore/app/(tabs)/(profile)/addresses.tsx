import { styles } from "@/styles/addresses";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { getAddresses, deleteAddress } from "@/Services/addressService";
import { AddressResponse } from "@/Services/addressService";
import { useIsFocused } from "@react-navigation/native";

export default function addresses() {
  const [addresses, setAddresses] = useState<AddressResponse[]>([]);
  const isFocused = useIsFocused();

  const getUserAdress = async () => {
    try {
      const response = await getAddresses();
      setAddresses(response);
    } catch (error) {
      console.error("Adresler alınırken bir hata oluştu:", error);
    }
  };

  const deleteUserAddress = async (id: number) => {
    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((address) => address.id !== id));
    } catch {
      console.error("Adres silinirken bir hata oluştu.");
    }
  };

  useEffect(() => {
    getUserAdress();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            router.push("../profile");
          }}
        >
          <Ionicons name="arrow-back" size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Adreslerim</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <TouchableOpacity
          style={styles.newAddress}
          onPress={() => router.push("/addAddress")}
        >
          <Ionicons name="add" size={17} style={styles.addImg}></Ionicons>
          <Text style={styles.newAddressText}>Yeni Adres Ekle</Text>
        </TouchableOpacity>

        {addresses.map((address) => (
          <View key={address.id} style={styles.addressPart}>
            <View style={{ flex: 1 }}>
              <View style={styles.addressName}>
                <Ionicons name="home-outline" size={22} />
                <Text style={styles.addressNameText}>{address.addressName}</Text>
              </View>
              <Text>
                {address.name} {address.surname}, {address.phoneNumber}, {address.city},{" "}
                {address.district}, {address.neighborhood}, {address.addressDetail}
              </Text>
            </View>
            <View style={styles.addressEdit}>
              <Pressable onPress={() => deleteUserAddress(address.id)}>
                <Ionicons name="trash-outline" size={25} color="#ff3930" />
              </Pressable>
              <Pressable onPress={() => router.push(`/editAddress?id=${address.id}`)}>
                <Ionicons name="create-outline" size={25} color="#22c1f4" style={{ marginLeft: 2 }} />
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}