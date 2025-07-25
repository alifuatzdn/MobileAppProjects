import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from "../../styles/register";
import { useAuth } from '../../Context/AuthContext';
import { registerPost } from '@/Services/registerService';

export default function register() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { setIsLoggedIn } = useAuth();
  const { setUser } = useAuth();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [checked, setChecked] = useState(false);

  const userRegister = async () => {
    if (!name || !surname || !email || !password || !phoneNumber || !birthDate) {
      Alert.alert("Bilgilerinizi eksiksiz doldurduğunuzdan emin olunuz.");
      return;
    }
    if (!checked) {
      Alert.alert("Kayıt olmak için hüküm ve koşulları kabul ediniz.");
      return;
    }

    try {
      const response = await registerPost(name, surname, email, password, phoneNumber, birthDate.toISOString());
      setIsLoggedIn(true);
      setUser({
        name: response.name,
        surname: response.surname,
        email: response.email,
        phoneNumber: response.phoneNumber,
        birthDate: response.birthDate,
      });
      Alert.alert(`Başarıyla kayıt oldunuz! Hoşgeldin ${response.name}`);
      router.push("/(tabs)/profile");
    } catch (error) {
      Alert.alert(
        "Kayıt olma başarısız! Tekrar deneyiniz.",
      );
    }
  }


  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={60}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => { router.back() }}>
            <Ionicons name='arrow-back' size={25} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Kayıt Ol</Text>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View>
            <Text style={styles.label}>Adınız</Text>
            <TextInput style={styles.inputs}
              placeholder='Adınız'
              placeholderTextColor="#75797a"
              onChangeText={setName}
            />
            <TextInput style={styles.inputs}
              placeholder='Soyadınız'
              placeholderTextColor="#75797a"
              onChangeText={setSurname}
            />
          </View>

          <View>
            <Text style={styles.label}>E-mail adresiniz</Text>
            <TextInput style={styles.inputs}
              placeholder='merhaba@örnek.com'
              placeholderTextColor="#75797a"
              onChangeText={setEmail}
            />
          </View>


          <View>
            <Text style={styles.label}>Parola</Text>
            <TextInput style={styles.inputs}
              placeholder='********'
              placeholderTextColor="#75797a"
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>


          <View>
            <Text style={styles.label}>Telefon numaranız</Text>
            <TextInput style={styles.inputs}
              placeholder='(5xx)-xxx-xx-xx)'
              placeholderTextColor="#75797a"
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
                  if (selectedDate) setBirthDate(selectedDate);
                }}
              />
            )}
          </View>

          <View style={styles.checkSection}>
            <TouchableOpacity style={[styles.check, {
              borderWidth: checked ? 0 : 1,
              backgroundColor: checked ? "#22c1f4" : "#fff",
            }]} onPress={() => setChecked(!checked)}>
              {checked && (
                <Ionicons name='checkmark' size={20} color={"#fff"} />
              )}
            </TouchableOpacity>
            <Text>Hüküm ve koşulları kabul etmek için tıklayınız.</Text>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={() => userRegister()}>
            <Text style={styles.registerButtonText}>KAYIT OL</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}