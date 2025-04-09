import React, { createContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { useRouter, useSegments } from "expo-router";
import { Alert } from "react-native";

SplashScreen.preventAutoHideAsync();

type User = any; // TODO: Define user type

interface AuthContextType {
  user: User | null;
  signIn: (userData: object) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const segments = useSegments();
  const router = useRouter();

  const isInAuthGroup = segments[0] === "(auth)";
  const isInAppGroup = segments[0] === "(app)";

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");

      if (userData) {
        setUser(JSON.parse(userData));
      }

      await new Promise((res) => setTimeout(res, 500));
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al cargar el usuario.");
    } finally {
      setIsLoading(false);
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    if (isLoading) return;

    if (!user && isInAppGroup) {
      router.replace("/(auth)/login");
    } else if (user && isInAuthGroup) {
      router.replace("/(app)/(tabs)");
    }
  }, [user, isLoading, segments]);

  const signIn = async (userData: object) => {
    await AsyncStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
    router.replace("/(auth)/login");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
