import React, { createContext, useContext, useEffect, useState } from "react";
import { checkLoginStatus, getUserInfo } from "@/Services/loginService";

export interface User {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const token= await checkLoginStatus();
      setIsLoggedIn(token);

      if (token) {
        try {
          const userInfo = await getUserInfo();
          setUser(userInfo);
        } catch (error) {
          console.error("Kullanıcı bilgileri yüklenirken hata oluştu:", error);
        }
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('"useAuth" AuthProvider ile birlikte kullanılmalı.');
  }
  return context;
};