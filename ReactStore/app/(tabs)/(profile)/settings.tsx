import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert, Platform, KeyboardAvoidingView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { router } from 'expo-router';
import { styles } from "@/styles/settings";
import { useAuth } from '@/Context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateUser } from '@/Services/loginService';

export default function settings() {
  const { user, setUser } = useAuth();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [againPassword, setagainPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const updateUserInfo = async () => {
    try {
      if (!name || !surname || !email || !password || !againPassword || !phoneNumber || !birthDate) {
        Alert.alert("Lütfen tüm alanları doldurun.");
        return;
      }

      if (password !== againPassword) {
        Alert.alert("Şifreleriniz uyuşmuyor! Kontrol edin.");
        return;
      }

      const request = { name: name, surname: surname, email: email, phoneNumber: phoneNumber, birthDate: birthDate.toISOString(), password: password }
      await updateUser(request);

      setUser({
        name: name,
        surname: surname,
        email: email,
        phoneNumber: phoneNumber,
        birthDate: birthDate.toISOString(),
      });
      setPassword("");
      setagainPassword("");
      Alert.alert(`${name}, kullanıcı bilgilerin başarıyla güncellendi.`);
      router.push("/(tabs)/profile");
    } catch (error) {
      console.error("Kullanıcı bilgileri güncellenirken hata oluştu.", error);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setSurname(user.surname || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
      setBirthDate(user.birthDate ? new Date(user.birthDate) : new Date());
    }
  }, [user]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
    >
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
          <Text style={styles.headerText}>Kullanıcı Bilgilerim</Text>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View>
            <Text style={styles.label}>Adınız</Text>
            <TextInput style={styles.inputs}
              placeholder='Adınız'
              placeholderTextColor="#75797a"
              value={name}
              onChangeText={setName}
            />
            <TextInput style={styles.inputs}
              placeholder='Soyadınız'
              placeholderTextColor="#75797a"
              value={surname}
              onChangeText={setSurname}
            />
          </View>
          <View>
            <Text style={styles.label}>E-mail adresiniz</Text>
            <TextInput style={styles.inputs}
              placeholder='merhaba@örnek.com'
              placeholderTextColor="#75797a"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View>
            <Text style={styles.label}>Parola</Text>
            <TextInput
              style={styles.inputs}
              placeholder='********'
              placeholderTextColor="#75797a"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <View>
            <Text style={styles.label}>Parolayı tekrar giriniz</Text>
            <TextInput
              style={styles.inputs}
              placeholder='********'
              placeholderTextColor="#75797a"
              value={againPassword}
              onChangeText={setagainPassword}
              secureTextEntry
            />
          </View>
          <View>
            <Text style={styles.label}>Telefon numaranız</Text>
            <TextInput style={styles.inputs}
              placeholder='(5xx)-xxx-xx-xx)'
              placeholderTextColor="#75797a"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
          <View>
            <Text style={styles.label}>Doğum Tarihiniz</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <View style={styles.dates}>
                <View style={styles.dateInfoDay}>
                  <Text style={styles.dateInfoText}>{birthDate.getDate()}</Text>
                </View>
                <View style={styles.dateInfoMonth}>
                  <Text style={styles.dateInfoText}>{birthDate.getMonth() + 1}</Text>
                </View>
                <View style={styles.dateInfoYear}>
                  <Text style={styles.dateInfoText}>{birthDate.getFullYear()}</Text>
                </View>
              </View>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={birthDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    const fixedDate = new Date(selectedDate);
                    fixedDate.setHours(12);
                    setBirthDate(fixedDate);
                  }
                }}
              />
            )}
          </View>



          <TouchableOpacity style={styles.registerButton} onPress={() => updateUserInfo()}>
            <Text style={styles.registerButtonText}>Bilgileri Güncelle</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}