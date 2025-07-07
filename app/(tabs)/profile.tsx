import { View, Text, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/styles/login'
import { Link } from 'expo-router';

export default function Profile() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const checkLogIn = () => {
    if (!email || !password) {
      Alert.alert("Mail veya şifre giriniz.");
      return;
    }
    alert(`E-mail: ${email}\nPassword: ${password}`);
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginAlert}>Hesabını görmek için giriş yapman gerekmektedir.</Text>

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
      <TouchableOpacity onPress={checkLogIn} style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Giriş Yap</Text>
      </TouchableOpacity>

      <View style={styles.register}>
        <Text>Hesabın bulunmuyorsa kayıt olmak için </Text>
        <Link href="../register" style={styles.registerText}>kayıt ol.</Link>
      </View> 

      <TouchableOpacity style={styles.googleLogin}>
        <Image source={require('../../assets/images/Logo-google-icon-PNG.png')} style={styles.googleLoginImg} />
        <Text style={styles.googleLoginText}>Google ile giriş yap</Text>
      </TouchableOpacity>
    </View>
  )
}