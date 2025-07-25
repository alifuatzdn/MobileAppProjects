import { View, Text, Pressable, TouchableOpacity, TextInput, Image, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { styles } from '@/styles/productDetail';
import { router, useLocalSearchParams } from 'expo-router';
import { getProductById, Product } from '@/Services/productService';
import { useIsFocused } from '@react-navigation/native';
import comments from './comments';
import { addComment } from '@/Services/commentService';
import { Keyboard } from 'react-native';
import { addBasket } from '@/Services/cartService';
import { useAuth } from '@/Context/AuthContext';
import { useBasket } from '@/Context/CartContext';

export default function productDetail() {
  const calculatedTotalPrice = 32332;
  const [enableComment, setEnableComment] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | null>();
  const [commentText, setCommentText] = useState<string | undefined>(undefined);
  const { id } = useLocalSearchParams();
  const isFocused = useIsFocused();
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const { refreshBasket } = useBasket();

  const getUserProductbyId = async () => {
    try {
      const response = await getProductById(Number(id));
      setProduct(response);
    } catch (error) {
      console.error("Ürün bilgisi alınamadı.", error)
    }
  }

  const createUserComment = async () => {
    if (!commentText || commentText.trim() === "") {
      Alert.alert("Yorum boş olamaz.");
      return;
    }
    try {
      const request = {
        content: commentText,
      };
      await addComment(request, Number(id));
      setCommentText("");
      getUserProductbyId();
    } catch (error) {
      Alert.alert("Bir ürüne birden fazla yorum yapamazsınız.")
      setCommentText("");
    }
  }

  useEffect(() => {
    getUserProductbyId();
  }, [isFocused])

  useEffect(() => {
    const showPrice = Keyboard.addListener("keyboardDidShow", () => setKeyboardOpen(true));
    const hidePrice = Keyboard.addListener("keyboardDidHide", () => setKeyboardOpen(false));
    return () => {
      showPrice.remove();
      hidePrice.remove();
    }
  }, [])

  const [isAdded, setIsAdded] = useState<boolean>(false);
  const addUserBasket = async (id: number) => {
    if (isLoggedIn) {
      await addBasket(id);
      setIsAdded(true);
      refreshBasket();

      setTimeout(() => {
        setIsAdded(false);
      }, 1000);
    }
    else {
      Alert.alert("Bu işlem için giriş yapmanız gerekir.");
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => {
              router.push("/");
            }}
          >
            <Ionicons name="arrow-back" size={25} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Ürün Detayı</Text>
        </View>

        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.imgContainer}>
            <Image source={{ uri: product?.image }} style={styles.img} />
            <View style={styles.imgNumContainer}>
              <Text style={styles.imgNum}>1/4</Text>
            </View>
          </View>

          <View style={styles.productInfo}>
            <View style={styles.brandContainer}>
              <Text numberOfLines={2} ellipsizeMode="tail">
                <Text style={styles.brand}>{product?.name.split(" ")[0]} </Text>
                <Text style={styles.brandText}>{product?.name.split(" ").slice(1).join(" ")}</Text>
              </Text>
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.ratingContainer}>
                <Ionicons name='star' color="#22c1f4" size={15} />
                <Text>{product?.rating}</Text>
              </View>
              <View style={styles.ratingNum}>
                <Text>1554</Text>
              </View>
            </View>
          </View>

          <View style={styles.commentInfo}>
            {enableComment ? (
              <View style={styles.makeComment}>
                <TextInput
                  style={[styles.inputs, { height: 70, textAlignVertical: "top" }]}
                  multiline={true}
                  placeholder='Yorum yap...'
                  value={commentText}
                  onChangeText={(text) => setCommentText(text)}
                  numberOfLines={3}
                />
                <TouchableOpacity style={styles.priceButton} onPress={() => createUserComment()}>
                  <Text style={styles.priceButtonText}>Gönder</Text>
                </TouchableOpacity>
              </View>

            ) :
              (
                <View style={styles.makeComment}>
                  <TouchableOpacity style={styles.priceButton} onPress={() => setEnableComment(true)}>
                    <Text style={styles.priceButtonText}>Hemen Yorum Yap</Text>
                  </TouchableOpacity>
                </View>
              )}
            {product?.comments.slice().reverse().map(comment => (
              <View style={styles.commentContainer} key={comment.id}>
                <View style={styles.commentInfoContainer}>
                  <Text style={styles.commentText}>{comment.userName}</Text>
                  <Text style={styles.commentText}>
                    {new Date(new Date(comment.createdOn).setHours(new Date(comment.createdOn).getHours() + 3)).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                </View>
                <Text style={styles.comment}>{comment.content}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {!keyboardOpen && (
          <View style={styles.pricePanel}>
            <Text style={styles.priceText}>{calculatedTotalPrice.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL</Text>
            <TouchableOpacity style={!isAdded ? styles.priceButton : [styles.priceButton, { backgroundColor: "#0aa222" }]} onPress={() => {
              if (product?.id !== undefined) {
                addUserBasket(product.id);
              }
            }}
            >
              <Text style={styles.priceButtonText}>
                {!isAdded ? "Sepete Ekle" : "Sepete Eklendi"}
              </Text>
            </TouchableOpacity>
          </View>)}
      </View>
    </KeyboardAvoidingView >
  );
}