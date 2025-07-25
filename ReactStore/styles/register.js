import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  contentContainerStyle: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20
  },
  inputs: {
    fontSize: 18,
    width: 250,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderColor: "#75797a",
  },
  label: {
    fontWeight: 500,
    fontSize: 15,
    marginBottom: 5,
    marginTop: 15,
  },
  registerButton: {
    alignItems: "center",
    borderWidth: 1,
    marginTop: 30,
    paddingHorizontal: 25,
    padding: 10,
    borderRadius: 10,
    borderColor: "#22c1f4",
    backgroundColor: "#22c1f4"
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  names: {
    flexDirection: "row",
  },
  dates: {
    flexDirection: "row",
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#75797a",
  },
  dateInfoDay: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    width: "33%",
    borderRightWidth: 1,
    borderColor: "#75797a",
  },
  dateInfoMonth: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    width: "33%",
    borderRightWidth: 1,
    borderColor: "#75797a",
  },
  dateInfoYear: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    width: "33%",
  },
  dateInfoText: {
    fontSize: 16,
    paddingVertical: 5,
  },
  checkSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 250,
    marginTop: 10,
  },
  check: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#75797a",
    marginRight: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#75797a",
    paddingVertical: 13,
    backgroundColor: "#e8eced",
    width: "100%",
    height: 55,
  },
  headerButton: {
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 3,
  }
})