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
  search: {
    outlineWidth: 0,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#75797a",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  order: {
    borderWidth: 1,
    borderColor: "#75797a",
    padding: 5,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#fff",
  },
  orderImgContainer: {
    borderWidth: 1,
    borderColor: "#75797a",
    padding: 2,
  },
  orderImg: {
    resizeMode: "contain",
    width: 60,
    height: 60,
  },
  orderInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  orderText: {
    fontSize: 15,
    fontWeight: 400,
    marginBottom: 2,
  },
  orderStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    marginTop: 5,
  },
  orderStatusPart: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderStatusText: {
    marginHorizontal: 3,
    marginLeft: 5,
    marginBottom: 2,
  },
  check: {
    backgroundColor: "#22c1f4",
    color: "#fff",
    borderRadius: 50,
    padding: 1,
    marginLeft: 3,
  }
})