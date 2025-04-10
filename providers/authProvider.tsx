import React, { createContext, useEffect, useState } from "react";
import {
  User,
  getUser,
  login as loginUser,
  register as registerUser,
  logout as logoutUser,
} from "../services/authService";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await getUser();
      setUser(storedUser);
    } catch (error) {
      Alert.alert(
        t("alerts.error.title"),
        error instanceof Error ? error.message : t("auth.loadingTheUser")
      );
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const loggedUser = await loginUser(email, password);
    setUser(loggedUser);
  };

  const register = async (name: string, email: string, password: string) => {
    const newUser = await registerUser(name, email, password);
    setUser(newUser);
  };

  const logout = async () => {
    await logoutUser(setUser);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
