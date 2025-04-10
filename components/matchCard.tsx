import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, Button, useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";

type Match = {
  id: string;
  title: string;
  city: string;
  requiredLevel: string;
  currentPlayers: number;
  maxPlayers: number;
  date: string;
};

type Props = {
  match: Match;
  onJoin: (title: string) => void;
};

const MatchCard = ({ match, onJoin }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card
      style={[
        styles.card,
        {
          borderColor: theme.colors.primary,
          borderWidth: 2,
          backgroundColor: theme.colors.background,
          shadowColor: theme.colors.primary,
        },
      ]}>
      <Card.Title title={match.title} subtitle={match.city} />
      <Card.Content>
        <Text style={{ fontWeight: "bold" }}>
          {t("matches.requiredLevel")}:{" "}
          <Text>{t(`profile.levels.${match.requiredLevel}`)}</Text>
        </Text>
        <Text style={{ fontWeight: "bold" }}>
          {t("matches.players")}:{" "}
          <Text>
            {match.currentPlayers} / {match.maxPlayers}
          </Text>
        </Text>
        <Text style={{ fontWeight: "bold" }}>
          {t("matches.date")}:{" "}
          <Text>{new Date(match.date).toLocaleString()}</Text>
        </Text>
      </Card.Content>
      <Card.Actions>
        <Button
          textColor={theme.colors.background}
          style={{ backgroundColor: theme.colors.primary }}
          onPress={() => onJoin(match.title)}>
          {t("matches.join")}
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    marginBottom: 15,
    borderRadius: 20,
    elevation: 3,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
});

export default MatchCard;
