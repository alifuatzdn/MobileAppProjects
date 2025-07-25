import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: 0,
    paddingBottom: 30,
  },
  inputs: {
    backgroundColor: "#fff",
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: "#75797a",
    width: "90%",
    height: 70,
    textAlignVertical: "top"
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
  headerButton: {
    position: "absolute",
    left: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  addressPart: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#75797a",
    borderRadius: 10,
    margin: 15,
    padding: 10,
    backgroundColor: "#fff",
  },
  addressName: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginBottom: 20,
  },
  addressNameText: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: 500,
  },
  addressEdit: {
    marginLeft: 30,
    marginRight: 20,
    justifyContent: "space-between",
    borderLeftWidth: 1,
    borderColor: "#75797a",
    paddingLeft: 15,
    marginRight: 6,
  },
  priceButton: {
    backgroundColor: "#22c1f4",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  priceButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  makeComment: {
    justifyContent: "center",
    alignItems: "center",

  },
    contentContainerStyle: {
    paddingTop: 0,
    paddingBottom: 30,
  },
});