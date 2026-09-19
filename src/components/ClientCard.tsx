import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import StatusBadge from "./StatusBadge";
import { useTheme } from "../context/ThemeContext";

type ClientCardProps = {
  name: string;
  gateways: number;
  meters: number;
  status: "online" | "offline" | "warning";
  onPress?: () => void;
};

export default function ClientCard({
  name,
  gateways,
  meters,
  status,
  onPress,
}: ClientCardProps) {
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
          <Text style={styles.icon}>🏢</Text>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
          <StatusBadge status={status} />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Gateways</Text>
          <Text style={styles.infoValue}>{gateways}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Medidores</Text>
          <Text style={styles.infoValue}>{meters}</Text>
        </View>
      </View>

      <Text style={styles.details}>Ver detalles →</Text>
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
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 17,
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