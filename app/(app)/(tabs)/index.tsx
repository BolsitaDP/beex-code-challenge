import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Alert } from "react-native";
import { Searchbar, Text, useTheme } from "react-native-paper";
import matchesData from "@/assets/data/matches.json";
import { useTranslation } from "react-i18next";
import MatchCard from "../../../components/matchCard";
import CustomBG from "@/components/CustomBG";
import { match } from "./matchmaking";

const MatchesScreen = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [matches, setMatches] = useState<match[]>(matchesData);
  const [filtered, setFiltered] = useState<match[]>(matchesData);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const results = matches.filter(
      (m) =>
        m.title.toLowerCase().includes(query) ||
        m.city.toLowerCase().includes(query) ||
        m.requiredLevel.toLowerCase().includes(query)
    );
    setFiltered(results);
  }, [searchQuery]);

  const handleJoin = (title: string) => {
    Alert.alert(t("alerts.success.title"), t("matches.joinSuccess", { title }));
  };

  return (
    <CustomBG title={t("matches.title")} height={60}>
      <Searchbar
        placeholder={t("matches.search")}
        value={searchQuery}
        iconColor={theme.colors.primary}
        onChangeText={setSearchQuery}
        style={{
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.primary,
          borderWidth: 1,
          marginBottom: 20,
        }}
      />
      <FlatList
        data={filtered}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MatchCard match={item} onJoin={handleJoin} />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.empty}>{t("matchmaking.noMatches")}</Text>
        }
      />
    </CustomBG>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});

export default MatchesScreen;
