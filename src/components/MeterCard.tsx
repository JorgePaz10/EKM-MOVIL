import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import StatusBadge from "./StatusBadge";
import { useTheme } from "../context/ThemeContext";

type MeterCardProps = {
  name: string;
  consumption: number;
  unit?: string;
  status: "online" | "offline" | "warning";
  onPress?: () => void;
};

export default function MeterCard({
  name,
  consumption,
  unit = "kWh",
  status,
  onPress,
}: MeterCardProps) {
  const { colors } = useTheme();
  const styles = crearEstilos(colors);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>⚡</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
          <StatusBadge status={status} />
        </View>
      </View>

      <View style={styles.consumptionContainer}>
        <Text style={styles.label}>Consumo</Text>

        <View style={styles.consumptionRow}>
          <Text style={styles.consumption}>{consumption}</Text>
          <Text style={styles.unit}>{unit}</Text>
        </View>
      </View>

      <Text style={styles.details}>
        Ver medidor →
      </Text>
    </TouchableOpacity>
  );
}

const crearEstilos = (colors: any) => StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    fontSize: 23,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 5,
  },
  consumptionContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 3,
  },
  consumptionRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  consumption: {
    fontSize: 25,
    fontWeight: "bold",
    color: colors.primary,
  },
  unit: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 5,
  },
  details: {
    textAlign: "right",
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
});