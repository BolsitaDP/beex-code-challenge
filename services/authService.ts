import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  // TODO: Add the optional information that displays in the profile
};
const { t } = useTranslation();

const USERS_KEY = "users";
const USER_KEY = "user";

export const saveUser = async (userData: User): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
  } catch (error) {
    Alert.alert(
      t("alerts.error.title"),
      error instanceof Error ? error.message : t("auth.savingTheUser")
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
      t("alerts.error.title"),
      error instanceof Error ? error.message : t("auth.loadingTheUserData")
    );
    throw error;
  }
};

export const removeUser = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    Alert.alert(
      t("alerts.error.title"),
      error instanceof Error ? error.message : t("auth.deletingTheUser")
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
    throw new Error(t("auth.invalidCredentials"));
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
    throw new Error(t("auth.emailAlreadyInUse"));
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
