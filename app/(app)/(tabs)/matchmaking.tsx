import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import { Searchbar, Text, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MatchCard from "@/components/matchCard";
import matchesData from "@/assets/data/matches.json";
import { USER_KEY } from "@/services/authService";
import CustomBG from "@/components/CustomBG";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";

export type match = {
  id: string;
  title: string;
  locationId: string;
  city: string;
  requiredLevel: string;
  currentPlayers: number;
  maxPlayers: number;
  date: string;
};

const MatchmakingScreen = () => {
  const [matches, setMatches] = useState<match[]>([]);
  const [search, setSearch] = useState<string>("");

  const { user } = useAuth();
  const { t } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    const loadLevelAndMatches = async () => {
      try {
        const userInfo = await AsyncStorage.getItem(USER_KEY);
        const storedLevel = userInfo ? JSON.parse(userInfo).level : null;

        const filteredMatches = matchesData.filter((match) =>
          match.requiredLevel.toLowerCase() === storedLevel
            ? storedLevel.toLowerCase()
            : ""
        );
        setMatches(filteredMatches);
      } catch (error) {
        console.error("Error loading data", error);
      }
    };

    loadLevelAndMatches();
  }, [user]);

  const handleJoin = (title: string) => {
    Alert.alert(t("alerts.success.title"), t("matches.joinSuccess", { title }));
  };

  const filteredMatches = matches.filter(
    (match) =>
      match.title.toLowerCase().includes(search.toLowerCase()) ||
      match.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <CustomBG title={t("matchmaking.title")} height={60}>
      <Searchbar
        placeholder={t("matchmaking.search")}
        value={search}
        onChangeText={setSearch}
        style={{
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.primary,
          borderWidth: 1,
          marginBottom: 20,
        }}
      />
      <FlatList
        data={filteredMatches}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MatchCard match={item} onJoin={handleJoin} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>{t("matchmaking.noMatches")}</Text>
        }
      />
    </CustomBG>
  );
};

const styles = StyleSheet.create({
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});

export default MatchmakingScreen;
