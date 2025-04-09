import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Tabs } from "expo-router";
import { useTheme } from "react-native-paper";
import {
  ComplexesIcon,
  GroupIcon,
  SoccerBallIcon,
  UserIcon,
} from "../../../components/icons";
import { useTranslation } from "react-i18next";

export default function Layout() {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.colors.primary }]}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Tabs
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                height: 60,
                backgroundColor: theme.colors.primary,
              },
              tabBarActiveTintColor: theme.colors.background,
              tabBarInactiveTintColor: theme.colors.secondary,
              tabBarActiveBackgroundColor: theme.colors.primary,
              tabBarInactiveBackgroundColor: theme.colors.primary,
              tabBarLabelStyle: { fontSize: 12 },
            }}>
            <Tabs.Screen
              name="index"
              options={{
                title: t("bottomNavigation.matches"),
                tabBarIcon: () => <SoccerBallIcon />,
              }}
            />
            <Tabs.Screen
              name="complexes"
              options={{
                title: t("bottomNavigation.complexes"),
                tabBarIcon: () => <ComplexesIcon />,
              }}
            />
            <Tabs.Screen
              name="matchmaking"
              options={{
                title: t("bottomNavigation.matchmaking"),
                tabBarIcon: () => <GroupIcon />,
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: t("bottomNavigation.profile"),
                tabBarIcon: () => <UserIcon />,
              }}
            />
          </Tabs>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
