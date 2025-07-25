import { addFavorites, deleteFavorites, getAllFavorites } from '@/Services/favoriteService';
import { styles } from "@/styles/wishlist.js";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, Image, Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FavoriteResponse } from '@/Services/favoriteService';
import { addBasket } from '@/Services/cartService';
import { useAuth } from '@/Context/AuthContext';
import { router } from 'expo-router';
import { useBasket } from '@/Context/CartContext';

export default function Index() {

  const [searchingItem, setSearchingItem] = useState("");
  const [favorites, setFavorites] = useState<FavoriteResponse[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [displayProducts, setDisplayProducts] = useState<FavoriteResponse[]>([]);
  const isFocused = useIsFocused();
  const [addedProducts, setAddedProducts] = useState<{ [key: number]: boolean }>({})
  const { isLoggedIn } = useAuth();
  const { refreshBasket } = useBasket();

  const getFavorites = async () => {
    if (isLoggedIn) {
      try {
        const favoriteResponse = await getAllFavorites();
        setFavorites(favoriteResponse);
        setDisplayProducts(favoriteResponse);
      } catch {
        console.error("Favori ürünler alınırken hata oluştu.");
      }
    }
  };

  useEffect(() => {
    getFavorites();
  }, [isFocused]);

  const addUserBasket = async (id: number) => {
    await addBasket(id);
    refreshBasket();
    setAddedProducts(prevState => ({
      ...prevState,
      [id]: true,
    }));

    setTimeout(() => {
      setAddedProducts(prevState => ({
        ...prevState,
        [id]: false,
      }));
    }, 1000);
  }

  const toggleFavorite = async (product: FavoriteResponse) => {
    try {
      if (favorites.some((fav) => fav.productId === product.productId)) {
        await deleteFavorites(product.productId);
        setFavorites((prevFavorites) =>
          prevFavorites.filter((fav) => fav.productId !== product.productId)
        );
        await getFavorites();
      } else {
        await addFavorites(product.productId);
        setFavorites((prevFavorites) => [...prevFavorites, product]);
      }
    } catch (e) {
      console.error("Favori durumu değiştirilirken bir hata oluştu:", e);
    }
  };

  const search = () => {
    const filteredProducts = favorites.filter(favorite => (
      favorite.product.name.toLowerCase().includes(searchingItem.toLowerCase())
    ));
    console.log(filteredProducts.length);
    if (filteredProducts.length === 0) {
      Alert.alert("Aradığınız ürün bulunamadı. Tüm ürünler tekrar listeleniyor...");
      setDisplayProducts(favorites);
    } else {
      setDisplayProducts(filteredProducts);
    }
    setSearchingItem("");
  }

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.headerLogout}>
          <Text style={styles.headerText}>Favorilerim</Text>
        </View>

        <View style={styles.logout}>
          <Text style={styles.logoutText}>Favorilerinizi görmek için giriş yapmanız gerekmektedir!</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={() => router.push("/(tabs)/profile")}>
            <Text style={styles.logoutButtonText}>Hemen Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </View >
    );
  };

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
                const sorted = [...favorites].sort((a, b) => a.product.price - b.product.price);
                setDisplayProducts(sorted);
                setModalVisible(false);
              }}
            >
              <Text>Fiyata Göre (Artan)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalList}
              onPress={() => {
                const sorted = [...favorites].sort((a, b) => b.product.price - a.product.price);
                setDisplayProducts(sorted);
                setModalVisible(false);
              }}
            >
              <Text>Fiyata Göre (Azalan)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalList}
              onPress={() => {
                const sorted = [...favorites].sort((a, b) => a.product.rating - b.product.rating);
                setDisplayProducts(sorted);
                setModalVisible(false);
              }}
            >
              <Text>Puanına Göre (Artan)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalList}
              onPress={() => {
                const sorted = [...favorites].sort((a, b) => b.product.rating - a.product.rating);
                setDisplayProducts(sorted);
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
        {displayProducts.map((favorite) => (
          <Pressable style={styles.product} key={favorite.product.id} onPress={() => router.push(`/productDetail?id=${favorite.productId}`)}>
            <View>
              <Pressable onPress={() => toggleFavorite(favorite)} style={styles.favoriteButton}>
                <Ionicons name="heart" size={30} style={{ color: favorites.some((fav) => fav.product.id === favorite.product.id) ? "#ff3930" : "#75797a", }} />
              </Pressable>
              <Image source={{ uri: favorite.product.image }} style={styles.productImage} />
              <Text numberOfLines={3}>{favorite.product.name}</Text>
              <View style={styles.rating}>
                <Ionicons name="star" color={"#d9e42e"} size={20} />
                <Text>{favorite.product.rating}</Text>
                <Text style={styles.commentNum}>1154</Text>
              </View>
            </View>

            <TouchableOpacity style={!addedProducts[favorite.productId] ? styles.button : [styles.button, { backgroundColor: "#0aa222" }]} onPress={() => addUserBasket(favorite.productId)}>
              <Text style={!addedProducts[favorite.productId] ? styles.priceText : [styles.priceText, { color: "#fff" }]}>
                {!addedProducts[favorite.product.id]
                  ? `${favorite.product.price.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL`
                  : "Sepete Eklendi"}
                {!addedProducts[favorite.productId] && <Ionicons name="basket" color={"#fff"} size={20} />}
              </Text>
            </TouchableOpacity>

          </Pressable>
        ))}
      </ScrollView>

    </View>
  );
}