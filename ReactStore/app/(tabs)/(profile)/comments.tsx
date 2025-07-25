import { View, Text, Pressable, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { styles } from '@/styles/comments'
import { CommentResponse, deleteComment, getCommentById, getCommentsByUser, updateComment } from '@/Services/commentService'
import { useIsFocused } from '@react-navigation/native'
import { getProductById, Product } from '@/Services/productService'

export default function comments() {
  const [editId, setEditId] = useState<number>();
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [commentProducts, setcommentProducts] = useState<Product[]>([]);
  const isFocused = useIsFocused();
  const [commentText, setCommentText] = useState<string>("");

  const getUserComments = async () => {
    try {
      const response = await getCommentsByUser();
      setComments(response);
    } catch (error) {
      console.error("Yorumlar alınırken hata oluştu.", error);
    }
  };

  const deleteUserComments = async (id: number) => {
    try {
      await deleteComment(id);
      await getUserComments();
    } catch (error) {
      console.error("Yorumlar alınırken hata oluştu.", error);
    }
  };

  const updateUserComment = async (id: number) => {
    try {
      if (!commentText || commentText.trim() === "") {
        Alert.alert("Yorum boş olamaz.");
        return;
      }
      const request = { content: commentText };
      await updateComment(id, request);
      getUserComments();
      setEditId(0);
      setCommentText("");
    } catch (error) {
      console.error("Yorum güncellenirken hata oluştu.", error);
    }
  };

  const getCommentProduct = async (id: number) => {
    try {
      const response = await getProductById(id);
      setcommentProducts(prev => [...prev, response]);
    } catch (error) {
      console.error("Ürünler alınırken hata oluştu.", error);
    }
  };

  useEffect(() => {
    getUserComments();
  }, [isFocused])

  useEffect(() => {
    comments.forEach(comment => {
      if (!commentProducts.find(p => p.id === comment.productId)) {
        getCommentProduct(comment.productId);
      }
    });
  }, [comments]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => {
            router.push("/(tabs)/profile");
          }}
        >
          <Ionicons name="arrow-back" size={25} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Yorumlarım</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {comments.map(comment => {
          const product = commentProducts.find(p => p.id === comment.productId);
          return (
            <View style={styles.addressPart} key={comment.id}>
              <View style={{ flex: 1 }}>
                <View style={styles.addressName}>
                  <Ionicons name="chatbubble-outline" size={22} />
                  <TouchableOpacity onPress={() => router.push(`/productDetail?id=${comment.productId}`)}>
                    <Text style={styles.addressNameText} numberOfLines={1}>{product?.name}</Text>
                  </TouchableOpacity>
                </View>
                {editId === comment.id ? (
                  <View style={styles.makeComment}>
                    <TextInput
                      style={styles.inputs}
                      multiline={true}
                      value={commentText}
                      onChangeText={text => setCommentText(text)}
                      numberOfLines={3}
                    />
                    <TouchableOpacity style={styles.priceButton} onPress={() => updateUserComment(comment.id)}>
                      <Text style={styles.priceButtonText}>Gönder</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text>{comment.content}</Text>
                )}
              </View>
              <View style={styles.addressEdit}>
                <Pressable onPress={() => deleteUserComments(comment.id)}>
                  <Ionicons name="trash-outline" size={25} color="#ff3930" />
                </Pressable>
                <Pressable>
                  <Ionicons name="create-outline" size={25} color="#22c1f4" style={{ marginLeft: 2, marginTop: 20 }} onPress={() => {
                    setEditId(comment.id);
                    setCommentText(comment.content);
                  }}
                  />
                </Pressable>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}