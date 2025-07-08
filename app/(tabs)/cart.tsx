import { View, Text, Switch, TouchableOpacity, Image, Pressable, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react';
import { styles } from "@/styles/cart.js"
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { productData } from '@/data/products';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function cart() {
  const [isChecked, setIsChecked] = useState(false);
  const [basket, setBasket] = useState<{ [key: number]: number }>({});
  const [allProducts, setAllProducts] = useState(productData);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const removeItem = async (productID: number) => {
    const updatedBasket = { ...basket };
    delete updatedBasket[productID];
    setBasket(updatedBasket);

    if (Platform.OS === "web") {
      localStorage.setItem("basket", JSON.stringify(updatedBasket));
    } else {
      await AsyncStorage.setItem("basket", JSON.stringify(updatedBasket));
    }
  };

  const updateItem = async (productID: number) => {
    setBasket(prevBasket => ({
      ...prevBasket,
      [productID]: (prevBasket[productID] || 0) + 1, // Adedi artır
    }));

    if (Platform.OS === "web") {
      localStorage.setItem("basket", JSON.stringify(basket));
    } else {
      await AsyncStorage.setItem("basket", JSON.stringify(basket));
    }

  }

  useEffect(() => {
    const loadBasket = async () => {
      if (Platform.OS === "web") {
        const storedBasket = await localStorage.getItem("basket");
        if (storedBasket) {
          setBasket(JSON.parse(storedBasket));
        }
      } else {
        const storedBasket = await AsyncStorage.getItem("basket");
        if (storedBasket) {
          setBasket(JSON.parse(storedBasket));
        }
      }
    };
    if (isFocused) {
      loadBasket();
    }
  }, [isFocused]);

  const basketItems = allProducts.filter(product => basket[product.id]);
  const totalPrice = basketItems.reduce((sum, product) => {
    return sum + product.price * basket[product.id];
  }, 0);

  if (basketItems.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>SEPETİM</Text>
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
        <Text style={styles.headerText}>SEPETİM</Text>
        <Text style={styles.productNum}>({basketItems.length} ürün)</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
        {basketItems.map((product) => (
          <View key={product.id}>
            <View style={styles.sellerInfo}>
              <Text style={styles.seller}>Satıcı: Hepsiburada</Text>
              <Text style={styles.deliveryFee}>Kargo Bedava</Text>
            </View>

            <View>
              <View style={styles.delivery}>
                <MaterialCommunityIcons name="truck-delivery-outline" size={24} color="#75797a" style={{ marginRight: 5 }} />
                <Text>Tahmini 14 Temmuz Pazartesi kapında</Text>
              </View>

              <View style={styles.product}>
                <View>
                  <View style={styles.productInfo}>
                    <View style={styles.imgContainer}>
                      <Image source={product.image} style={styles.productImg} />
                    </View>
                    <View style={{ flexWrap: "wrap", flex: 1 }}>
                      <Text style={styles.phoneName} numberOfLines={2}>
                        {product.name}
                      </Text>
                      <View style={styles.installment}>
                        <MaterialCommunityIcons name='credit-card-outline' color="#850aa2" size={23} />
                        <Text style={styles.installmentText}>Peşin fiyatına 3 x</Text>
                        <Text style={styles.installmentPrice}>{(product.price / 3).toFixed(3)} TL</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.productBottom}>
                    <View style={styles.productSetting}>
                      <Pressable onPress={() => removeItem(product.id)}>
                        <Ionicons name='trash-outline' color="#22c1f4" size={20} />
                      </Pressable>
                      <Text style={styles.number}>{basket[product.id]}</Text>
                      <Pressable onPress={() => updateItem(product.id)}>
                        <MaterialCommunityIcons name='plus' color="#22c1f4" size={25} />
                      </Pressable>
                    </View>
                    <Text style={styles.productPrice}>{product.price},00 TL</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.pricePanel}>
        <Text style={styles.priceText}>{(totalPrice).toFixed(3)},00 TL</Text>
        <TouchableOpacity style={styles.priceButton}>
          <Text style={styles.priceButtonText}>Ödemeye Geç</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}