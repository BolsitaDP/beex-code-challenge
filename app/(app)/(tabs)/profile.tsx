import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  Button,
  Text,
  TextInput,
  useTheme,
  ProgressBar,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser, saveUser, User, USER_KEY } from "@/services/authService";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";
import CustomBG from "@/components/CustomBG";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const router = useRouter();
  const { logout, setUser: setAuthUser } = useAuth();

  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [level, setLevel] = useState<
    "beginner" | "intermediate" | "advanced"
  >();
  const [progress, setProgress] = useState(0);

  const levels = [
    { value: "beginner", label: t("profile.levels.beginner") },
    { value: "intermediate", label: t("profile.levels.intermediate") },
    { value: "advanced", label: t("profile.levels.advanced") },
  ];

  useEffect(() => {
    load();
  }, []);

  const clgInfo = async () => {
    const userData = await AsyncStorage.getItem(USER_KEY);
    console.log(userData);
  };

  const load = async () => {
    const storedUser = await getUser();
    if (storedUser) {
      setUser(storedUser);
      setName(storedUser.name);
      setCity(storedUser.city || "");
      setLevel(storedUser.level);
    }
  };

  useEffect(() => {
    const totalFields = 3;
    let filled = 0;
    if (name) filled++;
    if (city) filled++;
    if (level) filled++;
    setProgress(filled / totalFields);
  }, [name, city, level]);

  const handleSave = async () => {
    if (!user) return;

    const updatedUser: User = {
      ...user,
      name,
      city,
      level,
    };

    try {
      await saveUser(updatedUser);
      setAuthUser(updatedUser);
      Alert.alert(t("alerts.success.title"), t("profile.saved"));
    } catch (error) {
      Alert.alert(t("alerts.error.title"), t("profile.saveError"));
    }

    clgInfo();
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert(t("alerts.error.title"), t("profile.logoutError"));
    }
  };

  return (
    <CustomBG title={t("profile.title")} height={60}>
      <View style={styles.container}>
        <Text style={styles.title}>{t("profile.progress")}</Text>
        <ProgressBar
          progress={progress}
          color={theme.colors.primary}
          style={[styles.progress, { backgroundColor: theme.colors.secondary }]}
        />

        <View style={styles.inputsContainer}>
          <TextInput
            label={t("profile.name")}
            value={name}
            onChangeText={setName}
            style={[styles.input, { backgroundColor: theme.colors.background }]}
          />

          <TextInput
            label={t("profile.city")}
            value={city}
            onChangeText={setCity}
            style={[styles.input, { backgroundColor: theme.colors.background }]}
          />

          <Text style={styles.label}>{t("profile.level")}</Text>
          <View
            style={[
              styles.pickerContainer,
              {
                backgroundColor: theme.colors.background,
                borderColor: theme.colors.background,
              },
            ]}>
            <Picker
              selectedValue={level}
              mode="dropdown"
              onValueChange={(itemValue) =>
                setLevel(itemValue as User["level"])
              }
              style={styles.picker}>
              <Picker.Item label={t("profile.selectLevel")} value={undefined} />
              {levels.map((lvl) => (
                <Picker.Item
                  key={lvl.value}
                  label={lvl.label}
                  value={lvl.value}
                />
              ))}
            </Picker>
          </View>
        </View>

        <Button mode="contained" onPress={handleSave} style={styles.button}>
          {t("profile.save")}
        </Button>
        <Button mode="contained" onPress={handleLogout} style={styles.button}>
          {t("profile.logout")}
        </Button>

        {/* TODO: Theme & lang selector */}
      </View>
    </CustomBG>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    flex: 1,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 5,
  },
  input: {
    marginBottom: 15,
  },
  inputsContainer: {
    borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    gap: 0,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 4,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  button: {
    marginTop: 20,
  },
  progress: {
    height: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default ProfileScreen;
