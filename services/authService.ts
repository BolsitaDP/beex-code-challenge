import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import i18n from "../utils/localization/i18";
import { router } from "expo-router";

export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  city?: string;
  level?: "beginner" | "intermediate" | "advanced";
};

export const USERS_KEY = "users";
export const USER_KEY = "user";

export const saveUser = async (userData: User): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));

    const usersData = await AsyncStorage.getItem(USERS_KEY);
    const users: User[] = usersData ? JSON.parse(usersData) : [];

    const updatedUsers = users.map((u) =>
      u.id === userData.id ? userData : u
    );

    const userExists = users.some((u) => u.id === userData.id);
    if (!userExists) {
      updatedUsers.push(userData);
    }

    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  } catch (error) {
    Alert.alert(
      i18n.t("alerts.error.title"),
      error instanceof Error ? error.message : i18n.t("auth.savingTheUser")
    );
    throw error;
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    const userData = await AsyncStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    Alert.alert(
      i18n.t("alerts.error.title"),
      error instanceof Error ? error.message : i18n.t("auth.loadingTheUserData")
    );
    throw error;
  }
};

export const removeUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    Alert.alert(
      i18n.t("alerts.error.title"),
      error instanceof Error ? error.message : i18n.t("auth.deletingTheUser")
    );
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<User> => {
  const usersData = await AsyncStorage.getItem(USERS_KEY);
  const users: User[] = usersData ? JSON.parse(usersData) : [];

  const foundUser = users.find(
    (u) => u.email === email && u.password === password
  );

  if (foundUser) {
    await saveUser(foundUser);
    return foundUser;
  } else {
    throw new Error(i18n.t("auth.invalidCredentials"));
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<User> => {
  const usersData = await AsyncStorage.getItem(USERS_KEY);
  const users: User[] = usersData ? JSON.parse(usersData) : [];

  const exists = users.some((u) => u.email === email);
  if (exists) {
    throw new Error(i18n.t("auth.emailAlreadyInUse"));
  }

  const newUser: User = {
    id: Date.now().toString(),
    email,
    name,
    password,
  };

  const updatedUsers = [...users, newUser];
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
  await saveUser(newUser);

  return newUser;
};

export const logout = async (
  setUser: (user: User | null) => void
): Promise<void> => {
  try {
    const userData = await AsyncStorage.getItem(USER_KEY);
    const usersData = await AsyncStorage.getItem("users");

    if (userData && usersData) {
      const user: User = JSON.parse(userData);
      const users: User[] = JSON.parse(usersData);

      const updatedUsers = users.map((u) => (u.id === user.id ? user : u));

      await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
    }
    await AsyncStorage.removeItem(USER_KEY);
    setUser(null);
    router.replace("/(auth)/login");
  } catch (error) {
    Alert.alert(
      i18n.t("alerts.error.title"),
      error instanceof Error ? error.message : i18n.t("auth.deletingTheUser")
    );
    throw error;
  }
};
