import React, { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Link, router } from "expo-router";
import { useTheme } from "react-native-paper";

import { login } from "../../services/authService";
import CustomBG from "@/components/CustomBG";
import { useTranslation } from "react-i18next";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const { t } = useTranslation();

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert(t("alerts.error.title"), t("alerts.error.emailRequired"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert(t("alerts.error.title"), t("alerts.error.invalidEmail"));
      return;
    }

    if (!password.trim()) {
      Alert.alert(t("alerts.error.title"), t("alerts.error.passwordRequired"));
      return;
    }

    if (password.length < 6) {
      Alert.alert(t("alerts.error.title"), t("alerts.error.passwordTooShort"));
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      router.replace("/(app)/(tabs)");
    } catch (error) {
      Alert.alert(
        t("alerts.error.title"),
        error instanceof Error ? error.message : t("alerts.error.message")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomBG title={t("login.title")} height={180} titleOnBig>
      <TextInput
        label={t("login.email")}
        value={email}
        onChangeText={setEmail}
        style={[styles.input, { backgroundColor: theme.colors.background }]}
        keyboardType="email-address"
      />

      <TextInput
        label={t("login.password")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, { backgroundColor: theme.colors.background }]}
      />

      <Button
        mode="outlined"
        buttonColor={theme.colors.primary}
        textColor={theme.colors.secondary}
        onPress={handleLogin}
        loading={loading}
        style={styles.button}>
        {t("login.loginButton")}
      </Button>

      <Link href="/(auth)/register" asChild>
        <Button
          textColor={theme.colors.primary}
          mode="text"
          style={styles.registerButton}>
          {t("login.registerHere")}
        </Button>
      </Link>
    </CustomBG>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
  },
  loginButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    marginTop: 10,
  },
  registerButton: {
    marginTop: 20,
    padding: 10,
  },
});

export default LoginScreen;
