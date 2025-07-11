import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    backgroundColor: "#e8eced",
    height: 55,
  },
  searchBar: {
    minWidth: 200,
    height: 30,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#75797a",
    flexDirection: "row",
    alignItems: "center",
  },
  icons: {
    color: "#75797a",
    marginLeft: 7,
    marginRight: 5,
  },
  input: {
    outlineWidth: 0,
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  product: {
    width: "47%",
    height: 370,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: "#dcdfe0",
    borderRadius: 30,
  },
  productImage: {
    width: 100,
    height: 150,
    margin: 15,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  commentNum: {
    marginLeft: 8,
    fontWeight: 200,
    fontSize: 12,
   },
   button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#22c1f4",
    borderRadius: 15,
    paddingVertical: 10,
   },
   priceText: {
    fontWeight: "bold",
    marginRight: 8,
   },
   sort: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#75797a",
   },
   sortText: {
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 10,
   },
   sortButton: {
    backgroundColor: "#e8eced",
    borderColor: "#75797a",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 20,
   },
   model: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   },
   modalWindow: {
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    minWidth: 220,
    alignItems: "center"
   },
   modalText: {
    fontWeight: "bold", 
    fontSize: 18, 
    marginBottom: 16
   },
   modalCancelText: {
    marginTop: 10,
    color: "#ff3930"
   },
   modalList: {
    padding: 5,
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "500"
   },
   favorite: {
    color: "#75797a",
   },
   favoriteButton: {
    position: "absolute",
    top: 12,
    right: -8,
    zIndex: 10,
   },
})