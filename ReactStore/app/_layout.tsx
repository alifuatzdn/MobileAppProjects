import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "../Context/AuthContext";
import { BasketProvider } from "@/Context/CartContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <BasketProvider>
        <SafeAreaProvider>
          <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
            <Stack screenOptions={{ headerShown: false }}></Stack>
          </SafeAreaView>
        </SafeAreaProvider>
      </BasketProvider>
    </AuthProvider>
  );
}