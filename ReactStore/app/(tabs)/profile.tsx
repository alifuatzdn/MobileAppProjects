import { styles } from '@/styles/login';
import { stylesProfile } from '@/styles/profile';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Link, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function Profile() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const isFocused = useIsFocused();

  const checkLogIn = async () => {
    if (!email || !password) {
      Alert.alert("Mail veya şifre giriniz.");
      return;
    }
    alert(`E-mail: ${email}\nPassword: ${password}`);
    setisLoggedIn(true);
  };

  const logOut = async () => {
    setisLoggedIn(false);
  }

  useEffect(() => {
    const loadLogedIn = async () => {
      if (Platform.OS === "web") {
        const storedLoggedIn = localStorage.getItem("loggedIn");
        if (storedLoggedIn) {
          setisLoggedIn(JSON.parse(storedLoggedIn));
        }
      } else {
        const storedLoggedIn = await AsyncStorage.getItem("loggedIn");
        if (storedLoggedIn) {
          setisLoggedIn(JSON.parse(storedLoggedIn));
        }
      }
    }
    loadLogedIn();
  }, []);

  useEffect(() => {
    const saveLoggedIn = async () => {
      if (Platform.OS === "web") {
        localStorage.setItem("loggedIn", JSON.stringify(isLoggedIn));
      } else {
        await AsyncStorage.setItem("loggedIn", JSON.stringify(isLoggedIn));
      }
    }
    saveLoggedIn();
  }, [isLoggedIn])

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.loginAlert}>Hesabını görmek ve tüm özelliklerine erişebilmek için giriş yapman gerekmektedir.</Text>

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
        <TouchableOpacity onPress={() => checkLogIn()} style={styles.loginButton}>
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

  return (
    <View style={stylesProfile.container}>
      <View style={stylesProfile.header}>
        <Text style={stylesProfile.headerText}>Hesabım</Text>
        <Ionicons name='notifications' size={23} style={{ position: "absolute", right: 8 }} color="#75797a" />
      </View>
      <ScrollView contentContainerStyle={stylesProfile.contentContainerStyle}>
        <View style={stylesProfile.person}>
          <Ionicons name='person' style={stylesProfile.personImg} size={35} />
          <Text style={stylesProfile.personText}>Ali Fuat Özden</Text>
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
          <TouchableOpacity style={stylesProfile.choices}>
            <View style={stylesProfile.choicesInside}>
              <Ionicons name='gift-outline' size={20} />
              <Text style={stylesProfile.choicesText}>Kuponlarım</Text>
            </View>
            <Ionicons name='chevron-forward-outline' size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={stylesProfile.choices}>
            <View style={stylesProfile.choicesInside}>
              <Ionicons name='settings-outline' size={20} />
              <Text style={stylesProfile.choicesText}>Ayarlarım</Text>
            </View>
            <Ionicons name='chevron-forward-outline' size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={stylesProfile.logoutButton} onPress={() => logOut()}>
          <Ionicons name='log-out-outline' size={25} />
          <Text style={stylesProfile.logoutButtonText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </View >
  )
}