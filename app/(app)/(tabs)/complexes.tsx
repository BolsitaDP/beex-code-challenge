import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Searchbar, IconButton, Card, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import sportsComplexesData from "../../../assets/data/sportsComplexes.json";
import { useTranslation } from "react-i18next";
import CustomBG from "@/components/CustomBG";
import ComplexCard from "@/components/complexCard";

type SportsComplex = {
  id: string;
  name: string;
  city: string;
  distanceKm: number;
  isFavorite?: boolean;
};

const FAVORITES_KEY = "favorite_sports_complexes";

const Complexes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [complexes, setComplexes] = useState<SportsComplex[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const theme = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const loadFavorites = async () => {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setFavorites(new Set(parsed));
      }
    };

    loadFavorites();
    setComplexes(sportsComplexesData);
  }, []);

  const toggleFavorite = async (id: string) => {
    const updated = new Set(favorites);
    if (favorites.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setFavorites(updated);
    await AsyncStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(Array.from(updated))
    );
  };

  const filtered = complexes.filter(
    (complex) =>
      complex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complex.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CustomBG title={t("complexes.title")} height={60}>
      <Searchbar
        placeholder={t("complexes.search")}
        iconColor={theme.colors.primary}
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={[
          styles.search,
          {
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.primary,
            borderWidth: 1,
            marginBottom: 20,
          },
        ]}
      />

      <FlatList
        data={filtered}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ComplexCard
            complex={{ ...item, isFavorite: favorites.has(item.id) }}
            onToggleFavorite={toggleFavorite}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </CustomBG>
  );
};

const styles = StyleSheet.create({
  search: {
    marginBottom: 10,
  },
  card: {
    marginBottom: 10,
  },
});

export default Complexes;
