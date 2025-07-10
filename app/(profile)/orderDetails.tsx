import { styles } from "@/styles/orderDetails"
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function orderDetails() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => { router.push("../(tabs)/profile") }}>
          <Ionicons name='arrow-back' size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Sipariş Detayları</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <Text style={styles.title}>Sipariş Detayı</Text>
        <Text>Sipariş Numarası: 449 081 047 9</Text>
        <Text>21 Haziran 2025, 13.01 Cumartesi</Text>
        <View style={styles.productContainer}>
          <View style={styles.sellerInfo}>
            <Text style={{ fontSize: 15, marginBottom: 10 }}>Satıcı: Hepsiburada</Text>
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.buy}>
                <Text>Satıcıya sor</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.seller}>
                <Text style={{ color: "#22c1f4", fontWeight: 500 }}>Satıcıyı Değerlendir</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.productInfo}>
            <View>
              <Image source={require("@/assets/images/phone1.webp")} style={styles.productImg} />
            </View>
            <View>
              <Text>Apple iPhone 13 128 GB Beyaz</Text>
              <Text style={styles.price}>32.749,00 TL</Text>
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.buy}>
                  <Text>Tekrar al</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.seller}>
                  <Text style={{ color: "#22c1f4", fontWeight: 500 }}>Ürünü Değerlendir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.productDetailsContainer}>
            <View style={styles.productDetails}>
              <Ionicons name="person" size={30} />
              <View style={{ marginLeft: 20 }}>
                <Text style={styles.productDetailsTitle}>Teslim edildi</Text>
                <View style={styles.deliveryInfo}>
                  <Text style={{ color: "#0aa222" }}>Tarih: </Text>
                  <Text style={styles.productDetailsInfo}>26 Haz Per 2025, 11.45</Text>
                </View>
                <View style={styles.deliveryInfo}>
                  <Text style={{ color: "#0aa222" }}>Teslim alan: </Text>
                  <Text style={styles.productDetailsInfo}>Ali Fuat Özden</Text>
                </View>
              </View>
            </View>
            <View style={{ padding: 10 }}>
              <TouchableOpacity style={styles.productDetailsButton}>
                <Ionicons name="person" size={25} />
                <Text style={styles.buttonText}>Kargo Takibi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.productDetailsButton}>
                <Ionicons name="person" size={25} />
                <Text style={styles.buttonText}>Fatura bilgisi</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.productDetailsButton}>
                <Ionicons name="person" size={25} />
                <Text style={styles.buttonText}>İade ve diğer talepler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>


        <Text style={styles.title}>Adres Bilgileri</Text>
        <View style={styles.contentBox}>
          <Text style={styles.deliveryAddress}>Teslimat Adresi</Text>
          <Text style={styles.deliveryInfoText}>Ali Fuat</Text>
          <Text>adress bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla</Text>
          <Text style={styles.deliveryInfoText}>Ali Fuat Özden - 905*******07</Text>
        </View>
        <View style={styles.receipt}>
          <Text style={styles.receiptText}>Fatura Adresi</Text>
          <Ionicons name="chevron-down-outline" size={20} />
        </View>

        <Text style={styles.title}>Ödeme Bilgileri</Text>
        <View style={styles.contentBox}>
          <View style={styles.paymentInfo}>
            <View style={styles.paymentInfoImgContainer}>
              <Image source={require("@/assets/images/işbankası.png")} style={styles.paymentInfoImg} />
            </View>
            <View>
              <Text style={styles.paymentAmount}>32.749,00 TL</Text>
              <Text style={styles.paymentCard}>4039 98** **** 3109</Text>
              <Text style={styles.paymentType}>Kredi Kartı ile ödendi</Text>
            </View>
          </View>
          <View style={styles.cargoPart}>
            <View style={styles.paymentDetails}>
              <Text>Kargo</Text>
              <Text style={styles.paymentDetailsText}>Bedava</Text>
            </View>
            <View style={styles.paymentDetails}>
              <Text>Ürünler</Text>
              <Text style={styles.paymentDetailsText}>32.749,00 TL</Text>
            </View>
          </View>
          <View style={[styles.paymentDetails, { marginTop: 7 }]}>
            <Text>Genel Toplam</Text>
            <Text style={styles.paymentDetailsText}>32.749,00 TL</Text>
          </View>
        </View>

        <Text style={styles.title}>Diğer</Text>
        <View style={[styles.other, { borderBottomWidth: 1 }]}>
          <Text>Satış Sözleşmesi</Text>
          <Ionicons name="chevron-forward-outline" size={20} />
        </View>
        <View style={styles.other}>
          <Text>İade Koşulları</Text>
          <Ionicons name="chevron-forward-outline" size={20} />
        </View>
      </ScrollView>
    </View>
  )
}