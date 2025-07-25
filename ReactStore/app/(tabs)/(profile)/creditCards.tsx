import { styles } from "@/styles/creditCard";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import { getCreditCards, deleteCreditCard } from "@/Services/creditCardService";
import { CreditCardResponse, CreditCardRequest } from "@/Services/creditCardService";
import { useIsFocused } from "@react-navigation/native";

export default function creditCards() {
  const [creditCards, setCreditCards] = useState<CreditCardResponse[]>([]);
  const isFocused = useIsFocused();

  const fetchCreditCards = async () => {
    try {
      const response = await getCreditCards();
      setCreditCards(response);
    } catch (error) {
      console.error("Kartlar alınırken bir hata oluştu:", error);
    }
  };

  const handleDeleteCard = async (id: number) => {
    try {
      await deleteCreditCard(id);
      setCreditCards((prev) => prev.filter((card) => card.id !== id));
    } catch {
      console.error("Kart silinirken bir hata oluştu.");
    }
  };

  useEffect(() => {
    fetchCreditCards();
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
        <Text style={styles.headerText}>Kayıtlı Kartlarım</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <TouchableOpacity
          style={styles.newCard}
          onPress={() => router.push("/(profile)/addCreditCard")}
        >
          <Ionicons name="add" size={17} style={styles.addImg}></Ionicons>
          <Text style={styles.newCardText}>Yeni Kart Ekle</Text>
        </TouchableOpacity>

        {creditCards.map((card) => (
          <View key={card.id} style={styles.cardContainer}>
            <View>
              <View style={styles.cardNameContainer}>
                <Text style={styles.cardName}>{card.name}</Text>
                <Ionicons name="card-outline" size={30} />
              </View>
              <Text style={styles.cardNumber}>{card.cardNumber.slice(0, 4) + " " + card.cardNumber.slice(4, 6) + "** **** " + card.cardNumber.slice(12, 16)}</Text>
              <Text style={styles.cardHolder}>{card.cardHolderName}</Text>
            </View>
            <View style={styles.edit}>
              <Pressable onPress={() => router.push(`/editCreditCard?id=${card.id}`)}>
                <Ionicons name="create-outline" size={25} color="#22c1f4" style={{ marginRight: 20 }} />
              </Pressable>
              <Pressable onPress={() => handleDeleteCard(card.id)}>
                <Ionicons name="trash-outline" size={25} color="#ff3930" />
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}