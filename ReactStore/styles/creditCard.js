import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    position: "absolute",
    left: 10,
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
  newCard: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginLeft: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "#22c1f4",
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  newCardText: {
    marginLeft: 10,
    fontWeight: 500,
    fontSize: 16,
    color: "#22c1f4",
  },
  addImg: {
    borderWidth: 1,
    borderColor: "#22c1f4",
    borderRadius: 20,
    padding: 3,
    color: "#22c1f4",
  },
  cardContainer: {
    borderWidth: 1,
    borderColor: "#75797a",
    borderRadius: 10,
    margin: 15,
    padding: 10,
    backgroundColor: "#fff",
  },
  cardNameContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 5,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 500,
  },
  cardNumber: {
    fontSize: 15,
    fontWeight: 500,
    marginTop: 12,
  },
  cardHolder: {
    color: "#75797a",
    marginTop: 5,
  },
  edit: {
    justifyContent: "flex-end",
    flexDirection: "row",

  }
});