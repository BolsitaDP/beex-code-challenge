import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  Button,
  Text,
  TextInput,
  useTheme,
  ProgressBar,
  List,
  RadioButton,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser, saveUser, User, USER_KEY } from "@/services/authService";
import { useTranslation } from "react-i18next";
import { Picker } from "@react-native-picker/picker";
import CustomBG from "@/components/CustomBG";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import CustomModal from "@/components/CustomModal";
import { useThemeContext } from "@/providers/themeProvider";
import { changeLanguage } from "@/utils/localization/i18";

const ProfileScreen = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const router = useRouter();

  const { themeName, setThemeName } = useThemeContext();
  const { logout, setUser: setAuthUser } = useAuth();

  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [level, setLevel] = useState<
    "beginner" | "intermediate" | "advanced"
  >();
  const [progress, setProgress] = useState<number>(0);
  const [languajeSelectionVisible, setLanguajeSelectionVisible] =
    useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<
    keyof typeof languages
  >(i18n.language as keyof typeof languages);

  const [themeSelectionVisible, setThemeSelectionVisible] =
    useState<boolean>(false);
  const [selectedTheme, setSelectedTheme] =
    useState<keyof typeof themes>(themeName);

  const levels = [
    { value: "beginner", label: t("profile.levels.beginner") },
    { value: "intermediate", label: t("profile.levels.intermediate") },
    { value: "advanced", label: t("profile.levels.advanced") },
  ];

  const languages = {
    es: { label: "Español" },
    en: { label: "English" },
  };

  const themes = {
    black: { color: "#2B2B2B", name: t("profile.themes.black") },
    green: { color: "#1F3D2B", name: t("profile.themes.green") }, // Verde oscuro musgo
    pink: { color: "#4A1C2B", name: t("profile.themes.pink") }, // Rosa vino oscuro
    yellow: { color: "#3A341F", name: t("profile.themes.yellow") }, // Mostaza quemado oscuro
    blue: { color: "#1C2E4A", name: t("profile.themes.blue") }, // Azul profundo tipo navy
  };

  useEffect(() => {
    load();
  }, []);

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

    const trimmedName = name.trim();
    if (trimmedName.length < 3) {
      Alert.alert(
        t("alerts.error.title"),
        t("profile.validation.nameTooShort") ||
          "El nombre debe tener al menos 3 caracteres."
      );
      return;
    }

    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(trimmedName)) {
      Alert.alert(
        t("alerts.error.title"),
        t("profile.validation.nameInvalid") ||
          "El nombre solo puede contener letras y espacios."
      );
      return;
    }

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
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert(t("alerts.error.title"), t("profile.logoutError"));
    }
  };

  const handleLanguageConfirm = async () => {
    await changeLanguage(selectedLanguage);
    setLanguajeSelectionVisible(false);
  };

  const handleThemeConfirm = () => {
    setThemeName(selectedTheme);
    setThemeSelectionVisible(false);
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

        <List.Section
          style={[
            styles.inputsContainer,
            { borderColor: theme.colors.primary },
          ]}>
          <List.Subheader>{t("profile.sections.info")}</List.Subheader>
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
        </List.Section>

        <List.Section
          style={[
            styles.inputsContainer,
            { borderColor: theme.colors.primary },
          ]}>
          <List.Subheader>{t("profile.sections.preferences")}</List.Subheader>
          <Button
            mode="outlined"
            onPress={() => setLanguajeSelectionVisible(true)}
            style={{ marginBottom: 20, borderColor: theme.colors.primary }}>
            {t("profile.language")}: {languages[selectedLanguage].label}
          </Button>
          <Button
            mode="outlined"
            onPress={() => setThemeSelectionVisible(true)}
            style={{ marginBottom: 20, borderColor: theme.colors.primary }}>
            {t("profile.theme")}: {themes[selectedTheme]?.name}
          </Button>
        </List.Section>

        <Button mode="contained" onPress={handleSave}>
          {t("profile.save")}
        </Button>
        <Button mode="contained" onPress={handleLogout}>
          {t("profile.logout")}
        </Button>

        <CustomModal
          visible={languajeSelectionVisible}
          onDismiss={() => setLanguajeSelectionVisible(false)}
          title={t("profile.selectLanguage")}
          actions={[
            {
              label: t("alerts.cancel"),
              onPress: () => setLanguajeSelectionVisible(false),
            },
            {
              label: t("alerts.confirm"),
              onPress: handleLanguageConfirm,
              mode: "contained",
            },
          ]}>
          <RadioButton.Group
            onValueChange={(value) =>
              setSelectedLanguage(value as keyof typeof languages)
            }
            value={selectedLanguage}>
            {Object.entries(languages).map(([key, lang]) => (
              <RadioButton.Item key={key} label={lang.label} value={key} />
            ))}
          </RadioButton.Group>
        </CustomModal>

        <CustomModal
          visible={themeSelectionVisible}
          onDismiss={() => setThemeSelectionVisible(false)}
          title={t("profile.themeSelection")}
          actions={[
            {
              label: t("alerts.cancel"),
              onPress: () => setThemeSelectionVisible(false),
            },
            {
              label: t("alerts.confirm"),
              onPress: handleThemeConfirm,
              mode: "contained",
            },
          ]}>
          <RadioButton.Group
            onValueChange={(value) =>
              setSelectedTheme(value as keyof typeof themes)
            }
            value={selectedTheme}>
            {Object.entries(themes).map(([key, theme]) => (
              <RadioButton.Item key={key} label={theme.name} value={key} />
            ))}
          </RadioButton.Group>
        </CustomModal>
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
  progress: {
    height: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default ProfileScreen;
