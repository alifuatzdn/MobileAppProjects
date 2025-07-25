import { styles } from "@/styles/addCreditCard";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Alert, Platform, KeyboardAvoidingView } from "react-native";
import { addCreditCard } from "@/Services/creditCardService";

export default function addCreditCardScreen() {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    cardHolderName: "",
    validationDate: "",
    securityCode: 0,
  });

  const handleInputChange = (field: string, value: string) => {
    let sanitizedValue = value;

    if (field === "validationDate") {
      sanitizedValue = value.replace(/[^0-9]/g, "");

      if (sanitizedValue.length > 2) {
        sanitizedValue = sanitizedValue.slice(0, 2) + "/" + sanitizedValue.slice(2, 4);
      }
    } else if (field === "cardNumber" || field === "securityCode") {
      sanitizedValue = value.replace(/\s/g, "");
    }

    setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));
  };

  const handleSaveCard = async () => {
    try {
      if (!formData.cardNumber || !formData.cardHolderName || !formData.validationDate || !formData.securityCode) {
        Alert.alert("Lütfen tüm alanları doldurun.");
        return;
      }

      const [month, year] = formData.validationDate.split("/");
      const isoValidationDate = new Date(`20${year}-${month}-01`).toISOString();

      const newCardData = {
        ...formData,
        cardNumber: formData.cardNumber.replace(/\s/g, ""),
        validationDate: isoValidationDate,
        securityCode: Number(formData.securityCode),
      };

      await addCreditCard(newCardData);

      Alert.alert("Kart başarıyla kaydedildi.");
      router.back();
    } catch (error) {
      console.error("Kart kaydedilirken bir hata oluştu:", error);
    }
  };

  const formatCardNumber = (cardNumber: string): string => {
    return cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={25} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Kredi Kartı Ekle</Text>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View>
            <Text style={styles.label}>Kart numarası</Text>
            <TextInput
              style={styles.inputs}
              placeholder="**** **** **** ****"
              placeholderTextColor="#75797a"
              maxLength={19}
              value={formatCardNumber(formData.cardNumber)}
              onChangeText={(text) => handleInputChange("cardNumber", text)}
              keyboardType="numeric"
            />
          </View>

          <View>
            <Text style={styles.label}>Kart üzerindeki isim</Text>
            <TextInput
              style={styles.inputs}
              placeholder="Kart sahibinin adı ve soyadı"
              placeholderTextColor="#75797a"
              value={formData.cardHolderName}
              onChangeText={(text) => handleInputChange("cardHolderName", text)}
            />
          </View>

          <View>
            <Text style={styles.label}>Son kullanma tarihi</Text>
            <TextInput
              style={styles.inputs}
              placeholder="MM/YY"
              placeholderTextColor="#75797a"
              value={formData.validationDate}
              onChangeText={(text) => handleInputChange("validationDate", text)}
              keyboardType="numeric"
              maxLength={5}
            />
          </View>

          <View>
            <Text style={styles.label}>Güvenlik kodu</Text>
            <TextInput
              style={styles.inputs}
              placeholder="CVC/CVV"
              placeholderTextColor="#75797a"
              value={String(formData.securityCode)}
              onChangeText={(text) => handleInputChange("securityCode", text)}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>

          <View>
            <Text style={styles.label}>Kart ismi</Text>
            <TextInput
              style={styles.inputs}
              placeholder="Karta verdiğiniz isim"
              placeholderTextColor="#75797a"
              value={formData.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleSaveCard}>
            <Text style={styles.registerButtonText}>Kartı Kaydet</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}