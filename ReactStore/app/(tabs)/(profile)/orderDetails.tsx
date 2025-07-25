import { getOrderById, getOrders, OrderResponse } from "@/Services/orderService"
import { styles } from "@/styles/orderDetails"
import { Ionicons } from '@expo/vector-icons'
import { useIsFocused } from "@react-navigation/native"
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function orderDetails() {
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const isFocused = useIsFocused();
  const { id } = useLocalSearchParams();

  const getUserOrder = async () => {
    const response = await getOrderById(Number(id));
    setOrder(response);
  };

  useEffect(() => {
    getUserOrder();
  }, [isFocused])


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => { router.push("/(profile)/orders") }}>
          <Ionicons name='arrow-back' size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Sipariş Detayları</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <Text style={styles.title}>Sipariş Detayı</Text>
        <Text>Sipariş Numarası: {order?.id}</Text>
        <Text>
          {order?.createdAt
            ? `${new Date(new Date(order.createdAt).setHours(new Date(order.createdAt).getHours() + 3)).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}, ${new Date(new Date(order.createdAt).setHours(new Date(order.createdAt).getHours() + 3)).toLocaleTimeString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            })} ${["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"][new Date(new Date(order.createdAt).setHours(new Date(order.createdAt).getHours() + 3)).getDay()]}`
            : "Tarih mevcut değil"}
        </Text>
        <View style={styles.productContainer}>
          <View style={styles.sellerInfo}>
            <Text style={{ fontSize: 15, marginBottom: 10 }}>Satıcı: TechStore</Text>
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
            {order?.products.map((p, index) => (
              <View key={p.id || index}>
                <Text>
                  {p.name.length > 35
                    ? `${p.name.slice(0, 35)}...`
                    : p.name}
                </Text>
                <Text style={styles.price}>{p.price.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL</Text>
                <View style={styles.buttons}>
                  <TouchableOpacity style={styles.buy}>
                    <Text>Tekrar al</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.seller}>
                    <Text style={{ color: "#22c1f4", fontWeight: 500 }}>Ürünü Değerlendir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.productDetailsContainer}>
            <View style={styles.productDetails}>
              <Ionicons name="person" size={30} />
              <View style={{ marginLeft: 20 }}>
                <Text style={styles.productDetailsTitle}>Sipariş Hazırlanıyor</Text>
                <View style={styles.deliveryInfo}>
                  <Text style={{ color: "#22c1f4" }}>Tahmini Teslimat: </Text>
                  <Text style={styles.productDetailsInfo}>
                    {order?.createdAt
                      ? (() => {
                        const updatedDate = new Date(order.createdAt);
                        updatedDate.setHours(updatedDate.getHours() + 3);
                        updatedDate.setDate(updatedDate.getDate() + 3);
                        return updatedDate.toLocaleDateString("tr-TR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        });
                      })()
                      : "Tarih mevcut değil"}
                  </Text>
                </View>
                <View style={styles.deliveryInfo}>
                  <Text style={{ color: "#22c1f4" }}>Teslim edilecek: </Text>
                  <Text style={styles.productDetailsInfo}>{order?.address.name} {order?.address.surname}</Text>
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
          <Text style={styles.deliveryInfoText}>{order?.address.name}</Text>
          <Text>{order?.address.addressDetail}</Text>
          <Text style={styles.deliveryInfoText}>{order?.address.name} {order?.address.surname} - 905** *** ** {order?.address.phoneNumber.slice(-2)}</Text>
        </View>
        <View style={styles.receipt}>
          <Text style={styles.receiptText}>Fatura Adresi</Text>
          <Ionicons name="chevron-down-outline" size={20} />
        </View>

        <Text style={styles.title}>Ödeme Bilgileri</Text>
        <View style={styles.contentBox}>
          <View style={styles.paymentInfo}>
            <View style={styles.paymentInfoImgContainer}>
              <Image source={require("@/assets/images/işbankası.jpg")} style={styles.paymentInfoImg} />
            </View>
            <View>
              <Text style={styles.paymentAmount}>{order?.totalPrice.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL</Text>
              <Text style={styles.paymentCard}>{order?.creditCard.cardNumber.slice(0, 4) + " " + order?.creditCard.cardNumber.slice(4, 6) + "** **** " + order?.creditCard.cardNumber.slice(12, 16)}</Text>
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
              <Text style={styles.paymentDetailsText}>{order?.totalPrice.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL</Text>
            </View>
          </View>
          <View style={[styles.paymentDetails, { marginTop: 7 }]}>
            <Text>Genel Toplam</Text>
            <Text style={styles.paymentDetailsText}>{order?.totalPrice.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL</Text>
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