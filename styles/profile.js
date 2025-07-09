import { StyleSheet } from "react-native";

export const stylesProfile = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 80,
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
  person: {
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#75797a",
    backgroundColor: "#22c1f4",
    paddingVertical: 40,
  },
  personText: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#fff",
  },
  personImg: {
    color: "#000",
    borderWidth: 3,
    backgroundColor: "#e8eced",
    borderColor: "#75797a",
    padding: 15,
    marginBottom: 15,
    borderRadius: 50,
  },
  choices: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 25,
    paddingVertical: 20,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderColor: "#75797a",
  },
  choicesText: {
    marginLeft: 10
  },
  choicesInside: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutButton: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#75797a",
    borderRadius: 20,
    alignSelf: "center",
  },
  logoutButtonText: {
    marginLeft: 10,
    fontSize: 19,
    bottom: 1,
  },
})