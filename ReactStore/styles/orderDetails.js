import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: 0,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8eced",
    borderBottomWidth: 1,
    borderColor: "#75797a",
    height: 55,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  headerButton: {
    position: "absolute",
    left: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 15,
  },
  other: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#75797a",
    paddingVertical: 10,
  },
  paymentDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentDetailsText: {
    fontWeight: "bold",
  },
  paymentType: {
    fontSize: 13,
  },
  paymentCard: {
    fontWeight: 400,
    marginBottom: 5,
    paddingVertical: 2,
  },
  paymentAmount: {
    fontSize: 15,
    color: "#0aa222",
    fontWeight: 500,
    marginBottom: 5,
  },
  paymentInfoImgContainer: {
    marginRight: 20,
  },
  paymentInfoImg: {
    resizeMode: "contain",
    width: 150,
    height: 80,
  },
  paymentInfo: {
    flexDirection: "row",
    marginBottom: 7,
  },
  contentBox: {
    borderWidth: 1,
    borderColor: "#75797a",
    padding: 10,
    borderRadius: 10,
  },
  cargoPart: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#75797a",
    paddingVertical: 7,
  },
  deliveryAddress: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  deliveryInfoText: {
    fontWeight: "bold",
    marginVertical: 3,
  },
  receiptText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  receipt: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#75797a",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  productImg: {
    resizeMode: "contain",
    width: 80,
    height: 80,
    marginRight: 20,
  },
  productContainer: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#75797a",
    borderRadius: 10,
  },
  productInfo: {
    flexDirection: "row",
    paddingBottom: 30,
    padding: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#75797a",
  },
  price: {
    fontWeight: 500,
    marginVertical: 8,
  },
  buy: {
    paddingVertical: 5,
    paddingHorizontal: 7,
    backgroundColor: "#dcdfe0",
    marginRight: 7,
    borderRadius: 10,
  },
  seller: {
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderWidth: 1,
    borderColor: "#22c1f4",
    borderRadius: 10,
  },
  buttons: {
    flexDirection: "row",
  },
  productDetailsContainer: {
    backgroundColor: "#f0fcf0",
    borderRadius: 10,
  },
  productDetails: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 20,
    marginBottom: 10,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderColor: "#75797a",
    padding: 10,
  },
  productDetailsTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  productDetailsInfo: {
    fontWeight: "bold",
    fontsize: 15,
    color: "#0aa222",
  },
  deliveryInfo: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#75797a",
  },
  productDetailsButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#75797a",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 500,
    fontSize: 16,
    marginLeft: 10,
  },
  sellerInfo: {
    padding: 10,
  }
})