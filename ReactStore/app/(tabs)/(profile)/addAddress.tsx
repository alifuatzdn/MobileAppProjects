import { styles } from "@/styles/addAddress";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { addAddress } from "@/Services/addressService";

export default function AddAddressScreen() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phoneNumber: "",
    city: "",
    district: "",
    neighborhood: "",
    addressDetail: "",
    addressName: "",
  });

  const [checked, setChecked] = useState<boolean>(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveAddress = async () => {
    try {
      if (!formData.name || !formData.surname || !formData.phoneNumber || !formData.city || !formData.district || !formData.neighborhood || !formData.addressDetail || !formData.addressName) {
        Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
        return;
      }

      await addAddress(formData);
      Alert.alert("Adres başarıyla kaydedildi.");
      router.back();
    } catch (error) {
      console.error("Adres eklenirken bir hata oluştu.");
    }
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
          <Text style={styles.headerText}>Adres Ekle</Text>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View>
            <Text style={styles.part}>Kişisel Bilgiler</Text>
            <Text style={styles.label}>Teslim alacak kişinin bilgileri</Text>
            <View style={styles.name}>
              <TextInput
                style={[styles.inputs, { marginRight: 10 }]}
                placeholder="Ad"
                placeholderTextColor="#75797a"
                value={formData.name}
                onChangeText={(text) => handleInputChange("name", text)}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Soyad"
                placeholderTextColor="#75797a"
                value={formData.surname}
                onChangeText={(text) => handleInputChange("surname", text)}
              />
            </View>
          </View>
          <View>
            <Text style={styles.label}>Telefon numarası</Text>
            <TextInput
              style={styles.inputs}
              placeholder="(5xx)-xxx-xx-xx"
              placeholderTextColor="#75797a"
              value={formData.phoneNumber}
              onChangeText={(text) => handleInputChange("phoneNumber", text)}
            />
          </View>

          <Text style={styles.part}>Adres Bilgileri</Text>

          <View>
            <Text style={styles.label}>Şehir</Text>
            <TextInput
              style={styles.inputs}
              value={formData.city}
              onChangeText={(text) => handleInputChange("city", text)}
            />
          </View>
          <View>
            <Text style={styles.label}>İlçe</Text>
            <TextInput
              style={styles.inputs}
              value={formData.district}
              onChangeText={(text) => handleInputChange("district", text)}
            />
          </View>
          <View>
            <Text style={styles.label}>Mahalle</Text>
            <TextInput
              style={styles.inputs}
              value={formData.neighborhood}
              onChangeText={(text) => handleInputChange("neighborhood", text)}
            />
          </View>
          <View>
            <Text style={styles.label}>Adres</Text>
            <TextInput
              style={[styles.inputs, { height: 150, textAlignVertical: "top" }]}
              value={formData.addressDetail}
              onChangeText={(text) => handleInputChange("addressDetail", text)}
              multiline={true}
              numberOfLines={5}
            />
          </View>

          <View>
            <Text style={styles.label}>Bu adrese bir ad verin</Text>
            <TextInput
              style={styles.inputs}
              placeholder="Evim, İş yerim vb."
              placeholderTextColor="#75797a"
              value={formData.addressName}
              onChangeText={(text) => handleInputChange("addressName", text)}
            />
          </View>

          <View style={styles.checkSection}>
            <TouchableOpacity
              style={[
                styles.check,
                {
                  borderWidth: checked ? 0 : 1,
                  backgroundColor: checked ? "#22c1f4" : "#fff",
                },
              ]}
              onPress={() => setChecked(!checked)}
            >
              {checked && <Ionicons name="checkmark" size={20} color={"#fff"} />}
            </TouchableOpacity>
            <Text>Bu adresi fatura bilgilerimde de kullan</Text>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleSaveAddress}>
            <Text style={styles.registerButtonText}>Adresi Kaydet</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}