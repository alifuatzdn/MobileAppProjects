import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputs: {
    fontSize: 18,
    minWidth: 250,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    borderColor: "#75797a"
  },
  loginButton: {
    fontSize: 20,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 25,
    padding: 10,
    borderRadius: 10,
    fontWeight: "bold",
    color: "#fff",
    borderColor: "#22c1f4",
    backgroundColor: "#22c1f4"
  },
  register: {
    marginTop: 15,
    flexDirection: "row", 
    alignItems: "center",
    marginBottom: 50,
  },
  registerText: {
    fontWeight: "bold",
    textDecorationLine: "underline",

  },
  loginAlert: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 20
  },
  googleLogin: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderRadius: 40,
    padding: 20,
    borderColor: "#22c1f4",
    backgroundColor: "#eff3f4",
  },
  googleLoginText: {
    fontSize: 20,
  },
  googleLoginImg: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
})