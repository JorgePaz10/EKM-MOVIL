import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import StatusBadge from "./StatusBadge";
import { useTheme } from "../context/ThemeContext";

type GatewayCardProps = {
  name: string;
  meters: number;
  status: "online" | "offline" | "warning";
  onPress?: () => void;
};

export default function GatewayCard({
  name,
  meters,
  status,
  onPress,
}: GatewayCardProps) {
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
          <Text style={styles.icon}>📡</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
          <StatusBadge status={status} />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Medidores conectados</Text>
        <Text style={styles.infoValue}>{meters}</Text>
      </View>

      <Text style={styles.details}>
        Ver gateway →
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
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
  },
  details: {
    textAlign: "right",
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
});