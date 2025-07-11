import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from "../../styles/register";

export default function register() {
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => { router.back() }}>
          <Ionicons name='arrow-back' size={25}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>Kayıt Ol</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View>
          <Text style={styles.label}>Adınız</Text>
          <TextInput style={styles.inputs}
            placeholder='Adınız'
            placeholderTextColor="#75797a"
          />
          <TextInput style={styles.inputs}
            placeholder='Soyadınız'
            placeholderTextColor="#75797a"
          />
        </View>

        <View>
          <Text style={styles.label}>E-mail adresiniz</Text>
          <TextInput style={styles.inputs}
            placeholder='merhaba@örnek.com'
            placeholderTextColor="#75797a"
          />
        </View>


        <View>
          <Text style={styles.label}>Parola</Text>
          <TextInput style={styles.inputs}
            placeholder='********'
            placeholderTextColor="#75797a"
          />
        </View>


        <View>
          <Text style={styles.label}>Telefon numaranız</Text>
          <TextInput style={styles.inputs}
            placeholder='(5xx)-xxx-xx-xx)'
            placeholderTextColor="#75797a"
          />
        </View>

        <View>
          <Text style={styles.label}>Doğum Tarihiniz</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <View style={styles.dates}>
              <View style={styles.dateInfoDay}>
                <Text style={styles.dateInfoText}>{birthDate.getDay()}</Text>
              </View>
              <View style={styles.dateInfoMonth}>
                <Text style={styles.dateInfoText}>{birthDate.getMonth()}</Text>
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

        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>KAYIT OL</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  )
}