import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingTop: 0,
    paddingBottom: 30,
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
  couponContainer: {
    borderWidth: 1,
    borderColor: "#75797a",
    borderRadius: 10,
    margin: 15,
    padding: 10,
    backgroundColor: "#fff",
  },
  couponTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  }
});