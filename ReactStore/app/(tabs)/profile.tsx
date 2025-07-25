import { styles } from '@/styles/login';
import { stylesProfile } from '@/styles/profile';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { checkLoginStatus, login, logOut } from '@/Services/loginService';
import { useAuth } from '../../Context/AuthContext';


export default function Profile() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isFocused = useIsFocused();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { user, setUser } = useAuth();

  const checkLogin = async () => {
    if (!email || !password) {
      Alert.alert("Mail veya şifre giriniz.");
      return;
    }

    try {
      const response = await login(email, password);
      setIsLoggedIn(true);
      setUser({
        name: response.name,
        surname: response.surname,
        email: response.email,
        phoneNumber: response.phoneNumber,
        birthDate: response.birthDate,
      });
      Alert.alert(`Giriş başarılı! Hoşgeldin ${response.name}`);
      setEmail("");
      setPassword("");
    } catch (e) {
      Alert.alert("Giriş başarısız! Email veya şifre hatalı.");
    }
  };

  const checkLogout = async () => {
    try {
      logOut();
      setIsLoggedIn(false);
    } catch (e) {
      Alert.alert("Çıkış yapılamadı. Tekrar deneyiniz.")
    }
  }

  if (isLoggedIn) {
    return (
      <View style={stylesProfile.container}>
        <View style={stylesProfile.header}>
          <Text style={stylesProfile.headerText}>Hesabım</Text>
          <Ionicons name='notifications' size={23} style={{ position: "absolute", right: 8 }} color="#75797a" />
        </View>
        <ScrollView contentContainerStyle={stylesProfile.contentContainerStyle}>
          <View style={stylesProfile.person}>
            <Ionicons name='person' style={stylesProfile.personImg} size={35} />
            <Text style={stylesProfile.personText}>{user?.name} {user?.surname}</Text>
          </View>
          <View>

            <TouchableOpacity style={stylesProfile.choices} onPress={() => { router.push("/(profile)/orders") }}>
              <View style={stylesProfile.choicesInside}>
                <Ionicons name='bag-outline' size={20} />
                <Text style={stylesProfile.choicesText}>Siparişlerim</Text>
              </View>
              <Ionicons name='chevron-forward-outline' size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={stylesProfile.choices} onPress={() => { router.push("/(profile)/addresses") }} >
              <View style={stylesProfile.choicesInside}>
                <Ionicons name='location-outline' size={20} />
                <Text style={stylesProfile.choicesText}>Adreslerim</Text>
              </View>
              <Ionicons name='chevron-forward-outline' size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={stylesProfile.choices} onPress={() => { router.push("/(tabs)/wishlist") }} >
              <View style={stylesProfile.choicesInside}>
                <Ionicons name='heart-outline' size={20} />
                <Text style={stylesProfile.choicesText}>Beğendiklerim</Text>
              </View>
              <Ionicons name='chevron-forward-outline' size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={stylesProfile.choices} onPress={() => { router.push("/(profile)/creditCards") }} >
              <View style={stylesProfile.choicesInside}>
                <Ionicons name='card-outline' size={20} />
                <Text style={stylesProfile.choicesText}>Kayıtlı Kartlarım</Text>
              </View>
              <Ionicons name='chevron-forward-outline' size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={stylesProfile.choices} onPress={() => { router.push("/(profile)/comments") }} >
              <View style={stylesProfile.choicesInside}>
                <Ionicons name='chatbubble-outline' size={20} />
                <Text style={stylesProfile.choicesText}>Yorumlarım</Text>
              </View>
              <Ionicons name='chevron-forward-outline' size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={stylesProfile.choices} onPress={() => { router.push("/(profile)/coupon") }} >
              <View style={stylesProfile.choicesInside}>
                <Ionicons name='gift-outline' size={20} />
                <Text style={stylesProfile.choicesText}>Kuponlarım</Text>
              </View>
              <Ionicons name='chevron-forward-outline' size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={stylesProfile.choices} onPress={() => { router.push("/(profile)/settings") }} >
              <View style={stylesProfile.choicesInside}>
                <Ionicons name='settings-outline' size={20} />
                <Text style={stylesProfile.choicesText}>Ayarlarım</Text>
              </View>
              <Ionicons name='chevron-forward-outline' size={20} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={stylesProfile.logoutButton} onPress={() => checkLogout()}>
            <Ionicons name='log-out-outline' size={25} />
            <Text style={stylesProfile.logoutButtonText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </ScrollView>
      </View >
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.loginAlert}>TechStore'un tüm ayrıcalıklarına erişebilmek için giriş yapman gerekmektedir.</Text>

      <TextInput style={styles.inputs}
        placeholder='E-mail adresiniz'
        value={email}
        onChangeText={setEmail}
      />

      <TextInput style={styles.inputs}
        placeholder='Parola'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={() => checkLogin()} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Giriş Yap</Text>
      </TouchableOpacity>

      <View style={styles.register}>
        <Text>Hesabın bulunmuyorsa kayıt olmak için </Text>
        <Link href="/(auth)/register" style={styles.registerText}>kayıt ol.</Link>
      </View>

      <TouchableOpacity style={styles.googleLogin}>
        <Image source={require('@/assets/images/Logo-google-icon-PNG.png')} style={styles.googleLoginImg} />
        <Text style={styles.googleLoginText}>Google ile giriş yap</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleLogin}>
        <Image source={require('@/assets/images/facebook.png')} style={styles.googleLoginImg} />
        <Text style={styles.googleLoginText}>Facebook ile giriş yap</Text>
      </TouchableOpacity>
    </View>
  )
}