import { Image, Pressable, Text, TextInput, TouchableOpacity, View, ScrollView, Alert, Modal, TouchableWithoutFeedback } from "react-native";
import { styles } from "@/styles/homepage.js"
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useIsFocused } from '@react-navigation/native';
import { getAllProducts, Product } from "@/Services/productService";
import { addFavorites, deleteFavorites, getAllFavorites } from "@/Services/favoriteService";
import { addBasket } from '@/Services/cartService';
import { useAuth } from "@/Context/AuthContext";
import { router } from "expo-router";
import { useBasket } from "@/Context/CartContext";


export default function Index() {

  const [searchingItem, setSearchingItem] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [hamburgerVisible, setHamburgerVisible] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const [addedProducts, setAddedProducts] = useState<{ [key: number]: boolean }>({})
  const { isLoggedIn } = useAuth();
  const { refreshBasket } = useBasket();


  const getProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response);
      setDisplayProducts(response);
      try {
        const favoriteResponse = await getAllFavorites();
        setFavorites(favoriteResponse.map((fav) => fav.productId));
      } catch {
        setFavorites([]);
        return;
      }
    } catch (error) {
      console.error("Ürünler alınırken hata oluştu.", error);
    }
  };

  const getProductsByCategory = async (category: string) => {
    try {
      const response = await fetch(`http://192.168.2.186:5062/api/product?Category=${category}`);
      if (!response.ok) {
        throw new Error("Kategoriye göre ürünler alınırken hata oluştu.");
      }
      const data = await response.json();
      setDisplayProducts(data);
    } catch (error) {
      console.error("Ürünler alınırken hata oluştu:", error);
    }
  };

  const addUserBasket = async (id: number) => {
    if (isLoggedIn) {
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
    else {
      Alert.alert("Bu işlem için giriş yapmanız gerekir.");
    }
  }

  useEffect(() => {
    getProducts();
  }, [isFocused]);

  const toggleFavorite = async (id: number) => {
    if (isLoggedIn) {
      try {
        if (favorites.includes(id)) {
          await deleteFavorites(id);
          setFavorites((prevFavorites) => prevFavorites.filter((favId) => favId !== id));
        } else {
          await addFavorites(id);
          setFavorites((prevFavorites) => [...prevFavorites, id]);
        }
      } catch (e) {
        console.error("Favori durumu değiştirilirken bir hata oluştu:", e);
      }
    }
    else {
      Alert.alert("Bu işlem için giriş yapmanız gerekir.");
    }
  };

  const search = () => {
    const filteredProducts = products.filter(product => (
      product.name.toLowerCase().includes(searchingItem.toLowerCase())
    ));
    console.log(filteredProducts.length);
    if (filteredProducts.length === 0) {
      Alert.alert("Aradığınız ürün bulunamadı. Tüm ürünler tekrar listeleniyor...");
      setDisplayProducts(products);
    } else {
      setDisplayProducts(filteredProducts);
    }
    setSearchingItem("");
  }

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable>
          <Ionicons name="menu" size={30} style={styles.icons} onPress={() => { setHamburgerVisible(true) }} />
        </Pressable>

        <View style={styles.searchBar}>
          <Pressable onPress={search}>
            <Ionicons name="search" size={15} style={styles.icons} />
          </Pressable>
          <TextInput style={styles.input}
            placeholder="Ürün arayın..."
            value={searchingItem}
            onChangeText={setSearchingItem}
          />
        </View>

        <Pressable>
          <Ionicons name="notifications" size={25} style={styles.icons} />
        </Pressable>
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
        visible={hamburgerVisible}
        transparent
        onRequestClose={() => setHamburgerVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setHamburgerVisible(false)}>
          <View style={{ flex: 1 }}>
            <View style={styles.model2}>
              <View style={styles.modalWindow2}>
                <Text style={styles.modalText}>Kategori Seçin</Text>
                <TouchableOpacity style={styles.modalList2} onPress={() => {
                  getProductsByCategory("phone");
                  setHamburgerVisible(false);
                }}
                >
                  <Text >Telefon</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList2} onPress={() => {
                  getProductsByCategory("computer");
                  setHamburgerVisible(false);
                }}
                >
                  <Text>Bilgisayar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList2} onPress={() => {
                  getProductsByCategory("tablet");
                  setHamburgerVisible(false);
                }}
                >
                  <Text>Tablet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList2} onPress={() => {
                  getProductsByCategory("headset");
                  setHamburgerVisible(false);
                }}
                >
                  <Text>Kulaklık</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList2} onPress={() => {
                  getProductsByCategory("mouse");
                  setHamburgerVisible(false);
                }}
                >
                  <Text>Mouse</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList2} onPress={() => {
                  getProductsByCategory("keyboard");
                  setHamburgerVisible(false);
                }}
                >
                  <Text>Klavye</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList2} onPress={() => {
                  getProductsByCategory("watch");
                  setHamburgerVisible(false);
                }}
                >
                  <Text>Akıllı Saat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList2} onPress={() => {
                  getProductsByCategory("band");
                  setHamburgerVisible(false);
                }}
                >
                  <Text>Akıllı Bileklik</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        visible={modalVisible}
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.model}>
            <View style={styles.modalWindow}>
              <Text style={styles.modalText}>Sıralama Türü Seçin</Text>
              <TouchableOpacity
                style={styles.modalList}
                onPress={() => {
                  const sorted = [...products].sort((a, b) => a.price - b.price);
                  setDisplayProducts(sorted);
                  setModalVisible(false);
                }}
              >
                <Text>Fiyata Göre (Artan)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalList}
                onPress={() => {
                  const sorted = [...products].sort((a, b) => b.price - a.price);
                  setDisplayProducts(sorted);
                  setModalVisible(false);
                }}
              >
                <Text>Fiyata Göre (Azalan)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalList}
                onPress={() => {
                  const sorted = [...products].sort((a, b) => a.rating - b.rating);
                  setDisplayProducts(sorted);
                  setModalVisible(false);
                }}
              >
                <Text>Puanına Göre (Artan)</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalList}
                onPress={() => {
                  const sorted = [...products].sort((a, b) => b.rating - a.rating);
                  setDisplayProducts(sorted);
                  setModalVisible(false);
                }}
              >
                <Text>Puanına Göre (Azalan)</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <ScrollView contentContainerStyle={[styles.productContainer, { paddingBottom: 70 }]}>
        {displayProducts.map((product) => (
          <Pressable style={styles.product} key={product.id} onPress={() => router.push(`/productDetail?id=${product.id}`)}>
            <View>
              <Pressable style={styles.favoriteButton} onPress={() => toggleFavorite(product.id)}>
                <Ionicons name="heart" size={30} style={{ color: favorites.includes(product.id) ? "#ff3930" : "#75797a" }} />
              </Pressable>
              <View>
                <Image source={{ uri: product.image }} style={styles.productImage} />
              </View>
              <Text numberOfLines={3}>{product.name}</Text>
              <View style={styles.rating}>
                <Ionicons name="star" color={"#d9e42e"} size={20} />
                <Text>{product.rating}</Text>
                <Text style={styles.commentNum}>1554</Text>
              </View>
            </View>

            <TouchableOpacity
              style={!addedProducts[product.id] ? styles.button : [styles.button, { backgroundColor: "#0aa222" }]}
              onPress={() => addUserBasket(product.id)}
            >
              <Text
                style={!addedProducts[product.id] ? styles.priceText : [styles.priceText, { color: "#fff" }]}
              >
                {!addedProducts[product.id]
                  ? `${product.price.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL`
                  : "Sepete Eklendi"}
              </Text>
              {!addedProducts[product.id] && <Ionicons name="basket" color={"#fff"} size={20} />}
            </TouchableOpacity>
          </Pressable>
        ))
        }
      </ScrollView >

    </View >
  );
}