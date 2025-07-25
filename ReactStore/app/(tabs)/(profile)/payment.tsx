import { View, Text, TouchableOpacity, Pressable, ScrollView, Alert, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '@/styles/payment'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useSearchParams } from 'expo-router/build/hooks'
import { AddressResponse, getAddresses } from '@/Services/addressService'
import { CreditCardResponse, getCreditCards } from '@/Services/creditCardService'
import { CartResponse, deleteBasket, getBasket } from '@/Services/cartService'
import { useIsFocused } from '@react-navigation/native'
import { addOrder } from '@/Services/orderService'
import { Coupon, deleteCoupon, getCouponsByUser } from '@/Services/couponService';
import { useBasket } from '@/Context/CartContext'


export default function payment() {
  const [checked, setChecked] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const calculatedTotalPrice = searchParams.get('calculatedTotalPrice');
  const [basket, setBasket] = useState<CartResponse[]>([]);
  const [creditCards, setCreditCards] = useState<CreditCardResponse[]>([]);
  const [addresses, setAddresses] = useState<AddressResponse[]>([]);
  const isFocused = useIsFocused();
  const totalProduct = basket.reduce((total, item) => total + item.quantity, 0);
  const [displayTotalPrice, setDisplayTotalPrice] = useState<number>(
    calculatedTotalPrice ? Number(calculatedTotalPrice.replace('.', '')) : 0
  );
  const { refreshBasket } = useBasket();

  const getInfo = async () => {
    try {
      const response = await getBasket();
      setBasket(response);
      const cardResponse = await getCreditCards();
      setCreditCards(cardResponse);
      const addressResponse = await getAddresses();
      setAddresses(addressResponse);
      console.log(creditCards);
    }
    catch (error) {
      console.error("Sayfa yüklenirken bir hata oluştu.")
    }
  };

  useEffect(() => {
    getInfo();
  }, [isFocused]);

  const [currentAddress, setCurenntAddress] = useState<AddressResponse>();
  const [currentCreditCard, setcurrentCreditCard] = useState<CreditCardResponse>();
  const [productIds, setProductIds] = useState<Number[]>([]);
  useEffect(() => {
    if (addresses.length > 0) {
      setCurenntAddress(addresses[0]);
    }
  }, [addresses]);

  useEffect(() => {
    if (creditCards.length > 0) {
      setcurrentCreditCard(creditCards[0]);
    }
  }, [creditCards]);

  useEffect(() => {
    if (basket.length > 0) {
      setProductIds(basket.map(item => item.productId));
    }
  }, [basket]);

  const addUserOrder = async (currentAddress?: AddressResponse, currentCreditCard?: CreditCardResponse) => {
    if (!currentAddress) {
      Alert.alert("Lütfen bir adres seçin.");
      return;
    }

    if (!currentCreditCard) {
      Alert.alert("Lütfen bir kredi kartı seçin.");
      return;
    }

    const totalPrice = calculatedTotalPrice ? Number(calculatedTotalPrice.replace('.', '')) - (currentCoupon?.discount ?? 0) : 0;

    const request = {
      productIds: productIds,
      addressId: currentAddress.id,
      creditCardId: currentCreditCard.id,
      totalPrice: totalPrice,
    };

    console.log("İstek:", request);
    console.log(typeof (request.totalPrice));
    if (checked) {
      try {
        await addOrder(request);
        basket.map(async p => await deleteBasket(p.productId));
        if (currentCoupon?.id !== undefined) {
          await deleteCoupon(currentCoupon.id);
        }
        refreshBasket();
        router.push("/complatedOrder")
      } catch (error) {
        console.error(error);
      }
    } else {
      Alert.alert("Hüküm ve Koşulları Kabul Ediniz.")
    }
  }

  const [isAddressModalVisible, setAddressModalVisible] = useState(false);
  const [isCreditCardModalVisible, setCreditCardModalVisible] = useState(false);


  const handleAddressSelect = (address: AddressResponse) => {
    setCurenntAddress(address);
    setAddressModalVisible(false);
  };

  const handleCreditCardSelect = (creditCard: CreditCardResponse) => {
    setcurrentCreditCard(creditCard);
    setCreditCardModalVisible(false);
  };

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [currentCoupon, setCurrentCoupon] = useState<Coupon>();
  const [isCouponModalVisible, setCouponModalVisible] = useState(false);

  const getUserCoupons = async () => {
    try {
      const response = await getCouponsByUser();
      setCoupons(response);
    } catch (error) {
      console.error("Kuponlar alınırken hata oluştu.", error);
    }
  };

  useEffect(() => {
    getUserCoupons();
  }, [isFocused]);

  const handleCouponSelect = (coupon: Coupon) => {
    const totalPrice = Number(calculatedTotalPrice?.replace('.', ''));
    if (totalPrice < coupon.minLimit) {
      Alert.alert("Sepet tutarınız alt limitten daha düşük.");
      return;
    }
    setCurrentCoupon(coupon);
    setCouponModalVisible(false);
    setDisplayTotalPrice(totalPrice - coupon.discount);
    Alert.alert(`${coupon.discount} TL indirim uygulandı.`)
  };

  const handleRemoveCoupon = () => {
    setCurrentCoupon(undefined);
    setDisplayTotalPrice(calculatedTotalPrice ? Number(calculatedTotalPrice.replace('.', '')) : 0);
  };

  return (
    <View style={styles.container}>

      <Modal
        visible={isAddressModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setAddressModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Adreslerim</Text>
            {addresses.map((address) => (
              <TouchableOpacity
                key={address.id}
                style={styles.modalItem}
                onPress={() => {
                  setCurenntAddress(address);
                  setAddressModalVisible(false);
                }}
              >
                <Text>{address.name} / {address.district}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setAddressModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={isCreditCardModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Kredi Kartlarım</Text>
            {creditCards.map((creditCard) => (
              <TouchableOpacity
                key={creditCard.id}
                style={styles.modalItem}
                onPress={() => handleCreditCardSelect(creditCard)}
              >
                <Text>{creditCard.cardHolderName}</Text>
                <Text>{creditCard.cardNumber.slice(0, 4) + " " + creditCard.cardNumber.slice(4, 6) + "** **** " + creditCard.cardNumber.slice(12, 16)}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setCreditCardModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isCouponModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCouponModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Kuponlarım</Text>
            {coupons.map((coupon) => (
              <TouchableOpacity
                key={coupon.id}
                style={styles.modalItem}
                onPress={() => handleCouponSelect(coupon)}
              >
                <Text>{coupon.name}</Text>
                <Text>Alt limit: {coupon.minLimit} TL</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setCouponModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => {
          router.push("../cart");
        }}
        >
          <Ionicons name="arrow-back" size={25} />
        </TouchableOpacity>
        <Ionicons name="lock-closed-outline" size={25} color="#0aa222" style={{ marginRight: 10 }} />
        <Text style={styles.headerText}>Güvenle Öde</Text>
      </View>


      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <View>
          <View style={styles.address}>
            <Text style={[styles.addressTitle, { marginBottom: 10 }]}>Satın Alacağın Ürünler ({totalProduct})</Text>
            {basket.map((basketItem) => (
              <View key={basketItem.productId}>
                <Text>
                  {basketItem.product.name.length > 35
                    ? `${basketItem.product.name.slice(0, 35)}...`
                    : basketItem.product.name} ({basketItem.quantity} adet)
                </Text>
              </View>
            ))
            }
          </View>

          {addresses.length > 0 ? (
            <View style={styles.address}>
              <Text style={styles.addressTitle}>Teslimat Adresim</Text>
              <View style={styles.addressInfo}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.deliveryName}>{currentAddress?.name} / {currentAddress?.district}</Text>
                  <Text style={{ marginRight: 10 }}>{currentAddress?.addressDetail}</Text>
                </View>
                <Pressable style={styles.edit} onPress={() => router.push(`/editAddress?id=${addresses[0].id}`)}>
                  <Ionicons name="create-outline" size={25} color="#22c1f4" style={{ marginLeft: 2 }} />
                </Pressable>
              </View>
              <View style={styles.addressButtons}>
                <Pressable>
                  <Text style={styles.addressEdit} onPress={() => setAddressModalVisible(true)}>Adreslerimden Seç</Text>
                </Pressable>
                <Pressable onPress={() => router.push("/addAddress")}>
                  <Text style={styles.addressEdit}>Adres Ekle</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={styles.address}>
              <Text style={styles.addressTitle}>Teslimat Adresim</Text>
              <TouchableOpacity style={[styles.priceButton, { alignSelf: "center", marginVertical: 20, }]} onPress={() => router.push("/addAddress")}>
                <Text style={styles.priceButtonText}>Adres Ekle</Text>
              </TouchableOpacity>
            </View>
          )}

          {creditCards.length > 0 ? (
            <View style={styles.address}>
              <Text style={styles.addressTitle}>Ödeme Yöntemi</Text>
              <View style={styles.addressInfo}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.deliveryName}>{currentCreditCard?.cardHolderName}</Text>
                  <Text>{currentCreditCard?.cardNumber.slice(0, 4) + " " + currentCreditCard?.cardNumber.slice(4, 6) + "** **** " + currentCreditCard?.cardNumber.slice(12, 16)}</Text>
                </View>
                <Pressable style={styles.edit} onPress={() => router.push(`/editCreditCard?id=${creditCards[0].id}`)}>
                  <Ionicons name="create-outline" size={25} color="#22c1f4" style={{ marginLeft: 2 }} />
                </Pressable>
              </View>
              <View style={styles.addressButtons}>
                <Pressable>
                  <Text style={styles.addressEdit} onPress={() => setCreditCardModalVisible(true)}>Kartlarımdan Seç</Text>
                </Pressable>
                <Pressable onPress={() => router.push("/addCreditCard")}>
                  <Text style={styles.addressEdit}>Kart Ekle</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={styles.address}>
              <Text style={styles.addressTitle}>Ödeme Yöntemi</Text>
              <TouchableOpacity style={[styles.priceButton, { alignSelf: "center", marginVertical: 20, }]} onPress={() => router.push("/addCreditCard")}>
                <Text style={styles.priceButtonText}>Kart Ekle</Text>
              </TouchableOpacity>
            </View>
          )}

          {coupons.length > 0 ? (
            <View style={styles.address}>
              <Text style={styles.addressTitle}>Kuponlarım</Text>
              <Pressable onPress={() => setCouponModalVisible(true)}>
                <View style={[styles.addressInfo, { justifyContent: "center", paddingVertical: 10 }]}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {currentCoupon ? `${currentCoupon.name}` : "Kupon seç"}
                  </Text>
                </View>
              </Pressable>
              {currentCoupon && (
                <Pressable onPress={handleRemoveCoupon}>
                  <Text style={styles.addressEdit}>Kuponu Kaldır</Text>
                </Pressable>
              )}
            </View>
          ) : (
            <View style={styles.address}>
              <Text style={[styles.addressTitle, { textAlign: "center" }]}>Kullanabileceğiniz kuponunuz bulunmamakta.</Text>
            </View>
          )}

          <View style={styles.checkSection}>
            <TouchableOpacity
              style={[
                styles.check,
                {
                  borderWidth: checked ? 0 : 1,
                  backgroundColor: checked ? "#22c1f4" : "#fff",
                },
              ]}
              onPress={() => setChecked(!checked)}
            >
              {checked && <Ionicons name="checkmark" size={20} color={"#fff"} />}
            </TouchableOpacity>
            <Text style={{ fontWeight: 500 }}>Ön Bilgilendirme Koşulları'nı ve Mesafeli Satış Sözleşmesi'ni okudum, onaylıyorum.</Text>
          </View>
        </View>
      </ScrollView >

      <View style={styles.pricePanel}>
        <Text style={styles.priceText}>
          {displayTotalPrice.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL
        </Text>
        <TouchableOpacity
          style={styles.priceButton}
          onPress={() => { addUserOrder(currentAddress, currentCreditCard); }}
        >
          <Text style={styles.priceButtonText}>Siparişi Tamamla</Text>
        </TouchableOpacity>
      </View>
    </View >
  )
}