import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  contentContainerStyle: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20
  },
  inputs: {
    fontSize: 18,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderColor: "#75797a",
    minWidth: 150,
    backgroundColor: "#fff",
  },
  label: {
    fontWeight: 400,
    fontSize: 15,
    marginBottom: 5,
    marginTop: 15,
    paddingLeft: 5,
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
  name: {
    flexDirection: "row",
    alignSelf: "stretch",
    width: "100%",
    justifyContent: "space-between",
  },
  part: {
    color: "#22c1f4",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 15,
    paddingLeft: 5,
    borderColor: "#22c1f4",
    borderBottomWidth: 1,
  },
  checkSection: {
    flexDirection: "row",
    alignItems: "center",
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
}) 