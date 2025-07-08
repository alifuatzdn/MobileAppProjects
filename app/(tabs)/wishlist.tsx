import { Platform, Image, Pressable, Text, TextInput, TouchableOpacity, View, ScrollView, Alert, Modal } from "react-native";
import { styles } from "@/styles/wishlist.js"
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { productData } from '@/data/products.js';
import { useIsFocused } from "@react-navigation/native";

export default function Index() {

  const [searchingItem, setSearchingItem] = useState("");
  const [allProducts] = useState(productData);
  const [products, setProducts] = useState(allProducts);
  const [modalVisible, setModalVisible] = useState(false);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});
  const [basket, setBasket] = useState<{ [key: number]: number }>({});
  const isFocused = useIsFocused();

  const search = () => {
    const filteredProducts = allProducts.filter(product => (
      product.name.toLowerCase().includes(searchingItem.toLowerCase())
    ));
    console.log(filteredProducts.length);
    if (filteredProducts.length === 0) {
      Alert.alert("Aradığınız ürün bulunamadı. Tüm ürünler tekrar listeleniyor...");
      setProducts(allProducts);
    } else {
      setProducts(filteredProducts);
    }
    setSearchingItem("");
  }

  const addBasket = async (productId: number) => {
    const newBasket = {
      ...basket,
      [productId]: (basket[productId] || 0) + 1,
    };
    setBasket(newBasket);

    Alert.alert("Ürün sepete eklendi");

    if (Platform.OS === "web") {
      localStorage.setItem("basket", JSON.stringify(newBasket));
    } else {
      await AsyncStorage.setItem("basket", JSON.stringify(newBasket));
    }
  }

  const addFavorites = async (productId: number) => {
    const newFavorites = {
      ...favorites,
      [productId]: !favorites[productId],
    };
    setFavorites(newFavorites);

    if (Platform.OS === "web") {
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  }

  useEffect(() => {
    const loadFavorites = async () => {
      if (Platform.OS === "web") {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } else {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      }
    };
    if (isFocused) {
      loadFavorites();
    }
  }, [isFocused]);

  const favoriteProducts = products.filter(product => favorites[product.id]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Pressable onPress={search}>
            <Ionicons name="search" size={15} style={styles.icons} />
          </Pressable>
          <TextInput style={styles.input}
            placeholder="Beğendiklerimde Ara"
            value={searchingItem}
            onChangeText={setSearchingItem}
          />
        </View>
      </View>

      <View style={styles.sort}>
        <TouchableOpacity style={styles.sortButton}>
          <Ionicons name="filter"></Ionicons>
          <Text style={styles.sortText}>Filtrele</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="swap-vertical"></Ionicons>
          <Text style={styles.sortText}>Sırala</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.model}>
          <View style={styles.modalWindow}>
            <Text style={styles.modalText}>Sıralama Türü Seçin</Text>
            <TouchableOpacity
              style={styles.modalList}
              onPress={() => {
                const sorted = [...products].sort((a, b) => a.price - b.price);
                setProducts(sorted);
                setModalVisible(false);
              }}
            >
              <Text>Fiyata Göre (Artan)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalList}
              onPress={() => {
                const sorted = [...products].sort((a, b) => b.price - a.price);
                setProducts(sorted);
                setModalVisible(false);
              }}
            >
              <Text>Fiyata Göre (Azalan)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalList}
              onPress={() => {
                const sorted = [...products].sort((a, b) => a.rating - b.rating);
                setProducts(sorted);
                setModalVisible(false);
              }}
            >
              <Text>Puanına Göre (Artan)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalList}
              onPress={() => {
                const sorted = [...products].sort((a, b) => b.rating - a.rating);
                setProducts(sorted);
                setModalVisible(false);
              }}
            >
              <Text>Puanına Göre (Azalan)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancelText}>İptal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={[styles.productContainer, { paddingBottom: 70 }]}>
        {favoriteProducts.map((product) => (
          <View style={styles.product} key={product.id}>
            <View>
              <Pressable onPress={() => addFavorites(product.id)} style={styles.favoriteButton}>
                <Ionicons name="heart" size={30} style={{ color: favorites[product.id] ? "#ff3930" : "#75797a" }} />
              </Pressable>
              <Image source={product.image} style={styles.productImage} />
              <Text>
                {product.name}
              </Text>
              <View style={styles.rating}>
                <Ionicons name="star" color={"#d9e42e"} size={20} />
                <Text>{product.rating}</Text>
                <Text style={styles.commentNum}>{product.comment}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => addBasket(product.id)}>
              <Text style={styles.priceText}>{product.price},00 TL</Text>
              <Ionicons name="basket" color={"#fff"} size={20} />
            </TouchableOpacity>

          </View>
        ))}
      </ScrollView>

    </View>
  );
}