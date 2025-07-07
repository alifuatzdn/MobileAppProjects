import { Image, Pressable, Text, TextInput, TouchableOpacity, View, ScrollView, Alert, Modal } from "react-native";
import { styles } from "../../styles/homepage.js"
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function Index() {

  const [searchingItem, setSearchingItem] = useState("");
  const [allProducts] = useState([
    { id: 1, name: "Apple iPhone 13 128 GB Beyaz", rating: 4.8, comment: 25308, price: 32.749, image: require("../../assets/images/phone1.webp") },
    { id: 2, name: "Samsung Galaxy A06 128 GB 4 GB Ram (Samsung Türkiye Garantili) Siyah", rating: 4.5, comment: 638, price: 6.199, image: require("../../assets/images/phone2.webp") },
    { id: 3, name: "Redmi Note 14 Pro 12GB 512GB (Xiaomi Türkiye Garantili)", rating: 4.6, comment: 322, price: 18.249, image: require("../../assets/images/phone3.webp") },
    { id: 4, name: "Samsung Galaxy S24 Fe 256 GB 8 GB Ram (Samsung Türkiye Garantili) Grafit", rating: 4.8, comment: 599, price: 25.999, image: require("../../assets/images/phone4.webp") },
    { id: 5, name: "Apple iPhone 15 128 GB Siyah", rating: 4.8, comment: 5445, price: 49.199, image: require("../../assets/images/phone5.webp") },
    { id: 6, name: "Xiaomi Redmi Note 14 8GB 128GB (Xiaomi Türkiye Garantili)", rating: 4.6, comment: 237, price: 11.099, image: require("../../assets/images/phone6.webp") },
  ]);
  const [products, setProducts] = useState(allProducts);
  const [modalVisible, setModalVisible] = useState(false);

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable>
          <Ionicons name="menu" size={30} style={styles.icons} />
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
        {products.map((product) => (
          <View style={styles.product}>
            <View>
              <Image source={product.image} style={styles.productImage} />
              <Text>
                {product.name}
              </Text>
              <View style={styles.rating}>
                <Ionicons name="star" color={"#d9e42e"} size={20}/>
                <Text>{product.rating}</Text>
                <Text style={styles.commentNum}>{product.comment}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.priceText}>{product.price},00 TL</Text>
              <Ionicons name="basket" color={"#fff"} size={20}/>
            </TouchableOpacity>
  
          </View>
        ))}
      </ScrollView>

    </View>
  );
}