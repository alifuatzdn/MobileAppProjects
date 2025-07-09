import { styles } from "@/styles/addAddress"
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function addAddress() {

  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => { router.push("./addresses") }}>
          <Ionicons name='arrow-back' size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Adres Ekle</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View>
          <Text style={styles.part}>Kişisel Bilgiler</Text>
          <Text style={styles.label}>Teslim alacak kişinin bilgileri</Text>
          <View style={styles.name}>
            <TextInput style={[styles.inputs, { marginRight: 10 }]}
              placeholder='Ad'
              placeholderTextColor="#75797a"
            />
            <TextInput style={styles.inputs}
              placeholder='Soyad'
              placeholderTextColor="#75797a"
            />
          </View>
        </View>
        <View>
          <Text style={styles.label}>Telefon numarası</Text>
          <TextInput style={styles.inputs}
            placeholder='(5xx)-xxx-xx-xx'
            placeholderTextColor="#75797a"
          />
        </View>

        <Text style={styles.part}>Adres Bilgileri</Text>

        <View>
          <Text style={styles.label}>Şehir</Text>
          <TextInput style={styles.inputs}
          />
        </View>
        <View>
          <Text style={styles.label}>İlçe</Text>
          <TextInput style={styles.inputs}
          />
        </View>
        <View>
          <Text style={styles.label}>Mahalle</Text>
          <TextInput style={styles.inputs}
          />
        </View>
        <View>
          <Text style={styles.label}>Adres</Text>
          <TextInput style={[styles.inputs, { height: 150 }]}
          />
        </View>

        <View>
          <Text style={styles.label}>Bu adrese bir ad verin</Text>
          <TextInput style={styles.inputs}
            placeholder='Evim, İş yerim vb.'
            placeholderTextColor="#75797a"
          />
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
          <Text>Bu adresi fatura bilgilerimde de kullan</Text>
        </View>

        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Adresi Kaydet</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}