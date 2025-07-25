import { View, Text, TouchableOpacity, Image, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { styles } from "@/styles/cart.js"
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { getBasket, deleteBasket, updateBasket } from '@/Services/cartService';
import { CartResponse } from '@/Services/cartService';
import { router } from 'expo-router';
import { useAuth } from '@/Context/AuthContext';
import { useBasket } from '@/Context/CartContext';


export default function cart() {
  const [basket, setBasket] = useState<CartResponse[]>([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { isLoggedIn } = useAuth();
  const { refreshBasket } = useBasket();

  const getUserBasket = async () => {
    if (isLoggedIn) {
      try {
        const basketResponse = await getBasket();
        setBasket(basketResponse);
      } catch {
        console.error("Sepetteki ürünler alınırken hata oluştu.");
      }
    }
  };

  const deleteUserBasket = async (id: number) => {
    try {
      await deleteBasket(id);
      setBasket((prevBasket) => prevBasket.filter((item) => item.productId !== id));
      refreshBasket();
    } catch {
      console.error("Sepetteki ürün silinirken hata oluştu.");
    }
  };

  const updateUserBasket = async (id: number, newQuantity: number) => {
    try {
      await updateBasket(id, newQuantity);

      if (newQuantity === 0) {
        setBasket(prevBasket => prevBasket.filter(item => item.productId !== id));
        refreshBasket();
      }

      setBasket((prevBasket) =>
        prevBasket.map((item) =>
          item.productId === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (E) {
      console.error("Sepet güncellenirken bir hata oluştu.", E);
    }
  };

  useEffect(() => {
    getUserBasket();
  }, [isFocused]);

  const calculatedTotalPrice = basket.reduce((total, item) => total + item.product.price * item.quantity, 0);

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.headerLogout}>
          <Text style={styles.headerText}>Sepetim</Text>
        </View>

        <View style={styles.logout}>
          <Text style={styles.logoutText}>Sepetinizdeki ürünleri görmek için giriş yapmanız gerekmektedir!</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={() => router.push("/(tabs)/profile")}>
            <Text style={styles.logoutButtonText}>Hemen Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </View >
    );
  };

  if (basket.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Sepetim</Text>
        </View>

        <View style={styles.emptyBasket}>
          <Text style={styles.emptyBasketText}>Sepetiniz boş!</Text>
          <TouchableOpacity style={styles.emptyBasketButton} onPress={() => (navigation as any).navigate("index")}>
            <Text style={styles.emptyBasketButtonText}>Alışverişe Başla</Text>
          </TouchableOpacity>
        </View>
      </View >
    );
  }

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sepetim</Text>
        <Text style={styles.productNum}>({basket.length} ürün)</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
        {basket.map((basketItem) => (
          <View key={basketItem.product.id}>
            <View style={styles.sellerInfo}>
              <Text style={styles.seller}>Satıcı: Hepsiburada</Text>
              <Text style={styles.deliveryFee}>Kargo Bedava</Text>
            </View>

            <View>
              <View style={styles.delivery}>
                <View style={{ alignItems: "center", flexDirection: "row", }}>
                  <MaterialCommunityIcons name="truck-delivery-outline" size={24} color="#75797a" style={{ marginRight: 5 }} />
                  <Text>Tahmini 14 Temmuz Pazartesi kapında</Text>
                </View>
                <Pressable onPress={() => deleteUserBasket(basketItem.product.id)}>
                  <Ionicons name='trash-outline' color="#ff3930" size={25} />
                </Pressable>
              </View>

              <View style={styles.product}>
                <View>
                  <View style={styles.productInfo}>
                    <View style={styles.imgContainer}>
                      <Image source={{ uri: basketItem.product.image }} style={styles.productImg} />
                    </View>
                    <View style={{ flexWrap: "wrap", flex: 1 }}>
                      <Text style={styles.phoneName} numberOfLines={2}>
                        {basketItem.product.name}
                      </Text>
                      <View style={styles.installment}>
                        <MaterialCommunityIcons name='credit-card-outline' color="#850aa2" size={23} />
                        <Text style={styles.installmentText}>Peşin fiyatına 3 x</Text>
                        <Text style={styles.installmentPrice}>{(basketItem.product.price / 3).toFixed(3)} TL</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.productBottom}>
                    <View style={styles.productSetting}>
                      <Pressable onPress={() => updateUserBasket(basketItem.product.id, basketItem.quantity - 1)}>
                        <Ionicons name='remove-outline' color="#22c1f4" size={25} />
                      </Pressable>
                      <Text style={styles.number}>{basketItem.quantity}</Text>
                      <Pressable onPress={() => updateUserBasket(basketItem.product.id, basketItem.quantity + 1)}>
                        <MaterialCommunityIcons name='plus' color="#22c1f4" size={25} />
                      </Pressable>
                    </View>
                    <Text style={styles.productPrice}>
                      {basketItem.product.price.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.pricePanel}>
        <Text style={styles.priceText}>{calculatedTotalPrice.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL</Text>
        <TouchableOpacity style={styles.priceButton} onPress={() => router.push({ pathname: "/payment", params: { calculatedTotalPrice } })}>
          <Text style={styles.priceButtonText}>Ödemeye Geç</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}