import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8eced",
    borderBottomWidth: 1,
    borderColor: "#75797a",
    marginBottom: 15,
    height: 55,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  productNum: {
    fontSize: 14,
    fontWeight: "400",
  },
  sellerInfo: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    padding: 5,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#75797a",
  },
  seller: {
    fontSize: 15,
  },
  deliveryFee: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0aa222",
  },
  delivery: {
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  product: {
    borderBottomWidth: 1,
    borderColor: "#75797a",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  productInfo: {
    flex: 1,
    flexDirection: "row",
  },
  productImg: {
    maxWidth: 90,
    maxHeight: 90,
    resizeMode: "contain"
  },
  imgContainer: {
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#75797a",
    padding: 3,
    borderRadius: 10,
    maxWidth: 93,
    maxHeight: 93,
  },
  phoneName: {
    fontWeight: "bold",
    fontSize: 16,
    width: "100%",
  },
  installment: {
    alignSelf: "flex-start",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(133, 10, 162, 0.1)",
    padding: 3,
    borderRadius: 10,
  },
  installmentText: {
    marginHorizontal: 5,
    color: "#850aa2",
  },
  installmentPrice: {
    color: "#fff",
    backgroundColor: "#850aa2",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
  productBottom: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productSetting: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#75797a",
    borderRadius: 40,
    padding: 5,
    flexDirection: "row",
  },
  number: {
    marginLeft: 20,
    marginRight: 17,
    fontWeight: "bold",
  },
  productPrice: {
    fontWeight: "bold",
  },
  pricePanel: {
    bottom: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e8eced",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#75797a",
    paddingHorizontal: 15,
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  priceButton: {
    backgroundColor: "#22c1f4",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  priceButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  emptyBasket: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyBasketText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  emptyBasketButton: {
    backgroundColor: "#22c1f4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  emptyBasketButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});