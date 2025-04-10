import React from "react";
import { StyleSheet, Text } from "react-native";
import { Card, IconButton, useTheme } from "react-native-paper";

type SportsComplex = {
  id: string;
  name: string;
  city: string;
  distanceKm: number;
  isFavorite?: boolean;
};

type Props = {
  complex: SportsComplex;
  onToggleFavorite: (id: string) => void;
};

const ComplexCard = ({ complex, onToggleFavorite }: Props) => {
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
      <Card.Title
        title={complex.name}
        subtitle={
          <Text>
            <Text style={{ fontWeight: "bold" }}>{complex.city}</Text>
            {` - ${complex.distanceKm} km`}
          </Text>
        }
        right={() => (
          <IconButton
            icon={complex.isFavorite ? "heart" : "heart-outline"}
            iconColor={
              complex.isFavorite ? theme.colors.primary : theme.colors.onSurface
            }
            onPress={() => onToggleFavorite(complex.id)}
          />
        )}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    borderRadius: 16,
    elevation: 5,
    marginHorizontal: 10,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
});

export default ComplexCard;
