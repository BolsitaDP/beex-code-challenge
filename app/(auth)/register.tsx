import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { TextInput, Button, useTheme } from "react-native-paper";
import { Link, useRouter } from "expo-router";

import { register } from "../../services/authService";

import CustomBG from "@/components/CustomBG";
import { useTranslation } from "react-i18next";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const { t } = useTranslation();

  const router = useRouter();

  const handleRegister = async () => {
    if (!name.trim()) {
      Alert.alert(t("alerts.error.title"), t("alerts.error.nameRequired"));
      return;
    }

    if (!email.trim()) {
      Alert.alert(t("alerts.error.title"), t("alerts.error.emailRequired"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert(t("alerts.error.title"), t("alerts.error.invalidEmail"));
      return;
    }

    if (!password) {
      Alert.alert(t("alerts.error.title"), t("alerts.error.passwordRequired"));
      return;
    }

    if (password.length < 6) {
      Alert.alert(t("alerts.error.title"), t("alerts.error.passwordTooShort"));
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(t("alerts.error.title"), t("alerts.error.passwordMismatch"));
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      Alert.alert(t("alerts.success.title"), t("register.userRegistered"));
      router.replace("/(auth)/login");
    } catch (error: any) {
      Alert.alert(
        t("alerts.error.title"),
        error.message || t("alerts.error.message")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomBG title={t("register.title")} height={90}>
      <TextInput
        label={t("register.name")}
        value={name}
        onChangeText={setName}
        style={[styles.input, { backgroundColor: theme.colors.background }]}
      />
      <TextInput
        label={t("register.email")}
        value={email}
        onChangeText={setEmail}
        style={[styles.input, { backgroundColor: theme.colors.background }]}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        label={t("register.password")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={[styles.input, { backgroundColor: theme.colors.background }]}
      />
      <TextInput
        label={t("register.confirmPassword")}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={[styles.input, { backgroundColor: theme.colors.background }]}
      />

      <Button
        mode="contained"
        loading={loading}
        onPress={handleRegister}
        style={styles.button}>
        {t("register.registerButton")}
      </Button>

      <Link href="/(auth)/login" asChild>
        <Button mode="text" style={styles.loginButton}>
          {t("register.loginHere")}
        </Button>
      </Link>
    </CustomBG>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  loginButton: {
    marginTop: 20,
    padding: 10,
  },
});

export default Register;
